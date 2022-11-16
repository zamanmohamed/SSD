import React from "react";
import { useState, useEffect } from "react";
import { register, logout } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const options = ["manager", "worker"];
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState(options[0]);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const history = useNavigate();

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    history("/");
  };

  useEffect(() => {
    if (!userInfo) {
      history("/");
    }
  }, [userInfo]);

  useEffect(() => {
    if (error) {
      alert("Error");
    }

    if (loading) {
      alert("Add Staff Successfully");
    }
  }, [error, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, role, username, password));
    setname("");
    setemail("");
    setrole(options[0]);
    setusername("");
    setpassword("");
  };

  return (
    <div>
      <header id="main-header" class="py-2 bg-primary text-white">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h1>
                <i class="fas fa-user"></i> Admin Profile
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section id="actions" class="py-4 mb-4 bg-light"></section>

      <section id="profile">
        <div class="container">
          <div class="row">
            <div class="col-md-9">
              <div class="card">
                <div class="card-header">
                  <h4>Add Staff</h4>
                </div>
                <div class="card-body">
                  <form onSubmit={submitHandler}>
                    <div class="form-group">
                      <label for="name">Staff Name</label>
                      <input
                        type="text"
                        class="form-control"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="name">Staff User Name</label>
                      <input
                        type="text"
                        class="form-control"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="name">Staff Email</label>
                      <input
                        type="email"
                        class="form-control"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="name">Staff Password</label>
                      <input
                        type="text"
                        class="form-control"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="type">Staff Type</label>
                      <select
                        class="form-control"
                        onChange={(e) => setrole(e.target.value)}
                        defaultValue={role}
                        required
                      >
                        {options.map((option, idx) => (
                          <option key={idx}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <input
                      type="submit"
                      value="Save"
                      class="btn btn-primary btn-block"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              <h3>HI Admin </h3>
              <img src="img/avatar.png" alt="" class="d-block img-fluid mb-3" />

              <button class="btn btn-danger btn-block" onClick={logoutHandler}>
                Log Out
              </button>
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

export default Admin;
