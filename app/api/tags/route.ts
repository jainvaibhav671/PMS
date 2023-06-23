import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/Prisma";

export async function GET(req: NextRequest) {
  const tags = await prisma.tag.findMany({
    select: {
      name: true,
    },
  });
  return NextResponse.json(
    tags.map((t) => t.name),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}
