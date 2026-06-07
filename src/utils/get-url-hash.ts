import { getWindow } from "./get-window"

export const getUrlHash = () =>
  getWindow()?.location.hash.replace("#", "") ?? ""
