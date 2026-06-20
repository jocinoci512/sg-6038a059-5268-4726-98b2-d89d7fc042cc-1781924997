import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type MediaItem = Tables<"media_library">;

export interface MediaUploadInput {
  file_name: string;
  file_url: string;
  file_type: string;
  file_size?: number;
  alt_text?: string;
  usage_context?: string;
}

// Get all media items
export async function getAllMedia() {
  const { data, error } = await supabase
    .from("media_library")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching media:", error);
    return null;
  }

  return data;
}

// Get media by type
export async function getMediaByType(fileType: string) {
  const { data, error } = await supabase
    .from("media_library")
    .select("*")
    .eq("file_type", fileType)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching media by type:", error);
    return null;
  }

  return data;
}

// Get single media item
export async function getMediaById(id: string) {
  const { data, error } = await supabase
    .from("media_library")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching media item:", error);
    return null;
  }

  return data;
}

// Upload file to Supabase Storage and create media record
export async function uploadMedia(
  file: File,
  altText?: string,
  usageContext?: string
) {
  try {
    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    
    // Upload file to Supabase Storage
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `media/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("media")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return { success: false, error: uploadError.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("media")
      .getPublicUrl(filePath);

    // Create media record in database
    const mediaInput: MediaUploadInput = {
      file_name: file.name,
      file_url: publicUrl,
      file_type: file.type,
      file_size: file.size,
      alt_text: altText,
      usage_context: usageContext,
    };

    const { data, error } = await supabase
      .from("media_library")
      .insert([{ ...mediaInput, uploaded_by: user?.id }])
      .select()
      .single();

    if (error) {
      console.error("Error creating media record:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Error in uploadMedia:", err);
    return { success: false, error: "Failed to upload media" };
  }
}

// Update media metadata
export async function updateMedia(id: string, updates: Partial<MediaUploadInput>) {
  const { data, error } = await supabase
    .from("media_library")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating media:", error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

// Delete media (file and record)
export async function deleteMedia(id: string) {
  try {
    // Get media record
    const media = await getMediaById(id);
    if (!media) {
      return { success: false, error: "Media not found" };
    }

    // Extract file path from URL
    const urlParts = media.file_url.split("/media/");
    if (urlParts.length > 1) {
      const filePath = `media/${urlParts[1]}`;

      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from("media")
        .remove([filePath]);

      if (storageError) {
        console.error("Error deleting file from storage:", storageError);
      }
    }

    // Delete database record
    const { error } = await supabase
      .from("media_library")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting media record:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Error in deleteMedia:", err);
    return { success: false, error: "Failed to delete media" };
  }
}