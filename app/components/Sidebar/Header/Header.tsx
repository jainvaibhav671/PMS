import Cross from "../../icons/Cross";
import BarsThree from "../../icons/BarsThree";
import "./Header.css";
import Notification from "../../icons/Notification";
import UserCircle from "../../icons/UserCircle";
import SquarePlus from "../../icons/SquarePlus";
import Modal from "../../Modal/Modal";
import CreateProject from "../../Prompt/CreateProject/CreateProject";
import { ProjectMutationType } from "../../Dashboard/Dashboard";
import { useState } from "react";
import { CreateProjectMutation } from "@/lib/queries";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { CurrentProjectAtom } from "@/lib/atoms";

export default function Header({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const current = useAtomValue(CurrentProjectAtom);
  const ProjectMutation = CreateProjectMutation(current);
  const router = useRouter();
  const handleSubmit = (variables: ProjectMutationType) => {
    ProjectMutation.mutate({
      ...variables,
      parent_proj: !current ? null : current,
    });
  };

  const signOut = async () => {
    const supabase = createClientComponentClient();
    console.log("signing out");
    supabase.auth.signOut();
    router.push("/login");
  };

  const CreateProjectModal = () => (
    <Modal title="New Project" open={modalOpen} setOpen={setModalOpen}>
      <CreateProject
        closeDialog={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </Modal>
  );

  return (
    <>
      <div id="header" className="center-x">
        <div className="center-x">
          <button className="svg-button" onClick={() => setOpen(!open)}>
            {open ? <Cross /> : <BarsThree />}
          </button>
          <span className="logo">PMS</span>
        </div>
        <div className="center-x">
          <button
            onClick={() => setModalOpen(!modalOpen)}
            className="center-x primary-button"
          >
            <SquarePlus /> New Project
          </button>
          <CreateProjectModal />
          <button className="svg-button">
            <Notification />
          </button>
          <button onClick={signOut} className="svg-button">
            <UserCircle />
          </button>
        </div>
      </div>
    </>
  );
}
