import { deleteList } from "@/app/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: {
        params: {
            list_id: number
        }
    }) {

    await deleteList(params.list_id);

    return NextResponse.json([]);
    
}