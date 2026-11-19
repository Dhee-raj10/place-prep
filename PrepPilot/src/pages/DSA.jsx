
import { useState, useMemo } from "react";
import {
  Plus, Search, Trash2, CheckCircle2,
  Code2, Target, Trophy, Filter, X
} from "lucide-react";

const initialProblems = [
  { id: 1, name: "Two Sum", topic: "Arrays", difficulty: "Easy", solved: true },
  { id: 2, name: "Best Time to Buy and Sell Stock", topic: "Arrays", difficulty: "Easy", solved: true },
  { id: 3, name: "Maximum Subarray", topic: "Arrays", difficulty: "Medium", solved: false },
  { id: 4, name: "Search in Rotated Sorted Array", topic: "Binary Search", difficulty: "Medium", solved: true },
  { id: 5, name: "Aggressive Cows", topic: "Binary Search", difficulty: "Hard", solved: false },
  { id: 6, name: "Reverse Linked List", topic: "Linked List", difficulty: "Easy", solved: true },
  { id: 7, name: "Detect Cycle in Linked List", topic: "Linked List", difficulty: "Medium", solved: false },
  { id: 8, name: "Valid Parentheses", topic: "Stack", difficulty: "Easy", solved: true },
  { id: 9, name: "Longest Substring Without Repeating Characters", topic: "Sliding Window", difficulty: "Medium", solved: false },
  { id: 10, name: "Longest Common Subsequence", topic: "DP", difficulty: "Hard", solved: false },
  { id: 11, name: "Number of Islands", topic: "Graphs", difficulty: "Medium", solved: false },
  { id: 12, name: "Maximum Depth of Binary Tree", topic: "Trees", difficulty: "Easy", solved: true }
];

const topics = [
  "Arrays", "Binary Search", "Strings", "Linked List",
  "Recursion", "Stack", "Queue", "Sliding Window",
  "Greedy", "Trees", "Graphs", "DP", "Heap", "Bit Manipulation"
];

export default function DSA() {
  const [problems, setProblems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("prep-dsa")) || initialProblems;
    } catch {
      return initialProblems;
    }
  });

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [status, setStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    topic: "Arrays",
    difficulty: "Easy"
  });

  function saveProblems(updated) {
    setProblems(updated);
    localStorage.setItem("prep-dsa", JSON.stringify(updated));
  }

  function addProblem(e) {
    e.preventDefault();

    if (!form.name.trim()) return;

    const updated = [
      {
        id: Date.now(),
        name: form.name.trim(),
        topic: form.topic,
        difficulty: form.difficulty,
        solved: false
      },
      ...problems
    ];

    saveProblems(updated);
    setForm({ name: "", topic: "Arrays", difficulty: "Easy" });
    setShowForm(false);
  }

  function toggleSolved(id) {
    saveProblems(
      problems.map(p =>
        p.id === id ? { ...p, solved: !p.solved } : p
      )
    );
  }

  function deleteProblem(id) {
    saveProblems(problems.filter(p => p.id !== id));
  }

  const filtered = useMemo(() => {
    return problems.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficulty === "All" || p.difficulty === difficulty;
      const matchesTopic = topic === "All" || p.topic === topic;
      const matchesStatus =
        status === "All" ||
        (status === "Solved" && p.solved) ||
        (status === "Unsolved" && !p.solved);

      return matchesSearch && matchesDifficulty && matchesTopic && matchesStatus;
    });
  }, [problems, search, difficulty, topic, status]);

  const solved = problems.filter(p => p.solved).length;
  const easy = problems.filter(p => p.difficulty === "Easy" && p.solved).length;
  const medium = problems.filter(p => p.difficulty === "Medium" && p.solved).length;
  const hard = problems.filter(p => p.difficulty === "Hard" && p.solved).length;

  return (
    <div className="dsa-page">
      <div className="dsa-heading">
        <div>
          <p className="welcome-date">YOUR CODING JOURNEY</p>
          <h1>DSA Tracker <Code2 size={25} /></h1>
          <p className="welcome-subtitle">
            Track your progress and master data structures and algorithms.
          </p>
        </div>

        <button className="primary-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Close" : "Add Problem"}
        </button>
      </div>

      <div className="dsa-stats">
        <div className="dsa-stat">
          <div className="stat-icon purple"><Code2 /></div>
          <span>Total Problems</span>
          <h2>{problems.length}</h2>
        </div>

        <div className="dsa-stat">
          <div className="stat-icon green"><CheckCircle2 /></div>
          <span>Solved Problems</span>
          <h2>{solved}</h2>
        </div>

        <div className="dsa-stat">
          <div className="stat-icon blue"><Target /></div>
          <span>Completion Rate</span>
          <h2>{problems.length ? Math.round(solved / problems.length * 100) : 0}%</h2>
        </div>

        <div className="dsa-stat">
          <div className="stat-icon orange"><Trophy /></div>
          <span>Remaining</span>
          <h2>{problems.length - solved}</h2>
        </div>
      </div>

      <div className="difficulty-overview chart-card">
        <h5>Difficulty Breakdown</h5>
        <div className="difficulty-bars">
          {[
            { name: "Easy", count: easy, color: "#34d399" },
            { name: "Medium", count: medium, color: "#fbbf24" },
            { name: "Hard", count: hard, color: "#f87171" }
          ].map(item => (
            <div className="difficulty-item" key={item.name}>
              <div className="progress-label">
                <span>{item.name}</span>
                <strong>{item.count} solved</strong>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${problems.length ? item.count / problems.length * 100 : 0}%`,
                    background: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <form className="chart-card add-problem-form" onSubmit={addProblem}>
          <h5>Add a New Problem</h5>

          <input
            className="dsa-input"
            placeholder="Enter problem name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />

          <div className="form-row">
            <select
              className="dsa-input"
              value={form.topic}
              onChange={e => setForm({ ...form, topic: e.target.value })}
            >
              {topics.map(t => <option key={t}>{t}</option>)}
            </select>

            <select
              className="dsa-input"
              value={form.difficulty}
              onChange={e => setForm({ ...form, difficulty: e.target.value })}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>

            <button className="primary-button" type="submit">
              <Plus size={17} /> Save Problem
            </button>
          </div>
        </form>
      )}

      <div className="chart-card problems-card">
        <div className="section-heading">
          <div>
            <h5>My Problems</h5>
            <p>Manage and track your DSA practice</p>
          </div>
          <Filter size={19} color="#818cf8" />
        </div>

        <div className="dsa-filters">
          <div className="dsa-search">
            <Search size={17} />
            <input
              placeholder="Search problems..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <select value={topic} onChange={e => setTopic(e.target.value)}>
            <option>All</option>
            {topics.map(t => <option key={t}>{t}</option>)}
          </select>

          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option>All</option>
            <option>Solved</option>
            <option>Unsolved</option>
          </select>
        </div>

        <div className="problem-table-wrap">
          <table className="problem-table">
            <thead>
              <tr>
                <th>STATUS</th>
                <th>PROBLEM</th>
                <th>TOPIC</th>
                <th>DIFFICULTY</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <button
                      className={`solve-button ${p.solved ? "is-solved" : ""}`}
                      onClick={() => toggleSolved(p.id)}
                      title="Toggle solved status"
                    >
                      <CheckCircle2 size={19} />
                    </button>
                  </td>
                  <td className={p.solved ? "problem-solved" : ""}>{p.name}</td>
                  <td><span className="topic-badge">{p.topic}</span></td>
                  <td>
                    <span className={`difficulty-badge ${p.difficulty.toLowerCase()}`}>
                      {p.difficulty}
                    </span>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => deleteProblem(p.id)}>
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="empty-state">
              No problems found. Try changing your filters or add a problem!
            </div>
          )}
        </div>

        <div className="table-footer">
          Showing {filtered.length} of {problems.length} problems
        </div>
      </div>
    </div>
  );
}
