import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Project } from "./database.types";
import { ProjectMutationType } from "@/app/components/Dashboard/Dashboard";

export function GetAllProjects() {
  const { data, isLoading } = useQuery({
    queryFn: () => axios.get("/api/lists").then((res) => res.data as Project[]),
    queryKey: ["projects"],
  });
  return { data, isLoading };
}

export function GetProject({ project_id }: { project_id: string }) {
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
        ["lists"].concat(proj_id.length == 0 ? [] : [proj_id])
      ),
  });
  return mutation;
}
