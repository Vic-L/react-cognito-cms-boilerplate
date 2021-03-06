import _ from 'lodash';
import validate from '../utils/validations';

export default function ValidateField(key, value, submittedFormBefore) {
if (_.isNil(submittedFormBefore)) {
  console.error('submittedFormBefore is null in ValidateField');
}

  if (submittedFormBefore) {
    console.log(
      `validating ${key} with ${value}; submittedFormBefore == ${submittedFormBefore}`,
      validate(key, value || null)
    );

    // need to return now to trigger "presence" constraint in validation
    return validate(key, value || null);
  }

  return null;
}
