import { addUser, initMongo, updateLocation } from "@/utils/mongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json()
    const {name, session, latitude, longitude} = body
    initMongo()
    addUser(name, session, latitude, longitude)

    return NextResponse.json(body, {status: 200})
}

export async function PUT(request: NextRequest){
    const body = await request.json()
    const {name, lat, lng} = body

    return NextResponse.json(updateLocation(name, lat, lng), {status: 200})
}

