import Button from "components/Button";
import { TasksContext } from "contexts/TasksContext";
import { UserContext } from "contexts/UserContext";
import React, { useContext, useState } from "react";
import { harperAddNewTask } from "utils/harperdb/harperNewTask";

interface TaskbarProps {
  selectedTaskId: string;
  setSelectedTaskId: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTaskName: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  pauseTimer: () => void;
}

const Taskbar = ({
  selectedTaskId,
  setSelectedTaskId,
  setSelectedTaskName,
  setErrorMessage,
  setSeconds,
  pauseTimer,
}: TaskbarProps) => {
  const { username } = useContext(UserContext);
  const { tasks, getTasks } = useContext(TasksContext);

  const [isUserAddingTask, setIsUserAddingTask] = useState(false);
  const [taskInputValue, setTaskInputValue] = useState("");

  const handleChangeTaskInput = (e: { target: HTMLInputElement }) => {
    setTaskInputValue(e.target.value);
  };

  const handleClickAddNewTask = () => {
    if (taskInputValue.trim() === "") {
      setErrorMessage("Type a task");
      return;
    }

    addNewTask();
    resetAddingNewTask();
  };

  const addNewTask = async () => {
    try {
      const { response } = await harperAddNewTask(username, taskInputValue);

      if (response.status === 200) {
        getTasks(username);
      } else {
        setErrorMessage("Whoops, something went wrong");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Whoops, something went wrong");
    }
  };

  const resetAddingNewTask = () => {
    setTaskInputValue("");
    setIsUserAddingTask(false);
  };

  const handleSelectTask = (e: { target: HTMLSelectElement }) => {
    setErrorMessage("");

    const id = e.target.value;
    setSelectedTaskId(id);
    setSelectedTaskName(tasks.find((t) => t.id === id)?.task_name || "");
    setSeconds(0);
    pauseTimer();
  };

  return (
    <div>
      {isUserAddingTask ? (
        <>
          <input
            type="text"
            placeholder="Enter task here..."
            value={taskInputValue}
            onChange={handleChangeTaskInput}
            className="border p-2 mr-2"
          />
          <Button color="primary" handleClick={handleClickAddNewTask}>
            Add task
          </Button>
          <Button
            color="secondary"
            handleClick={() => setIsUserAddingTask(false)}
            extraClasses="ml-1"
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <select
            className="mr-4 p-2 border"
            name="task"
            id="task"
            onChange={handleSelectTask}
          >
            {selectedTaskId === "" && (
              <option disabled selected value="" hidden>
                {" "}
                -- Select a task --
              </option>
            )}
            {tasks.map((task) => (
              <option
                key={task.id}
                value={task.id}
                selected={task.id === selectedTaskId}
              >
                {task.task_name}
              </option>
            ))}
          </select>
          <Button color="primary" handleClick={() => setIsUserAddingTask(true)}>
            New task
          </Button>
        </>
      )}
    </div>
  );
};

export default Taskbar;
