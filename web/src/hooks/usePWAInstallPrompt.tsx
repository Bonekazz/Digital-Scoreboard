import { ReactNode, useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface InstallPWAButtonProps {
  children: ReactNode | string;
  onClick?: () => void;
  className?: string;
}

export default function InstallPWAButton({children, onClick, className}: InstallPWAButtonProps) {

  const [deferredPrompt, setDeferredPrompt] = useState <BeforeInstallPromptEvent | null>(null);
  const [hasInstalled, setHasInstalled] = useState(false);

  useEffect(() => {
    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }
  }, []);

  function handleInstallClick() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((result) => {
      if (result.outcome !== "accepted") {
        setHasInstalled(false);
        setDeferredPrompt(null);
        return
      };

      localStorage.setItem("isPWAInstalled", "true");
      setHasInstalled(true);
      setDeferredPrompt(null);
    });

  }

  return (
    <button className={className} 
      onClick={() => {
        handleInstallClick()
        if(onClick && hasInstalled) onClick();
      }}
    >
      {children}
    </button>
  ) 

}
