import { RecentTaskTime } from "types/RecentTaskTime";

interface LogOfRecentTasksProps {
  recentTasks: RecentTaskTime[];
}

const LogOfRecentTasks = ({ recentTasks }: LogOfRecentTasksProps) => {
  return (
    <div className="mt-8 max-h-56 overflow-y-auto px-8">
      {recentTasks.map((task, i) => (
        <div key={i} className="flex shadow rounded px-8 py-4 mt-2">
          <p>
            <span className="text-green-600">{task.seconds}</span> seconds added
            to <span className="text-green-600">{task.name}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default LogOfRecentTasks;
