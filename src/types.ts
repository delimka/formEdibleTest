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
    allValues: Record<string, string>
  ) => string | null;

  asyncValidate?: (
    value: string,
    allValues: Record<string, string>
  ) => Promise<string | null>;

  //Confition Validation
  condition?: FieldCondition;
  conditionValue?:
    | string
    | number
    | RegExp
    | [number, number]
    | ((value: string, allValues: Record<string, string>) => boolean);
  conditionMessage?: string;
}


interface ValidationCallbacks {
  onValidateStart?: () => void;
  onValidateSuccess?: () => void;
  onValidateError?: (errors: Record<string, string | null>) => void;
}

export interface UseValidationParams {
  configs: { [key: string]: FieldConfig };
  callbacks?: ValidationCallbacks; 
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
  values: FieldValues;
  errors: FieldErrors;
  blurred: { [key: string]: boolean };
  submitted: boolean;
}

export type Action =
  | { type: "CHANGE"; payload: { field: string; value: string } }
  | { type: "BLUR"; payload: { field: string } }
  | { type: "SUBMIT" }
  | { type: "VALIDATE"; payload: FieldErrors }
  | { type: "VALIDATE_FIELD"; payload: { field: string; error: string | null } }
  | { type: "ADD_FIELD"; payload: { fieldName: string; initialValue: string } }
  | { type: "REMOVE_FIELD"; payload: { fieldName: string } };
  
