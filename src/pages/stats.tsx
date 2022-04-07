import Alert from "components/Alert";
import Navbar from "components/layout/Navbar";
import Link from "components/Link";
import PageHead from "components/PageHead";
import { TasksContext } from "contexts/TasksContext";
import { UserContext } from "contexts/UserContext";
import { NextPage } from "next";
import Head from "next/head";
import { useContext, useState } from "react";
import { displayTimeString, timestampToDayMonthYear } from "utils/formatTime";
import { harperDeleteTask } from "utils/harperdb/deleteTask";

const Stats: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const { username } = useContext(UserContext);
  const { tasks, getTasks } = useContext(TasksContext);

  const handleDeleteRow = async (taskId: string) => {
    setErrorMessage("");
    const confirmQuestion = confirm(
      "Are you sure you want to delete this row?"
    );

    if (!confirmQuestion) {
      return;
    }

    try {
      const { response } = await harperDeleteTask(taskId);
      if (response.status === 200) {
        getTasks(username);
        return;
      }
    } catch (err) {
      console.error(err);
    }
    setErrorMessage("Whoops, something went wrong :(");
  };

  return (
    <>
      <Head>
        <title>Tasker - Status</title>
      </Head>

      <div>
        {!username && (
          <Alert type="warning" extraClasses="mb-12">
            Please <Link href="/login">log in</Link> to use Tasker
          </Alert>
        )}

        <PageHead extraClasses="mb-6 text-center mt-8">Stats</PageHead>

        {errorMessage && (
          <p className="text-center text-red-500 mb-8">{errorMessage}</p>
        )}

        <div className="overflow-x-auto ">
          <table className="table-auto border-collapse border border-slate-400 w-full sm:w-3/4 mx-auto">
            <thead className="bg-slate-100 text-left">
              <tr>
                <TH>Task</TH>
                <TH>Total Time</TH>
                <TH>Last Updated</TH>
                <TH>Start Date</TH>
                <TH>Delete</TH>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 &&
                tasks.map((task) => (
                  <tr key={task.id}>
                    <TD>{task.task_name}</TD>
                    <TD>{displayTimeString(task.time_in_seconds)}</TD>
                    <TD>{timestampToDayMonthYear(task.__updatedtime__)}</TD>
                    <TD>{timestampToDayMonthYear(task.__createdtime__)}</TD>
                    <TD>
                      <button
                        onClick={() => handleDeleteRow(task.id)}
                        className="bg-red-500 text-white rounded px-3 py-1"
                      >
                        x
                      </button>
                    </TD>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const TH: React.FC<{ children: string }> = ({ children }) => {
  const classes = "border border-slate-300 rounded-top p-4";
  return <th className={classes}>{children}</th>;
};

interface TDProps {
  children: React.ReactNode;
}
const TD = ({ children }: TDProps) => {
  const classes = "border border-slate-300 p-4";
  return <td className={classes}>{children}</td>;
};

export default Stats;
