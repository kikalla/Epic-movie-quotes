import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json ";
import ka from "@vee-validate/i18n/dist/locale/ka.json ";

configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: "{field} field is required",
        email: "This input is not in email format",
        min: "{field} must have at least 0:{min} symbols",
        low_case: "Enter only lowe case letters",
        max: "{field} can be max 0:{max} characters long",
        confirmed: "Passwords must match",
      },
      names: {
        confirm: "Password Confirm",
        username: "Username",
        email: "Email",
        password: "Password",
      },
    },
    ka: {
      ...ka,
      messages: {
        required: "გთხოვთ შეავსოთ მოცემული ველი",
        email: "თქვენს მიერ შეყვანილი ტექსტი არ აკმაყოფილებს მეილის ფორმატს",
        min: "{field} უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს",
      },
      names: {
        password: "პაროლი",
        username: "მომხმარებლის სახელი",
        email: "მეილი",
      },
    },
  }),
});
