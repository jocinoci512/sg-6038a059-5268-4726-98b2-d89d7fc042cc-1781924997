import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";

/**
 * API endpoint to create the first admin user
 * This should be protected and only used during initial setup
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password, fullName, setupKey } = req.body;

    // Basic validation
    if (!email || !password || !fullName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Setup key protection (change this to a secure value)
    // In production, this should be an environment variable
    const SETUP_KEY = process.env.ADMIN_SETUP_KEY || "cipherstracer-admin-setup-2026";
    
    if (setupKey !== SETUP_KEY) {
      return res.status(403).json({ error: "Invalid setup key" });
    }

    // Check if admin users already exist
    const { count } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");

    if (count && count > 0) {
      return res.status(400).json({ 
        error: "Admin user already exists. Use password reset if needed." 
      });
    }

    // Create auth user via Supabase Admin API
    // Note: In production, this should use service role key server-side
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });

    if (authError) {
      throw authError;
    }

    if (!authData.user) {
      throw new Error("Failed to create user");
    }

    // Create admin profile
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        role: "admin",
        is_active: true
      });

    if (profileError) {
      throw profileError;
    }

    return res.status(200).json({
      success: true,
      message: "Admin user created successfully",
      email: email
    });

  } catch (error: any) {
    console.error("Create admin error:", error);
    return res.status(500).json({
      error: error.message || "Failed to create admin user"
    });
  }
}