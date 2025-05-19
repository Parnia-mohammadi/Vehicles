export const saveToCache = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromCache = (key) => {
  const cachedData = localStorage.getItem(key);
  return cachedData ? JSON.parse(cachedData) : null;
};
