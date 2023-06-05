import { createClient } from '@supabase/supabase-js';
import { TaskType } from '@/app/interfaces/Task';

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabase_api_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(
  supabase_url,
  supabase_api_key
);

export async function getLists() {
  let { data: lists, error } = await supabase
    .from('Lists').select("*");

  if (error) {
    console.log(error);
  }

  return lists
}

export async function getListID({ list_name }: { list_name: string }) {
  let { data: list_id , error } = await supabase.from("Lists").select("id").eq("list_name", list_name);

  if (error || !list_id) {
    return undefined;
  }

  const id = list_id[0];
  console.log("id", id)
  return id;
}

export async function addList({ list_name }: { list_name: string }) {
  const { data, error } = await supabase
  .from('Lists')
  .insert([{ list_name: list_name }])
  .select()

  if (error) {
      console.log(error);
      return;
  }

  return data;
}

export async function getTasks({ list_id }: { list_id: number }) {
  let { data: tasks, error } = await supabase
    .from('Tasks')
    .select("*")
    .eq("list_id", list_id);

  if (error) {
    console.log(error);
  }

  return tasks;
}

export async function createTask({ task }: { task: TaskType }) {
  const { data, error } = await supabase
  .from('Tasks')
  .insert([task])
  .select()

  if (error) {
      console.log(error);
  }
  if (data === null || data === undefined) {
    return {};
  }
  return data[0];
}

export async function deleteTask(task_id: number) {

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

export async function deleteList(list_id: number) {
  const { error } = await supabase
    .from('Lists')
    .delete()
    .eq('id', list_id);

  if (error) {
    console.log(error);
  } else {
    console.log("Deleted", list_id);
  }
}
