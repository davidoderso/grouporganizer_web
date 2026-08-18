// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { darkColors, darkTextVariants, lightColors, textVariants } from './theme';


interface ThemeType {
  isDarkMode: boolean;
  colors: typeof lightColors;
  textVariants: typeof textVariants;
  toggleDarkMode: () => void;
  gradientColors: string[];
}

const ThemeContext = createContext<ThemeType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const colors = isDarkMode ? darkColors : lightColors;
  const gradientColors = isDarkMode ? ['#191654', '#41BBA6'] : ['#2BC0E4', '#EAECC6'];
  const textStyles = isDarkMode ? darkTextVariants : textVariants;

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      colors,
      textVariants: textStyles,
      toggleDarkMode,
      gradientColors
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme muss im ThemeProvider genutzt werden');
  return context;
};
