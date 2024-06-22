import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, ] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPasword] = useState(null);
  const [confirmPassword, setconfirmPasword] = useState(null);
  const [error, setError] = useState(null);

  console.log(cookies);

  const viewLogin = (status) => {
    setIsLogIn(status);
    setError(null);
  }

  const handleSubmit = async(e, endpoint) => {
    e.preventDefault();
    if(!isLogIn && password !== confirmPassword) {
      setError('Make sure passwords match!');
      return;
    }

    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ email, password })
    })

    const data = await response.json();
    
    if(data.detail) {
      setError(data.detail);
    } else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.email)

      window.location.reload();
    }
  }

    return (
      <div className="auth-container">
        <div className="auth-container-box">
          <form>
            <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
            <input 
            type="email" 
            placeholder="email" 
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            type="password" 
            placeholder="password"
            onChange={(e) => setPasword(e.target.value)}
            />
            {!isLogIn && <input 
            type="password" 
            placeholder="confirm password"
            onChange={(e) => setconfirmPasword(e.target.value)}
            />}
            <input 
            type="submit" 
            className="create"
            onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}
            />
            {error && <p>{error}</p>}
          </form>
          <div className="auth-options">
            <button onClick={() => viewLogin(false)} style={{backgroundColor: !isLogIn ? 'white' : 'gray'}}>Sing Up</button>
            <button onClick={() => viewLogin(true)} style={{backgroundColor: isLogIn ? 'white' : 'gray'}}>Login</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Auth;
  