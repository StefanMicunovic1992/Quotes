import "./style/Login.css";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const showPopUp = (e) => {
    if (e.target.innerText === "Login") {
      document.getElementById("popupLogin").classList.toggle("hide");
      document.getElementById("popupLogin").classList.toggle("show");
    } else {
      document.getElementById("logout").classList.toggle("show");
      document.getElementById("logout").classList.toggle("hide");
    }
  };

  const setUpTokenStorageAndNameOfUser = (res) => {
    let name = JSON.parse(res.config.data);
    sessionStorage.setItem("token", res.data.token);
    sessionStorage.setItem("username", name.username);
    console.log(res.config.data);
    document.getElementById("usernameInput").value = "";
    document.getElementById("passwordInput").value = "";
    setPassword("");
    setUsername("");
    document.getElementById('popupLogin').classList.toggle('show');
    document.getElementById('popupLogin').classList.toggle('hide');
    document.getElementById("login").innerText = name.username;
  };

  function checkUser(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/token", {
        username: username,
        password: password,
      })
      .then((res) => setUpTokenStorageAndNameOfUser(res))
      .catch((error) => console.log(error));
  }

  const logoutFnc = (e) => {
    sessionStorage.clear()
    document.getElementById('login').innerText = 'Login'
    document.getElementById("logout").classList.toggle("show");
    document.getElementById("logout").classList.toggle("hide");
  }

  return (
    <section>
      <button id="login" onClick={(e) => showPopUp(e)}>
        Login
      </button>
      <div id="popupLogin" className="hide">
        <form id="formForLogin" onSubmit={(e) => checkUser(e)}>
          <input
            type="text"
            id="usernameInput"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="passwordInput"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="login" onSubmit={(e) => checkUser(e)} />
        </form>
      </div>
      <div id="logout" className="hide">
        <button id="logoutBtn" onClick={(e) => logoutFnc(e)}>Logout</button>
      </div>
    </section>
  );
}

export default Login;
