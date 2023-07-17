import { useState } from "react"
import "./style.css"
import { CreateProjectType } from "@/lib/database.types";
import { useAtomValue } from "jotai";
import { CurrentProjectAtom } from "@/lib/atoms";
import Badge from "@/app/components/Badge/Badge";

interface CreateProjectInterface {
    closeDialog: () => void,
    onSubmit: (data: Omit<CreateProjectType, "created_by">) => void
}

export function CreateProject({ closeDialog, onSubmit }: CreateProjectInterface) {

    const current = useAtomValue(CurrentProjectAtom);

    function handleSubmit(formData: FormData) {

        const [date, time] = (formData.get("deadline") as string).split(" ")
        const [day,month,year] = date.split("/").map((t) => parseInt(t))
        const [hour,minute] = time.split(":").map((t) => parseInt(t))

        console.log(day,month,year,hour,minute)
        const deadline = new Date(year,month-1,day,hour,minute)
        console.log(deadline)
        const data: Omit<CreateProjectType, "created_by"> = {
            name: formData.get("proj_name") as string,
            deadline: deadline.toISOString(),
            isCompleted: false,
            isSubproject: current.length != 0,
            parent: (current.length == 0) ? null : current,
            priority: formData.get("priority") as string
        }

        onSubmit(data);
        closeDialog();
    }

    return (
        <>
        <form action={handleSubmit} id="cp-form">
            <div className="row">
                <div className="input-group">
                    <label htmlFor="proj_name">Project Name</label>
                    <input type="text" name="proj_name" />
                </div>
            </div>
            
            <div className="row">
                <div className="input-group">
                    <label htmlFor="priority">Priority</label>
                    <select name="priority" id="">
                        <option selected value="null">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div className="input-group deadline">
                    <label htmlFor="deadline">Set Deadline</label>
                    <input type="text" name="deadline" />
                </div>
            </div>

            <div className="row"></div>
            <div>
                <button type="button" className="secondary-button">Cancel</button>
                <button type="submit" className="primary-button">Submit</button>
            </div>
        </form>
        </>
    )
}