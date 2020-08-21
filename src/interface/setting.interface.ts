export interface IuserInfo {
  user_name: string;
  user_role: string[];
}
export interface ISetting {
  globalLoadingSpin: boolean;
  collaps: boolean;
  userName: string;
  roleName: string[];
  station: string;
  getCurrentUser: () => Promise<boolean>;
  getCollaps: () => boolean;
  setCollaps: () => void;
  setStation: (station: string) => void;
}
