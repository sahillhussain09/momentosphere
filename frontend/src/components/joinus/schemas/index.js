import * as yup from "yup";

export const signupSchemas = yup.object({
  username: yup
    .string()
    .matches(
      /^[a-zA-Z0-9_.]+$/,
      "Username can only contain letters, numbers, underscores, and dots"
    )
    .test(
      "no-empty-spaces",
      "Username cannot contain empty spaces between characters",
      (value) => {
        if (value) {
          return !/\s/.test(value);
        }
        return true;
      }
    )
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot be longer than 20 characters")
    .required("Please enter your name"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Please enter your email"),
  password: yup.string().min(6).required("Password must be 6 characters"),
});
