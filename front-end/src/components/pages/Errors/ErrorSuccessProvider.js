import React, { createContext, useContext, useState } from 'react';

const ErrorSuccessContext = createContext();

const ErrorSuccessProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [success, setSuccessMessage] = useState(null);

  return (
    <ErrorSuccessContext.Provider value={{ error, setError, success, setSuccessMessage }}>
      {children}
    </ErrorSuccessContext.Provider>
  );
};

export function useContextErrorSucessHandler(){
    return useContext(ErrorSuccessContext);
}

export default ErrorSuccessProvider;
