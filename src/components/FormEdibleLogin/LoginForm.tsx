import React from "react";
import { useFormedible } from "@delimka/formedible";
import { LoginFieldConfigs } from "./LoginConfig";

export const LoginForm = () => {
  const { state, dispatch, trigger, validateSingleField } = useFormedible({
    configs: LoginFieldConfigs,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      console.log("Form submitted:", state.values);
    } else {
      console.log("Form contains errors");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const { name, type, checked, value } = e.target;
    const isCheckbox = type === "checkbox";
    dispatch({
      type: "CHANGE",
      payload: { field: name, value: isCheckbox ? checked.toString() : value },
    });
    if (state.errors[name]) {
      validateSingleField(name);
    }
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name;
    trigger([field]);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-column">
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Email or Username</span>
            <input
              name="username"
              value={state.values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {state.errors.username && (
          <div className="error">{state.errors.username}</div>
        )}
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Password</span>
            <input
              name="password"
              type="password"
              value={state.values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {state.errors.password && (
          <div className="error">{state.errors.password}</div>
        )}
      </div>
      <div className="radio-group">
        <div className="checkbox-wrapper">
          <div>
            <input
              id="rememberPassword"
              type="checkbox"
              name="rememberPassword"
              onChange={handleChange}
              checked={!!state.values.rememberPassword}
            />
          </div>
          <span className="label-text pl-20">Remember password</span>
        </div>
      </div>

      <button type="submit">Submit my form</button>
      <div className="form-group text-right">
        <a href="/forgot-password">Forgot Password?</a>
      </div>
    </form>
  );
};
// const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
//   const field = e.target.name;
//   dispatch({ type: "BLUR", payload: { field } });
//   await validateSingleField(field);
// };

// const handleAddPhoneField = () => {
//   const newFieldName = "phone";
//   addField({
//     name: newFieldName,
//     isRequired: true,
//     isMinLength: 4,
//     messages: {
//       isRequired: "This field is required",
//       isMinLength: "sdqwdqwd",
//     },
//     initialValue: "",
//   });
//   setDynamicFields((prevFields) => ({ ...prevFields, [newFieldName]: true }));
// };

// const handleRemovePhoneField = () => {
//   const fieldName = "phone";
//   removeField(fieldName);
//   setDynamicFields((prevFields) => {
//     const newFields = { ...prevFields };
//     delete newFields[fieldName];
//     return newFields;
//   });
// };
{
  /* <div>
        {dynamicFields["phone"] && (
          <div className="form-group">
            <label>
              Phone
              <input
                name="phone"
                value={state.values.phone || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {state.errors.phone && (
                <div className="error">{state.errors.phone}</div>
              )}
            </label>
          </div>
        )}

        {dynamicFields["phone"] ? (
          <button type="button" onClick={handleRemovePhoneField}>
            Remove Phone Field
          </button>
        ) : (
          <button type="button" onClick={handleAddPhoneField}>
            Add Phone Field
          </button>
        )}
      </div> */
}
