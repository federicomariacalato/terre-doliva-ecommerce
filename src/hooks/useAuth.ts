import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  return { session, isLoading, isLoggedIn: session !== null };
}
