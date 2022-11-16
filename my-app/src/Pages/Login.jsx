import React from "react";
import { useState, useEffect } from "react";
import { login } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const location = useLocation();
  const history = useNavigate();

  // const redirect = location.search;
  // console.log(redirect);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "admin") {
        history("/admin");
      }
      if (userInfo.role === "worker") {
        history("/worker");
      }
      if (userInfo.role === "manager") {
        history("/manager");
      }
    }

    if (error) {
      alert("Error");
    }
  }, [history, userInfo, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div>
      {" "}
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark p-0"></nav>
      <header id="main-header" class="py-2 bg-primary text-white">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h1>
                <i class="fas fa-user"></i> Administrator/Staff Login
              </h1>
            </div>
          </div>
        </div>
      </header>
      <section id="actions" class="py-4 mb-4 bg-light">
        <div class="container">
          <div class="row"></div>
        </div>
      </section>
      <section id="login">
        <div class="container">
          <div class="row">
            <div class="col-md-6 mx-auto">
              <div class="card">
                <div class="card-header">
                  <h4>Account Login</h4>
                </div>
                <div class="card-body">
                  <form onSubmit={submitHandler}>
                    <div class="form-group">
                      <label for="email">Username</label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        class="form-control"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="password">Password</label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        class="form-control"
                        required
                      />
                    </div>
                    <input
                      type="submit"
                      value="Login"
                      class="btn btn-primary btn-block"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer id="main-footer" class="bg-dark text-white mt-5 p-5">
        <div class="container">
          <div class="row">
            <div class="col"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginUser;
