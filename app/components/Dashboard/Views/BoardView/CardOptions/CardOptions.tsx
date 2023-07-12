import { Project } from "@/lib/database.types";
import "./CardOptions.css";
import { PencilSquare, Trash } from "@/app/components/icons/icons";
import { useAtomValue } from "jotai";
import { CurrentProjectAtom } from "@/lib/atoms";
import { DeleteProject } from "@/lib/queries";
export default function CardOptions({ data }: { data: Project }) {
  const current = useAtomValue(CurrentProjectAtom);
  const mutation = DeleteProject(current);

  function handleDelete() {
    mutation.mutate({ proj_id: data.id });
  }

  return (
    <div id="card-options">
      <div id="top">
        <input
          type="text"
          id="proj-name"
          name="proj-name"
          value={data.name}
          onChange={() => {}}
        />
        <div id="button-group">
          <button onClick={handleDelete} className="primary-button-red">
            <Trash />
          </button>
          <button className="primary-button">
            <PencilSquare />
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}
