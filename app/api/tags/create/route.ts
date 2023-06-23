import { prisma } from "@/app/utils/Prisma";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const params = await req.json();
  try {
    console.log(
      "TAGS",
      params.tags.map((t: string) => {
        return { name: t };
      })
    );

    const {} = await prisma.tag.createMany({
      data: params.tags.map((t: string) => {
        return { name: t };
      }),
      skipDuplicates: true,
    });
  } catch (e) {
    console.log(e);
  }
}
