import json
from flask import Flask, jsonify, send_file, render_template, request
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import sys
from werkzeug.datastructures import ImmutableMultiDict
from bson import ObjectId
from flask_pymongo import PyMongo
import gridfs

app = Flask(__name__)
uri = (
    "mongodb+srv://kassmir:Puzzle@orc.ikt6fie.mongodb.net/?retryWrites=true&w=majority"
)
app.config[
    "MONGO_URI"
] = "mongodb+srv://kassmir:Puzzle@orc.ikt6fie.mongodb.net/?retryWrites=true&w=majority"
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
fs = gridfs.GridFS(db)


@app.route("/Login", methods=["POST"])
def Login():
    try:
        # Assuming the request body contains JSON data
        data = json.loads(request.data.decode("UTF-8"))
        print(data)
        # Check if the required fields are present in the JSON data
        if "username" not in data:
            return "Missing 'username' in request body", 400
        username = data["username"]

        # Use the username in the query
        queryuser = {"username": username}
        queryemail = {"email": username}
        resultuser = userInfo.find_one(queryuser)
        print(resultuser)
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
    print(request.form.to_dict())
    print(request.files.get("picOne"))
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

        print("GOT THIS FAR")
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
        result = userInfo.insert_one(data)
        return "Profile Created Successfully!", 200

    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return "Error processing request", 500


@app.route("/get_images/<username>", methods=["GET"])
def get_user_images(username):
    try:
        queryuser = {"username": username}
        resultuser = userInfo.find_one(queryuser)
        pic_ids = [
            resultuser["picOne"],
            resultuser["picTwo"],
            resultuser["picThree"],
            resultuser["picFour"],
        ]
        images_data = []
        for id in pic_ids:
            pic = fs.get(ObjectId(id))
            image_data = {
                "filename": pic.filename,
                "content_type": pic.content_type,
                "data": pic.read(),  # Read the file content
            }
            images_data.append(image_data)
        
        print(jsonify(images_data))

        # Return the list of file data as JSON
        return jsonify(images_data)

    except gridfs.errors.NoFile:
        return "User images not found", 404
