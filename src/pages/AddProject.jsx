import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { FolderGit2, Upload, ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProjectForm.css';

const AddProject = () => {
  const { addProject } = useProjects();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github: '',
    demo: '',
    image: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    // Basic mock image handling, grabbing first local file
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      addProject(formData);
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="container form-page">
       <div className="form-header">
        <Link to="/dashboard" className="btn btn-secondary back-btn">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
        <h1 className="form-title">Add New Project</h1>
        <p className="form-subtitle">Fill in the details below to add a project to your portfolio.</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
           <div className="form-section">
             <h3>Basic Details</h3>
             <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label" htmlFor="title">Project Title *</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. React Task Manager"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="What does this project do? What technologies did you use?"
                rows={4}
              />
            </div>
           </div>

           <div className="form-section">
             <h3>Links</h3>
             <div className="form-row">
               <div className="form-group flex-1">
                 <label className="form-label" htmlFor="github">GitHub Repository Link</label>
                 <input
                   id="github"
                   name="github"
                   type="url"
                   className="form-input"
                   value={formData.github}
                   onChange={handleChange}
                   placeholder="https://github.com/..."
                 />
               </div>
               <div className="form-group flex-1">
                 <label className="form-label" htmlFor="demo">Live Demo Link</label>
                 <input
                   id="demo"
                   name="demo"
                   type="url"
                   className="form-input"
                   value={formData.demo}
                   onChange={handleChange}
                   placeholder="https://..."
                 />
               </div>
             </div>
           </div>

           <div className="form-section">
             <h3>Project Image</h3>
             <div className="image-upload-area">
                {formData.image ? (
                  <div className="image-preview">
                     <img src={formData.image} alt="Project Preview" />
                     <button 
                       type="button"
                       className="btn btn-secondary btn-sm change-image-btn"
                       onClick={() => document.getElementById('image-upload').click()}
                     >
                       Change Image
                     </button>
                  </div>
                ) : (
                  <label htmlFor="image-upload" className="upload-placeholder">
                    <Upload size={32} className="upload-icon" />
                    <span className="upload-text">Click to upload project screenshot</span>
                    <span className="upload-hint">PNG, JPG up to 5MB</span>
                  </label>
                )}
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden-input"
                  onChange={handleImageChange}
                />
             </div>
           </div>

           <div className="form-actions border-top">
              <Link to="/dashboard" className="btn btn-secondary">Cancel</Link>
              <button disabled={loading} type="submit" className="btn btn-primary">
                {loading ? 'Saving...' : (
                  <>
                    <Save size={18} />
                    Save Project
                  </>
                )}
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
