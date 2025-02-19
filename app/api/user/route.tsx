import { PrismaClient } from "@prisma/client";

export async function POST(request: Request) {
  const { data } = await request.json();

  const dbData = {
    id: data.id,
    email: data.email_addresses[0].email_address,
    name: `${data.first_name} ${data.last_name}`,
  };
  const prisma = new PrismaClient();

  const user = await prisma.user.create({
    data: dbData,
  });

  return Response.json(user);
}
