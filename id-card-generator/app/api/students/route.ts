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
