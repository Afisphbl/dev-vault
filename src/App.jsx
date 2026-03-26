import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  SupabaseAuthContextProvider,
  useSupabaseAuthContext,
} from "./context/SupabaseAuthContext";
import Loading from "./components/Loading";
import "./App.css";

// Layout & Components
const Navbar = lazy(() => import("./components/Navbar"));

// Pages
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddProject = lazy(() => import("./pages/AddProject"));
const EditProject = lazy(() => import("./pages/EditProject"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useSupabaseAuthContext();

  if (isLoading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <SupabaseAuthContextProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/add-project"
                  element={
                    <ProtectedRoute>
                      <AddProject />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit-project/:id"
                  element={
                    <ProtectedRoute>
                      <EditProject />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/project/:id"
                  element={
                    <ProtectedRoute>
                      <ProjectDetails />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </Suspense>
      </Router>
    </SupabaseAuthContextProvider>
  );
}

export default App;
