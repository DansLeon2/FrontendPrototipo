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

function MobileCodeScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [scanned, setScanned] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 p-4">
      <div className="relative overflow-hidden rounded-[40px] border-[12px] border-slate-900 bg-slate-950 shadow-2xl h-[700px] w-full max-w-[340px]">
        {/* Mobile Status Bar Simulation */}
        <div className="absolute top-0 w-full flex justify-between items-center px-6 py-3 text-[11px] font-medium text-slate-300 z-10">
          <span>09:41</span>
          <div className="flex gap-2">
            <span>LTE</span>
            <div className="w-5 h-2.5 border border-slate-300 rounded-[3px] p-[1px] relative">
              <div className="bg-slate-300 w-full h-full rounded-[1px]" />
              <div className="absolute -right-1 top-1 w-[2px] h-[4px] bg-slate-300 rounded-r-sm" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-full p-8 text-center mt-4">
          {!scanned ? (
            <>
              <div className="mb-8 p-5 rounded-full bg-slate-800/60 shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
              </div>
              <h2 className="text-[22px] font-bold text-white mb-3">Autenticador</h2>
              <p className="text-slate-400 mb-10 text-[14px] leading-relaxed px-2">Escanea tu huella dactilar para generar el código de seguridad.</p>
              
              <button 
                onClick={() => setScanned(true)}
                className="w-full rounded-2xl bg-[#0ea5e9] py-3.5 text-white font-semibold text-[15px] shadow-lg shadow-sky-500/25 active:scale-95 transition-all"
              >
                Tocar sensor
              </button>
            </>
          ) : (
            <div className="animate-in fade-in zoom-in duration-300 w-full flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Código Generado</h2>
              <p className="text-slate-400 mb-8 text-[14px]">Ingresa este código en tu computadora.</p>
              
              <div className="bg-slate-800/80 rounded-2xl p-6 mb-8 border border-slate-700/50 w-full">
                <div className="text-[40px] font-mono font-bold text-white tracking-[0.15em] flex justify-center">
                  <span className="ml-3">482915</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setScanned(false)
                  onNavigate("success")
                }}
                className="text-slate-400 text-sm hover:text-white font-medium"
              >
                Cerrar y continuar
              </button>
            </div>
          )}
        </div>
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

type ScreenName = "login" | "register" | "recovery" | "locked" | "success" | "mobile" | "keypad"

const SCREENS: { id: ScreenName; label: string }[] = [
  { id: "login", label: "Login" },
  { id: "register", label: "Registro (6 pasos)" },
  { id: "recovery", label: "Recuperar Contraseña" },
  { id: "mobile", label: "Autenticador Móvil" },
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
          {currentScreen === "mobile" && (
            <MobileCodeScreen onNavigate={handleNavigate} />
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
