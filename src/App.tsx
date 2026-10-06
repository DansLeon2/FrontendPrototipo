import { useState } from "react"
import LoginScreen from "./components/LoginScreen"
import RegisterScreen from "./components/RegisterScreen"
import RecoveryScreen from "./components/RecoveryScreen"

// Placeholders for the biometric / security screens that were originally inline
// We restored these as placeholders since the original code was lost.
function LockedScreen({
  onNavigate,
}: {
  onNavigate: (screen: string) => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="rounded-2xl bg-white p-8 shadow-sm text-center max-w-sm w-full">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Pantalla de Bloqueo Biométrico
        </h2>
        <p className="text-slate-500 mb-6">(Prototipo de tarjeta biométrica)</p>
        <button
          onClick={() => onNavigate("success")}
          className="w-full rounded-lg bg-[#004065] py-3 text-white font-semibold"
        >
          Desbloquear
        </button>
      </div>
    </div>
  )
}

function SuccessScreen({
  onNavigate,
}: {
  onNavigate: (screen: string) => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="rounded-2xl bg-white p-8 shadow-sm text-center max-w-sm w-full">
        <h2 className="text-xl font-bold text-green-600 mb-4">
          ¡Autenticación Exitosa!
        </h2>
        <p className="text-slate-500 mb-6">
          El proceso biométrico ha sido validado.
        </p>
        <button
          onClick={() => onNavigate("login")}
          className="w-full rounded-lg bg-green-600 py-3 text-white font-semibold"
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

function SealScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="rounded-2xl bg-white p-8 shadow-sm text-center max-w-sm w-full">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Sello Anti-Phishing
        </h2>
        <p className="text-slate-500 mb-6">Verifica tu imagen de seguridad.</p>
        <button
          onClick={() => onNavigate("keypad")}
          className="w-full rounded-lg bg-[#004065] py-3 text-white font-semibold"
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}

function KeypadScreen({
  onNavigate,
}: {
  onNavigate: (screen: string) => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="rounded-2xl bg-white p-8 shadow-sm text-center max-w-sm w-full">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Teclado PIN Seguro
        </h2>
        <p className="text-slate-500 mb-6">
          Ingresa tu PIN usando el teclado dinámico.
        </p>
        <button
          onClick={() => onNavigate("locked")}
          className="w-full rounded-lg bg-[#004065] py-3 text-white font-semibold"
        >
          Ingresar
        </button>
      </div>
    </div>
  )
}

type ScreenName = "login" | "register" | "recovery" | "locked" | "success" | "seal" | "keypad"

const SCREENS: { id: ScreenName label: string }[] = [
  { id: "login", label: "Login" },
  { id: "register", label: "Registro (5 pasos)" },
  { id: "recovery", label: "Recuperar Contraseña" },
  { id: "seal", label: "Sello Anti-Phishing" },
  { id: "keypad", label: "Teclado PIN" },
  { id: "locked", label: "Bloqueo Biométrico" },
  { id: "success", label: "Éxito" },
]

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("login")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as ScreenName)
  }

  return (
    <div className="flex min-h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-white border-r border-slate-200 transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-slate-100">
          <h1 className="font-bold text-slate-800 text-lg tracking-tight">
            Menú de Navegación
          </h1>
          <p className="text-xs text-slate-500 mt-1">Tour del prototipo</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {SCREENS.map((screen) => (
            <button
              key={screen.id}
              onClick={() => setCurrentScreen(screen.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                currentScreen === screen.id
                  ? "bg-[#004065] text-white shadow-md shadow-[#004065]/20"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {screen.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative h-screen overflow-y-auto">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#004065]/50"
          title="Toggle Sidebar"
        >
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
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* Screen Render */}
        <div className="w-full h-full">
          {currentScreen === "login" && (
            <LoginScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === "register" && (
            <RegisterScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === "recovery" && (
            <RecoveryScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === "seal" && (
            <SealScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === "keypad" && (
            <KeypadScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === "locked" && (
            <LockedScreen onNavigate={handleNavigate} />
          )}
          {currentScreen === "success" && (
            <SuccessScreen onNavigate={handleNavigate} />
          )}
        </div>
      </div>
    </div>
  )
}
