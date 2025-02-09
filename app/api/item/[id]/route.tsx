import { PrismaClient } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const prisma = new PrismaClient();

  const items = await prisma.item.findUnique({
    where: {
      id: id,
    },
  });

  return Response.json(items);
}
