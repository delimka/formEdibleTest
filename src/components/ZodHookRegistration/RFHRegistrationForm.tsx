import  {useEffect} from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  gender?: string | null;
  subscriptionPlan: string;
};

type FieldName = keyof FormData;
const schema: ZodType<FormData> = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Use from 2 to 15 characters" })
      .max(15)
      .refine((value) => /^[a-zA-Z]+$/.test(value), {
        message: "First name must contain only letters",
      }),
    lastName: z
      .string()
      .min(2, { message: "Use from 2 to 15 characters" })
      .max(15, { message: "Use from 2 to 15 characters" }),
    email: z.string().email(),
    age: z
      .number()
      .min(18, { message: "18 to 70" })
      .max(70, { message: "18 to 70" })
      .optional(),
    password: z.string().min(5).max(20),
    confirmPassword: z.string().min(5).max(20),
    phoneNumber: z.string().min(6).max(12),
    gender: z.string().optional().nullable(),
    subscriptionPlan: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const checkEmailExists = async (email: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Example: return true if email exists, false otherwise
  const existingEmails = ["existing@example.com"]; // Example existing emails
  return existingEmails.includes(email);
};

export const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
  });

  const email = watch("email");

  useEffect(() => {
    const validateEmailUniqueness = async () => {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setError("email", {
          type: "manual",
          message: "Email already exists",
        });
      } else {
        clearErrors("email");
      }
    };

    if (email) {
      validateEmailUniqueness();
    }
  }, [email, setError, clearErrors]);


  const handleBlur = (fieldName: FieldName) => {
    trigger(fieldName);
  };

  const submitData = (data: FormData) => {
    console.log("Data submitted", data);
  };

  console.log("Errors", errors);

  return (
    <form onSubmit={handleSubmit(submitData)} className="flex-column">
      <div className="form-row">
        <div className="form-group">
          <div className="input-wrapper">
            <label>
              <span className="label-text">First Name</span>
              <input
                type="text"
                {...register("firstName")}
                onBlur={() => handleBlur("firstName")}
              />
            </label>
          </div>
          {errors.firstName && (
            <span className="error"> {errors.firstName.message}</span>
          )}
        </div>
        <div className="form-group">
          <div className="input-wrapper">
            <label>
              <span className="label-text">Last Name</span>
              <input
                type="text"
                {...register("lastName")}
                onBlur={() => handleBlur("lastName")}
              />
            </label>
          </div>
          {errors.lastName && (
            <span className="error"> {errors.lastName.message}</span>
          )}
        </div>
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">E-mail</span>
            <input
              type="text"
              {...register("email")}
              onBlur={() => handleBlur("email")}
            />
          </label>
        </div>
        {errors.email && <span className="error"> {errors.email.message}</span>}
      </div>
      <div className="form-row">
        <div className="form-group">
          <div className="input-wrapper">
            <label>
              <span className="label-text">Age</span>
              <input
                type="number"
                {...register("age", { valueAsNumber: true })}
              />
            </label>
          </div>
          {errors.age && <span className="error"> {errors.age.message}</span>}
        </div>
        <div className="form-group group-space">
          <span className="label-text">Gender</span>
          <div className="input-wrapper">
            <label className="row" htmlFor="">
              <div>
                <input
                  type="radio"
                  id="male"
                  value="Male"
                  {...register("gender")}
                  className="radio-input"
                />
                <label htmlFor="male" className="radio-label">
                  Mr
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  value="Female"
                  {...register("gender")}
                  className="radio-input"
                />
                <label htmlFor="female" className="radio-label">
                  Mrs
                </label>
              </div>
            </label>
          </div>

          {errors.gender && (
            <span className="error">{errors.gender.message}</span>
          )}
        </div>
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Password</span>
            <input
              type="password"
              {...register("password")}
              onBlur={() => handleBlur("password")}
            />
          </label>
        </div>
        {errors.password && (
          <span className="error"> {errors.password.message}</span>
        )}
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Confirm Password</span>
            <input
              type="password"
              {...register("confirmPassword")}
              onBlur={() => handleBlur("confirmPassword")}
            />
          </label>
        </div>
        {errors.confirmPassword && (
          <span className="error"> {errors.confirmPassword.message}</span>
        )}
      </div>

      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Phone Number</span>
            <input
              type="text"
              {...register("phoneNumber")}
              onBlur={() => handleBlur("phoneNumber")}
            />
          </label>
        </div>
        {errors.phoneNumber && (
          <span className="error"> {errors.phoneNumber.message}</span>
        )}
      </div>

      <div className="form-group">
        <div className="input-wrapper">
          <span className="label-text">Subscription Plan</span>
          <select {...register("subscriptionPlan")}>
            <option value="">Select...</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        {errors.subscriptionPlan && (
          <span className="error">{errors.subscriptionPlan.message}</span>
        )}
      </div>

      <button type="submit">Submit Order</button>
    </form>
  );
};
