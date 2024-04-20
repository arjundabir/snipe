import { addUser, initMongo } from "@/utils/mongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const body = await request.json()
    const {name, session, latitude, longitude} = body
    initMongo()
    addUser(name, session, latitude, longitude)

    return NextResponse.json(body, {status: 200})
}