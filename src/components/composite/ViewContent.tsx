import { ReactNode } from "react";

export const ViewContent = ({ children }: { children: ReactNode }) => {
  return <main className="px-4 py-2 flex-1 overflow-y-auto">
    {children}
  </main>
}
