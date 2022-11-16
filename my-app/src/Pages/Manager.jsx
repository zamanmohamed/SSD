import React from "react";
import { useState, useEffect } from "react";
import { massageInsert, fileUploard } from "../actions/massageAction";
import { logout } from "../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Manager = () => {
  const [title, settitle] = useState("");
  const [massage, setMassage] = useState("");
  const [file, setFile] = useState(null);

  const history = useNavigate();

  const Insert = useSelector((state) => state.massageInsert);
  const FileUp = useSelector((state) => state.uploadFile);
  const dispatch = useDispatch();
  const { loading, success, error } = Insert;
  const { succes, errorr } = FileUp;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history("/");
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      alert("Massage Inserted!");
    }
    if (succes) {
      alert("File Inserted!");
    }
  }, [succes, success]);

  const MassagesubmitHandler = (e) => {
    e.preventDefault();
    dispatch(massageInsert(title, massage));
    if (error) {
      alert("Error!");
    }
  };

  const FileSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(fileUploard(file));
  };

  const logoutHandler = () => {
    dispatch(logout());
    history("/");
  };

  return (
    <div>
      <header id="main-header" class="py-2 bg-primary text-white">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <h1>
                <i class="fas fa-user"></i> Manager Profile
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
                  <h4>Save messages</h4>
                </div>
                <div class="card-body">
                  <form onSubmit={MassagesubmitHandler}>
                    <div class="form-group">
                      <label for="name">Messages Title</label>
                      <input
                        type="text"
                        class="form-control"
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label for="bio">Messages</label>
                      <textarea
                        class="form-control"
                        name="editor1"
                        value={massage}
                        onChange={(e) => setMassage(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <input
                      type="submit"
                      value="Save"
                      class="btn btn-primary btn-block"
                    />
                  </form>
                </div>
              </div>
              <div class="card mt-3">
                <div class="card-header">
                  <h4>upload file</h4>
                </div>
                <div class="card-body">
                  <form onSubmit={FileSubmitHandler}>
                    <div class="form-group">
                      <label for="name">upload file</label>
                      <div class="custom-file">
                        <input
                          type="file"
                          id="myfile"
                          class="custom-file-input"
                          onChange={(e) => setFile(e.target.files[0])}
                          required
                        />
                        <label class="custom-file-label" for="myfile">
                          Choose file
                        </label>
                      </div>
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
              <h3>HI Manager </h3>
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

export default Manager;
