export const getLanguage = () => localStorage.getItem('language') || 'hr';

export const toggleLanguage = () => {
  const nextLang = getLanguage() === 'hr' ? 'en' : 'hr';
  localStorage.setItem('language', nextLang);
  window.location.reload();
};

export const t = (hrText, enText) => {
  return getLanguage() === 'hr' ? hrText : enText;
};
