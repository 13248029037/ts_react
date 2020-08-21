export interface IPublic<T> {
  publicData: T;
  setData: (data: T) => void;
  clearData: () => void;
}
