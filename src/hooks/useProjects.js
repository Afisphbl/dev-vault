import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import {
  createProject,
  getUserProjects,
  updateProject,
  removeProject,
  getProjectById,
} from "../firebase/firestore";

const initialProjects = [
  {
    id: "1",
    title: "Movie App",
    description: "Search movies using API",
    github: "https://github.com/example/movie-app",
    demo: "https://movie-app-demo.example.com",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Task Manager",
    description: "A simple todo app with drag and drop",
    github: "https://github.com/example/task-manager",
    demo: "https://task-manager.example.com",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2672&auto=format&fit=crop",
  },
];

export const useProjects = () => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadProjects = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    const data = await getUserProjects(currentUser.uid);
    setProjects(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const addProject = async (project) => {
    const newProject = {
      ...project,
      userId: currentUser.uid,
      createdAt: new Date().toISOString(),
    };

    await createProject(newProject);
    loadProjects();
  };

  const editProject = async (id, updatedProject) => {
    await updateProject(id, updatedProject);
    loadProjects();
  };

  const deleteProject = async (id) => {
    await removeProject(id);
    loadProjects();
  };

  const getProject = useCallback(async (id) => {
    return await getProjectById(id);
  }, []);

  return {
    projects,
    isLoading,
    addProject,
    editProject,
    deleteProject,
    getProject,
  };
};
