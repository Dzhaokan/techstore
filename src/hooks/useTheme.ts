import { useEffect, useState } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(loadFromStorage<Theme>(THEME_STORAGE_KEY, 'light'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveToStorage(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}
