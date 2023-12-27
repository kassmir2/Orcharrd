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

# app = Flask(__name__)
# try:
#   client = pymongo.MongoClient(<Your Atlas Connection String>)

# # return a friendly error if a URI error is thrown
# except pymongo.errors.ConfigurationError:
#   print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
#   sys.exit(1)

# # use a database named "myDatabase"
# db = client.myDatabase


# @app.route("/createProfile", methods=["POST"])
# def larger_image():


uri = (
    "mongodb+srv://kassmir:Puzzle@orc.ikt6fie.mongodb.net/?retryWrites=true&w=majority"
)


# Create a new client and connect to the server
client = MongoClient(uri)
db = client.UserInformation
userInfo = db.UserInfo

profile = {
    "username": "chuck",
    "email": "chuck@gmail.com",
    "password": "pass",
    "name": "Charlie",
    "bio": "whats up I'm chuck",
    "Images": [123, 456],
}
result = userInfo.insert_one(profile)
doc_id = result.inserted_id
print(f"The profiles ID is {doc_id}")
client.close()

# # Send a ping to confirm a successful connection
