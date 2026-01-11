import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    roll: string;
  };
}

/**
 * GET: Fetch a single student by roll number
 * Used by Create ID Card page
 */
export async function GET(_: Request, { params }: Params) {
  try {
    const student = await prisma.student.findUnique({
      where: {
        rollNo: params.roll,
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

/**
 * DELETE: De-register a student by roll number
 * Used by Home Page
 */
export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.student.delete({
      where: {
        rollNo: params.roll,
      },
    });

    return NextResponse.json({
      message: "Student de-registered successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to de-register student" },
      { status: 500 }
    );
  }
}
