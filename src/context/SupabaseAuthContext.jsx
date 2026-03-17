import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const SupabaseAuthContext = createContext();

export const useSupabaseAuthContext = () => useContext(SupabaseAuthContext);

export const SupabaseAuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    return supabase.auth.signOut();
  };

  const value = {
    user,
    currentUser: user,
    loading,
    isLoading: loading,
    logout,
  };

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};
