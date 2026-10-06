export default function LoginScreen({
  onNavigate,
}: {
  onNavigate: (screen: "login" | "register" | "recovery") => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] p-4 font-sans">
      <div className="w-full max-w-[463px] rounded-[24px] border border-[#F1F5F9] bg-white p-10 shadow-[0px_10px_30px_-5px_rgba(0,64,101,0.08),0px_4px_12px_-2px_rgba(0,0,0,0.03)]">
        {/* Marcas / Logos (Placeholder) */}
        <div className="mb-10 flex justify-center gap-3">
          <div className="flex h-[50px] w-[80px] items-center justify-center rounded-xl border border-[#004065] bg-white">
            <div className="size-8 rounded bg-gray-200"></div>
          </div>
          <div className="flex h-[50px] w-[80px] items-center justify-center rounded-xl border border-[#004065] bg-white">
            <div className="h-4 w-12 rounded bg-gray-200"></div>
          </div>
          <div className="flex h-[50px] w-[80px] items-center justify-center rounded-xl border border-[#004065] bg-white">
            <div className="h-5 w-10 rounded bg-gray-200"></div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-[#004065]">
            Flujo de Autenticación Seguro
          </h1>
          <p className="mx-auto mt-2 max-w-[265px] text-[14px] leading-relaxed text-[#64748B]">
            Ingresa tus credenciales para acceder a tu cuenta.
          </p>
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-semibold text-[#004065]/90">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="Ej: estudiante@correo.com"
              className="h-[46px] rounded-lg border border-[#E2E8F0] bg-white px-4 text-[14px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] font-semibold text-[#004065]/90">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="h-[46px] rounded-lg border border-[#E2E8F0] bg-white px-4 text-[14px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
            />
          </div>

          <button
            type="submit"
            className="mt-4 flex h-[48px] items-center justify-center rounded-lg bg-[#00456E] text-[14px] font-medium tracking-wide text-white shadow-sm hover:bg-[#003B5C] focus:outline-none focus:ring-2 focus:ring-[#00456E]/50 focus:ring-offset-2"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <button
            onClick={() => onNavigate("register")}
            className="text-[14px] font-bold text-[#004065] hover:underline"
          >
            ¿Aún no tienes una cuenta? Crear una cuenta
          </button>
          <button
            onClick={() => onNavigate("recovery")}
            className="text-[14px] font-bold text-[#004065] hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}
