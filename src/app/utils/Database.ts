// import supbase from '@supabase/supabase-js'

export async function getLists() {
    console.log("Getting list")
    return [1, 2, 3, 4];
}

export async function getTasks({
    list_id
}: {
    list_id: number
}) {
    const data: {
        [key: number]: Array<string>
    } = {
        1: ["Task 1", "Task2", "Task3"],
        2: ["Task 4", "Task5", "Task6"],
        3: ["Task 7", "Task8", "Task9"],
        4: ["Task 10", "Task11", "Task12"],
    }

    return data[list_id];
}
