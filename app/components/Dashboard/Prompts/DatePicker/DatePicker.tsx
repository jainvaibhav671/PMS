import { CurrentProjectAtom } from "@/lib/atoms";
import { UpdateProject } from "@/lib/queries";
import { useAtomValue } from "jotai";
import "./DatePicker.css";

export function DatePicker() {
  const current = useAtomValue(CurrentProjectAtom);
  function handleSubmit(formData: FormData) {
    const deadline = formData.get("deadline");
    if (deadline) {
      UpdateProject(current, {
        deadline: deadline as string,
      });
    }
  }

  return (
    <form id="date-picker" action={handleSubmit}>
      <input type="datetime-local" name="deadline-date" />
      <div>
        <button className="primary-button">Submit</button>
      </div>
    </form>
  );
}
