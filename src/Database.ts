// Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getLists() {
  let { data: lists, error } = await supabase
    .from('Lists').select("*");

  if (error) {
    console.log(error);
  }

  return lists
}

export async function addList({ list_name }) {

  const { data, error } = await supabase
  .from('Lists')
  .insert([
      { list_name: `${list_name}` },
  ])
  .select()

  if (error) {
      console.log(error);
  }

  return data;
}

export async function getTasks({ list_id }) {
  let { data: tasks, error } = await supabase
    .from('Tasks')
    .select("*")
    .eq("list_id", list_id);

  if (error) {
    console.log(error);
  }

  // console.log("Tasks: ", tasks);
  return tasks;
}

export async function createTask({ task }) {
  // console.log("Task: ", task)
  const { data, error } = await supabase
  .from('Tasks')
  .insert([task])
  .select()

  if (error) {
      console.log(error);
  }
  // console.log("Task: ", data);
  return data[0];
}

export async function deleteTask({ task_id }) {

  const { error } = await supabase
    .from('Tasks')
    .delete()
    .eq('id', task_id);

  if (error) {
    console.log(error);
  } else {
    console.log("Deleted", task_id);
  }

}

export default supabase;