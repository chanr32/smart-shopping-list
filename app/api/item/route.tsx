import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
  const prisma = new PrismaClient();

  const items = await prisma.item.findMany();

  return Response.json(items);
}

export async function POST(request: Request) {
  const data = await request.json();

  const prisma = new PrismaClient();

  const item = await prisma.item.create({
    data,
  });

  return Response.json(item);
}
