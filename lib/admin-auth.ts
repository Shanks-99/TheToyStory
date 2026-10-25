import { createClient } from "./supabase-server";
import type { User } from "@supabase/supabase-js";

export interface AdminAuthResult {
  user: User | null;
  isAdmin: boolean;
}

/**
 * Verifies if the current session belongs to an authorized admin.
 * Queries public.admin_users table to verify authorization.
 */
export async function getAdminUser(): Promise<AdminAuthResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { user: null, isAdmin: false };
    }

    const { data: adminRecord, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError || !adminRecord) {
      return { user, isAdmin: false };
    }

    return { user, isAdmin: true };
  } catch (err) {
    console.error("Error checking admin user status:", err);
    return { user: null, isAdmin: false };
  }
}
