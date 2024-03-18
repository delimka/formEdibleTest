import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  login: string;
  password: string;
  rememberPassword: boolean;
};
type FieldName = keyof FormData;


export const LoginForm = () => {
  const schema: ZodType<FormData> = z.object({
    login: z.string().min(1, "Please enter your email or username"),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters long" }),
    rememberPassword: z.boolean(),
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
  });

  const submitData = (data: FormData) => {
    console.log("Data submitted", data);
  };

  const handleBlur = (fieldName: FieldName) => {
    trigger(fieldName);
  };


  return (
    <form onSubmit={handleSubmit(submitData)} className="flex-column">
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Email or Username</span>
            <input
              id="login"
              type="text"
              {...register("login")}
              onBlur={() => handleBlur("login")}
            />
          </label>
        </div>
        {errors.login && <p className="error">{errors.login.message}</p>}
      </div>
      <div className="form-group">
        <div className="input-wrapper">
          <label>
            <span className="label-text">Password</span>
            <input
              id="password"
              type="password"
              {...register("password")}
              onBlur={() => handleBlur("password")}
            />
          </label>
        </div>
        {errors.password && <p className="error">{errors.password.message}</p>}
      </div>
      <div className="radio-group">
        <div className="checkbox-wrapper">
          <div>
            <input
              id="rememberPassword"
              type="checkbox"
              {...register("rememberPassword")}
              onBlur={() => handleBlur("rememberPassword")}
            />
          </div>
          <span className="label-text pl-20">Remember password</span>
        </div>
      </div>
      <button type="submit">Login</button>

      <div className="form-group text-right">
        <a href="/forgot-password">Forgot Password?</a>
      </div>
    </form>
  );
};
