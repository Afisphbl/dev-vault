import { supabase } from "./client";

export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log(data, error, email, password);
  return { data, error };
};

export const logIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const logOut = async () => {
  return await supabase.auth.signOut();
};

export const loginWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
  });
};

export const loginWithGitHub = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: "github",
  });
};
