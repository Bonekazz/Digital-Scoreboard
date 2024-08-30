import { createContext, ReactNode, useEffect, useState } from "react";

export const SheetContext = createContext<{ isOpen: boolean, toggleSheet: (value?: boolean) => void } | null >(null);

interface SheetProviderProps {
  children: ReactNode;
  open?: boolean;
}


function SheetProvider({ children, open }: SheetProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  const DISPLAY_DURATION = 700;
  const SHEET_DURATION = 500;

  useEffect(() => {
    if (open) {
      setIsOpen(true);
      setIsFadingIn(true);
    };
  },[])

  function toggleSheet(value?: boolean): void {
    if (value === undefined) {setIsOpen(!isOpen); return};
    if (!value) {
      setIsFadingIn(false);
      setTimeout(() => {
        setIsOpen(false); 
      }, DISPLAY_DURATION)
      return
    };
    
    setIsOpen(value);
  }
  return (
    <SheetContext.Provider value={{ isOpen,  toggleSheet}}>
      <div 
      className={`
        ${isOpen ? "" : "hidden"}
        w-full h-full absolute top-0
        overflow-hidden
      `}
      >
        <div 
          id="dark-overlay" 
          className={`
            z-[1000] absolute top-0 w-full h-full bg-black/60
            ${isFadingIn ? "opacity-100" : "opacity-0"}
            transition-all ease-in-out duration-700
          `}
        ></div>
        <div className="z-[1001] absolute top-0 w-full h-full flex items-end">
          <div 
            className={`
              w-full ${isFadingIn ? "h-[40%]" : "h-[0%]"} bg-white
              rounded-t-3xl
              transition-all ease-in-out duration-300
            `}
          >
            {children}
          </div>
        </div>
      </div>
    </SheetContext.Provider>
  );
}

export default SheetProvider;

/** 
export function Sheet({children}: {children: ReactNode}) {
  return <SheetProvider>{children}</SheetProvider>;
}
**/
