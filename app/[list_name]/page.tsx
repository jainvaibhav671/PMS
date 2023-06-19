"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ListType } from "@/app/interfaces/Lists";
import { TaskType } from "@/app/interfaces/Task";
import Header from "@/app/components/App/Header/Header";
import TaskList from "@/app/components/App/TaskList/TaskLists";
import { useEffect } from "react";

export default function Page({
  params
}: {
    params: {
    list_name: string
    }
}) {
  //  Correct the name
  const name = params.list_name.replace("%20", " ");

  //  Query the db for all the lists
  const query = useQuery({
    queryKey: ["lists"],
    queryFn: (): Promise<ListType[]> => axios.get("/api/lists").then(res => res.data)
  });

  //  get the id of the current list and query all its tasks
    const id = query.data?.filter(l => l.list_name === name)[0].id!;
    const task_query = useQuery({
      queryKey: ["tasks", id],
      queryFn: async (): Promise<TaskType[]> => {
        if (id === undefined) { return new Promise(() => []) }
        return axios.get(`/api/tasks/${id}`).then(res => res.data)
      }
    });
    
    useEffect(() => {
      sessionStorage.setItem("currentList", id?.toString())
    }, [id]);
    
    if (query.isLoading) return <h1>Loading</h1>;
    let tasks = (task_query.data) ? task_query.data : [];
  return <>
    <div id="app">
      <Header list_name={name} list_id={id} />
      {(task_query.isLoading) ? <h2>Loading</h2> : <TaskList tasks={tasks} />}
    </div>
  </>
}