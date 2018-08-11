import { PASSWORD_MIN_LENGTH } from '_utils/errors'
import validation from 'validate.js'

const constraints = {
  // login form
  email: {
    presence: {
      message: '^Please enter an email address'
    },
    email: {
      message: '^Please enter a valid email address'
    }
  },
  password: {
    presence: {
      message: '^Please enter a password'
    },
    length: {
      minimum: PASSWORD_MIN_LENGTH,
      message: `^Please enter at least ${PASSWORD_MIN_LENGTH} characters`
    }
  },
}

function validate(fieldName, value) {
  var formValues = {}
  formValues[fieldName] = value

  var formFields = {}
  formFields[fieldName] = constraints[fieldName]

  const result = validation(formValues, formFields)

  if (result) {
    return result[fieldName][0]
  }
  return null
}

export default validate