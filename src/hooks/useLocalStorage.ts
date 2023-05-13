type Set<T> = (value: T) => void;
type LocalStorage = <T>(key: string) => [string | null, Set<T>];
export const useLocalStorage: LocalStorage = <T>(key: string) => {
  let value: string | null = localStorage.getItem(key);
  value = value ? JSON.parse(value) : null;

  const set: Set<T> = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, set];
};
