import { NextResponse } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "./lib/session";

export async function middleware(req) {
    const res = NextResponse.next();
    const session = await getIronSession(req, res, sessionOptions);
    const { user } = session;

    if (req.nextUrl.pathname.startsWith('/api/fileUploads')) {
        if(user?.isLoggedIn){
            console.log("uploading files while authorized");
        } else {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'authentication failed' }),
                { status: 401, headers: { 'content-type': 'application/json' } }
              )
        }
    }

    if (req.nextUrl.pathname.startsWith('/api/fileDelete')) {
        if(user?.isLoggedIn){
            console.log("uploading files while authorized");
        } else {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'authentication failed' }),
                { status: 401, headers: { 'content-type': 'application/json' } }
              )
        }
    }

    return res;
}