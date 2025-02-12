import { PrismaClient } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const itemId = (await params).itemId;

  const prisma = new PrismaClient();

  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
  });

  return Response.json(item);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const itemId = (await params).itemId;
  const data = await request.json();

  const prisma = new PrismaClient();

  const item = await prisma.item.update({
    where: {
      id: itemId,
    },
    data,
  });

  return Response.json(item);
}

// Soft DELETE
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const itemId = (await params).itemId;

  const prisma = new PrismaClient();

  const item = await prisma.item.update({
    where: {
      id: itemId,
    },
    data: {
      isDeleted: true,
    },
  });

  return Response.json(item);
}
