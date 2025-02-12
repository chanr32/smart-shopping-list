import { PrismaClient } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ historyId: string }> }
) {
  const prisma = new PrismaClient();
  const historyId = (await params).historyId;
  const history = await prisma.history.findUnique({
    where: {
      id: historyId,
    },
  });

  return Response.json(history);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ historyId: string }> }
) {
  const data = await request.json();
  const historyId = (await params).historyId;

  const prisma = new PrismaClient();

  const history = await prisma.history.update({
    where: {
      id: historyId,
    },
    data,
  });

  return Response.json(history);
}
