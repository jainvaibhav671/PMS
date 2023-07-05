import { CurrentProjectAtom } from "@/lib/atoms";
import { UpdateProject } from "@/lib/queries";
import { useAtomValue } from "jotai";
import "./DatePicker.css";

export function DatePicker() {
  const current = useAtomValue(CurrentProjectAtom);
  const mutation = UpdateProject(current);
  function handleSubmit(formData: FormData) {
    const deadline = formData.get("deadline");
    if (deadline) {
      console.log(deadline);
      mutation.mutate({
        proj_id: current,
        data: { deadline: deadline as string },
      });
    }
  }

  return (
    <form id="date-picker" action={handleSubmit}>
      <input type="datetime-local" name="deadline" />
      <div>
        <button className="primary-button">Submit</button>
      </div>
    </form>
  );
}
