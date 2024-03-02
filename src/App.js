import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import { auth } from './firebase';
import { useEffect, useState } from 'react';

function App() {
  const [userName, setUserName] = useState("");
  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if(user){
        setUserName(user.displayName);
      }else setUserName("");
    });
  },[]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/' element={<Home name= {userName}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
