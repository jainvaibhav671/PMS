import { Project } from "@/lib/database.types";
import "./CardOptions.css";
import PencilSquare from "../../icons/PencilSquare";
import Trash from "../../icons/Trash";
export default function CardOptions({ data }: { data: Project }) {
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
          <button className="primary-button-red">
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
