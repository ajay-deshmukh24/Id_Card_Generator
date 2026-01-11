"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      rollNo: formData.get("rollNo"),
      name: formData.get("name"),
      course: formData.get("course"),
      branch: formData.get("branch"),
      year: Number(formData.get("year")),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      setLoading(false);
      return;
    }

    router.push("/");
  }

  const inputClass = `
    w-full px-4 py-3
    border border-gray-300
    rounded-lg
    bg-white
    text-gray-800
    placeholder-gray-500
    focus:outline-none
    focus:ring-2 focus:ring-blue-500
    focus:border-blue-500
    transition
  `;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Register Student
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter student details to generate ID card
        </p>

        {error && (
          <div className="mb-4 text-red-600 text-center font-medium">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            name="rollNo"
            placeholder="Roll Number"
            className={inputClass}
            required
          />
          <input
            name="name"
            placeholder="Full Name"
            className={inputClass}
            required
          />
          <input
            name="course"
            placeholder="Course"
            className={inputClass}
            required
          />
          <input
            name="branch"
            placeholder="Branch"
            className={inputClass}
            required
          />

          <input
            type="number"
            name="year"
            placeholder="Year"
            className={inputClass}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className={inputClass}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            className={inputClass}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 shadow-md"
          >
            {loading ? "Registering..." : "Register Student"}
          </button>
        </form>
      </div>
    </main>
  );
}
