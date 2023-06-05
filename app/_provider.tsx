"use client";
import { Provider } from "react-redux";
import Sidebar from "./components/Sidebar";
import { store } from "./utils/store";

export default function Providers({ children }:{ children: React.ReactNode }) {
    return (
        <>
        <Provider store={store}>
            <Sidebar />
            {children}
        </Provider>
        </>
    )
}