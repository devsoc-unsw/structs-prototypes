export type UiState = {
  showHover: boolean;
  showClick: boolean;
  canDrag: boolean;
  debug: boolean;
}

export const DEFAULT_UISTATE: UiState = {
  showHover: false,
  showClick: false,
  canDrag: false,
  debug: false,
}