import { useState } from "react";
import { useSupabaseAuthContext } from "../context/SupabaseAuthContext";
import { useProjects } from "../hooks/useProjects";
import ProjectCard from "../components/ProjectCard";
import { FolderGit2, PlusCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import "./Dashboard.css";

const Dashboard = () => {
  const { isLoading: authLoading } = useSupabaseAuthContext();
  const { projects, deleteProject, isLoading: projectsLoading } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const isLoading = authLoading || projectsLoading;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">My Projects</h1>
          <p className="dashboard-subtitle">
            Manage and showcase your portfolio work
          </p>
        </div>

        <Link to="/add-project" className="btn btn-primary d-none-mobile">
          <PlusCircle size={18} />
          Add New Project
        </Link>
      </div>

      <div className="dashboard-controls">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input form-input"
          />
        </div>
      </div>
      {isLoading && <Loading />}
      {!isLoading && projects.length === 0 ? (
        <div className="empty-state">
          <FolderGit2 size={48} />
          <h3>No projects yet</h3>
          <p>
            Get started by adding your first portfolio project to showcase your
            work.
          </p>
          <Link to="/add-project" className="btn btn-primary mt-4">
            <PlusCircle size={18} />
            Add Project
          </Link>
        </div>
      ) : !isLoading && filteredProjects.length === 0 ? (
        <div className="empty-state">
          <Search size={48} />
          <h3>No matches found</h3>
          <p>We couldn't find any projects matching "{searchTerm}".</p>
          <button
            onClick={() => setSearchTerm("")}
            className="btn btn-secondary mt-4"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="project-grid">
          {!isLoading &&
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
