import React, { useState, useEffect } from "react";

/**
 * İçeriği yalnızca istemcide mount olduktan sonra render eder.
 * Store (Zustand), theme, localStorage gibi sunucuda olmayan veri kullanan
 * ağaçları hydrate hatasına yol açmadan göstermek için kullanılır.
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="w-full h-screen bg-[#EAEFFA] dark:bg-[#20212C] animate-pulse"
        aria-hidden
      />
    );
  }

  return <>{children}</>;
}
