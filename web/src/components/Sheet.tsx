import { createContext, ReactNode, useEffect, useState } from "react";

export const SheetContext = createContext<{ 
  isOpen: boolean, toggleSheet: (value?: boolean) => void,
  setViewPercentage: React.Dispatch<number>
  } | null >(null);

interface SheetProviderProps {
  children: ReactNode;
  open?: boolean;
}


function SheetProvider({ children, open }: SheetProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [viewPercentage, setViewPercentage] = useState(45);

  const DISPLAY_DURATION = 700;
  // const SHEET_DURATION = 500;

  useEffect(() => {
    if (open !== undefined && open) {
      setIsOpen(true);
      setTimeout(() => {
        setIsFadingIn(true);
      }, 1000);
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
    <SheetContext.Provider value={{ isOpen,  toggleSheet, setViewPercentage}}>
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
              w-full bg-white
              rounded-t-3xl
              transition-all ease-in-out duration-300
            `}
            style={{
              height: (isFadingIn) ? `${viewPercentage}%` : "0%" 
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </SheetContext.Provider>
  );
}

export default SheetProvider;
