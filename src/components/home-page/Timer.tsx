import Button from "components/Button";
import { TasksContext } from "contexts/TasksContext";
import { UserContext } from "contexts/UserContext";
import { useContext } from "react";
import { RecentTaskTime } from "types/RecentTaskTime";
import { formatTime } from "utils/formatTime";
import { harperSaveTaskTime } from "utils/harperdb/saveTaskTime";

interface TimerProps {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  isTimerOn: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  selectedTaskId: string;
  selectedTaskName: string;
  setRecentTaskTimes: React.Dispatch<React.SetStateAction<RecentTaskTime[]>>;
}

export const Timer: React.FC<TimerProps> = ({
  seconds,
  setSeconds,
  isTimerOn,
  startTimer,
  pauseTimer,
  setErrorMessage,
  selectedTaskId,
  selectedTaskName,
  setRecentTaskTimes,
}) => {
  const { tasks, getTasks } = useContext(TasksContext);
  const { username } = useContext(UserContext);

  const { formattedHours, formattedMins, formattedSecs } = formatTime(seconds);

  const handleStartTimer = () => {
    setErrorMessage("");
    if (selectedTaskId === "") {
      setErrorMessage("Please select a task");
    } else {
      startTimer();
    }
  };

  const getTaskTimeFromId = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      return 0;
    }
    return task.time_in_seconds;
  };

  const handleLogTime = async () => {
    pauseTimer();
    const prevTaskSeconds = getTaskTimeFromId(selectedTaskId);
    const newTaskSeconds = prevTaskSeconds + seconds;

    const { response, result } = await harperSaveTaskTime(
      selectedTaskId,
      newTaskSeconds
    );

    if (response.status === 200) {
      getTasks(username);
      setSeconds(0);

      setRecentTaskTimes((prev) => [
        { name: selectedTaskName, seconds },
        ...prev,
      ]);
    } else {
      setErrorMessage("Whoops, something went wrong :(");
    }
  };

  const handleResetTimer = () => {
    pauseTimer();
    setSeconds(0);
  };

  return (
    <div>
      <div className="mt-8 border-2 border-gray-500 rouded p-14 text-5xl">
        {formattedHours} : {formattedMins} : {formattedSecs}
      </div>
      <div className="flex justify-center-mt-10">
        {isTimerOn ? (
          <>
            <Button color="warning" handleClick={pauseTimer}>
              Pause
            </Button>
          </>
        ) : (
          <>
            <Button color="success" handleClick={handleStartTimer}>
              Start
            </Button>
          </>
        )}

        {(seconds > 0 || isTimerOn) && (
          <Button
            color="danger"
            handleClick={handleLogTime}
            extraClasses="ml-4"
          >
            Log time
          </Button>
        )}
      </div>

      {(seconds > 0 || isTimerOn) && (
        <button
          onClick={handleResetTimer}
          className="underline underline-offset-2 mt-8 cursor-pointer text-gray-500 mx-auto block"
        >
          Reset
        </button>
      )}
    </div>
  );
};

interface TimerBtnProps {
  handleClick: () => {};
  text: string;
  extraClasses?: string;
}

export const TimerBtn: React.FC<TimerBtnProps> = ({
  handleClick,
  text,
  extraClasses,
}) => {
  return (
    <button
      className={`${
        text === "Start" ? "bg-blue-500" : "bg-red-500"
      } rounded px-4 py-2 text-white mt-8 ${extraClasses}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
