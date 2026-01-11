import Link from "next/link";
import { revalidatePath } from "next/cache";

interface Student {
  id: number;
  rollNo: string;
  name: string;
}

/* =========================
   Fetch all students
========================= */
async function getStudents(): Promise<Student[]> {
  const res = await fetch("http://localhost:3000/api/students", {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

/* =========================
   Server Action: De-register
========================= */
async function deregisterStudent(formData: FormData) {
  "use server";

  const rollNo = formData.get("rollNo");

  await fetch(`http://localhost:3000/api/students/${rollNo}`, {
    method: "DELETE",
  });

  revalidatePath("/");
}

export default async function HomePage() {
  const students = await getStudents();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Student Registry</h1>

          <div className="flex gap-4">
            <Link href="/register">
              <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Register Student
              </button>
            </Link>

            <Link href="/create-card">
              <button className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                Create ID Card
              </button>
            </Link>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">Roll No</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    No students registered yet
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{student.rollNo}</td>
                    <td className="px-6 py-4">{student.name}</td>
                    <td className="px-6 py-4 text-center">
                      <form action={deregisterStudent}>
                        <input
                          type="hidden"
                          name="rollNo"
                          value={student.rollNo}
                        />
                        <button
                          type="submit"
                          className="px-4 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                          De-register
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
