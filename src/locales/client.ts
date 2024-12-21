// Não há mais necessidade de criar o cliente
"use client";

// Remova qualquer referência ao createI18nClient
export const useI18n = () => ({ t: (key: string) => key }); // Placeholder simples
export const useCurrentLocale = () => "en"; // Fixo ou configure como preferir
