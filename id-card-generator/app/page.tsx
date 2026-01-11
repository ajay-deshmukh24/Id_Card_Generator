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

  if (!res.ok) return [];
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
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Student Registry
          </h1>

          <div className="flex gap-4">
            <Link href="/register">
              <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium shadow hover:bg-blue-700">
                Register Student
              </button>
            </Link>

            <Link href="/create-card">
              <button className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium shadow hover:bg-green-700">
                Create ID Card
              </button>
            </Link>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-white font-semibold">
                  Roll No
                </th>
                <th className="px-6 py-4 text-left text-white font-semibold">
                  Name
                </th>
                <th className="px-6 py-4 text-center text-white font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-10 text-center text-slate-500 text-lg"
                  >
                    No students registered yet
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`border-b border-slate-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="px-6 py-4 text-slate-800 font-medium">
                      {student.rollNo}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{student.name}</td>
                    <td className="px-6 py-4 text-center">
                      <form action={deregisterStudent}>
                        <input
                          type="hidden"
                          name="rollNo"
                          value={student.rollNo}
                        />
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-md bg-red-500 text-white font-medium shadow hover:bg-red-600"
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
