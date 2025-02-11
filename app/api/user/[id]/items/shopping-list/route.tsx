import { Prisma, PrismaClient } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const prisma = new PrismaClient();

  const items = await prisma.item.findMany({
    where: {
      userId: id,
      onList: true,
      isDeleted: false,
    },
  });

  return Response.json(items);
}
