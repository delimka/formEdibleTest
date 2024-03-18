import { FieldConfig} from "../../types";

export const LoginFieldConfigs: { [key: string]: FieldConfig  } = {
  username: {
    isRequired: true,
    condition: "matches",
    conditionValue: /^[a-zA-Z0-9]+$/,
    conditionMessage: "Username must be alphanumeric",
  },

  password: {
    isRequired: true,
    isMinLength: 8,
    isNotEqual: "username", // password must differ with username input
    messages: {
      isRequired: "Password is required",
      isMinLength: "Password must be at least 8 characters long",
    },
  },
  rememberPassword: {
    
  },
 
};
const LoginFieldConfigs: { [key: string]: FieldConfig  } = {
  username: {
    isRequired: false, // Меняем на false, так как email может быть альтернативой
    // Остальные правила валидации...
  },
  email: {
    isRequired: false, // Email также не является обязательным, если указано имя пользователя
    isEmail: true,
    messages: {
      isEmail: "Неверный формат email",
    },
  },
  password: {
    isRequired: true,
    // Остальные правила валидации...
  },
  // Остальные поля...
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
const groups = {
  loginInfo: {
    fields: ['username', 'email'],
    validate: (values) => {
      if (!values.username && !values.email) {
        return "Укажите имя пользователя или email";
      }
      return null;
    }
  }
};