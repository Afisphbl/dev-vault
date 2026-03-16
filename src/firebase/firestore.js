import { database } from "./firebase";
import { ref, push, set, get, update, remove } from "firebase/database";

//create project
export const createProject = async (project) => {
  const newRef = push(ref(database, "projects"));

  await set(newRef, project);
  return newRef.key;
};

export const getUserProjects = async (userId) => {
  const snapshot = await get(ref(database, `projects`));

  if (!snapshot.exists()) return [];
  const data = snapshot.val();

  return Object.keys(data)
    .map((key) => ({ ...data[key], id: key }))
    .filter((project) => project.userId === userId);
};

export const getProjectById = async (id) => {
  const snapshot = await get(ref(database, `projects/${id}`));
  if (!snapshot.exists()) return null;
  return { ...snapshot.val(), id };
};

export const updateProject = async (id, updates) => {
  await update(ref(database, `projects/${id}`), updates);
};

export const removeProject = async (id) => {
  await remove(ref(database, `projects/${id}`));
};
