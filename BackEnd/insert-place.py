from flask import Flask
import pymongo
from pymongo.mongo_client import MongoClient
import sys
from flask_pymongo import PyMongo
import gridfs
import os


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
fs = gridfs.GridFS(db)
# put the location name here

try:
    data = {
        "name": "",
        "group": [],
        "category": "",
        "description": "",
        "address": "",
        "price": "",
        "tags": [],
    }
    pics_folder = "pics"
    # Insert the user data into the UserInfo collection
    pics = ["picOne.jpeg", "picTwo.jpeg", "picThree.jpeg", "picFour.jpeg"]
    for pic in pics:
        picture_path = os.path.join(pics_folder, pic)
        with open(picture_path, "rb") as f:
            photo_id = fs.put(f, filename=pic)
        data[pic[:-4]] = photo_id
    result = LocationInfo.insert_one(data)


except Exception as e:
    print(f"Error processing request: {str(e)}")
