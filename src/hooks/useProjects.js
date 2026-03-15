import { useState } from 'react';

const initialProjects = [
  {
    id: '1',
    title: 'Movie App',
    description: 'Search movies using API',
    github: 'https://github.com/example/movie-app',
    demo: 'https://movie-app-demo.example.com',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Task Manager',
    description: 'A simple todo app with drag and drop',
    github: 'https://github.com/example/task-manager',
    demo: 'https://task-manager.example.com',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2672&auto=format&fit=crop'
  }
];

export const useProjects = () => {
  const [projects, setProjects] = useState(initialProjects);

  const addProject = (project) => {
    setProjects(prev => [...prev, { ...project, id: Date.now().toString() }]);
  };

  const editProject = (id, updatedProject) => {
    setProjects(prev =>
      prev.map(project => (project.id === id ? { ...project, ...updatedProject } : project))
    );
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const getProject = (id) => {
    return projects.find(project => project.id === id);
  };

  return {
    projects,
    addProject,
    editProject,
    deleteProject,
    getProject
  };
};
