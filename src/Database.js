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

export async function createTask({ task_name }) {
    const { data, error } = await supabase
    .from('Lists')
    .insert([
        { task_name: `${task_name}` },
    ])
    .select()

    if (error) {
        console.log(error);
    }

  return data;
}

export default supabase;