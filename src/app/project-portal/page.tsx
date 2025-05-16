"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProjectPortal() {
  const [entered, setEntered] = useState(false);
  const [input, setInput] = useState("");
  const PASSWORD = "fts-access";

  if (!entered) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded shadow max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">🔐 Protected Portal</h1>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter password..."
            className="w-full border px-4 py-2 rounded mb-4"
          />
          <button
            onClick={() => setEntered(input === PASSWORD)}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Enter
          </button>
          {input && input !== PASSWORD && (
            <p className="text-sm text-red-500 mt-2">Incorrect password</p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">🔒 Project Developer Portal</h1>
        <p className="text-gray-600 mb-8">
          Internal documentation for team and client use.
        </p>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">🖼️ Homepage Wireframe</h2>
          <p className="text-gray-700 mb-4">
            The homepage was replaced with a custom hero section using a
            background image, overlaid gradient, and Sanity-driven content
            areas.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Full height hero (from <code>h-screen</code>)
            </li>
            <li>
              CSS background image via <code>.hero-bg</code> in{" "}
              <code>globals.css</code>
            </li>
            <li>Overlaid heading, subheading, and CTAs</li>
            <li>Hero content fetched from Sanity ("hero" type)</li>
            <li>Gradient & z-index layering handled via Tailwind</li>
          </ul>

          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`.hero-bg {
  background-image: url('/sunset-safari.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`}
          </pre>

          <p className="mt-4 text-sm text-gray-500">
            File: <code>web/src/app/page.tsx</code> — Hero is now dynamically
            rendered based on Sanity content.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">🧱 Project Structure</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`my-project/
├── web/     # Next.js frontend app
└── studio/  # Sanity CMS backend`}
          </pre>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">⚙️ Technologies</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Next.js (App Router + TypeScript)</li>
            <li>Tailwind CSS</li>
            <li>Sanity CMS (v3)</li>
            <li>Custom Fonts: Poppins</li>
            <li>Wetu Integration (iframe modal)</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">
            📦 Features Built So Far
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>🧭 Custom hero section on homepage (with Sanity content)</li>
            <li>🌍 Journey Finder grid (Wetu iframe integration)</li>
            <li>🔍 Search filter (real-time keyword filtering)</li>
            <li>🌐 Region filter (interactive buttons)</li>
            <li>🪟 Slide-in drawer with scroll lock + Wetu iframe view</li>
            <li>🗂️ Filters show/hide toggle section</li>
            <li>🔒 Password-protected internal documentation page</li>
            <li>🧪 Developer-focused structure for future dynamic filters</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">
            💻 Code Example: Journey Card
          </h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`type JourneyCardProps = {
  title: string
  summary: string
}

export default function JourneyCard({ title, summary }: JourneyCardProps) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="text-sm text-gray-600">{summary}</p>
    </div>
  )
}`}
          </pre>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">🔗 Key Links</h2>
          <ul className="list-disc list-inside text-blue-600 space-y-1">
            <li>
              <Link href="/">Home Page</Link>
            </li>
            <li>
              <Link href="/journeys">Journey Finder Page</Link>
            </li>
            <li>
              <Link href="/studio">Sanity Studio (CMS Admin)</Link>
            </li>
            <li>
              <Link href="/project-portal">Developer Portal</Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
