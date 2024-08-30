import { useContext } from "react";
import { SheetContext } from "./Sheet";
import InstallPWAButton from "@/hooks/usePWAInstallPrompt";

export default function Install() {
  const context = useContext(SheetContext);

  return (
    <div className="px-8 py-8 h-full flex flex-col justify-center items-center">
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">Instale o app!</h1>
          <p className="text-black/60">Ao clicar em instalar, um atalho será 
            criado na lista de aplicativos para você ter a experiência de usar um aplicativo real, 
            como poder usá-lo offline!
          </p>
        </div> 
        <div className="flex gap-2">
          <button 
            className="border px-4 py-2 rounded-full" 
            onClick={() => {context?.toggleSheet(false)}}
          >
            continuar no navegador
          </button>
          <InstallPWAButton
            className="
              border px-4 py-2 rounded-full bg-blue-700 text-white font-semibold
              transition-all ease-in-out active:scale-95
            " 
            onClick={() => {
              context?.toggleSheet(false)
            }}
          >
            instalar
          </InstallPWAButton>
        </div>
      </div>
    </div>
  );
}
