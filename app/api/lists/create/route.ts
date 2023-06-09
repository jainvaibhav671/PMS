import { addList } from "@/app/utils/Database";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    console.log("creating")
    const params = await req.json();
    if (params.list_name === undefined) {
        return;
    }
    console.log("CREATING LIST", params, req.headers);
    await addList({ list_name: params.list_name });
}