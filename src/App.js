// import { useSelector } from 'react-redux';
// import LoginForm from './Components/Login';
// import { selectUser } from './features/userSlice';
// import Dashboard from './Components/Dashboard';

// function App() {

//   const user=useSelector(selectUser);
//   return (
//     <div className="App">
//       {user?<Dashboard/>:<LoginForm/>}
//     </div>
//   );
// }
// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from '../src/context/userContext';
import LoginForm from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

