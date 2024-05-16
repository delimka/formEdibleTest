import { FieldConfig } from "../../types";


export const OrderConfigs: { [key: string]: FieldConfig } = {
  firstName: {
    isRequired: true,
    isMaxLength:20,
    isMinLength:2,
    customValidate: (value) => {
      const isValidUsername = /^[a-zA-Z]+$/.test(value);
      if (!isValidUsername) {
          return "Name must contain only letters";
      }
        return null;
      },
    messages: {
      isMaxLength:"Use less than 20 characters",
      isMinLength:"Use more than 2 characters",
      isRequired: "Name is required",
    },
  },
  address1_0: {
    isRequired: true,
    

  },
  address2_0: {
    isRequired: true,

  },
  country_0: {
    isRequired: true,

  },
  postCode_0: {
    isRequired: true,

  },
  lastName: {
    isRequired: true,
    messages: {
      isRequired: "Last name is required",
    },
  },
  dayOfBirth: {
    isRequired: true,
    messages: {
      isRequired: "Day is required",
    },
  },
  monthOfBirth: {
    isRequired: true,
    messages: {
      isRequired: "Month is required",
    },
  },
  yearOfBirth: {
    isRequired: true,
    messages: {
      isRequired: "Year is required",
    },
  },

  // age: {
  //   condition: 'between',
  //   conditionValue: [18,120],
  //   customValidate: (value) => {
  //     const isValidUsername = /^[0-9]+$/.test(value);
  //     if (!isValidUsername) {
  //         return "First name must contain only numbers";
  //     }
  //       return null;
  //     },
  //   isRequired: true,
  //   messages: {
  //   },
  // },
  email: {
    isRequired: true,
    isEmail: true,

    messages: {
      isRequired: "Email is required",
      isEmail: "Please enter a valid email address",
    },
  },
  // address: {
  //   isRequired: true,
  //   messages: {
  //     isRequired: "Address is required",
  //   },
  // },
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
      isPhone:"Please, enter valid phone number",
      isRequired: "Phone number is required",
    },
  },
};
