import { Prisma, PrismaClient } from "@prisma/client";

export async function GET(request: Request, query: any) {
  const {
    params: { id },
  } = query;

  const prisma = new PrismaClient();

  const items = await prisma.item.findMany({
    where: {
      userId: id,
    },
  });

  return Response.json(items);
}
