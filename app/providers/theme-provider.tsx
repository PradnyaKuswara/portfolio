"use client";

import React from "react";

export const ThemeContext = React.createContext({
  theme: "dark",
  setTheme: (theme: string) => {},
});

export const useTheme = () => React.useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") ?? "dark"
      : "light"
  );

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("theme", theme);

    const localTheme = localStorage.getItem("theme");
    const htmlElement = document.querySelector("html");

    if (htmlElement && localTheme) {
      htmlElement.setAttribute("data-theme", localTheme);
    }
  }, [theme]);

  if (!isClient) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
