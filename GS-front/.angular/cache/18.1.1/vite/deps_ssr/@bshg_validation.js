import { createRequire } from 'module';const require = createRequire(import.meta.url);
import "./chunk-KA5JLFAN.js";

// node_modules/@bshg/validation/dist/index.mjs
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all) __defProp(target, name, {
    get: all[name],
    enumerable: true
  });
};
var Validator = class {
  item;
  nestedValidators;
  getValidatorItems() {
    return this.validatorItems;
  }
  get allGood() {
    return this.validatorItems?.every((it) => it.valid);
  }
  applyAll() {
    this.validatorItems?.forEach((it) => it.validate());
  }
  reset() {
    this.validatorItems?.forEach((it) => it.reset());
    this.nestedValidators?.forEach((it) => it.validator.reset());
  }
  validate() {
    const validators = [this, ...this.nestedValidators ? this.nestedValidators.map((it) => it.validator) : []];
    validators.forEach((it) => it.applyAll());
    return validators.every((it) => it.allGood);
  }
  nested(name, validator) {
    if (this.nestedValidators == void 0) this.nestedValidators = [];
    this.nestedValidators.push({
      name,
      validator
    });
  }
  import(results) {
    results.forEach((it) => {
      const validatorItem = this.getValidatorItem(it.field);
      if (validatorItem == void 0) {
        throw new Error(`Unknown validatorItem ${it.field} for ${Object.getPrototypeOf(this).constructor.name}!`);
      }
      validatorItem.valid = it.valid;
      validatorItem.message = it.message;
      validatorItem.setter(it.value);
    });
  }
};
var validator_methods_exports = {};
__export(validator_methods_exports, {
  AnyValidators: () => AnyValidators,
  BaseValidator: () => BaseValidator,
  NumberValidator: () => NumberValidator,
  StringValidator: () => StringValidator,
  ValidatorsCollector: () => ValidatorsCollector
});
var BaseValidator = class {
  validatorItem;
  constructor(validatorItem) {
    this.validatorItem = validatorItem;
  }
  get value() {
    return this.validatorItem.field();
  }
  error(msg) {
    this.validatorItem.error(msg);
  }
  valid() {
    this.validatorItem.valid = true;
    this.validatorItem.message = void 0;
  }
  baseCondition(errorCondition, errorMsg, validator) {
    if (errorCondition) {
      this.error(errorMsg);
      return;
    }
    return validator;
  }
};
var AnyValidators = class extends BaseValidator {
  constructor(validatorItem) {
    super(validatorItem);
  }
  required(errorMsg = void 0) {
    return this.errorIf(this.value == void 0 || this.value == "", errorMsg || "This field is required!");
  }
  errorIf(errorCondition, errorMsg) {
    return super.baseCondition(errorCondition, errorMsg, this);
  }
};
var NumberValidator = class extends BaseValidator {
  constructor(validatorItem) {
    super(validatorItem);
  }
  required(errorMsg = void 0) {
    return this.errorIf(this.value == void 0, errorMsg || "This field is required!");
  }
  gt(value, errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value <= value, errorMsg || `Must be greeter then '${value}'!`);
  }
  gte(value, errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value < value, errorMsg || `Must be greeter then or equals '${value}'!`);
  }
  lt(value, errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value <= value, errorMsg || `Must be less then '${value}'!`);
  }
  lte(value, errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value < value, errorMsg || `Must be less then or equals '${value}'!`);
  }
  multipleOf(value, errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value % value != 0, errorMsg || `Must be multiple of '${value}'!`);
  }
  safe(errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value >= Number.MIN_SAFE_INTEGER && this.value <= Number.MAX_SAFE_INTEGER, errorMsg || `value must be between '${Number.MIN_SAFE_INTEGER}' and '${Number.MAX_SAFE_INTEGER}'!`);
  }
  positive(errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value < 0, errorMsg || `This Field Must be positive!`);
  }
  negative(errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value > 0, errorMsg || `This Field Must be Negative!`);
  }
  errorIf(errorCondition, errorMsg) {
    return super.baseCondition(errorCondition, errorMsg, this);
  }
};
var validator_utils_exports = {};
__export(validator_utils_exports, {
  EMAIL_PATTERN: () => EMAIL_PATTERN,
  PHONE_PATTERN: () => PHONE_PATTERN
});
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
var StringValidator = class extends BaseValidator {
  constructor(validatorItem) {
    super(validatorItem);
  }
  required(errorMsg = void 0) {
    return this.errorIf(this.value == void 0 || this.value == "", errorMsg || "This field is required!");
  }
  //////
  max(max, errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value.length > max, errorMsg || `Must be ${max} or fewer characters long`);
  }
  min(min, errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value.length < min, errorMsg || `Must be ${min} or more characters long`);
  }
  length(length, errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value.length == length, errorMsg || `Must be exactly ${length} characters long`);
  }
  /////
  includes(sub, errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value.includes(sub), errorMsg || `Must Include '${sub}'`);
  }
  startsWith(start, errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value.startsWith(start), errorMsg || `Must Start With '${start}'`);
  }
  endsWith(start, errorMsg = void 0) {
    if (this.value == void 0) return this;
    return this.errorIf(this.value.endsWith(start), errorMsg || `Must End With '${start}'`);
  }
  /////
  email(errorMsg = void 0) {
    return this.pattern(EMAIL_PATTERN, errorMsg || "Invalid email address!");
  }
  phone(errorMsg = void 0) {
    return this.pattern(PHONE_PATTERN, errorMsg || "Invalid phone number!");
  }
  // url(errorMsg: string | undefined = undefined) {
  //   return this.pattern(URL_PATTERN, errorMsg || "Invalid url!")
  // }
  // emoji(errorMsg: string | undefined = undefined) {
  //   return this.pattern(URL_PATTERN, errorMsg || "Invalid url!")
  // }
  // uuid(errorMsg: string | undefined = undefined) {
  //   return this.pattern(URL_PATTERN, errorMsg || "Invalid url!")
  // }
  // datetime(errorMsg: string | undefined = undefined) {
  //   return this.pattern(DATETIME_PATTERN, errorMsg || "Invalid datetime string!")
  // }
  // date(errorMsg: string | undefined = undefined) {
  //   return this.pattern(DATE_PATTERN, errorMsg || "Invalid date string!")
  // }
  // time(errorMsg: string | undefined = undefined) {
  //   return this.pattern(TIME_PATTERN, errorMsg || "Invalid time string!")
  // }
  // ip(errorMsg: string | undefined = undefined) {
  //   return this.pattern(TP_PATTERN, errorMsg || "Invalid IP address!")
  // }
  //////
  pattern(pattern, errorMsg) {
    if (this.value == void 0) return this;
    return this.errorIf(!pattern.test(this.value), errorMsg);
  }
  errorIf(errorCondition, errorMsg) {
    return super.baseCondition(errorCondition, errorMsg, this);
  }
};
var ValidatorsCollector = class {
  value;
  _validators;
  get validators() {
    if (this._validators == void 0) this._validators = new AnyValidators(this);
    return this._validators;
  }
  _stringValidators;
  get stringValidators() {
    this.checkType("string");
    if (this._stringValidators == void 0) this._stringValidators = new StringValidator(this);
    return this._stringValidators;
  }
  _numberValidators;
  get numberValidators() {
    if (this.value != void 0 && isNaN(parseInt(this.value))) this.typeError("number");
    if (this._numberValidators == void 0) this._numberValidators = new NumberValidator(this);
    return this._numberValidators;
  }
  checkType(valid) {
    if (this.value != void 0 && typeof this.value != valid) this.typeError(valid);
  }
  typeError(type) {
    throw new Error(`Can not access the ${type} validator from non ${type} ValidatorItem`);
  }
};
var ValidatorItem = class extends ValidatorsCollector {
  constructor(field, setter, validation = void 0) {
    super();
    this.field = field;
    this.setter = setter;
    if (validation != void 0) this.validations = validation;
  }
  valid = void 0;
  message = void 0;
  field;
  setter;
  validate() {
    this.value = this.field();
    this.validations(this.field());
  }
  validations = (value) => {
    this.valid = value != void 0;
    if (value == null) this.message = "No Value Passed!";
  };
  reset() {
    this.valid = void 0;
    this.message = void 0;
  }
  error(msg) {
    this.valid = false;
    this.message = msg;
  }
};
var ValidatorResult = class {
  field;
  value;
  valid;
  message;
};
export {
  Validator,
  ValidatorItem,
  validator_methods_exports as ValidatorMethods,
  ValidatorResult,
  validator_utils_exports as ValidatorUtils
};
//# sourceMappingURL=@bshg_validation.js.map
