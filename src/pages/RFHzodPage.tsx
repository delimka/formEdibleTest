import { RegistrationForm } from "../components/ZodHookRegistration/RFHRegistrationForm";
import { LoginForm } from "../components/ZodHookLogin/RFHLoginForm";
import { OrderForm } from "../components/ZodHookOrder/RFHOrderForm";
import { useSearchParams} from "react-router-dom";

export default function RFHzodPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "login";

  const toggleForm = (newForm: string) => {
    setSearchParams({ category: newForm });
  };

  return (
    <>
      <h1>ZOD and React Hook Form</h1>
      <div className="outer-container">
        <button onClick={() => toggleForm("login")}>Login Form</button>
        <button onClick={() => toggleForm("registration")}>
          Registration Form
        </button>
        <button onClick={() => toggleForm("order")}>Order Form</button>
        {categoryParam === "login" ? (
          <LoginForm />
        ) : categoryParam === "registration" ? (
          <RegistrationForm />
        ) : (
          <OrderForm />
        )}
      </div>
    </>
  );
}
