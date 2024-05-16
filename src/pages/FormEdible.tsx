//Commented code is an example of using context,I will apply all features from library directly inside components login/registration/orders

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LoginForm } from "../components/FormEdibleLogin/LoginForm";
// import { LoginFieldConfigs } from "../components/FormEdibleLogin/LoginConfig";
import { RegistrationForm } from "../components/FormEdibleRegistration/RegistrationForm";
// import { RegistrationFieldConfigs } from "../components/FormEdibleRegistration/RegistrationConfigs";
import { OrderForm } from "../components/FormEdibleOrder/OrderForm";
// import { OrderConfigs } from "../components/FormEdibleOrder/OrderConfigs";
// import { ValidationProvider } from "./../context/ValidationProvider";

const FormEdible = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "login";
  const [validationKey, setValidationKey] = useState(0);

  useEffect(() => {
    if (!["login", "register", "order"].includes(categoryParam)) {
      setSearchParams({ category: "login" });
    }
  }, [categoryParam, setSearchParams]);

  const toggleForm = (newForm: string) => {
    setSearchParams({ category: newForm });
    if (validationKey !== -1) {
      setValidationKey((prevKey) => prevKey + 1);
    }
  };

  // const getCurrentFormConfigs = () => {
  //   switch (categoryParam) {
  //     case "login":
  //       return LoginFieldConfigs;
  //     case "register":
  //       return RegistrationFieldConfigs;
  //     case "order":
  //       return OrderConfigs;
  //     default:
  //       return {};
  //   }
  // };

  const getCurrentFormComponent = () => {
    switch (categoryParam) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegistrationForm />;
      case "order":
        return <OrderForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <h1>FormEdible Form</h1>
      <div className="outer-container">
        <button onClick={() => toggleForm("login")}>Login Form</button>
        <button onClick={() => toggleForm("register")}>
          Registration Form
        </button>
        <button onClick={() => toggleForm("order")}>Order Form</button>
        {/* <ValidationProvider key={validationKey} configs={getCurrentFormConfigs()}> */}
        {getCurrentFormComponent()}
        {/* </ValidationProvider> */}
      </div>
    </>
  );
};

export default FormEdible;
