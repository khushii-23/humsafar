import React from 'react';
import { Router } from './src/manageRoutes/Router';
import { AuthProvider } from './src/contexts/Auth';



function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}


export default App;