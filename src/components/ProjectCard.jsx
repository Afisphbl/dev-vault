import { Link } from 'react-router-dom';
import { ExternalLink, Github, Pencil, Trash2 } from 'lucide-react';
import './ProjectCard.css';

const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="card project-card">
      <div className="project-image-container">
        {project.image ? (
          <img src={project.image} alt={project.title} className="project-image" />
        ) : (
          <div className="project-image-placeholder">No Image Available</div>
        )}
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
              <Github size={16} />
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
      
      <div className="project-actions">
        <Link to={`/edit-project/${project.id}`} className="btn btn-secondary btn-sm action-btn">
          <Pencil size={14} />
          Edit
        </Link>
        <button onClick={() => onDelete(project.id)} className="btn btn-danger btn-sm action-btn">
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
