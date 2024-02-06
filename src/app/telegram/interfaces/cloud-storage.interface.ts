export interface CloudStorage {
  setItem(key: string, value: string, callback?: Function): CloudStorage;
  getItem(key: string, callback: Function): CloudStorage;
  getItems(keys: string[], callback: Function): CloudStorage;
  removeItem(key: string, callback?: Function): CloudStorage;
  removeItems(keys: string[], callback?: Function): CloudStorage;
  getKeys(callback: Function): CloudStorage;
}
