import json
from flask import Flask, jsonify, send_file, render_template, request, make_response # type: ignore
import pymongo # type: ignore
from pymongo.mongo_client import MongoClient # type: ignore
from pymongo.server_api import ServerApi # type: ignore
import sys
from werkzeug.datastructures import ImmutableMultiDict # type: ignore
from bson import ObjectId # type: ignore
from flask_pymongo import PyMongo # type: ignore
import gridfs # type: ignore
import base64

app = Flask(__name__)
uri = (
    "mongodb+srv://kassmir:Puzzle@orc.ikt6fie.mongodb.net/?retryWrites=true&w=majority"
)
app.config["MONGO_URI"] = (
    "mongodb+srv://kassmir:Puzzle@orc.ikt6fie.mongodb.net/?retryWrites=true&w=majority"
)
mongo = PyMongo(app)


try:
    client = MongoClient(uri)
except pymongo.errors.ConfigurationError:
    print(
        "An Invalid URI host error was received. Is your Atlas host name correct in your connection string?"
    )
    sys.exit(1)

db = client.UserInformation
userInfo = db.UserInfo
locationInfo = db.LocationInfo
fs = gridfs.GridFS(db)


@app.route("/Login", methods=["POST"])
def Login():
    print("Logging On")
    try:
        # Assuming the request body contains JSON data
        data = json.loads(request.data.decode("UTF-8"))
        print(data)
        # Check if the required fields are present in the JSON data
        if "username" not in data:
            return "Missing 'username' in request body", 400
        username = data["username"].replace(" ", "")

        # Use the username in the query
        queryuser = {"username": username}
        queryemail = {"email": username}
        resultuser = userInfo.find_one(queryuser)
        # print(resultuser)
        resultemail = userInfo.find_one(queryemail)
        if resultuser is None and resultemail is None:
            return "No users match those credentials", 400
        elif resultemail is not None and resultemail["password"] != data["password"]:
            return {"statustext": "No users match those credentials"}, 400
        elif resultuser is not None and resultuser["password"] != data["password"]:
            return {"statustext": "No users match those credentials"}, 400
        return "", 200

    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return "Error processing request", 500


@app.route("/createProfile", methods=["POST"])
def createProfile():
    # print(request.form.to_dict())
    # print(request.files.get("picOne"))
    try:
        # Get the image file from the request
        pics = ["picOne", "picTwo", "picThree", "picFour"]
        data = request.form.to_dict()

        for pic in pics:
            photo = request.files.get(pic)
            photo_id = fs.put(photo, filename=photo.filename)
            data[pic] = photo_id
        # Assuming the request body contains JSON data

        # Add the GridFS file ID to the user data

        username = data["username"]
        email = data["email"]
        queryuser = {"username": username}
        queryemail = {"email": email}
        resultuser = userInfo.find_one(queryuser)
        resultemail = userInfo.find_one(queryemail)
        if resultuser is not None:
            return "A user already exists with that username", 401
        if resultemail is not None:
            return "A user already exists with that email", 402

        # Insert the user data into the UserInfo collection
        data["swipedRightGroup"] = {}
        data["matches"] = []
        result = userInfo.insert_one(data)
        return "Profile Created Successfully!", 200

    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return "Error processing request", 500


@app.route("/get_image/<picture>/<username>", methods=["GET"])
def get_user_image(picture, username):
    try:
        queryuser = {"username": username}
        resultuser = userInfo.find_one(queryuser)

        if resultuser is None:
            return "User not found", 404

        pic_id = resultuser[picture]

        try:
            pic = fs.get(ObjectId(pic_id))
            response = make_response(pic.read())
            response.headers["Content-Type"] = "image/jpeg"
            response.status_code = 200
            return response
        except gridfs.errors.NoFile:
            # Handle the case where a file is not found for a given ID
            pass
        return "something went wrong", 405

        # Return the list of file data as JSON

    except Exception as e:
        print(f"Error: {str(e)}")
        return "Internal Server Error", 500


@app.route("/get_user_info/<username>", methods=["GET"])
def get_user_info(username):
    try:
        queryuser = {"username": username}
        resultuser = userInfo.find_one(queryuser)
        # print(resultuser)
        user_information = {"name": resultuser["name"], "bio": resultuser["bio"]}
        if resultuser is None:
            return "User not found", 404

        return jsonify(user_information)
        # Return result user

    except Exception as e:
        print(f"Error: {str(e)}")
        return "Internal Server Error", 500


@app.route("/get_profiles/<location>/<username>", methods=["GET"])
def get_profiles(location, username):
    try:
        queryLocation = {"name": location}
        resultLocation = locationInfo.find_one(queryLocation)

        if username not in resultLocation["group"]:
            resultLocation["group"].append(username)
            filter_criteria = {"_id": resultLocation["_id"]}
            update_operation = {"$set": {"group": resultLocation["group"]}}
            result = locationInfo.update_one(filter_criteria, update_operation)
            # add array for that location for that user
            queryUser = {"username": username}
            resultUser = userInfo.find_one(queryUser)

            resultUser["swipedRightGroup"][location] = []
            filter_criteria = {"_id": resultUser["_id"]}
            update_operation = {
                "$set": {"swipedRightGroup": resultUser["swipedRightGroup"]}
            }
            result = userInfo.update_one(filter_criteria, update_operation)
            print("inserted new user into group")
        # print(resultLocation)
        group = resultLocation["group"]
        group.remove(username)

        if resultLocation is None:
            return "Location not found", 404
        user_profiles = []
        pics = ["picOne", "picTwo", "picThree", "picFour"]
        for user in group:
            queryuser = {"username": user}
            resultuser = userInfo.find_one(queryuser)
            user_information = {
                "name": resultuser["name"],
                "bio": resultuser["bio"],
                "username": resultuser["username"],
            }
            # for pic in pics:
            #     pic_id = resultuser[pic]
            user_profiles.append(user_information)
        return jsonify({"userProfiles": user_profiles})
        # Return result user

    except Exception as e:
        print(f"Error: {str(e)}")
        return "Internal Server Error", 500


@app.route("/get_places/<username>", methods=["GET"])
def get_places(username):
    locations = []
    try:
        resultLocation = locationInfo.find({})
        for c in resultLocation:
            l = {
                "name": c["name"],
                "group": c["group"],
                "category": c["category"],
                "description": c["description"],
                "address": c["address"],
                "price": c["price"],
            }
            locations.append(l)

        if resultLocation is None:
            return "No locations not found", 404
        return jsonify({"locations": locations})

    except Exception as e:
        print(f"Error: {str(e)}")
        return "Internal Server Error", 500


@app.route("/get_place_info/<place>", methods=["GET"])
def get_place_info(place):
    try:
        queryloc = {"name": place}
        resultloc = locationInfo.find_one(queryloc)
        # print(resultuser)
        loc_information = {
            "name": resultloc["name"],
            "group": resultloc["group"],
            "category": resultloc["category"],
            "description": resultloc["description"],
            "address": resultloc["address"],
            "price": resultloc["price"],
        }
        if resultloc is None:
            return "User not found", 404

        return jsonify(loc_information)
        # Return result user

    except Exception as e:
        print(f"Error: {str(e)}")
        return "Internal Server Error", 500


@app.route("/get_image_loc/<picture>/<place>", methods=["GET"])
def get_loc_image(picture, place):

    picture = picture + "."
    try:
        queryloc = {"name": place}
        resultloc = locationInfo.find_one(queryloc)

        if resultloc is None:
            return "User not found", 404

        pic_id = resultloc[picture]

        try:
            pic = fs.get(ObjectId(pic_id))
            response = make_response(pic.read())
            response.headers["Content-Type"] = "image/jpeg"
            response.status_code = 200
            return response
        except gridfs.errors.NoFile:
            # Handle the case where a file is not found for a given ID
            pass
        return "something went wrong", 405
    except Exception as e:
        print(f"Error: {str(e)}")
        return "Internal Server Error", 500


@app.route("/addSwipedUser/<user>/<swipedUser>/<location>", methods=["POST"])
def add_swiped_user(user, swipedUser, location):
    print(user, swipedUser, location)
    try:
        querySwipedUser = {"username": swipedUser}
        resultSwipedUser = userInfo.find_one(querySwipedUser)
        # if the swiped user has not swiped right on this user
        if user not in resultSwipedUser["swipedRightGroup"][location]:
            queryUser = {"username": user}
            resultUser = userInfo.find_one(queryUser)
            if swipedUser not in resultUser["swipedRightGroup"][location]:
                resultUser["swipedRightGroup"][location].append(swipedUser)
                filter_criteria = {"_id": resultUser["_id"]}
                update_operation = {
                    "$set": {"swipedRightGroup": resultUser["swipedRightGroup"]}
                }
                result = userInfo.update_one(filter_criteria, update_operation)
                print("inserted new user into swiped right group")
                return "added user to swiped right group ", 201

            print("already swiped right on this user for this location")
            return "already swiped right on this user for this location", 201
        else:
            # put logic here that is the swiped user had already swiped right on this user so they should match and both be put into each others matching groups
            queryUser = {"username": user}
            resultUser = userInfo.find_one(queryUser)
            new_match = {"username": swipedUser, "location": location}
            resultUser["matches"].append(new_match)
            filter_criteria = {"_id": resultUser["_id"]}
            update_operation = {"$set": {"matches": resultUser["matches"]}}
            result = userInfo.update_one(filter_criteria, update_operation)
            new_match_2 = {"username": user, "location": location}
            resultSwipedUser["matches"].append(new_match_2)
            filter_criteria_swipedUser = {"_id": resultSwipedUser["_id"]}
            update_operation_swipedUser = {
                "$set": {"matches": resultSwipedUser["matches"]}
            }
            resultSwipedUser = userInfo.update_one(
                filter_criteria_swipedUser, update_operation_swipedUser
            )
            return "matched with user", 200

    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return "Error processing request", 500


@app.route("/get_matches/<username>", methods=["GET"])
def get_name(username):
    try:
        queryUser = {"username": username}
        resultUser = userInfo.find_one(queryUser)
        matches = resultUser["matches"]
        if len(matches) == 0:
            return "no matches found", 201
        to_return = []

        for m in matches:
            tmp = {"username": m["username"], "location": m["location"]}
            to_return.append(tmp)

        return jsonify({"matches": to_return})
        # Return result user

    except Exception as e:
        print(f"Error: {str(e)}")
        return "Internal Server Error", 500


@app.route("/get_name/<username>", methods=["GET"])
def get_matches(username):
    try:
        queryuser = {"username": username}
        resultuser = userInfo.find_one(queryuser)
        user_information = {"name": resultuser["name"]}
        if resultuser is None:
            return "User not found", 404

        return jsonify(user_information)

    except Exception as e:
        print(f"Error: {str(e)}")
        return "Internal Server Error", 500