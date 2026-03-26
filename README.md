# DevVault

DevVault is a portfolio management web application for developers to store, organize, and showcase software projects in one place.

It provides secure authentication, protected routes, project CRUD operations, image upload support, and a clean dashboard experience for managing portfolio entries.

## Live Purpose

DevVault helps developers:

- Keep project information organized and easy to maintain.
- Showcase GitHub repositories and live demos in a structured format.
- Update portfolio content quickly without rebuilding a static site.

## Core Features

- Authentication with Supabase (email/password).
- Social login support (Google and GitHub in login flow).
- Protected routes for authenticated users.
- Project management:
  - Create project entries.
  - View all personal projects.
  - Edit existing projects.
  - Delete projects.
- Project details page with GitHub and live demo links.
- Image upload support for project screenshots.
- Search/filter projects by title or description.
- Lazy-loaded pages with React Suspense fallback.
- Responsive UI with reusable components.

## Tech Stack

- Frontend: React, React Router
- Backend as a Service: Supabase (Auth, Database, Storage)
- UI Icons: Lucide React
- Build Tooling: Create React App (react-scripts)

## Project Structure

```text
dev-vault/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Loading.jsx
│   │   ├── Navbar.jsx
│   │   └── ProjectCard.jsx
│   ├── constant/
│   │   └── supabase.js
│   ├── context/
│   │   └── SupabaseAuthContext.jsx
│   ├── hooks/
│   │   └── useProjects.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AddProject.jsx
│   │   ├── EditProject.jsx
│   │   └── ProjectDetails.jsx
│   ├── supabase/
│   │   ├── client.jsx
│   │   ├── auth.jsx
│   │   ├── projects.jsx
│   │   └── strorage.jsx
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## Application Flow

1. User signs up or logs in.
2. Auth state is tracked through a centralized context provider.
3. Protected routes block unauthorized access.
4. Authenticated users manage portfolio projects from the dashboard.
5. Project data is persisted in Supabase.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- A Supabase project

### Installation

```bash
npm install
```

### Configure Supabase

Update Supabase credentials in:

- `src/constant/supabase.js`

Recommended setup for production:

- Move keys to environment variables.
- Avoid committing live project credentials to source control.

### Run in Development

```bash
npm start
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## Current Highlights

- Modular component structure for easier maintenance.
- Reusable project hook (`useProjects`) for data operations.
- Central auth context for consistent user/session state.
- User-friendly empty states and loading feedback.

## Future Improvements

- Add role-based permissions and profile settings.
- Implement form validation with clearer error handling.
- Add pagination or infinite scroll for large project lists.
- Add tags/skills and advanced filters.
- Add unit and integration test coverage for critical flows.
- Add CI/CD pipeline for automated testing and deployment.
- Add analytics and activity logging.
- Improve accessibility (ARIA, keyboard navigation, contrast audits).
- Add export/share options for public portfolio views.

## Author

**Abduselam Seid**  
Also known as **Afis**

- GitHub: https://github.com/Afisphbl

## License

This project is currently unlicensed.  
Consider adding a license (for example MIT) to define usage rights.
