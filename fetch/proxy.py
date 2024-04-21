import json
import requests
from fastapi import FastAPI
from uagents import Model
from uagents.query import query

AGENT_ADDRESS = "agent1qt6ehs6kqdgtrsduuzslqnrzwkrcn3z0cfvwsdj22s27kvatrxu8sy3vag0"


class TestRequest(Model):
    message: str


async def agent_query(req):
    response = await query(destination=AGENT_ADDRESS, message=req, timeout=15.0)
    data = json.loads(response.decode_payload())
    return data["text"]


app = FastAPI()

def get_coordinates(location):
    # Replace 'YOUR_API_KEY' with your actual Google Maps API key
    api_key = 'AIzaSyAyIr3ZBmZUMAi9kZML91y3JlLc8sFYmPw'
    endpoint = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": location,
        "key": api_key
    }

    try:
        response = requests.get(endpoint, params=params)
        data = response.json()
        if data['status'] == 'OK':
            # Extract latitude and longitude
            lat = data['results'][0]['geometry']['location']['lat']
            lng = data['results'][0]['geometry']['location']['lng']
            return [lat, lng]
        else:
            print(f"Failed to geocode {location}")
            return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def get_locations_coordinates(locations):
    coordinates = []
    for location in locations:
        lat_lng = get_coordinates(location)
        if lat_lng:
            coordinates.append([location.strip(), lat_lng])
    return coordinates


@app.get("/")
def read_root():
    return "Hello from the Agent controller"


@app.post("/endpoint")
async def make_agent_call(req: TestRequest):
    try:
        res = await agent_query(req)
        locations = res.split(',')
        latlang = get_locations_coordinates(locations)
        return str(latlang)
    except Exception as e:
        return str(e)