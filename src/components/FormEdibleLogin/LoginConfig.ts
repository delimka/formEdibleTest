import { FieldConfig} from "../../types";


export const LoginFieldConfigs: { [key: string]: FieldConfig  } = {
  username: {
    isRequired: true,
    condition: "matches",
    conditionValue: /^[a-zA-Z0-9]+$/,
    conditionMessage: "Username must be alphanumeric",
    customValidate: (value, allValues) =>
value !== allValues.username
  ? null
  : "Password must differ from username",
  },
  password: {
    isRequired: true,
    isMinLength: 8,
    isNotEqual: "username",
    messages: {
      isRequired: "Password is required",
      isMinLength: "Password must be at least 8 characters long",
      isEqualTo:"Password must differ with username"
    },
  },
  rememberPassword: {
    initialValue: "false",
  },
 
};

// age: {
//   isRequired: true,
//   condition: 'greaterThan',
//   conditionValue: '18',
//   conditionMessage: 'You must be older than 18',
// },
// // Custom function example
// customField: {
//   condition: 'custom',
//   conditionValue: (value, allValues) => value.startsWith(allValues['prefix']),
//   conditionMessage: 'Must start with the prefix value',
// },
// username: {
//   isRequired: true,
//   messages: {
//     isRequired: "Username is required",
//   },
// },
// Example of adding a custom email validation
// email: {
//   customValidate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email format",
//   messages: {
//     customValidate: "Please enter a valid email address",
//   },
// },
// confirmPassword: {
//   isRequired: true,
//   isEqualTo: 'password', // confirmPassword must match the password field
//   messages: {
//     isEqualTo: "Passwords do not match",
//     isRequired: "Password confirmation is required" // Custom message for mismatch
//   },
// },


// групповое 
// const groups = {
//   loginInfo: {
//     fields: ['username', 'email'],
//     validate: (values) => {
//       if (!values.username && !values.email) {
//         return "Укажите имя пользователя или email";
//       }
//       return null;
//     }
//   }
// };

// customValidate: (value, allValues) =>
// value !== allValues.username
//   ? null
//   : "Password must differ from username",