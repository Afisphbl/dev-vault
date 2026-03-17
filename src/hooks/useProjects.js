import { useState, useEffect, useCallback } from "react";
import { useSupabaseAuthContext } from "../context/SupabaseAuthContext";
import {
  createProject,
  getProjectById,
  getUserProjects,
  updateProject,
  removeProject,
} from "../supabase/projects";

export const useProjects = () => {
  const { currentUser } = useSupabaseAuthContext();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadProjects = useCallback(async () => {
    if (!currentUser) {
      setProjects([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await getUserProjects(currentUser.id);
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error.message);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const addProject = async (project) => {
    if (!currentUser) return;

    const newProject = {
      ...project,
      user_id: currentUser.id,
    };

    await createProject(newProject);
    await loadProjects();
  };

  const editProject = async (id, updatedProject) => {
    await updateProject(id, updatedProject);
    await loadProjects();
  };

  const getProject = async (id) => {
    return getProjectById(id);
  };

  const deleteProject = async (id) => {
    await removeProject(id);
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  return {
    projects,
    isLoading,
    addProject,
    editProject,
    getProject,
    deleteProject,
  };
};
