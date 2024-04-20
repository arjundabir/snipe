from pymongo import MongoClient
from gridfs import GridFS
from PIL import Image
from io import BytesIO
from bson.objectid import ObjectId

client = MongoClient('mongodb+srv://snipeadmin:snipelahacks@snipedb.jgilvjy.mongodb.net/')

db = client['pictures']

fs = GridFS(db)

# with open(r'C:\Users\lexib\OneDrive\Pictures\Screenshots\Screenshot 2024-04-18 170442.png', 'rb') as f:
#     image_id = fs.put(f, filename="test_image")

# print(image_id)

image_id = ObjectId('66235ab2f1cf45f552a08fde')
image_data = fs.get(image_id).read()

image_stream = BytesIO(image_data)
image = Image.open(image_stream)
image.show()