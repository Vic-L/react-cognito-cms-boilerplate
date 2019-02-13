import ValidateField from './ValidateField';

export default function ValidateFormObject(prefix, formObject) {
  for (const key of formObject.keys()) {
    // stop loop and return false as long as there is even 1 invalid
    if (ValidateField(
      `${prefix}-${key}`,
      formObject.get(key) || null,
      true)) {
      return false;
    }
  }

  return true;
}
