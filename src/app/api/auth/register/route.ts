import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // 🔍 Cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah digunakan" },
        { status: 400 }
      );
    }

    // 🔒 Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🆕 Buat user baru
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "USER" },
    });

    return NextResponse.json(
      { message: "Pendaftaran berhasil", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error saat registrasi:", error);

    if (error.code === "P5010") {
      return NextResponse.json(
        { error: "Masalah koneksi database. Pastikan Prisma berjalan dengan baik." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Terjadi kesalahan saat mendaftar" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // 🔥 Pastikan Prisma ditutup setelah query selesai
  }
}
