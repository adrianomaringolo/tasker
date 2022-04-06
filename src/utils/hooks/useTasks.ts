import { useCallback, useEffect, useState } from "react";
import { Task } from "types/Task";
import { harperGetTasks } from "utils/harperdb/getTasks";

export const useTasks = (username: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getAndSetTasks = useCallback(
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
    getAndSetTasks(username);
  }, [username, tasks.length, getAndSetTasks]);

  return { tasks, setTasks, getAndSetTasks };
};
