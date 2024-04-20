from pymongo import MongoClient
from geojson import Point

# connect to db client
client = MongoClient('mongodb+srv://snipeadmin:snipelahacks@snipedb.jgilvjy.mongodb.net/')

# get the db instance
db = client.get_database('snipe')

location = db['locations']

test_location = Point((-73.856077, 40.848447))

test_user = {
    "name": "test user",
}

data = test_user.copy()
data.update({
    "location": test_location
})

# insert a document to the db

# result = location.insert_one(data)
# print(result.inserted_id)

# delete_result = location.delete_one({"_id": "662353f660e176b419130052"})
# print(delete_result.deleted_count)

x = location.find()

for i in x:
    print(i)

