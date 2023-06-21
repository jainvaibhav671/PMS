import { prisma } from "@/app/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const params = await req.json()

    prisma.tag.createMany({
        data: params.tags.map((t: any) => { return { name: t } }),
        skipDuplicates: true,
    })
}