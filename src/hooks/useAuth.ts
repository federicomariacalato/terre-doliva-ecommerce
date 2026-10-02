import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return {session, isLoggedIn: session !== null};
}
