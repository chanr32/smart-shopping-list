import { PrismaClient } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const prisma = new PrismaClient();

  const item = await prisma.item.update({
    where: {
      id: id,
    },
    data: {
      onList: true,
    },
  });

  return Response.json(item);
}
