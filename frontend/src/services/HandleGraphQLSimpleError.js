export default function HandleGraphQLSimpleError(updateAlert, error) {
  console.log(JSON.stringify(error));
  updateAlert({
    variables: {
      title: 'Error',
      body: error.message,
      actions: [
        {
          text: 'OK',
          alertResponse: 'graphql-simple_error',
        }
      ]
    }
  });
}
