


import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const data = [
  { day: "Mon", problems: 4 },
  { day: "Tue", problems: 7 },
  { day: "Wed", problems: 5 },
  { day: "Thu", problems: 9 },
  { day: "Fri", problems: 6 },
  { day: "Sat", problems: 12 },
  { day: "Sun", problems: 8 }
];

export default function ProgressChart() {
  return (
    <div className="chart-card">
      <div className="section-heading">
        <div>
          <h5>Weekly Activity</h5>
          <p>Your coding activity this week</p>
        </div>
        <span className="chart-badge">This week</span>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#253047" vertical={false} />
            <XAxis
              dataKey="day"
              stroke="#8491a8"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#8491a8"
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: "#172238",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff"
              }}
            />
            <Area
              type="monotone"
              dataKey="problems"
              stroke="#818cf8"
              strokeWidth={3}
              fill="url(#activityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
