import { AlertCircle, X } from "lucide-react";

type OrderErrorToastProps = {
  message: string | null;
  onClose: () => void;
};

export function OrderErrorToast({ message, onClose }: OrderErrorToastProps) {
  if (!message) return null;

  return (
    <>
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="flex items-start gap-3 bg-[#5c2626] text-[#fbf9f4] rounded-lg shadow-lg px-4 py-3.5">
          <AlertCircle size={20} className="text-[#d97757] shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-serif text-sm leading-snug">
              Pagamento non riuscito
            </p>
            <p className="text-xs text-[#fbf9f4]/80 mt-0.5">{message}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Chiudi notifica"
            className="text-[#fbf9f4]/70 hover:text-[#fbf9f4] transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
