import { PrismaClient } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const prisma = new PrismaClient();
  const userId = (await params).userId;
  const items = await prisma.item.findMany({
    where: {
      userId: userId,
      onList: false,
    },
  });

  return Response.json(items);
}
