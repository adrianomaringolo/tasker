import { useCallback, useEffect, useState } from "react";
import { Task } from "types/Task";
import { harperGetTasks } from "utils/harperdb/getTasks";

export const useTasks = (username: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = useCallback(
    async (username: string) => {
      try {
        const tasks: Task[] = await harperGetTasks(username);
        setTasks(tasks);
      } catch (err) {
        console.log(err);
      }
    },
    [setTasks]
  );

  useEffect(() => {
    if (!username || tasks.length > 0) return;
    getTasks(username);
  }, [username, tasks.length, getTasks]);

  return { tasks, setTasks, getTasks };
};
