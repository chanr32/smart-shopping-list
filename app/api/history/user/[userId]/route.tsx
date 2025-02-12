import { PrismaClient } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const prisma = new PrismaClient();
  const userId = (await params).userId;
  const histories = await prisma.history.findMany({
    where: {
      userId: userId,
    },
  });

  return Response.json(histories);
}
