export interface FieldConfig {
  //Implemented methods
  isRequired?: boolean;
  isMinLength?: number;
  isMaxLength?: number;
  isNotEqual?: string;
  message?: string;
  isEqualTo?: string;
  initialValue?: string;
  isEmail?: boolean;
  isPhone?: boolean;
  isDate?: boolean;
  isUrl?: boolean;
  isFile?: boolean;
  isLogicValid?: (allValues: Record<string, any>) => boolean;
  // Messages for validations
  messages?: {
    isRequired?: string;
    isMinLength?: string;
    isMaxLength?: string;
    isEqualTo?: string;
    isNotEqual?: string;
    isEmail?: string;
    isPhone?: string;
    isDate?: string;
    isUrl?: string;
    isFile?: string;
    [key: string]: string | undefined;
  };

  customValidate?: (
    value: string,
    allValues: Record<string, string | boolean>
  ) => string | null;

  asyncValidate?: (
    value: string,
    allValues: Record<string, string | boolean>
  ) => Promise<string | null>;

  //Confition Validation
  condition?: FieldCondition;
  conditionValue?:
    | string
    | number
    | RegExp
    | [number, number]
    | ((value: string, allValues: Record<string, string | boolean>) => boolean);
  conditionMessage?: string;
}


interface ValidationCallbacks {
  onValidateStart?: () => void;
  onValidateSuccess?: () => void;
  onValidateError?: (errors: Record<string, string | null>) => void;
  onFieldValidate?: (fieldName: string, arg2: boolean) => void;
}

export interface UseValidationParams {
  configs: { [key: string]: FieldConfig };
  callbacks?: ValidationCallbacks; 
  groups?: Record<string, FieldGroupConfig>; 
}

type FieldCondition =
  | "equals"
  | "notEquals"
  | "greaterThan"
  | "lessThan"
  | "matches"
  | "custom"
  | "between"

export interface NamedFieldConfig extends FieldConfig {
  name: string;
}

export interface FieldGroupConfig {
  fields: string[]; 
  validate: (values: Record<string, any>) => string | null; 
}
export type ErrorType = {
  [key: string]: string | null;
};

export interface FieldValues {
  [key: string]: string;
}

export interface FieldErrors {
  [key: string]: string | null;
}

export interface FormState {
  values: { [key: string]: string | boolean };
  errors: FieldErrors;
  blurred: { [key: string]: boolean };
  submitted: boolean;
}

export type Action =
  | { type: "CHANGE"; payload: { field: string; value: string | boolean } }
  | { type: "BLUR"; payload: { field: string } }
  | { type: "SUBMIT" }
  | { type: "VALIDATE"; payload: FieldErrors }
  | { type: "VALIDATE_FIELD"; payload: { field: string; error: string | null } }
  | { type: "ADD_FIELD"; payload: { fieldName: string; initialValue: string | boolean } }
  | { type: "REMOVE_FIELD"; payload: { fieldName: string } };
