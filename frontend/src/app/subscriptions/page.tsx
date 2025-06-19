"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  useEffect(() => {
    // Example placeholder
    setSubscriptions(["Netflix", "Spotify", "GitHub Pro"]);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="border border-gray-300 rounded-xl p-10 shadow-sm bg-white w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Your Subscriptions
        </h2>

        {subscriptions.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {subscriptions.map((sub) => (
              <li key={sub} className="text-gray-800">
                {sub}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No subscriptions found.</p>
        )}
      </div>
    </main>
  );
};

export default Page;
