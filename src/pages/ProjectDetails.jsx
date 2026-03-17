import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { ArrowLeft, ExternalLink, Github, Pencil, Trash2, Calendar } from 'lucide-react';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const { getProject, deleteProject } = useProjects();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const foundProject = await getProject(id);
        setProject(foundProject || null);
      } catch (error) {
        console.error("Failed to load project:", error.message);
        setProject(null);
      }
    };

    loadProject();
  }, [id, getProject]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
      navigate('/dashboard');
    }
  };

  if (!project) {
    return (
      <div className="container">
        <div className="empty-state mt-4">
          <h3>Project not found</h3>
          <p>The project you're looking for doesn't exist or has been deleted.</p>
          <Link to="/dashboard" className="btn btn-primary mt-4">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container details-page">
      <div className="details-header">
        <Link to="/dashboard" className="btn btn-secondary back-btn">
          <ArrowLeft size={18} />
          Back to Projects
        </Link>
        
        <div className="details-actions">
          <Link to={`/edit-project/${project.id}`} className="btn btn-secondary">
            <Pencil size={18} />
            Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      <div className="details-content">
        <div className="details-main">
          {project.image ? (
            <div className="details-hero">
              <img src={project.image} alt={project.title} />
            </div>
          ) : (
            <div className="details-hero-placeholder">
              <span>No image provided for this project</span>
            </div>
          )}

          <div className="details-body">
             <h1 className="details-title">{project.title}</h1>
             <div className="details-meta">
                <span className="meta-item">
                  <Calendar size={16} />
                   Added Recently
                </span>
             </div>

             <div className="details-description">
               <h3>About this project</h3>
               <p>{project.description}</p>
             </div>
          </div>
        </div>

        <div className="details-sidebar">
          <div className="sidebar-card">
            <h3>Project Links</h3>
            
            <div className="link-list">
              {project.github ? (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="sidebar-link github-link">
                  <Github size={20} />
                  <span>View Source Code</span>
                  <ExternalLink size={14} className="ml-auto" />
                </a>
              ) : (
                <div className="link-placeholder">No GitHub link provided</div>
              )}

              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="sidebar-link demo-link">
                  <ExternalLink size={20} />
                  <span>Visit Live Site</span>
                </a>
              ) : (
                <div className="link-placeholder mt-4">No live demo available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
