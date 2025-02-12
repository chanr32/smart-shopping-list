import { PrismaClient } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const data = await request.json();

  const prisma = new PrismaClient();

  const history = await prisma.history.create({
    data: {
      itemId: id,
      brand: data.brand,
      price: parseFloat(data.price),
    },
  });

  const item = await prisma.item.update({
    where: {
      id: id,
    },
    data: {
      onList: false,
    },
  });

  return Response.json(item);
}
