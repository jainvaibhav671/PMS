import "./Header.css";
import Modal from "../../Modal/Modal";
// import CreateProject from "../../Prompt/CreateProject/CreateProject";
import { CreateProject } from "@/components/form/CreateProject/CreateProject"
import { useState } from "react";
import { CreateProjectMutation } from "@/lib/queries";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { CurrentProjectAtom } from "@/lib/atoms";
import {
  BarsThree,
  Cross,
  SquarePlus,
  UserCircle,
  Notification,
} from "../../icons/icons";

export type ProjectMutationType = {
  name: string;
  parent: string | null;
};

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
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSubmit = (name: string) => {
    ProjectMutation.mutate({
      name: name,
      parent: !current ? null : current,
    });
  };

  const signOut = async () => {
    console.log("signing out");
    await supabase.auth.signOut();
    router.refresh();
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
