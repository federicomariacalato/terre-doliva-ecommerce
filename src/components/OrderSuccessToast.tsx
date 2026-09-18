import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CheckCircle2, X } from "lucide-react";

export function OrderSuccessToast() {
  const location = useLocation();
  const navigate = useNavigate();

  const shouldShow = Boolean(
    (location.state as { orderSuccess?: boolean } | null)?.orderSuccess,
  );

  const [isVisible, setIsVisible] = useState(shouldShow);

  useEffect(() => {
    if (!shouldShow) return;
    navigate(location.pathname, { replace: true, state: null });
  }, [shouldShow, navigate, location.pathname]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => setIsVisible(false), 4500);
    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-start gap-3 bg-[#2c3e2b] text-[#fbf9f4] rounded-lg shadow-lg px-4 py-3.5">
        <CheckCircle2 size={20} className="text-[#b87d4b] shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-serif text-sm leading-snug">Ordine confermato!</p>
          <p className="text-xs text-[#fbf9f4]/80 mt-0.5">
            Grazie per il tuo acquisto, riceverai presto un'email di riepilogo.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          aria-label="Chiudi notifica"
          className="text-[#fbf9f4]/70 hover:text-[#fbf9f4] transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
