// src/theme/theme.ts
export const lightColors = {
    background: '#EAECC6',
    primary: '#2BC0E4',
    secondary: '#41BBA6',
    text: '#222',
    textSecondary: '#555',
    card: '#fff',
    border: '#ddd',
    error: '#e74c3c'
  };
  
  export const darkColors = {
    background: '#191654',
    primary: '#41BBA6',
    secondary: '#2BC0E4',
    text: '#fff',
    textSecondary: '#bbb',
    card: '#232323',
    border: '#444',
    error: '#e74c3c'
  };
  
  export const textVariants = {
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: lightColors.text
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '600',
      color: lightColors.textSecondary
    },
    body: {
      fontSize: 16,
      color: lightColors.text
    },
    small: {
      fontSize: 13,
      color: lightColors.textSecondary
    }
  };
  
  export const darkTextVariants = {
    ...textVariants,
    title: { ...textVariants.title, color: darkColors.text },
    subtitle: { ...textVariants.subtitle, color: darkColors.textSecondary },
    body: { ...textVariants.body, color: darkColors.text },
    small: { ...textVariants.small, color: darkColors.textSecondary }
  };
  