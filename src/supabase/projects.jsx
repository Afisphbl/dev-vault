import { supabase } from "./client";

export const createProject = async (project) => {
  const { data, error } = await supabase
    .from("devProjects")
    .insert([project])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getUserProjects = async (userId) => {
  const { data, error } = await supabase
    .from("devProjects")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data || [];
};

export const getProjectById = async (id) => {
  const { data, error } = await supabase
    .from("devProjects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const updateProject = async (id, updates) => {
  const { data, error } = await supabase
    .from("devProjects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeProject = async (id) => {
  const { data, error } = await supabase
    .from("devProjects")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return data;
};
