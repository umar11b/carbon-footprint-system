import React, { useState, useEffect } from "react";

const LogGoals = () => {
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState([]);

  const apiUrl =
    "https://6nu2ha0iy8.execute-api.us-east-1.amazonaws.com/dev/goals";

  // Fetch goals from backend (GET)
  const fetchGoals = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setGoals(data.goals || []);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    }
  };

  // Add a new goal (POST)
  const handleAddGoal = async () => {
    if (!goal.trim()) return;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });

      const result = await response.json();
      console.log("Server response:", result);
      setGoals((prevGoals) => [...prevGoals, goal]);
      setGoal("");
    } catch (err) {
      console.error("Failed to save goal:", err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="p-8 max-w-md mx-auto bg-ecoLight border border-ecoGreen rounded-lg">
      <h2 className="text-3xl font-bold text-ecoGreen mb-6 text-center">
        📌 Log Sustainability Goals
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="e.g. Use less plastic"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="flex-1 p-2 border border-ecoGreen rounded-lg focus:outline-none focus:ring-2 focus:ring-ecoGreen"
        />
        <button
          onClick={handleAddGoal}
          className="px-4 py-2 bg-ecoGreen text-white rounded hover:bg-ecoDark"
        >
          Add
        </button>
      </div>

      <ul className="mt-4 space-y-2 list-disc list-inside text-ecoBrown">
        {goals.map((g, i) => (
          <li key={i}>✅ {g}</li>
        ))}
      </ul>
    </div>
  );
};

export default LogGoals;
