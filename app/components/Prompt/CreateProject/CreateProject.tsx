"use client";
import { KeyboardEvent, useState } from "react";
import "./CreateProject.css";
import TagList from "../../App/TagList/TagList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Loading/Loading";
import {
  ProjectMutationType,
  TagMutationType,
} from "../../Dashboard/Dashboard";

export default function CreateProject({
  onSubmit,
  closeDialog,
}: {
  closeDialog: Function;
  onSubmit: (variables: ProjectMutationType | TagMutationType) => void;
}) {
  const [name, setName] = useState("");

  function func() {
    console.log("Submitting");
    const id = sessionStorage.getItem("current-project-id");
    onSubmit({
      name: name,
      parent_proj: id,
    } as ProjectMutationType);

    onSubmit({
      tags: selectedTags,
      proj_id: id,
    } as TagMutationType);

    closeDialog();
  }

  const handleKey = (e: KeyboardEvent<HTMLFormElement>) => {
    switch (e.key) {
      case "Escape":
        closeDialog();
      case "Enter":
        (() => {})();
      default:
        (() => {})();
    }
  };

  /* const { data: availableTags } = useQuery({
   *   queryKey: ["tags"],
   *   queryFn: () => axios.get("/api/tags/").then((res) => res.data),
   * }); */
  const availableTags: string[] = [];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <form onKeyDown={(e) => handleKey(e)} id="create-project">
      <div>
        <label htmlFor="inp">Project Name</label>
        <input
          id="inp"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          type="text"
          name="inp"
          autoFocus
        />

        <span>Tags </span>
        {!availableTags ? (
          <Loading />
        ) : (
          <TagList
            availableTags={availableTags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        )}
      </div>
      <button onClick={func} type="button">
        Submit
      </button>
    </form>
  );
}
