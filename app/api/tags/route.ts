import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/Prisma";

export async function GET(req: NextRequest) {
  const tags = await prisma.tag.findMany({
    select: {
      name: true,
    },
  });
  // tags.map((t) => t.name),
  return NextResponse.json([], {
    headers: { "Content-Type": "application/json" },
  });
}
