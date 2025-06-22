export class LocalStorageService {
  constructor(private prefix = '') {}

  private makeKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  setItem(key: string, value: unknown): void {
    try {
      const raw = JSON.stringify(value);
      localStorage.setItem(this.makeKey(key), raw);
    } catch (err) {
      console.error('[LocalStorage] setItem error:', err);
    }
  }

  getItem<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const raw = localStorage.getItem(this.makeKey(key));
      if (raw == null) return defaultValue;
      return JSON.parse(raw) as T;
    } catch (err) {
      console.error('[LocalStorage] getItem error:', err);
      return defaultValue;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.makeKey(key));
  }

  clear(): void {
    if (!this.prefix) {
      localStorage.clear();
      return;
    }
    Object.keys(localStorage)
      .filter((k) => k.startsWith(this.prefix))
      .forEach((k) => {
        localStorage.removeItem(k);
      });
  }
}
