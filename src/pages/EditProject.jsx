import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import { Upload, ArrowLeft, Save } from "lucide-react";
import "./ProjectForm.css";

const EditProject = () => {
  const { id } = useParams();
  const { getProject, editProject } = useProjects();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    github: "",
    demo: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProject = useCallback(async () => {
    try {
      const project = await getProject(id);

      setFormData({
        title: project.title,
        description: project.description,
        github: project.github || "",
        demo: project.demo || "",
        image: project.image || "",
      });
    } catch (error) {
      console.log(error);

      setError("Project not found");
    }
  }, []);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      editProject(id, formData);
      setLoading(false);
      navigate("/dashboard");
    }, 600);
  };

  if (error) {
    return (
      <div className="container form-page">
        <div className="empty-state">
          <h3>{error}</h3>
          <Link to="/dashboard" className="btn btn-primary mt-4">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container form-page">
      <div className="form-header">
        <Link to="/dashboard" className="btn btn-secondary back-btn">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
        <h1 className="form-title">Edit Project</h1>
        <p className="form-subtitle">Update your portfolio project details.</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Basic Details</h3>
            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label" htmlFor="title">
                  Project Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Links</h3>
            <div className="form-row">
              <div className="form-group flex-1">
                <label className="form-label" htmlFor="github">
                  GitHub Repository Link
                </label>
                <input
                  id="github"
                  name="github"
                  type="url"
                  className="form-input"
                  value={formData.github}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group flex-1">
                <label className="form-label" htmlFor="demo">
                  Live Demo Link
                </label>
                <input
                  id="demo"
                  name="demo"
                  type="url"
                  className="form-input"
                  value={formData.demo}
                  onChange={handleChange}
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
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <label htmlFor="image-upload" className="upload-placeholder">
                  <Upload size={32} className="upload-icon" />
                  <span className="upload-text">
                    Click to upload project screenshot
                  </span>
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
            <Link to="/dashboard" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary"
            >
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
