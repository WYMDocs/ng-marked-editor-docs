export interface LocalStorage {
    getItem: (key: string) => string;
    setItem: (key: string, value: any) => void;
}