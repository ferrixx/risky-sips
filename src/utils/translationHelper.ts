import { settings } from '../data/settings';
import { translations } from '../data/translations';

export const getTranslation = (key: string): string => {
  const language = settings.language;
  return translations[language][key] || key;
};