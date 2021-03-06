import React, { createContext } from "react";
import type { Task } from "types/Task";

interface TasksContext {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  getTasks: (username: string) => Promise<void>;
}

export const TasksContext = createContext({} as TasksContext);
