import json
from flask import Flask, jsonify, send_file, render_template, request
import requests
import os
import io
import boto3
import base64
import dotenv
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import sys

app = Flask(__name__)
uri = (
    "mongodb+srv://kassmir:Puzzle@orc.ikt6fie.mongodb.net/?retryWrites=true&w=majority"
)

try:
    client = MongoClient(uri)
except pymongo.errors.ConfigurationError:
    print(
        "An Invalid URI host error was received. Is your Atlas host name correct in your connection string?"
    )
    sys.exit(1)

db = client.UserInformation
userInfo = db.UserInfo


@app.route("/Login", methods=["POST"])
def createProfile():
    try:
        # Assuming the request body contains JSON data
        data = json.loads(request.data.decode("UTF-8"))
        print(data)
        # Check if the required fields are present in the JSON data
        if "username" not in data:
            return "Missing 'username' in request body", 400
        username = data["username"]

        # Use the username in the query
        query = {"username": username}

        result = userInfo.find_one(query)
        if result is None:
            return "No users match those credentials", 400
        elif result["password"] != data["password"]:
            return {"statustext": "No users match those credentials"}, 400

        return "", 200

    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return "Error processing request", 500


# @app.route("/createProfile", methods=["POST"])
# def createProfile():
#     profile = {
#         "username": "bro",
#         "email": "bro@gmail.com",
#         "password": "temp",
#         "name": "Angie",
#         "bio": "Angie's world",
#         "Images": [999999, 1111],
#     }

#     result = userInfo.insert_one(profile)
#     doc_id = result.inserted_id
#     print(f"The profiles ID is {doc_id}")
