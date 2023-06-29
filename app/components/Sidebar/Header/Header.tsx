import Cross from "../../icons/Cross";
import BarsThree from "../../icons/BarsThree";
import "./Header.css";
import Notification from "../../icons/Notification";
import UserCircle from "../../icons/UserCircle";
import SquarePlus from "../../icons/SquarePlus";
import Modal from "../../Modal/Modal";
import CreateProject from "../../Prompt/CreateProject/CreateProject";
import { ProjectContext, ProjectMutationType } from "../../Dashboard/Dashboard";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";

export default function Header({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const current = useContext(ProjectContext) as string;
  const queryClient = useQueryClient();
  const ProjectMutation = useMutation({
    mutationFn: (variables: ProjectMutationType) =>
      axios
        .post("/api/lists/create", variables)
        .then((res) => res.data)
        .catch(() => {}),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["lists"] }),
  });
  const handleSubmit = (variables: ProjectMutationType) => {
    console.log("Mutating", variables);
    ProjectMutation.mutate({
      ...variables,
      parent_proj: current?.length == 0 ? null : current,
    });
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
            className="center-x secondary-button"
          >
            <SquarePlus /> New Project
          </button>
          <CreateProjectModal />
          <button className="svg-button">
            <Notification />
          </button>
          <button className="svg-button">
            <UserCircle />
          </button>
        </div>
      </div>
    </>
  );
}
