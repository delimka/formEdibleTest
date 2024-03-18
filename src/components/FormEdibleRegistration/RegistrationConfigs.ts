import { FieldConfig } from "../../types";

const checkEmailExistence = async (email: string): Promise<boolean> => {

  await new Promise((resolve) => setTimeout(resolve, 500));
  // Mock condition: Email exists if it includes "exists"
  return email.includes("exists");
};

export const RegistrationFieldConfigs: { [key: string]: FieldConfig } = {
  firstName: {
    isRequired: true,
    isMaxLength:20,
    isMinLength:2,
    customValidate: (value) => {
      const isValidUsername = /^[a-zA-Z]+$/.test(value);
      if (!isValidUsername) {
          return "First name must contain only letters";
      }
      return null;
      },
    messages: {
      isMaxLength:"Use less than 20 characters",
      isMinLength:"Use more than 2 characters",
      isRequired: "First name is required",
    },
  },
  addressNest:{
    
  },
  lastName: {
    isRequired: true,
    messages: {
      isRequired: "Last name is required",
    },
  },
  age: {
    isRequired: false,
    // condition: 'between',
    // conditionValue: [18,120],
    // customValidate: (value) => {
    //   const isValidUsername = /^[0-9]+$/.test(value);
    //   if (!isValidUsername) {
    //       return "First name must contain only numbers";
    //   }
    //     return null;
    //   },
    // messages: {
    // },
  },
  email: {
    isRequired: true,
    isEmail: true,
    asyncValidate: async (value) => {
      const exists = await checkEmailExistence(value); // Assume this is an async function
      return exists ? "Email already in use" : null;
    },
    messages: {
      isRequired: "Email is required",
      isEmail: "Please enter a valid email address",
    },
  },
  address: {
    isRequired: true,
    messages: {
      isRequired: "Address is required",
    },
  },
  phoneNumber: {
    isRequired: true,
    // customValidate: (value) => {
    //   const isValidPhoneNumber = /^\d{6,12}$/.test(value);
    //   if (!isValidPhoneNumber) {
    //     return "Phone number must have from 6 to 12 digits and contain only numbers";
    //   }
    //   return null;
    // },
    isPhone: true,
    messages: {
      isRequired: "Phone number is required",
    },
  },
  password: {
    isRequired: true,
    isMinLength: 8,
    isNotEqual:'username', // password must differ with username input
    messages: {
      isRequired: "Password is required",
      isMinLength: "Password must be at least 8 characters long",
    },
    
  },
  confirmPassword: {
    isRequired: true,
    isEqualTo: 'password', // confirmPassword must match the password field
    messages: {
      isEqualTo: "Passwords do not match",
      isRequired: "Password confirmation is required" // Custom message for mismatch
    },
  },
  gender: {
    isRequired: false,
    messages: {
      isRequired: "Please select your gender",
    },
  },
  subscriptionPlan: {
    isRequired: true,
    messages: {
      isRequired: "Please select a subscription plan",
    },
  },
};
