import { PrismaClient } from "@prisma/client";

export async function GET(request: Request, query: any) {
  const {
    params: { id },
  } = query;
  const prisma = new PrismaClient();
  const userId = Number(id);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return Response.json(user);
}
