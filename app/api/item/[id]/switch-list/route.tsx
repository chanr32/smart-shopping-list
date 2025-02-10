import { PrismaClient } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const data = await request.json();

  const prisma = new PrismaClient();

  const items = await prisma.item.update({
    where: {
      id: id,
    },
    data: {
      onList: data.onList,
    },
  });

  return Response.json(items);
}
