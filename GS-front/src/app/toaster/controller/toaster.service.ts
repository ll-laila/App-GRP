import {EventEmitter, Injectable, signal} from '@angular/core';
import {Toast, ToastDefaults, ToastOpts} from "./toast";
import {Validator} from "@bshg/validation";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  public toasts = signal< Toast[]>([])

  public onToast = new EventEmitter< any>

  public toast(toasts: ToastOpts[]): void
  public toast(toast: ToastOpts): void
  public toast(toasts: ToastOpts[] | ToastOpts) {
    if (toasts instanceof Array) {
      if (toasts.length > 0) {
        this.addToasts(toasts)
      }
    } else if (toasts != undefined) {
      this.addToasts([toasts])
    }
    this.onToast.emit()
  }

  private addToasts(toasts: ToastOpts[]) {
    const toastList = toasts.map(it => {
      return {...ToastDefaults, ...it} as Toast
    })
    this.toasts.set([...this.toasts(), ...toastList])
  }

  public validateThenToast(validator: Validator< unknown>): boolean {
    if (validator.validate()) return false
    this.toast({message: "Please fix the issues and try again.", color: 'danger'})
    return true
  }
}
