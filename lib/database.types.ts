import { Database, DatabaseAuth } from "./supabase.types"
export type { DatabaseAuth, Database };

export type User = DatabaseAuth["auth"]["Tables"]["users"];

export type Project = Database["public"]["Tables"]["Project"]["Row"];
export type Tag = Database["public"]["Tables"]["Tag"]["Row"];
export type ProjectTags = Database["public"]["Tables"]["project_tags"]["Row"];

export type CreateProject = Omit<
  Database["public"]["Tables"]["Project"]["Row"],
  "created_at" | "last_modified_at" | "id"
>;

export type CreateTag = Pick<Tag, "name">;
export type LinkProjectTag = Pick<ProjectTags, "project_id" | "tag_id">;
export type ProjectInfo = Project & {
  project_tags: {
      Tag: Tag;
    }[];
};
