import * as React from "react";
import { useAuth } from "react-use-auth";

const Auth0CallbackPage = () => {
    const { handleAuthentication } = useAuth();

    React.useEffect(() => {
      handleAuthentication();
    }, 
    [handleAuthentication]);

    return (
      <h1>Loading...</h1>
    )
}

export default Auth0CallbackPage;