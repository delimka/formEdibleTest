import { useState } from "react";
import { useFormedible } from "../../useFormedible";
import { RegistrationFieldConfigs } from "./RegistrationConfigs";
import { ErrorType } from "../../types";


const onValidateStart = () => console.log("Validation started");
const onValidateError = (errors: ErrorType) =>
  console.log("Validation errors", errors);

export const RegistrationForm = () => {

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const onValidateSuccess = () => {
    console.log("Validation succeeded");
    setIsFormSubmitted(true); 
  };
  const { state, dispatch, validateSingleField, validateAllFields } = useFormedible({
    configs: RegistrationFieldConfigs, 
    callbacks: {
      onValidateStart,
      onValidateSuccess,
      onValidateError,
    },
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({
      type: "CHANGE",
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name;
    dispatch({ type: "BLUR", payload: { field } });
    await validateSingleField(field);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateAllFields();
    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (!hasErrors) {
      console.log("Form submitted:", state.values);
    } else {
      console.error("Form contains errors");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-column">
       {isFormSubmitted && (
          <div
            style={{
              background: "green",
              color: "white",
              padding: "10px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ marginRight: "10px" }}>✓</span> Form submitted
            successfully!
          </div>
        )}
      <div className="form-row">
        <div className="form-group">
          <div className="input-wrapper">
            <label>
              <span className="label-text">First Name</span>
              <input
                name="firstName"
                value={state.values.firstName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>
          {state.errors.firstName && (
            <div className="error">{state.errors.firstName}</div>
          )}
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <label>
              <span className="label-text">Last Name</span>
              <input
                name="lastName"
                value={state.values.lastName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>
          {state.errors.lastName && (
            <div className="error">{state.errors.lastName}</div>
          )}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <div className="input-wrapper">
            <label>
              <span className="label-text">Age</span>
              <input
                type="number"
                name="age"
                value={state.values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </label>
          </div>
          {state.errors.age && <div className="error">{state.errors.age}</div>}
        </div>
        <div className="form-group group-space">
          <span className="label-text">Gender</span>
          <div className="input-wrapper">
            <label className="row" htmlFor="">
              <div>
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={state.values.gender === "Male"}
                  className="radio-input"
                />
                <label htmlFor="male" className="radio-label">
                  Mr
                </label>
              </div>
              <div>
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  checked={state.values.gender === "Female"}
                  className="radio-input"
                />
                <label htmlFor="female" className="radio-label">
                  Mrs
                </label>
              </div>
            </label>
          </div>
          {state.errors.gender && (
            <div className="error">{state.errors.gender}</div>
          )}
        </div>
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Email</span>
            <input
              autoComplete="on"
              type="text"
              name="email"
              value={state.values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {state.errors.email && (
          <div className="error">{state.errors.email}</div>
        )}
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Password</span>
            <input
              autoComplete="on"
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

      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Confirm Password</span>
            <input
              name="confirmPassword"
              type="password"
              value={state.values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {state.errors.confirmPassword && (
          <div className="error">{state.errors.confirmPassword}</div>
        )}
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Address</span>
            <input
              name="address"
              value={state.values.address || ""}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {state.errors.address && (
          <div className="error">{state.errors.address}</div>
        )}
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Phone number</span>
            <input
              name="phoneNumber"
              value={state.values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {state.errors.phoneNumber && (
          <div className="error">{state.errors.phoneNumber}</div>
        )}
      </div>

      <div>
        <label>
          Subscription Plan
          <select
            name="subscriptionPlan"
            value={state.values.subscriptionPlan || ""}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </select>
        </label>
        {state.errors.subscriptionPlan && (
          <div className="error">{state.errors.subscriptionPlan}</div>
        )}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
