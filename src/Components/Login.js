import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [errorMsg,setErrMsg]=useState("");
  const navigate=useNavigate();

  const handleLogin = () => {
    if(!usernameState || !passwordState){
        setErrMsg("All the fields needs to be filled!");
        return;
    }
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameState,
        password: passwordState,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
        else{
          setErrMsg("Incorrect credentials!");
          throw new Error("Incorrect credentials!");
        }
      })
      .then((data) =>{
          localStorage.setItem("id",data.id);
          localStorage.setItem("token",data.token);
          navigate("/profile");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="Login">
      <h1>Login Page</h1>
    <input
      type="text"
      value={usernameState}
      onChange={(e) => setUsernameState(e.target.value)}
      placeholder="username"
    />
    <input
      type="password"
      value={passwordState}
      onChange={(e) => setPasswordState(e.target.value)}
      placeholder="password"
    />
    <button type="button" onClick={handleLogin}>
      Login
    </button>
    <p className="errorMessage">{errorMsg}</p>
  </div>
  );
};

export default Login;