import { prisma } from "@/app/utils/Database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: {
        project_id: string
    }}
) {
    const tasks = await prisma.project.findMany({
        where: {
            parent_project: { 
                equals: params.project_id,
                not: params.project_id
            }
        }
    })
    return NextResponse.json(tasks)
}