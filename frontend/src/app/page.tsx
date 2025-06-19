import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="border border-gray-300 rounded-xl p-10 shadow-sm text-center bg-white">
        <h1 className="text-2xl font-semibold mb-6">Welcome to SubTracker</h1>
        <Link
          href="/subscriptions"
          className="inline-block px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition"
        >
          View Subscriptions
        </Link>
      </div>
    </main>
  );
}
