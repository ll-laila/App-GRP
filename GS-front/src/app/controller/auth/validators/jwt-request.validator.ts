import {Injectable} from "@angular/core";
import {ValidatorItem} from "@bshg/validation";
import {Validator} from "@bshg/validation";
import {JwtRequest} from "src/app/controller/auth/entities/jwt-request";

@Injectable({providedIn: 'root'})
export class JwtRequestValidator extends Validator< JwtRequest> {
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
    (value) => this.item().password = value || '',
    (value) => {
      this.password.stringValidators
        ?.required()
        //?.minLength(6)
        ?.valid()
    }
  )

  override validatorItems = [
    this.username, this.password
  ]

  static init(item: () => JwtRequest): JwtRequestValidator {
    const validator = new JwtRequestValidator();
    validator.item = item
    return validator;
  }

  getValidatorItem(fieldName: string): ValidatorItem< any> {
    // @ts-ignore
    return this[fieldName];
  }
}
