import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const addressSchema = z.object({
  address1: z.string().min(1, "Address line 1 is required"),
  address2: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  postCode: z.string().min(1, "Postal code is required"),
});

const schema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .regex(/^[A-Za-z ]+$/, "Name can only contain letters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .regex(/^[A-Za-z ]+$/, "Last name can only contain letters"),
    email: z.string().email(),
    phoneNumber: z
      .string()
      .regex(/^\+\d{1,3}\d{4,15}$/, "Start with + and then 4 to 15 digits"),
    dayOfBirth: z.string().min(1, "Day of birth is required"),
    monthOfBirth: z.string().min(1, "Month of birth is required"),
    yearOfBirth: z.string().min(1, "Year of birth is required"),
    addresses: z.array(addressSchema),
  })
  .refine(
    (data) => {
      const date = new Date(
        `${data.yearOfBirth}-${data.monthOfBirth.padStart(
          2,
          "0"
        )}-${data.dayOfBirth.padStart(2, "0")}`
      );
      return !isNaN(date.getTime());
    },
    {
      message: "Invalid date of birth",
      path: ["dayOfBirth", "monthOfBirth", "yearOfBirth"],
    }
  );
  
type FormData = z.infer<typeof schema>;

export const OrderForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      addresses: [{ address1: "", address2: "", country: "", postCode: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addresses",
  });

  const submitOrder: SubmitHandler<FormData> = (data) => {
    console.log("Data submitted", data);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, i) => currentYear - i
  );

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <form onSubmit={handleSubmit(submitOrder)} className="flex-column">
      <div className="form-column">
        <span>Your Name:</span>
        <div className="form-row">
          <div className="input-wrapper">
            <input
              {...register("name")}
              placeholder="First"
              className={errors.name ? "error-input" : ""}
            />
          </div>
          <div className="input-wrapper">
            <input
              {...register("lastName")}
              placeholder="Last"
              className={errors.lastName ? "error-input" : ""}
            />
          </div>
        </div>
        {errors.name && <span className="error"> {errors.name.message}</span>}
      </div>

      <div className="form-group">
        <span>Email:</span>
        <input
          type="email"
          {...register("email")}
          placeholder="example@example.com"
          className={errors.email ? "error-input" : ""}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <span>Phone Number</span>
        <input
          placeholder="Example: +372 2323213"
          type="tel"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <span className="error">{errors.phoneNumber.message}</span>
        )}
      </div>

      <div className="form-group gap-15">
        <span>Date of Birth</span>
        <div className="form-row">
          <select
            className={
              errors.dayOfBirth || errors.monthOfBirth || errors.yearOfBirth
                ? "error-input"
                : ""
            }
            {...register("dayOfBirth")}
            defaultValue=""
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
              errors.dayOfBirth || errors.monthOfBirth || errors.yearOfBirth
                ? "error-input"
                : ""
            }
            {...register("monthOfBirth")}
            defaultValue=""
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
              errors.dayOfBirth || errors.monthOfBirth || errors.yearOfBirth
                ? "error-input"
                : ""
            }
            {...register("yearOfBirth")}
            defaultValue=""
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
        {(errors.dayOfBirth || errors.monthOfBirth || errors.yearOfBirth) && (
          <span className="error">Date of Birth is required</span>
        )}
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="form-row">
          <div className="form-group">
            <label>Address {index + 1}:</label>
            <input
              placeholder="Address line 1"
              {...register(`addresses.${index}.address1`)}
            />
            <input
              placeholder="Address line 2"
              {...register(`addresses.${index}.address2`)}
            />
            <input
              placeholder="Country"
              {...register(`addresses.${index}.country`)}
            />
            <input
              placeholder="Postal Code"
              {...register(`addresses.${index}.postCode`)}
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className={fields.length === 1 ? "disabled" : ""}
              disabled={fields.length === 1}
            >
              Remove Address
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ address1: "", address2: "", country: "", postCode: "" })
        }
      >
        Add Address
      </button>
      <button type="submit">Submit Order</button>
    </form>
  );
};
