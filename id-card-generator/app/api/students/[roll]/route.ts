import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    roll: string;
  }>;
}

/**
 * GET: Fetch a student by roll number
 */
export async function GET(_: Request, { params }: Params) {
  const { roll } = await params;

  try {
    const student = await prisma.student.findUnique({
      where: { rollNo: roll },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

/**
 * DELETE: De-register a student by roll number
 */
export async function DELETE(_: Request, { params }: Params) {
  const { roll } = await params;

  try {
    await prisma.student.delete({
      where: { rollNo: roll },
    });

    return NextResponse.json({
      message: "Student de-registered successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to de-register student" },
      { status: 500 }
    );
  }
}
