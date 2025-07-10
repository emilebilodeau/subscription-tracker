"use client";

import { useState } from "react";

interface Subscription {
  id: number;
  name: string;
}

const Page = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [input, setInput] = useState("");

  // Track edit state per subscription
  const [editStates, setEditStates] = useState<{
    [id: number]: string;
  }>({});

  const handleAdd = () => {
    if (!input.trim()) return;

    const newSub: Subscription = {
      id: Date.now(),
      name: input.trim(),
    };
    setSubscriptions((prev) => [...prev, newSub]);
    setInput("");
  };

  const handleStartEdit = (id: number, currentName: string) => {
    setEditStates((prev) => ({ ...prev, [id]: currentName }));
  };

  const handleEditChange = (id: number, newValue: string) => {
    setEditStates((prev) => ({ ...prev, [id]: newValue }));
  };

  const handleSaveEdit = (id: number) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, name: editStates[id].trim() } : sub
      )
    );
    setEditStates((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleCancelEdit = (id: number) => {
    setEditStates((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleDelete = (id: number) => {
    setSubscriptions((prev) => prev.filter((s) => s.id !== id));
    setEditStates((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="border border-gray-300 rounded-xl p-10 shadow-sm bg-white w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Your Subscriptions
        </h2>

        {/* Add Subscription */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter subscription name"
            className="flex-grow border border-gray-300 rounded px-4 py-2"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Subscription List */}
        {subscriptions.length > 0 ? (
          <ul className="space-y-3">
            {subscriptions.map((sub) => (
              <li
                key={sub.id}
                className="flex justify-between items-center border border-gray-200 rounded px-4 py-2"
              >
                {editStates[sub.id] !== undefined ? (
                  <>
                    <input
                      type="text"
                      value={editStates[sub.id]}
                      onChange={(e) => handleEditChange(sub.id, e.target.value)}
                      className="flex-grow border border-gray-300 rounded px-2 py-1 mr-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(sub.id)}
                        className="text-sm text-green-600 hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleCancelEdit(sub.id)}
                        className="text-sm text-gray-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="flex-grow">{sub.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEdit(sub.id, sub.name)}
                        className="text-sm text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
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
