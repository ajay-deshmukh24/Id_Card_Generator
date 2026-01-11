"use client";

import { useState } from "react";
import Link from "next/link";

interface Student {
  rollNo: string;
  name: string;
  course: string;
  branch: string;
  year: number;
  email: string;
  phone: string;
}

export default function CreateCardPage() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateCard() {
    if (!rollNo.trim()) return;

    setLoading(true);
    setError("");
    setStudent(null);

    const res = await fetch(`/api/students/${rollNo}`);
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Student not found");
      setLoading(false);
      return;
    }

    setStudent(data);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      {/* Home Button */}
      <Link
        href="/"
        className="inline-block mb-6 text-indigo-700 font-semibold hover:underline"
      >
        ← Home
      </Link>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Student ID Card Generator
        </h1>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter Roll Number"
              className="
                flex-1 bg-white text-gray-800 placeholder-gray-400
                px-4 py-3 border-2 border-gray-400 rounded-lg shadow-sm
                focus:outline-none focus:border-indigo-600
                focus:ring-4 focus:ring-indigo-200
              "
            />

            <button
              onClick={handleCreateCard}
              disabled={loading}
              className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create ID Card"}
            </button>
          </div>

          {error && (
            <p className="text-center text-red-600 font-semibold mt-4">
              {error}
            </p>
          )}
        </div>

        {/* ID Card */}
        {student && (
          <div className="flex justify-center">
            <div className="w-[360px] rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
              <div className="p-6 text-center border-b border-white/30">
                <div className="w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
                  {student.name.charAt(0)}
                </div>
                <h2 className="mt-4 text-2xl font-bold">{student.name}</h2>
                <p className="text-white/90 text-sm">
                  Roll No: {student.rollNo}
                </p>
              </div>

              <div className="p-6 space-y-3 text-sm">
                <Detail label="Course" value={student.course} />
                <Detail label="Branch" value={student.branch} />
                <Detail label="Year" value={student.year.toString()} />
                <Detail label="Email" value={student.email} small />
                <Detail label="Phone" value={student.phone} />
              </div>

              <div className="bg-black/25 text-center py-3 text-xs tracking-wide font-semibold">
                OFFICIAL STUDENT ID CARD
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Detail({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="font-semibold">{label}</span>
      <span className={small ? "text-xs text-right" : "text-right"}>
        {value}
      </span>
    </div>
  );
}
