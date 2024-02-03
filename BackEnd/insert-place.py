from flask import Flask
import pymongo
from pymongo.mongo_client import MongoClient
import sys
from flask_pymongo import PyMongo


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
LocationInfo = db.LocationInfo

Location = "A Durham Bar" #put the location name here 

try:
    data = {"name": Location, "group": []}

    # Insert the user data into the UserInfo collection
    result = LocationInfo.insert_one(data)


except Exception as e:
    print(f"Error processing request: {str(e)}")
