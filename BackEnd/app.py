import json
from flask import Flask, jsonify, send_file, render_template, request
import requests
import os
import io
import boto3
import base64
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
    try:
        # Assuming the request body contains JSON data
        data = json.loads(request.data.decode("UTF-8"))
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
        result = userInfo.insert_one(data)
        return "", 200

    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return "Error processing request", 500
