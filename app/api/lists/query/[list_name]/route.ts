import { NextRequest, NextResponse } from "next/server";
import { getListID } from "@/app/utils/Database";

export async function GET(
    req: NextRequest, 
    { params }: { params: { list_name: string }}
) {
    const id = await getListID({ list_name: params.list_name });
    console.log("ID", id)
    return NextResponse.json(id);
}