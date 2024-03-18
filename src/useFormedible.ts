import { useReducer, useEffect, useCallback } from "react";
import {
  FieldConfig,
  FormState,
  Action,
  NamedFieldConfig,
  UseValidationParams,
  FieldGroupConfig
} from "./types";

function validateField(
  value: string,
  config: FieldConfig,
  allValues: Record<string, string>
): string | null {
  if (!config) {
    console.error("Config is undefined for the field.");
    return "Configuration error";
  }

  if (config.isRequired && !value) {
    return config.messages?.isRequired || "This field is required";
  }
  if (config.isLogicValid && !config.isLogicValid(allValues)) {
    return config.messages?.isLogicValid || "Logic validation failed";
  }

  if (config.isMinLength && value.length < config.isMinLength) {
    return (
      config.messages?.isMinLength || `Minimum length is ${config.isMinLength}`
    );
  }

  if (config.isMaxLength && value.length > config.isMaxLength) {
    return (
      config.messages?.isMaxLength || `Maximum length is ${config.isMaxLength}`
    );
  }

  if (config.isEqualTo && allValues[config.isEqualTo] !== value) {
    return (
      config.messages?.isEqualTo ||
      `This field must match with ${config.isEqualTo}`
    );
  }

  if (config.isNotEqual && allValues[config.isNotEqual] === value) {
    return (
      config.messages?.isNotEqual ||
      `This field must not match with ${config.isNotEqual}`
    );
  }

  if (
    config.isEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value as string)
  ) {
    return config.messages?.isEmail || "Invalid email format";
  }

  if (config.isPhone && !/^\+\d{1,3}[0-9]{5,12}$/.test(value as string)) {
    return (
      config.messages?.isPhone ||
      "Invalid phone number format, expected +(xxx) xxxxxx "
    );
  }

  if (config.isDate && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return (
      config.messages?.isDate || "Invalid date format, expected YYYY-MM-DD"
    );
  }

  if (config.isUrl && !/^(https?:\/\/)[^\s$.?#].[^\s]*$/.test(value)) {
    return config.messages?.isUrl || "Invalid URL format";
  }

  if (config.isFile && !value) {
    return config.messages?.isFile || "File is required";
  }

  let errorMessage: string | null = null;

  if (config.customValidate) {
    const customError = config.customValidate(value, allValues);
    if (customError) {
      return config.messages?.customValidate || customError;
    }
  }

  const conditionalOrCustomError = checkConditionalAndCustomValidations(
    value,
    config,
    allValues
  );
  if (conditionalOrCustomError) {
    errorMessage = conditionalOrCustomError;
  }

  return errorMessage;
}

function checkConditionalAndCustomValidations(
  value: string,
  config: FieldConfig,
  allValues: Record<string, string>
) {
  switch (config.condition) {
    case "greaterThan":
      if (
        !(
          parseFloat(value) >
          parseFloat(allValues[config.conditionValue as string])
        )
      ) {
        return (
          config.conditionMessage ||
          `Value must be greater than ${config.conditionValue}`
        );
      }
      break;
    case "between": {
      const [min, max] = config.conditionValue as [number, number];
      if (!(parseFloat(value) >= min && parseFloat(value) <= max)) {
        return (
          config.conditionMessage || `Value must be between ${min} and ${max}`
        );
      }
      break;
    }
    case "lessThan":
      if (
        !(
          parseFloat(value) <
          parseFloat(allValues[config.conditionValue as string])
        )
      ) {
        return (
          config.conditionMessage ||
          `Value must be less than ${config.conditionValue}`
        );
      }
      break;
    case "matches":
      if (
        config.conditionValue instanceof RegExp &&
        !config.conditionValue.test(value)
      ) {
        return (
          config.conditionMessage || `Value does not match required pattern`
        );
      }
      break;
    case "custom":
      if (
        typeof config.conditionValue === "function" &&
        !config.conditionValue(value, allValues)
      ) {
        return config.conditionMessage || `Custom validation failed`;
      }
      break;
  }
}

function validateGroup(groupConfig: FieldGroupConfig, allValues: Record<string, any>): string | null {
  return groupConfig.validate(allValues);
}

function validateFields(
  values: Record<string, string>,
  configs: Record<string, FieldConfig>,
  groups?: Record<string, FieldGroupConfig>
): Record<string, string | null> {
  const errors: Record<string, string | null> = {};

  Object.keys(values).forEach((field) => {
    console.log(`Validating: ${field}`);
    const value = values[field] ?? "";
    const config = configs[field];
    if (!config) {
      console.error(`No config found for field: ${field}`);
      errors[field] = "Configuration error";
      return;
    }
    const error = validateField(value, config, values);
    errors[field] = error;
  });

  Object.keys(groups || {}).forEach((groupName) => {
    groups = groups || {}; 
    const groupConfig = groups[groupName];
    const groupError = validateGroup(groupConfig, values);
    if (groupError) {
      groupConfig.fields.forEach((fieldName) => {
        errors[fieldName] = errors[fieldName] || groupError;
      });
    }
  });


  return errors;
}

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.field]: action.payload.value,
        },
      };
    case "BLUR":
      return {
        ...state,
        blurred: { ...state.blurred, [action.payload.field]: true },
      };
    case "SUBMIT":
      return {
        ...state,
        submitted: true,
      };
    case "VALIDATE":
      return {
        ...state,
        errors: action.payload,
      };
    case "VALIDATE_FIELD":
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error,
        },
      };
    case "ADD_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.fieldName]: action.payload.initialValue,
        },
        errors: { ...state.errors, [action.payload.fieldName]: null },
        blurred: { ...state.blurred, [action.payload.fieldName]: false },
      };
    case "REMOVE_FIELD": {
      const newState = {
        ...state,
        values: { ...state.values },
        errors: { ...state.errors },
        blurred: { ...state.blurred },
      };

      delete newState.values[action.payload.fieldName];
      delete newState.errors[action.payload.fieldName];
      delete newState.blurred[action.payload.fieldName];

      return newState;
    }
    default:
      throw new Error("Unknown action type");
  }
}
export const useFormedible = ({
  configs,
  callbacks = {},
}: UseValidationParams) => {
  const {
    onValidateStart = () => {},
    onValidateSuccess = () => {},
    onValidateError = () => {},
  } = callbacks;

  const initialState: FormState = {
    values: Object.keys(configs).reduce(
      (acc, key) => ({ ...acc, [key]: configs[key].initialValue || "" }),
      {}
    ),
    errors: {},
    blurred: {},
    submitted: false,
  };

  const [state, dispatch] = useReducer(formReducer, initialState);
  const validateAllFields = useCallback(() => {
    onValidateStart?.();

    const errors = validateFields(state.values, configs);
    dispatch({ type: "VALIDATE", payload: errors });

    const hasErrors = Object.values(errors).some((error) => error !== null);

    if (hasErrors) {
      onValidateError?.(errors);
    } else {
      onValidateSuccess?.();
    }

    return errors;
  }, [
    configs,
    onValidateStart,
    onValidateSuccess,
    onValidateError,
    state.values,
  ]);
  useEffect(() => {
    if (state.submitted) {
      onValidateStart?.();

      const errors = validateFields(state.values, configs);
      dispatch({ type: "VALIDATE", payload: errors });

      const hasErrors = Object.values(errors).some((error) => error !== null);
      if (hasErrors) {
        onValidateError?.(errors);
      } else {
        onValidateSuccess?.();
      }
    }
  }, [state.values, configs, state.submitted, callbacks]);

  async function validateSingleField(field: string) {
    const config = configs[field];
    const value = state.values[field];
    let error = validateField(value, config, state.values);

    if (!error && config.asyncValidate) {
      error = await config.asyncValidate(value, state.values);
    }

    dispatch({
      type: "VALIDATE_FIELD",
      payload: { field, error },
    });
  }

  function addField(fieldConfig: NamedFieldConfig) {
    if (fieldConfig.name !== undefined) {
      configs[fieldConfig.name] = fieldConfig;
    }
    dispatch({
      type: "ADD_FIELD",
      payload: {
        fieldName: fieldConfig.name || "",
        initialValue: fieldConfig.initialValue || "",
      },
    });
  }

  function removeField(fieldName: string) {
    delete configs[fieldName];
    dispatch({ type: "REMOVE_FIELD", payload: { fieldName } });
  }

  return {
    state,
    dispatch,
    validateSingleField,
    addField,
    removeField,
    validateField,
    validateAllFields,
  };
};
