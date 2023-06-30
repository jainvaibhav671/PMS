import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Project, Tag } from "./database.types";
import { ProjectMutationType } from "@/app/components/Dashboard/Dashboard";

// Project related functions
export function GetAllProjects() {
  const { data, isLoading } = useQuery({
    queryFn: () => axios.get("/api/lists").then((res) => res.data as Project[]),
    queryKey: ["projects"],
  });
  return { data, isLoading };
}

export function GetProject(project_id: string) {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      axios
        .get(`/api/lists/${project_id}`)
        .then((res) => res.data as Project[]),
    queryKey: ["projects", project_id],
  });
  return { data, isLoading };
}

export function CreateProjectMutation(proj_id: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (variables: ProjectMutationType) =>
      axios
        .post("/api/lists/create", variables)
        .then((res) => res.data)
        .catch(() => {}),
    onSuccess: () =>
      queryClient.invalidateQueries(
        ["projects"].concat(proj_id.length == 0 ? [] : [proj_id])
      ),
  });
  return mutation;
}
export function DeleteProject(proj_id: string) {
  const DeleteProjectMutation = useMutation({
    mutationFn: () => axios.post("/api/lists/delete"),
  });
}

export function GetTags(proj_id: string) {
  const { data: tags, isLoading } = useQuery({
    queryKey: ["tags", proj_id],
    queryFn: () =>
      axios
        .get(`/api/tags/${proj_id}`)
        .then((res) => res.data)
        .catch(() => {}),
  });
  return { tags, isLoading };
}

export function CreateTags(tags: Tag[]) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => axios.post("/api/tags/create", tags),
  });
  return mutation;
}
