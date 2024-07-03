import {Injectable} from "@angular/core";
import {Validator} from "@bshg/validation";
import {ValidatorItem} from "@bshg/validation";
import {AppUser} from "src/app/controller/auth/entities/app-user";

@Injectable({providedIn: 'root'})
export class AppUserValidator< T extends AppUser> extends Validator< T> {
  username = new ValidatorItem< string>(
    () => this.item().username,
    (value) => this.item().username = value  || '',
    (value) => {
      this.username.stringValidators
        ?.required()
        ?.valid()
    }
  )
  password= new ValidatorItem< string>(
    () => this.item().password,
    (value) => this.item().password = value  || '',
    (value) => {
      this.password.stringValidators
        ?.required()
        ?.min(6)
        ?.valid()
    }
  )
  confirmPassword= new ValidatorItem< string>(
    () => this.item().confirmPassword,
    (value) => this.item().confirmPassword = value  || '',
    (value) => {
      this.confirmPassword.stringValidators
        ?.required()
        ?.errorIf(value !== this.item().password, "The Confirm Password Must Be The Same As Password")
        ?.valid()
    }
  )
  email= new ValidatorItem< string>(
    () => this.item().email,
    (value) => this.item().email = value  || '',
    (value) => {
      this.email.stringValidators
        ?.required()
        ?.email()
        ?.valid()
    }
  )
  phone= new ValidatorItem< string>(
    () => this.item().phone,
    (value) => this.item().phone = value || '',
    (value) => {
      this.phone.stringValidators
        ?.required()
        ?.phone()
        ?.valid()
    }
  )

  override validatorItems: ValidatorItem< any>[] = [
    this.username, this.password, this.email, this.phone, this.confirmPassword
  ]

  override getValidatorItems() {
    return this.validatorItems
  }

  static init(item: () => AppUser): AppUserValidator< AppUser> {
    const validator = new AppUserValidator();
    validator.item = item
    return validator;
  }

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }
}
