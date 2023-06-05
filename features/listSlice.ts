import { ListType } from "@/app/interfaces/Lists";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ListState {
    lists: ListType[],
    current: number
}

const initialState: ListState = {
    lists: [],
    current: 0
} 

const listSlice = createSlice({
    name: "listActions",
    initialState,
    reducers: {
        createList(initialState: ListState, action: PayloadAction<string>) {
            initialState.lists.push({ list_name: action.payload })
        },
        deleteList(initialState: ListState, action: PayloadAction<number>) {},
        changeList(initialState: ListState, action: PayloadAction<number> ) {},
        setLists(initialState: ListState, action: PayloadAction<ListType[]>) {
            initialState.lists = action.payload;
        }
    }
})

export const { createList, setLists, deleteList, changeList } = listSlice.actions;
export default listSlice.reducer;