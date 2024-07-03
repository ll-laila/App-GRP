import {Colors} from "@coreui/angular";

export type Toast = {
  message: string;
  title: string;
  color: Colors;
  delay: number;
  autohide: boolean;
}

export type ToastOpts = {
  message: string;
  title?: string;
  color?: Colors;
  delay?: number;
  autohide?: boolean;
}

export const ToastDefaults:
  {
    color: Colors
    delay: number
    autohide: boolean
  } = {
  color: 'primary',
  delay: 5000,
  autohide: true,
}
