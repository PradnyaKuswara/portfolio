import { useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/context';
import useLocalStorage from '../hooks/useLocalStorage';
import { KEY } from '../shared/constants/constantStorage';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storage = useLocalStorage();

  const [theme, setTheme] = useState(
    storage.getLocalStorage(KEY.localStorage.theme.name) || 'dark'
  );

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    storage.setLocalStorage(KEY.localStorage.theme.name, theme);

    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.setAttribute('data-theme', theme);
    }
  }, [theme, storage]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  if (!isClient) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
