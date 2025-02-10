import { PrismaClient } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return Response.json(user);
}
