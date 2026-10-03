import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Account() {
  const { isLoading, session } = useAuth();

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#fbf9f4] flex items-center justify-center font-sans text-xs uppercase tracking-widest text-[#7c7c7c]">
        Caricamento...
      </div>
    );

  if (!session) return <Navigate to="/accedi" replace />;
  return (
    <div className="min-h-screen bg-[#fbf9f4] font-sans text-[#1a1a1a]">
      <Navbar theme="light" />
      <main className="max-w-2xl mx-auto px-6 pt-40 pb-24">
        <p className="text-xs uppercase tracking-widest font-semibold text-[#b87d4b] mb-3">
          Il tuo account
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-[#2c3e2b] mb-10">
          Area personale
        </h1>

        <Card className="bg-[#fbf9f4] border-[#e8e4d9] shadow-sm">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-[#2c3e2b]">
              Dati del profilo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-t border-[#e8e4d9] pt-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#7c7c7c]">
                Email
              </span>
              <span className="text-sm text-[#2c3e2b] break-all">
                {session.user.email}
              </span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
