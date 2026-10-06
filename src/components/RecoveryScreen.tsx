import { useState, useEffect } from "react"

export default function RecoveryScreen({
  onNavigate,
}: {
  onNavigate: (screen: string) => void
}) {
  const [step, setStep] =
    useState<"identify" | "question" | "mfa" | "new_password">("identify")

  // For prototype demonstration: toggle mobile vs desktop view
  const [isMobileMode, setIsMobileMode] = useState<boolean>(false)

  const [email, setEmail] = useState("")
  const [securityAnswer, setSecurityAnswer] = useState("")
  const [pin, setPin] = useState("")
  const [mobileCode, setMobileCode] = useState("")

  // Multi-factor states
  const [mfaState, setMfaState] =
    useState<"pending" | "fingerprint_done" | "code_done" | "pin_done">(
      "pending",
    )

  // Effect to auto-detect based on screen width initially
  useEffect(() => {
    const checkMobile = () => setIsMobileMode(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleIdentify = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setStep("question")
  }

  const handleQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    if (securityAnswer.trim()) setStep("mfa")
  }

  const handleMobileMfa = (e: React.FormEvent) => {
    e.preventDefault()
    if (mfaState === "fingerprint_done" && pin.length === 6) {
      setStep("new_password")
    }
  }

  const handleDesktopMfa = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin.length === 6 && mobileCode.length === 6) {
      setStep("new_password")
    }
  }

  const handleNewPassword = (e: React.FormEvent) => {
    e.preventDefault()
    onNavigate("success")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4 font-sans relative">
      {/* Dev Toggle for Prototype Demo */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm border border-slate-200 flex gap-2 items-center z-50">
        <span className="text-xs font-semibold text-slate-500">Vista:</span>
        <button
          onClick={() => {
            setIsMobileMode(false)
            setMfaState("pending")
            setPin("")
            setMobileCode("")
          }}
          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
            !isMobileMode
              ? "bg-[#004065] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Escritorio (PC)
        </button>
        <button
          onClick={() => {
            setIsMobileMode(true)
            setMfaState("pending")
            setPin("")
            setMobileCode("")
          }}
          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
            isMobileMode
              ? "bg-[#004065] text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Móvil
        </button>
      </div>

      <div className="w-full max-w-[463px] rounded-[24px] border border-[#F1F5F9] bg-white p-10 shadow-[0px_10px_30px_-5px_rgba(0,64,101,0.08),0px_4px_12px_-2px_rgba(0,0,0,0.03)]">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-[#004065]">
            Recuperar Contraseña
          </h1>
          <p className="mx-auto mt-2 text-[14px] leading-relaxed text-[#64748B]">
            {step === "identify" &&
              "Ingresa tu correo o cédula para identificarte."}
            {step === "question" && "Responde a tu pregunta de seguridad."}
            {step === "mfa" &&
              isMobileMode &&
              "Autenticación de doble factor en tu dispositivo."}
            {step === "mfa" &&
              !isMobileMode &&
              "Validación cruzada con tu dispositivo móvil."}
            {step === "new_password" && "Crea una nueva contraseña segura."}
          </p>
        </div>

        {/* Step 1: Identify */}
        {step === "identify" && (
          <form className="flex flex-col gap-5" onSubmit={handleIdentify}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-[#004065]/90">
                Correo electrónico o Cédula
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ej: estudiante@correo.com o 0999999999"
                className="h-[46px] rounded-lg border border-[#E2E8F0] bg-white px-4 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 flex h-[48px] items-center justify-center rounded-lg bg-[#00456E] text-[14px] font-medium tracking-wide text-white shadow-sm hover:bg-[#003B5C]"
            >
              Continuar
            </button>
          </form>
        )}

        {/* Step 2: Security Question */}
        {step === "question" && (
          <form className="flex flex-col gap-5" onSubmit={handleQuestion}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-[#004065]/90">
                Pregunta de seguridad
              </label>
              <div className="rounded-lg bg-slate-50 p-4 border border-slate-100 mb-2">
                <p className="text-[14px] font-medium text-[#1E293B]">
                  ¿Cuál fue el nombre de tu primera mascota?
                </p>
              </div>
              <input
                type="password"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                placeholder="Tu respuesta secreta"
                className="h-[46px] rounded-lg border border-[#E2E8F0] bg-white px-4 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
                required
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setStep("identify")}
                className="flex flex-1 h-[48px] items-center justify-center rounded-lg border border-[#E2E8F0] text-[14px] font-medium text-[#64748B] hover:bg-slate-50"
              >
                Volver
              </button>
              <button
                type="submit"
                className="flex flex-1 h-[48px] items-center justify-center rounded-lg bg-[#00456E] text-[14px] font-medium text-white shadow-sm hover:bg-[#003B5C]"
              >
                Verificar
              </button>
            </div>
          </form>
        )}

        {/* Step 3: MFA (Mobile Flow) */}
        {step === "mfa" && isMobileMode && (
          <form className="flex flex-col gap-6" onSubmit={handleMobileMfa}>
            <div
              className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                mfaState === "fingerprint_done"
                  ? "border-green-500 bg-green-50"
                  : "border-[#004065]/20 bg-[#004065]/5 border-dashed"
              }`}
            >
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-full ${
                  mfaState === "fingerprint_done"
                    ? "bg-green-100 text-green-600"
                    : "bg-white text-[#004065]/80 animate-pulse"
                }`}
              >
                {mfaState === "fingerprint_done" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                    <path d="M15.15 15.35c.08-.4.12-.8.15-1.2.06-1.07.05-2.09-.03-3" />
                    <path d="M18.23 15.69c.12-.66.21-1.32.27-1.99.12-1.36.1-2.73-.08-4.1" />
                    <path d="M8.85 15.35c-.08-.4-.12-.8-.15-1.2-.06-1.07-.05-2.09.03-3" />
                    <path d="M5.77 15.69c-.12-.66-.21-1.32-.27-1.99-.12-1.36-.1-2.73.08-4.1" />
                    <path d="M12 5a5.5 5.5 0 0 0-5.5 5.5" />
                    <path d="M17.5 10.5A5.5 5.5 0 0 0 12 5" />
                    <path d="M21 16.5A9.5 9.5 0 0 0 12 2" />
                    <path d="M3 16.5A9.5 9.5 0 0 1 12 2" />
                  </svg>
                )}
              </div>
              <p className="text-center text-[13px] font-medium text-[#1E293B]">
                {mfaState === "fingerprint_done"
                  ? "Biometría verificada"
                  : "Escanea tu huella en el sensor del móvil"}
              </p>
              {mfaState !== "fingerprint_done" && (
                <button
                  type="button"
                  onClick={() => setMfaState("fingerprint_done")}
                  className="mt-2 text-xs text-[#004065] underline"
                >
                  Simular escaneo exitoso
                </button>
              )}
            </div>

            <div
              className={`flex flex-col gap-1.5 items-center transition-opacity ${
                mfaState !== "fingerprint_done"
                  ? "opacity-40 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <label className="text-[14px] font-semibold text-[#004065]/90">
                Confirmar con PIN de seguridad
              </label>
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="******"
                className="w-32 h-12 mt-2 text-center text-2xl tracking-[0.5em] rounded-lg border border-[#E2E8F0] bg-white focus:border-[#004065] focus:ring-1 focus:ring-[#004065] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={mfaState !== "fingerprint_done" || pin.length !== 6}
              className="mt-2 flex h-[48px] items-center justify-center rounded-lg bg-[#00456E] text-[14px] font-medium text-white shadow-sm hover:bg-[#003B5C] disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Verificar Identidad
            </button>
          </form>
        )}

        {/* Step 3: MFA (Desktop Flow) */}
        {step === "mfa" && !isMobileMode && (
          <form className="flex flex-col gap-6" onSubmit={handleDesktopMfa}>
            <div className="flex flex-col gap-1.5 items-center">
              <label className="text-[14px] font-semibold text-[#004065]/90">
                Paso 1: Ingresa tu PIN de seguridad
              </label>
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="******"
                className="w-32 h-12 mt-2 text-center text-2xl tracking-[0.5em] rounded-lg border border-[#E2E8F0] bg-white focus:border-[#004065] focus:ring-1 focus:ring-[#004065] outline-none"
              />
            </div>

            <div
              className={`flex flex-col gap-4 p-5 rounded-xl border border-[#E2E8F0] bg-slate-50 transition-opacity ${
                pin.length !== 6
                  ? "opacity-40 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#004065]/10 text-[#004065]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="5"
                      y="2"
                      width="14"
                      height="20"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1E293B]">
                    Paso 2: Validación Móvil
                  </p>
                  <p className="text-[13px] text-[#64748B] mt-1">
                    Abre la app en tu celular, autentícate con tu huella y obtén
                    el código temporal de 6 dígitos.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center mt-2">
                <input
                  type="text"
                  maxLength={6}
                  value={mobileCode}
                  onChange={(e) =>
                    setMobileCode(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Código de la app"
                  className="w-40 h-12 text-center text-lg tracking-[0.2em] rounded-lg border border-[#E2E8F0] bg-white focus:border-[#004065] focus:ring-1 focus:ring-[#004065] outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={pin.length !== 6 || mobileCode.length !== 6}
              className="mt-2 flex h-[48px] items-center justify-center rounded-lg bg-[#00456E] text-[14px] font-medium text-white shadow-sm hover:bg-[#003B5C] disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Completar Validación
            </button>
          </form>
        )}

        {/* Step 4: New Password */}
        {step === "new_password" && (
          <form className="flex flex-col gap-5" onSubmit={handleNewPassword}>
            <div className="rounded-lg bg-green-50 p-4 border border-green-100 mb-2 flex gap-3 items-center">
              <svg
                className="text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <p className="text-[14px] font-medium text-green-800">
                Identidad verificada exitosamente.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-[#004065]/90">
                Nueva Contraseña
              </label>
              <input
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                className="h-[46px] rounded-lg border border-[#E2E8F0] bg-white px-4 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[14px] font-semibold text-[#004065]/90">
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                placeholder="Repite tu nueva contraseña"
                className="h-[46px] rounded-lg border border-[#E2E8F0] bg-white px-4 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 flex h-[48px] items-center justify-center rounded-lg bg-[#00456E] text-[14px] font-medium tracking-wide text-white shadow-sm hover:bg-[#003B5C]"
            >
              Guardar Contraseña
            </button>
          </form>
        )}

        {/* Footer Links */}
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-[#F1F5F9] pt-6">
          <button
            onClick={() => onNavigate("login")}
            className="text-[14px] font-bold text-[#004065] hover:underline"
          >
            Volver a iniciar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
