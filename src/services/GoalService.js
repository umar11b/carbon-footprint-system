const apiUrl = "https://your-api-url.amazonaws.com/dev/goals";

export const addGoal = async (goal) => {
  return await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ goal }),
  }).then(res => res.json());
};


In LogGoals.jsx, replace your API call with:
import { addGoal } from "../services/GoalService";

const handleAddGoal = async () => {
  if (!goal.trim()) return;
  try {
    await addGoal(goal);
    setGoals([...goals, goal]);
    setGoal("");
  } catch (err) {
    console.error("Error:", err);
  }
};