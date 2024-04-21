from pymongo import MongoClient
from gridfs import GridFS
from PIL import Image
from io import BytesIO
from bson.objectid import ObjectId

client = MongoClient('mongodb+srv://snipeadmin:snipelahacks@snipedb.jgilvjy.mongodb.net/')

db = client['snipe']

fs = GridFS(db, collection='images')

with open(r"C:\Users\lexib\OneDrive\Pictures\2023-Formula1-Ferrari-SF-23-004-2160.jpg", 'rb') as f:
    image_id = fs.put(f, filename="ferrari")

print(image_id)

image_data = fs.get(image_id).read()

image_stream = BytesIO(image_data)
image = Image.open(image_stream)
image.show()