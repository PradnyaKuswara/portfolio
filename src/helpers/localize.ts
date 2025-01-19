export const getLocalizedText = (
  t: (key: string) => string,
  key: string | null | undefined,
  fallback: string
): string => {
  if (!key) return fallback;
  const translated = t(key);
  return translated !== key ? translated : fallback;
};

