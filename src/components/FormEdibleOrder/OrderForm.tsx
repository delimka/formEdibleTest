import {  useState } from "react";
import { OrderConfigs } from "./OrderConfigs"; 
import { useFormedible } from "@delimka/formedible";

export const OrderForm = () => {
  const [addressIds, setAddressIds] = useState([0]);
  const [addressCount, setAddressCount] = useState(1);

  const { state, dispatch, trigger, addField, removeField} = useFormedible({
    configs: OrderConfigs, 
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.stopPropagation();

    dispatch({
      type: "CHANGE",
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name;
    await trigger([field]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = await trigger();
  
    if (isValid) {
      // Создание массива адресовs
      const addresses = addressIds.map(id => ({ 
        address1: state.values[`address1_${id}`],
        address2: state.values[`address2_${id}`],
        country: state.values[`country_${id}`],
        postCode: state.values[`postCode_${id}`],
      }));
  
      const filteredValues = { ...state.values };
      addressIds.forEach(id => {
        delete filteredValues[`address1_${id}`];
        delete filteredValues[`address2_${id}`];
        delete filteredValues[`country_${id}`];
        delete filteredValues[`postCode_${id}`];
      });
  
      const formData = {
        ...filteredValues,
        addresses,
      };
  
      console.log("Form submitted:", formData);
    } else {
      console.error("Form contains errors.");
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, i) => currentYear - i
  );

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);


  const handleAddAddress = () => {
    const newId = addressCount;
    setAddressIds((ids) => [...ids, newId]);
    setAddressCount(newId + 1);

    const fields = ["address1", "address2", "country", "postCode"];
    fields.forEach((field) => {
      addField({
        name: `${field}_${newId}`,
        isRequired: true,
      });
    });
  };

  const handleRemoveAddress = (idToRemove: number) => {
    if (addressIds.length > 1) {
      setAddressIds((ids) => ids.filter((id) => id !== idToRemove));

      const fields = ["address1", "address2", "country", "postCode"];
      fields.forEach((field) => {
        removeField(`${field}_${idToRemove}`);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-column">
      <div className="form-column">
        <span>Your Name:</span>
        <div className="form-row">
          <div className="input-wrapper">
            <input
              name="firstName"
              value={state.values.firstName || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="First"
              className={state.errors.firstName ? "error-input" : ""}
            />
          </div>
          <div className="input-wrapper">
            <input
              name="lastName"
              value={state.values.lastName || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Last"
              className={state.errors.lastName ? "error-input" : ""}
            />
          </div>
        </div>
        {(state.errors.firstName || state.errors.lastName) && (
          <span className="error"> {state.errors.firstName}</span>
        )}
      </div>

      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">E-mail</span>
            <input
              autoComplete="on"
              type="text"
              name="email"
              placeholder="example@gmail.com"
              value={state.values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={state.errors.email ? "error-input" : ""}
            />
          </label>
        </div>
        {state.errors.email && (
          <span className="error"> {state.errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <span>Phone Number</span>
        <input
          name="phoneNumber"
          value={state.values.phoneNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {state.errors.phoneNumber && (
          <span className="error">{state.errors.phoneNumber}</span>
        )}
      </div>

      <div className="form-group gap-15">
        <span>Date of Birth</span>
        <div className="form-row">
          <select
            className={
              state.errors.dayOfBirth ||
              state.errors.monthOfBirth ||
              state.errors.yearOfBirth
                ? "error-input"
                : ""
            }
            name="dayOfBirth"
            value={state.values.dayOfBirth}
            onChange={handleChange}
          >
            <option value="" disabled>
              Day
            </option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <select
            className={
              state.errors.dayOfBirth ||
              state.errors.monthOfBirth ||
              state.errors.yearOfBirth
                ? "error-input"
                : ""
            }
            name="monthOfBirth"
            value={state.values.monthOfBirth}
            onChange={handleChange}
          >
            <option value="" disabled>
              Month
            </option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            className={
              state.errors.dayOfBirth ||
              state.errors.monthOfBirth ||
              state.errors.yearOfBirth
                ? "error-input"
                : ""
            }
            name="yearOfBirth"
            value={state.values.yearOfBirth}
            onChange={handleChange}
          >
            <option value="" disabled>
              Year
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {(state.errors.dayOfBirth ||
          state.errors.monthOfBirth ||
          state.errors.yearOfBirth) && (
          <span className="error">Date of Birth is required</span>
        )}
      </div>
      {addressIds.map((id) => (
        <div key={id} className="form-row">
          <div className="form-group">
            <label>Address {id + 1}:</label>
            <input
              placeholder="Address line 1"
              name={`address1_${id}`}
              value={state.values[`address1_${id}`] || ""}
              onChange={handleChange}
            />
            <input
              placeholder="Address line 2"
              name={`address2_${id}`}
              value={state.values[`address2_${id}`] || ""}
              onChange={handleChange}
            />
            <input
              placeholder="Country"
              name={`country_${id}`}
              value={state.values[`country_${id}`] || ""}
              onChange={handleChange}
            />
            <input
              placeholder="Postal code"
              name={`postCode_${id}`}
              value={state.values[`postCode_${id}`] || ""}
              onChange={handleChange}
            />
            <button
              type="button"
              className={addressCount === 1 ? "disabled" : ""}
              disabled={addressCount === 1}
              onClick={() => handleRemoveAddress(id)}
            >
              Remove Address
            </button>
          </div>
        </div>
      ))}

      <button type="button" onClick={handleAddAddress}>
        Add Address
      </button>
      <button type="submit">Submit Order</button>
    </form>
  );
};
