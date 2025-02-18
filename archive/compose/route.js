import { NextResponse } from "next/server";

export async function POST(request) {

    return NextResponse()
}
export async function GET(request ) {

    const payload = {
        type:'composer',
        name:'Post-Card.fun',
        icon:'',
        description:"POST your handcrafted NFT CARD to a fren!",
        aboutUrl:"",
        imageUrl:"",
        action: {type:"post"}
    }
    return NextResponse.json(bookmarks, { status: 201 });
}
