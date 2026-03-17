import { supabase } from "./client";

export const uploadFile = async (file, userId) => {
  if (!file) {
    throw new Error("No file selected for upload.");
  }

  if (!userId) {
    throw new Error("You must be logged in to upload files.");
  }

  const safeName = file.name.replace(/\s+/g, "_");
  const filename = `${userId}/${Date.now()}_${safeName}`;
  const { error } = await supabase.storage
    .from("devProjects")
    .upload(filename, file);

  if (error) {
    console.error("File upload error:", error.message);

    if (/row-level security policy/i.test(error.message)) {
      throw new Error(
        "Upload blocked by Supabase Storage RLS policy. Add an INSERT policy on storage.objects for bucket 'devProjects' that allows authenticated users to upload to paths beginning with their auth.uid().",
      );
    }

    throw error;
  }

  const { data } = supabase.storage.from("devProjects").getPublicUrl(filename);
  return data.publicUrl;
};
