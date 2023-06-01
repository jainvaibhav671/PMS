import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export async function getLists() {
//     console.log("Getting list")
//     return [1, 2, 3, 4];
// }

// export async function getTasks({
//     list_id
// }: {
//     list_id: number
// }) {
//     const data: {
//         [key: number]: Array<string>
//     } = {
//         1: ["Task 1", "Task2", "Task3"],
//         2: ["Task 4", "Task5", "Task6"],
//         3: ["Task 7", "Task8", "Task9"],
//         4: ["Task 10", "Task11", "Task12"],
//     }

//     return data[list_id];
// }

export async function getLists() {
  let { data: lists, error } = await supabase
    .from('Lists').select("*");

  if (error) {
    console.log(error);
  }

  return lists
}

export async function addList({
  list_name
}: {
  list_name: string
}) {

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

export async function getTasks({
  list_id
}: {
  list_id: number
}) {
  let { data: tasks, error } = await supabase
    .from('Tasks')
    .select("*")
    .eq("list_id", list_id);

  if (error) {
    console.log(error);
  }

  return tasks;
}

export async function createTask({
  task
}) {
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

export default supabase;