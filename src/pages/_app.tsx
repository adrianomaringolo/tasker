import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";
import { UserContext } from "contexts/UserContext";
import { useState } from "react";
import { useUser } from "utils/hooks/useUser";
import { useTasks } from "utils/hooks/useTasks";
import { TasksContext } from "contexts/TasksContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { username, setUsername } = useUser();
  const { tasks, setTasks, getTasks } = useTasks(username);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <TasksContext.Provider value={{ tasks, setTasks, getTasks }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TasksContext.Provider>
    </UserContext.Provider>
  );
}

export default MyApp;
