
import { useState } from "react";
import {
  Code2, Target, Flame, Trophy,
  CheckCircle2, Clock3, ArrowUpRight,
  CalendarDays, Plus, ChevronRight
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ProgressChart from "../components/ProgressChart";

const activities = [
  { title: "Solved Two Sum", category: "Arrays", time: "20 min ago", icon: Code2 },
  { title: "Completed DBMS revision", category: "Database", time: "2 hours ago", icon: CheckCircle2 },
  { title: "Completed aptitude quiz", category: "Aptitude", time: "Yesterday", icon: Target }
];

const initialTasks = [
  { id: 1, title: "Practice Binary Search", time: "09:00 AM", done: false },
  { id: 2, title: "Revise Operating Systems", time: "11:00 AM", done: false },
  { id: 3, title: "Solve 2 DSA problems", time: "04:00 PM", done: true },
  { id: 4, title: "Practice SQL queries", time: "07:00 PM", done: false }
];

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("prep-tasks")) || initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const completed = tasks.filter(task => task.done).length;

  function toggleTask(id) {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
    localStorage.setItem("prep-tasks", JSON.stringify(updated));
  }

  return (
    <div className="app-shell">
      <Sidebar active={active} setActive={setActive} />

      <main className="main-content">
        <Navbar />

        <div className="dashboard-content">
          <div className="welcome-row">
            <div>
              <p className="welcome-date">
                <CalendarDays size={15} /> THURSDAY, NOVEMBER 20
              </p>
              <h1>Welcome back, Dheeraj! <span>👋</span></h1>
              <p className="welcome-subtitle">
                Keep pushing forward. Your dream job is closer than you think.
              </p>
            </div>

            <button className="primary-button" onClick={() => setActive("DSA Tracker")}>
              <Plus size={18} /> Start Practicing
            </button>
          </div>

          <section className="stats-grid">
            <StatCard
              title="Problems Solved"
              value="128"
              subtitle="Across all topics"
              trend="+12 this week"
              icon={Code2}
              color="purple"
            />
            <StatCard
              title="Preparation Score"
              value="76%"
              subtitle="Overall progress"
              trend="+8% this month"
              icon={Target}
              color="blue"
            />
            <StatCard
              title="Current Streak"
              value="12 Days"
              subtitle="Personal best: 18 days"
              trend="Keep it up!"
              icon={Flame}
              color="orange"
            />
            <StatCard
              title="Mock Test Score"
              value="84%"
              subtitle="Average performance"
              trend="+5% improvement"
              icon={Trophy}
              color="green"
            />
          </section>

          <section className="main-grid">
            <ProgressChart />

            <div className="chart-card preparation-card">
              <div className="section-heading">
                <div>
                  <h5>Preparation Progress</h5>
                  <p>Track your placement readiness</p>
                </div>
              </div>

              <div className="overall-progress">
                <div className="progress-circle">
                  <div>
                    <strong>76%</strong>
                    <span>Completed</span>
                  </div>
                </div>
              </div>

              {[
                { label: "Data Structures", value: 85, color: "#818cf8" },
                { label: "Algorithms", value: 70, color: "#38bdf8" },
                { label: "Core Subjects", value: 65, color: "#34d399" },
                { label: "Aptitude", value: 80, color: "#fbbf24" }
              ].map(item => (
                <div className="progress-item" key={item.label}>
                  <div className="progress-label">
                    <span>{item.label}</span>
                    <strong>{item.value}%</strong>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${item.value}%`, background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bottom-grid">
            <div className="chart-card tasks-card">
              <div className="section-heading">
                <div>
                  <h5>Today's Goals</h5>
                  <p>{completed} of {tasks.length} tasks completed</p>
                </div>
                <span className="task-count">{completed}/{tasks.length}</span>
              </div>

              <div className="task-list">
                {tasks.map(task => (
                  <label className="task-item" key={task.id}>
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className={task.done ? "task-done" : ""}>
                      {task.title}
                    </span>
                    <small><Clock3 size={13} /> {task.time}</small>
                  </label>
                ))}
              </div>
            </div>

            <div className="chart-card activity-card">
              <div className="section-heading">
                <div>
                  <h5>Recent Activity</h5>
                  <p>Your latest achievements</p>
                </div>
                <ArrowUpRight size={18} />
              </div>

              <div className="activity-list">
                {activities.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div className="activity-item" key={index}>
                      <div className="activity-icon">
                        <Icon size={18} />
                      </div>
                      <div className="activity-info">
                        <strong>{item.title}</strong>
                        <span>{item.category} · {item.time}</span>
                      </div>
                      <ChevronRight size={16} />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <footer className="dashboard-footer">
            <span>© 2026 PrepPilot. Built for your next big opportunity.</span>
            <span>Made with ❤️ for developers</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
