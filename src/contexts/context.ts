import { createContext } from "react";

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => { }
});
export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);
