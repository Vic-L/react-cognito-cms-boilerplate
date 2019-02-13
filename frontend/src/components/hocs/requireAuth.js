import React from 'react';
import Auth from '@aws-amplify/auth';

export default function requireAuth(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        checkedAuthentication: false
      };
    }

    async componentDidMount() {
      try {
        await Auth.currentSession();
        this.setState({ checkedAuthentication: true });
      } catch (err) {
        this.props.history.push('/login');
      }
    }

    render() {
      if (!this.state.checkedAuthentication) {
        return null;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}
