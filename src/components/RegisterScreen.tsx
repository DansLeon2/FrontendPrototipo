import { useState } from "react";

const STEPS = [
  { id: 1, title: "Datos de acceso" },
  { id: 2, title: "Información personal" },
  { id: 3, title: "Ubicación" },
  { id: 4, title: "Contacto de emergencia" },
  { id: 5, title: "Documento de identidad" },
];

export default function RegisterScreen({
  onNavigate,
}: {
  onNavigate: (screen: "login" | "register" | "recovery") => void;
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((p) => Math.min(p + 1, 5));
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 1));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] py-10 px-4 font-sans">
      {/* Header section */}
      <div className="mb-8 w-full max-w-[576px] text-center">
        <h1 className="text-[32px] font-bold tracking-tight text-[#004065]">
          Crear una cuenta
        </h1>
        <p className="mt-2 text-[14px] leading-relaxed text-[#64748B]">
          Completa la información para crear tu cuenta y enviar tu solicitud de
          inscripción.
        </p>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-[896px] rounded-[16px] border border-[#F1F5F9] bg-white p-10 shadow-[0px_20px_25px_-5px_rgba(226,232,240,0.6),0px_8px_10px_-6px_rgba(226,232,240,0.6)]">
        {/* Stepper Header */}
        <div className="mb-8 border-b border-[#F1F5F9] pb-6">
          <p className="mb-3 text-[14px] font-bold text-[#004065]">
            Paso {currentStep} de 5:
          </p>
          <div className="flex gap-3">
            {STEPS.map((step) => {
              const isActive = currentStep >= step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} className="flex flex-1 flex-col gap-2">
                  <div
                    className={`h-[6px] w-full rounded-full ${
                      isActive ? "bg-[#004065]" : "bg-[#E2E8F0]"
                    }`}
                  />
                  <span
                    className={`text-[12px] ${
                      isCurrent
                        ? "font-semibold text-[#1E293B]"
                        : isActive
                          ? "font-semibold text-[#004065]"
                          : "font-medium text-[#94A3B8]"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[280px]">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
          {currentStep === 5 && <Step5 />}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex items-center justify-between border-t border-[#F8FAFC] pt-4">
          <button
            onClick={currentStep === 1 ? () => onNavigate("login") : prevStep}
            className="flex h-[42px] items-center justify-center rounded-lg border border-[#505356] bg-white px-6 text-[14px] font-semibold text-[#004065] sm:min-w-[105px]"
          >
            {currentStep === 1 ? "Volver a login" : "Anterior"}
          </button>

          <div className="flex items-center gap-6">
            {currentStep > 1 && (
              <button
                onClick={() => onNavigate("login")}
                className="text-[14px] font-semibold text-[#00456E] hover:underline"
              >
                Volver a login
              </button>
            )}
            <button
              onClick={nextStep}
              className="flex h-[44px] min-w-[120px] items-center justify-center rounded-lg bg-[#004065] px-8 text-[14px] font-semibold text-white shadow-sm hover:bg-[#003B5C]"
            >
              {currentStep === 5 ? "Finalizar" : "Siguiente"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step1() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-[14px] font-semibold text-[#1E293B]">
          Correo electrónico *
        </label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          className="h-[46px] w-full rounded-lg border border-[#E2E8F0] bg-white px-4 text-[14px] text-[#1E293B] shadow-sm outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
        />
      </div>
      <div className="flex gap-5 sm:flex-row flex-col">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#1E293B]">
            Contraseña *
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              className="h-[46px] w-full rounded-lg border border-[#E2E8F0] bg-white px-4 pr-11 text-[14px] text-[#1E293B] shadow-sm outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#64748B]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#1E293B]">
            Confirmar contraseña *
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="Repite tu contraseña"
              className="h-[46px] w-full rounded-lg border border-[#E2E8F0] bg-white px-4 pr-11 text-[14px] text-[#1E293B] shadow-sm outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#64748B]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* PIN Section */}
      <div className="flex gap-5 sm:flex-row flex-col mt-2">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#1E293B]">
            PIN de seguridad (6 dígitos) *
          </label>
          <input
            type="password"
            placeholder="Ej: 123456"
            maxLength={6}
            className="h-[46px] w-full rounded-lg border border-[#E2E8F0] bg-white px-4 text-[14px] text-[#1E293B] shadow-sm outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065] text-center tracking-widest text-lg"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#1E293B]">
            Confirmar PIN *
          </label>
          <input
            type="password"
            placeholder="Ej: 123456"
            maxLength={6}
            className="h-[46px] w-full rounded-lg border border-[#E2E8F0] bg-white px-4 text-[14px] text-[#1E293B] shadow-sm outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065] text-center tracking-widest text-lg"
          />
        </div>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-5 sm:flex-row flex-col">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            Nombres *
          </label>
          <input
            type="text"
            placeholder="Ingresa tus nombres"
            className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            Apellidos *
          </label>
          <input
            type="text"
            placeholder="Ingresa tus apellidos"
            className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
          />
        </div>
      </div>
      <div className="flex gap-5 sm:flex-row flex-col">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            Cédula *
          </label>
          <input
            type="text"
            placeholder="Ej: 0900000001"
            className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
          />
          <span className="text-[11px] text-[#94A3B8]">0/10 dígitos</span>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            Teléfono celular *
          </label>
          <input
            type="tel"
            placeholder="Ej: 0999999999"
            className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
          />
        </div>
      </div>
      <div className="flex gap-5 sm:flex-row flex-col">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            Fecha de nacimiento *
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="dd/mm/aaaa"
              className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 pr-10 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            Sexo *
          </label>
          <div className="relative">
            <select className="h-[42px] w-full appearance-none rounded-lg border border-[#E2E8F0] bg-white px-3 pr-10 text-[14px] text-[#334155] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]">
              <option value="">Seleccione...</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-5 sm:flex-row flex-col">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            País
          </label>
          <input
            type="text"
            placeholder="País"
            className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            Provincia
          </label>
          <input
            type="text"
            placeholder="Provincia"
            className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
          />
        </div>
      </div>
      <div className="flex gap-5 sm:flex-row flex-col">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            Ciudad
          </label>
          <input
            type="text"
            placeholder="Ciudad"
            className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            Dirección
          </label>
          <input
            type="text"
            placeholder="Dirección"
            className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
          />
        </div>
      </div>
    </div>
  );
}

function Step4() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-[14px] font-semibold text-[#334155]">
          Nombre del contacto
        </label>
        <input
          type="text"
          placeholder="Nombre del contacto"
          className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
        />
      </div>
      <div className="flex gap-5 sm:flex-row flex-col">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            Parentesco
          </label>
          <input
            type="text"
            placeholder="Ej: Madre, padre, hermano"
            className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-[14px] font-semibold text-[#334155]">
            Teléfono
          </label>
          <input
            type="tel"
            placeholder="Ej: 0999999999"
            className="h-[42px] w-full rounded-lg border border-[#E2E8F0] bg-white px-3 text-[14px] text-[#1E293B] outline-none focus:border-[#004065] focus:ring-1 focus:ring-[#004065]"
          />
        </div>
      </div>
    </div>
  );
}

function Step5() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-[#F1F5F9] text-[#64748B]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      </div>
      <div>
        <h3 className="text-[16px] font-semibold text-[#1E293B]">
          Sube tu documento de identidad
        </h3>
        <p className="mt-1 text-[14px] text-[#64748B]">
          Formatos soportados: JPG, PNG, PDF. Tamaño máximo: 5MB.
        </p>
      </div>
      <button className="mt-4 rounded-lg border border-[#004065] bg-white px-6 py-2 text-[14px] font-semibold text-[#004065] hover:bg-[#F8FAFC]">
        Seleccionar archivo
      </button>
    </div>
  );
}
