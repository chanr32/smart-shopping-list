import { PrismaClient } from "@prisma/client";

export async function GET(request: Request, query: any) {
  const {
    params: { id },
  } = query;
  const prisma = new PrismaClient();
  const itemId = Number(id);
  const item = await prisma.item.findUnique({
    where: {
      id: itemId,
    },
  });
  return Response.json(item);
}
