import { Prisma, PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();

  const items = await prisma.item.findMany();
  return Response.json(items);
}
