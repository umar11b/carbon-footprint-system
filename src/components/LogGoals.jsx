import React, { useState, useEffect } from "react";

const CATEGORIES = [
  "Energy Conservation",
  "Transportation",
  "Waste Reduction",
  "Water Conservation",
  "Sustainable Consumption",
  "Other",
];

const PRIORITY_LEVELS = [
  { value: "high", label: "High", color: "text-red-600" },
  { value: "medium", label: "Medium", color: "text-yellow-600" },
  { value: "low", label: "Low", color: "text-green-600" },
];

const STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started", color: "bg-gray-200" },
  { value: "in_progress", label: "In Progress", color: "bg-yellow-200" },
  { value: "completed", label: "Completed", color: "bg-green-200" },
];

const LogGoals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: CATEGORIES[0],
    deadline: "",
    priority: "medium",
    status: "not_started",
    progress: 0,
  });
  const [editingGoal, setEditingGoal] = useState(null);
  const [filter, setFilter] = useState({
    category: "all",
    status: "all",
    priority: "all",
  });
  const [sortBy, setSortBy] = useState("deadline"); // deadline, priority, progress

  const apiUrl =
    "https://6nu2ha0iy8.execute-api.us-east-1.amazonaws.com/dev/goals";

  // Fetch goals from backend
  const fetchGoals = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setGoals(data.goals || []);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    }
  };

  // Add a new goal
  const handleAddGoal = async () => {
    if (!newGoal.title.trim()) return;

    try {
      const goalToAdd = {
        ...newGoal,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalToAdd),
      });

      const result = await response.json();
      console.log("Server response:", result);
      setGoals((prevGoals) => [...prevGoals, goalToAdd]);
      setNewGoal({
        title: "",
        description: "",
        category: CATEGORIES[0],
        deadline: "",
        priority: "medium",
        status: "not_started",
        progress: 0,
      });
    } catch (err) {
      console.error("Failed to save goal:", err);
    }
  };

  // Delete a goal
  const handleDeleteGoal = async (goalId) => {
    try {
      await fetch(`${apiUrl}/${goalId}`, {
        method: "DELETE",
      });
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    } catch (err) {
      console.error("Failed to delete goal:", err);
    }
  };

  // Update a goal
  const handleUpdateGoal = async (goalId, updatedData) => {
    try {
      await fetch(`${apiUrl}/${goalId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId ? { ...goal, ...updatedData } : goal
        )
      );
      setEditingGoal(null);
    } catch (err) {
      console.error("Failed to update goal:", err);
    }
  };

  // Filter and sort goals
  const filteredAndSortedGoals = goals
    .filter((goal) => {
      if (filter.category !== "all" && goal.category !== filter.category)
        return false;
      if (filter.status !== "all" && goal.status !== filter.status)
        return false;
      if (filter.priority !== "all" && goal.priority !== filter.priority)
        return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "deadline":
          return new Date(a.deadline) - new Date(b.deadline);
        case "priority":
          return (
            PRIORITY_LEVELS.findIndex((p) => p.value === b.priority) -
            PRIORITY_LEVELS.findIndex((p) => p.value === a.priority)
          );
        case "progress":
          return b.progress - a.progress;
        default:
          return 0;
      }
    });

  // Calculate statistics
  const statistics = {
    total: goals.length,
    completed: goals.filter((g) => g.status === "completed").length,
    inProgress: goals.filter((g) => g.status === "in_progress").length,
    notStarted: goals.filter((g) => g.status === "not_started").length,
    averageProgress:
      goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length || 0,
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Statistics Section */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg">Total Goals</h3>
          <p className="text-2xl text-ecoGreen">{statistics.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg">Completed</h3>
          <p className="text-2xl text-green-600">{statistics.completed}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg">In Progress</h3>
          <p className="text-2xl text-yellow-600">{statistics.inProgress}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg">Average Progress</h3>
          <p className="text-2xl text-blue-600">
            {statistics.averageProgress.toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Add New Goal Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-bold text-ecoGreen mb-4">Add New Goal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Goal Title"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            className="p-2 border rounded"
          />
          <select
            value={newGoal.category}
            onChange={(e) =>
              setNewGoal({ ...newGoal, category: e.target.value })
            }
            className="p-2 border rounded"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Description"
            value={newGoal.description}
            onChange={(e) =>
              setNewGoal({ ...newGoal, description: e.target.value })
            }
            className="p-2 border rounded md:col-span-2"
            rows="3"
          />
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) =>
              setNewGoal({ ...newGoal, deadline: e.target.value })
            }
            className="p-2 border rounded"
          />
          <select
            value={newGoal.priority}
            onChange={(e) =>
              setNewGoal({ ...newGoal, priority: e.target.value })
            }
            className="p-2 border rounded"
          >
            {PRIORITY_LEVELS.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddGoal}
            className="bg-ecoGreen text-white p-2 rounded hover:bg-ecoDark md:col-span-2"
          >
            Add Goal
          </button>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-wrap gap-4">
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="all">All Statuses</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="deadline">Sort by Deadline</option>
          <option value="priority">Sort by Priority</option>
          <option value="progress">Sort by Progress</option>
        </select>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredAndSortedGoals.map((goal) => (
          <div key={goal.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold">{goal.title}</h3>
                <p className="text-gray-600">{goal.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingGoal(goal.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div>
                <span className="text-gray-600">Category:</span>
                <span className="ml-2">{goal.category}</span>
              </div>
              <div>
                <span className="text-gray-600">Priority:</span>
                <span
                  className={`ml-2 ${
                    PRIORITY_LEVELS.find((p) => p.value === goal.priority)
                      ?.color
                  }`}
                >
                  {
                    PRIORITY_LEVELS.find((p) => p.value === goal.priority)
                      ?.label
                  }
                </span>
              </div>
              <div>
                <span className="text-gray-600">Deadline:</span>
                <span className="ml-2">
                  {new Date(goal.deadline).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-sm ${
                    STATUS_OPTIONS.find((s) => s.value === goal.status)?.color
                  }`}
                >
                  {STATUS_OPTIONS.find((s) => s.value === goal.status)?.label}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-600 mb-1">Progress</label>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-ecoGreen rounded-full h-4"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm">{goal.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Goal Modal */}
      {editingGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Edit Goal</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={goals.find((g) => g.id === editingGoal)?.title || ""}
                onChange={(e) =>
                  handleUpdateGoal(editingGoal, { title: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
              <select
                value={goals.find((g) => g.id === editingGoal)?.status || ""}
                onChange={(e) =>
                  handleUpdateGoal(editingGoal, { status: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min="0"
                max="100"
                value={goals.find((g) => g.id === editingGoal)?.progress || 0}
                onChange={(e) =>
                  handleUpdateGoal(editingGoal, {
                    progress: parseInt(e.target.value),
                  })
                }
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setEditingGoal(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditingGoal(null)}
                  className="px-4 py-2 bg-ecoGreen text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogGoals;
