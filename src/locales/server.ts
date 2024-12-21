export const getI18n = () => ({ t: (key: string) => key }); // Placeholder simples
export const getScopedI18n = (scope: string) => {
  return async (key: string) => `${scope}.${key}`; // Retorna uma string formatada
};
export const getCurrentLocale = () => "pt"; // Idioma fixo
