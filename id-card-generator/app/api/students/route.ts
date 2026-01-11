import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET: Fetch all registered students
 * Used by Home Page on load/refresh
 */
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      select: {
        id: true,
        rollNo: true,
        name: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(students);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

/* =========================
   POST: Register new student
========================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { rollNo, name, course, branch, year, email, phone } = body;

    // Basic validation
    if (!rollNo || !name || !course || !branch || !year || !email || !phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check duplicate roll number
    const existingStudent = await prisma.student.findUnique({
      where: { rollNo },
    });

    if (existingStudent) {
      return NextResponse.json(
        { error: "Student with this roll number already exists" },
        { status: 409 }
      );
    }

    await prisma.student.create({
      data: {
        rollNo,
        name,
        course,
        branch,
        year: Number(year),
        email,
        phone,
      },
    });

    return NextResponse.json(
      { message: "Student registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to register student" },
      { status: 500 }
    );
  }
}
