import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ✅ Get All Posts
export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

// ✅ Create Post (Only for Admin)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
if (!session || !session.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
}

const { title, content } = await req.json();
const post = await prisma.post.create({
    data: { title, content, authorId: (session.user as any).id as string },
});

return NextResponse.json(post, { status: 201 });
}

// ✅ Update Post (Only for Admin)
export async function PUT(req: Request) {
const session = await getServerSession(authOptions);
if (!session || !session.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
}

const { id, title, content, price } = await req.json();
  const updatedPost = await prisma.post.update({
    where: { id },
    data: { title, content, price },
  });

return NextResponse.json(updatedPost);
}

// ✅ Delete Post (Only for Admin)
export async function DELETE(req: Request) {
const session = await getServerSession(authOptions);
if (!session || !session.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
}

const { id } = await req.json();
await prisma.post.delete({ where: { id } });

return NextResponse.json({ message: "Post deleted successfully" });
}
