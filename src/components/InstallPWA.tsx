import { useContext, useEffect, useState } from "react";
import { SheetContext } from "./Sheet";
import getUserMobileOS from "@/utils/getUserMobileOS";
import InstallPWAiOS from "./InstallPWAiOS";
import InstallPWAAndroid from "./InstallPWAAndroid";
import { BeforeInstallPromptEvent } from "@/types/PWAPrompt";

export default function InstallPWA() {
  const context = useContext(SheetContext);
  const [OS, setOS] = useState("unknown");
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    setOS(getUserMobileOS());
    function handlePromptEvent(e: Event) {
      console.log(e);
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handlePromptEvent);

    return () => {
      window.removeEventListener("beforeinstallprompt", handlePromptEvent);
    }

  }, []);
  
  if (OS === "iOS" && !deferredPrompt) return <InstallPWAiOS />;
  if (OS === "Android" && !deferredPrompt) return <InstallPWAAndroid />;
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
        <button
          className="
            border px-4 py-2 rounded-full
            transition-all ease-in-out active:scale-95
          " 
          onClick={() => {
            context?.toggleSheet(false)
            localStorage.setItem("hasSeenInstallModal", "true");
          }}
        >
          continuar no navegador 
        </button>
        <button
          className="
            border px-4 py-2 rounded-full bg-blue-700 text-white font-semibold
            transition-all ease-in-out active:scale-95
          " 
          onClick={() => {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((result) => {
              if (result.outcome === "dismissed") return;
              context?.toggleSheet(false);
              setDeferredPrompt(null);
              localStorage.setItem("hasSeenInstallModal", "true");
            });
          }}
        >
          instalar 
        </button>
      </div>
    </div>
  );
}
