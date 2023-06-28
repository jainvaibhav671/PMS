import Cross from "../../icons/Cross";
import BarsThree from "../../icons/BarsThree";
import "./Header.css";
import Notification from "../../icons/Notification";
import UserCircle from "../../icons/UserCircle";
import SquarePlus from "../../icons/SquarePlus";

export default function Header({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <div id="header" className="center-x">
        <div className="center-x">
          <button onClick={() => setOpen(!open)}>
            {open ? <Cross /> : <BarsThree />}
          </button>
          <span className="logo">PMS</span>
        </div>
        <div className="center-x">
          <button className="center-x">
            <SquarePlus /> New Project
          </button>
          <button>
            <Notification />
          </button>
          <button>
            <UserCircle />
          </button>
        </div>
      </div>
    </>
  );
}
