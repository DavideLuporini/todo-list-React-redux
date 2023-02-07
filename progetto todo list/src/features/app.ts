export enum Mode {
  LIGHT = "light",
  DARK = "dark",
}
export interface AppState {
  viewMode: Mode;
  editMode: boolean;
}
