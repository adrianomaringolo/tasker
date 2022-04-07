import { harperFetch } from "utils/harperFetch";

export const harperDeleteTask = async (taskId: string) => {
  const data = {
    operation: "delete",
    schema: "productivity_timer",
    table: "tasks",
    hash_values: [taskId],
  };

  return await harperFetch(data);
};
