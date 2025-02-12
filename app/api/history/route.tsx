import { PrismaClient } from "@prisma/client";

export async function GET(request: Request) {
  const prisma = new PrismaClient();

  const histories = await prisma.history.findMany();

  return Response.json(histories);
}

export async function POST(request: Request) {
  const data = await request.json();

  const prisma = new PrismaClient();

  const history = await prisma.history.create({
    data,
  });

  return Response.json(history);
}
