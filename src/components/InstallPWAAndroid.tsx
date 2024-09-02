import { useContext, useEffect } from "react";
import { SheetContext } from "./Sheet";
import { EllipsisVertical, ScreenShare } from "lucide-react";

export default function InstallPWAAndroid() {
  const context = useContext(SheetContext);

  useEffect(() => {
    context?.setViewPercentage(50);
  }, []);

  return (
    <div className="px-8 py-8 h-full flex flex-col justify-center items-center">
      <div className="h-full flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">Instale o app!</h1>
          <p className="text-black/60">Tenha a experiência de usar um aplicativo real, 
            como poder usá-lo offline!
          </p>
        </div> 
        <div id="instructions" className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span>1</span>
            <div className="flex gap-2 items-center">
              <span className="rounded-full bg-gray-100 flex justify-center items-center p-1"><EllipsisVertical size={16} color="black"/></span> 
              <span>Clique no botão de compartilhar página</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <span>2</span>
            <div className="flex gap-2 items-center">
              <span className="rounded-full bg-gray-100 flex justify-center items-center p-1"><ScreenShare size={16}/></span> 
              <span>Clique em adicionar à tela inicial</span>
            </div>
          </div>
        </div>
        <button
          className="
            border px-4 py-2 rounded-full bg-blue-700 text-white font-semibold
            transition-all ease-in-out active:scale-95
          " 
          onClick={() => {
            context?.toggleSheet(false)
            localStorage.setItem("hasSeenInstallModal", "true");
          }}
        >
          Entendi
        </button>
      </div>
    </div>
  )
}
