import { createClient } from '@supabase/supabase-js';
import { TaskType } from '@/app/interfaces/Task';
import { ListType } from '@/app/interfaces/Lists';

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabase_api_key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const options = {
  auth: {
    persistSession: false
  }
}

const supabase = createClient(
  supabase_url,
  supabase_api_key,
  options
);
export default supabase;

export async function getLists() {
  let { data, error } = await supabase.from('Lists').select("*");

  if (error) {
    console.log("ERROR FROM GETLIST")
    // console.log(error);
    return;
  }
  return data as ListType[];
}

export async function getListID({ list_name }: { list_name: string }) {
  let { data: list_id , error } = await supabase.from("Lists").select("id").eq("list_name", list_name);

  if (error || !list_id) {
    return null;
  }

  const id = list_id[0];
  console.log("id", id)
  return id;
}

export async function addList({ list_name }: { list_name: string }) {
  const { error } = await supabase
  .from('Lists')
  .insert([{ list_name: list_name }])

  if (error) {
      console.log("Error from addList", error);
  }
}

export async function getTasks({ list_id }: { list_id: number }) {
  let { data: tasks, error } = await supabase
    .from('Tasks')
    .select("*")
    .eq("list_id", list_id);

  if (error) {
    console.log(error);
    return [];
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
      return;
  }
}

export async function toggleTask({
  task_id,
  isCompleted
}: {
  task_id: number,
  isCompleted: boolean
}) {

  const { data, error } = await supabase
  .from('Tasks')
  .update({ isCompleted: isCompleted })
  .eq("id", task_id)

  if (error) {
      console.log(error);
      return null;
  }
  console.log("toggled")
  return data;
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
