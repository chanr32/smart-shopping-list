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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const data = await request.json();

  const prisma = new PrismaClient();
  let item;

  switch (data.action) {
    case "SOFT_DELETE":
      item = await prisma.item.update({
        where: {
          id: id,
        },
        data: {
          isDeleted: true,
        },
      });
  }

  return Response.json(item);
}
