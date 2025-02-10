import { PrismaClient } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const prisma = new PrismaClient();

  const item = await prisma.item.findUnique({
    where: {
      id: id,
    },
  });

  return Response.json(item);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const prisma = new PrismaClient();

  const item = await prisma.item.delete({
    where: {
      id: id,
    },
  });

  return Response.json(item);
}
