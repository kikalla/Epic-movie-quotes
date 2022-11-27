import { defineRule } from "vee-validate";
import { email, required, min, max, confirmed } from "@vee-validate/rules";

defineRule("email", email);
defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);

defineRule("low_case", (value) => {
  // eslint-disable-next-line no-useless-escape
  if (!/^[a-z0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(value)) {
    return "Enter only lowe case letters";
  }
  return true;
});
