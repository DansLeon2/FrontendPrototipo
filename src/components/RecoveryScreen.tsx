import { useState } from "react";

export default function RecoveryScreen({
  onNavigate,
}: {
  onNavigate: (screen: string) => void;
}) {
  const [method, setMethod] = useState<"fingerprint" | "pin" | null>(null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4 font-sans">
      <div className="w-full max-w-[463px] rounded-[24px] border border-[#F1F5F9] bg-white p-10 shadow-[0px_10px_30px_-5px_rgba(0,64,101,0.08),0px_4px_12px_-2px_rgba(0,0,0,0.03)]">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-[#004065]">
            Recuperar Contraseña
          </h1>
          <p className="mx-auto mt-2 text-[14px] leading-relaxed text-[#64748B]">
            {method === null 
              ? "Selecciona un método para recuperar tu acceso."
              : method === "fingerprint"
              ? "Verifica tu identidad usando biometría."
              : "Ingresa tu PIN de seguridad."}
          </p>
        </div>

        {/* Selection State */}
        {method === null && (
          <div className="flex flex-col gap-4">
             <button
              onClick={() => setMethod("fingerprint")}
              className="flex w-full items-center justify-between rounded-xl border border-[#E2E8F0] p-4 hover:border-[#004065] hover:bg-[#004065]/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004065]/10 text-[#004065]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M15.15 15.35c.08-.4.12-.8.15-1.2.06-1.07.05-2.09-.03-3"/><path d="M18.23 15.69c.12-.66.21-1.32.27-1.99.12-1.36.1-2.73-.08-4.1"/><path d="M8.85 15.35c-.08-.4-.12-.8-.15-1.2-.06-1.07-.05-2.09.03-3"/><path d="M5.77 15.69c-.12-.66-.21-1.32-.27-1.99-.12-1.36-.1-2.73.08-4.1"/><path d="M12 5a5.5 5.5 0 0 0-5.5 5.5"/><path d="M17.5 10.5A5.5 5.5 0 0 0 12 5"/><path d="M21 16.5A9.5 9.5 0 0 0 12 2"/><path d="M3 16.5A9.5 9.5 0 0 1 12 2"/></svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#004065]">Huella Dactilar</p>
                  <p className="text-[12px] text-[#64748B]">Recuperación rápida y segura</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setMethod("pin")}
              className="flex w-full items-center justify-between rounded-xl border border-[#E2E8F0] p-4 hover:border-[#004065] hover:bg-[#004065]/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004065]/10 text-[#004065]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="15" r="1"/></svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#004065]">PIN de Seguridad</p>
                  <p className="text-[12px] text-[#64748B]">Usa tu código de 6 dígitos</p>
                </div>
              </div>
            </button>

          </div>
        )}

        {/* Fingerprint State */}
        {method === "fingerprint" && (
          <div className="flex flex-col items-center gap-6 py-4">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#004065]/5 border-2 border-dashed border-[#004065]/30">
              <svg className="text-[#004065]/80 animate-pulse" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M15.15 15.35c.08-.4.12-.8.15-1.2.06-1.07.05-2.09-.03-3"/><path d="M18.23 15.69c.12-.66.21-1.32.27-1.99.12-1.36.1-2.73-.08-4.1"/><path d="M8.85 15.35c-.08-.4-.12-.8-.15-1.2-.06-1.07-.05-2.09.03-3"/><path d="M5.77 15.69c-.12-.66-.21-1.32-.27-1.99-.12-1.36-.1-2.73.08-4.1"/><path d="M12 5a5.5 5.5 0 0 0-5.5 5.5"/><path d="M17.5 10.5A5.5 5.5 0 0 0 12 5"/><path d="M21 16.5A9.5 9.5 0 0 0 12 2"/><path d="M3 16.5A9.5 9.5 0 0 1 12 2"/></svg>
            </div>
            <p className="text-center text-[14px] text-[#64748B]">Coloca tu dedo en el sensor biométrico del dispositivo</p>
            <button
              onClick={() => onNavigate("success")}
              className="mt-2 flex w-full h-[48px] items-center justify-center rounded-lg bg-[#00456E] text-[14px] font-medium tracking-wide text-white shadow-sm hover:bg-[#003B5C]"
            >
              Simular Lectura Exitosa
            </button>
          </div>
        )}

        {/* PIN State */}
        {method === "pin" && (
          <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onNavigate("success"); }}>
            <div className="flex flex-col gap-1.5 items-center">
              <label className="text-[14px] font-semibold text-[#004065]/90">
                Ingresa tu PIN de 6 dígitos
              </label>
              <div className="flex gap-2 mt-2">
                {[1,2,3,4,5,6].map(i => (
                  <input key={i} type="password" maxLength={1} className="w-12 h-14 text-center text-xl rounded-lg border border-[#E2E8F0] bg-white focus:border-[#004065] focus:ring-1 focus:ring-[#004065] outline-none" />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 flex h-[48px] items-center justify-center rounded-lg bg-[#00456E] text-[14px] font-medium tracking-wide text-white shadow-sm hover:bg-[#003B5C]"
            >
              Verificar PIN
            </button>
          </form>
        )}

        {/* Footer Links */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-[#F1F5F9] pt-6">
          {method !== null && (
            <button
              onClick={() => setMethod(null)}
              className="text-[13px] font-medium text-[#64748B] hover:text-[#004065]"
            >
              ← Elegir otro método
            </button>
          )}
          <button
            onClick={() => onNavigate("login")}
            className="text-[14px] font-bold text-[#004065] hover:underline"
          >
            Volver a iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

