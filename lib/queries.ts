import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Project, ProjectInfo, Tag } from "./database.types";
import { ProjectMutationType } from "@/app/components/Sidebar/Header/Header";

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

export function GetProjectInfo(project_id: string) {
  const { data, isLoading } = useQuery({
    queryFn: (): Promise<ProjectInfo> =>
      axios.get(`/api/lists/info/${project_id}`).then((res) => res.data),
    queryKey: ["project", project_id],
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
  const queryClient = useQueryClient();
  const DeleteProjectMutation = useMutation({
    mutationFn: () => axios.post(`/api/lists/delete/${proj_id}`),
    onSuccess: () => queryClient.invalidateQueries(["projects"]),
  });
  return DeleteProjectMutation;
}

export function UpdateProject(proj_id: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (variables: { proj_id: string; data: Partial<Project> }) =>
      axios.put("/api/lists/update", variables),
    onSuccess: () => queryClient.invalidateQueries(["project", proj_id]),
  });
  return mutation;
}

export function GetTags(proj_id: string) {
  const { data: tagsList, isLoading } = useQuery({
    queryKey: ["tags", proj_id],
    queryFn: (): Promise<string[]> =>
      axios
        .get(`/api/tags/${proj_id}`)
        .then((res) => res.data)
        .catch(() => {}),
  });

  return { tagsList, isLoading };
}

export function CreateTags() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (variables: {
      tags: string[];
      project: string;
    }): Promise<number[]> => axios.post("/api/tags/create", variables),
    onSuccess: (data, variables) =>
      queryClient.invalidateQueries(["project", variables.project]),
  });
  return mutation;
}

export function AssignUser(project_id: string) {
  const { data, isLoading } = useQuery({
    queryFn: () => axios.post(`/api/users/${project_id}`),
  });
  return { data, isLoading };
}
