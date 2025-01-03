import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import apiInstance from "../../utils/axios";

function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParam] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const otp = searchParam.get("otp");
  const uidb64 = searchParam.get("uidb64");
  const handlePasswordSumbit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    if (password !== confirmPassword) {
      alert("Password does not match");
      setIsLoading(false)
    } else {
      setIsLoading(true)
      const formdata = new FormData();
      formdata.append("password", password);
      formdata.append("otp", otp);
      formdata.append("uidb64", uidb64);
      try {
        await apiInstance
          .post(`user/password-change/`, formdata)
          .then((res) => {
            console.log(res.data);
            alert("Password changed succesfully");
            navigate("/login");
            setIsLoading(false)
          });
      } catch (error) {
        alert("An error has occured while trying to change the password");
        setIsLoading(false)
      }
    }
  };
  return (
    <section>
      <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
        <div className="container">
          {/* Section: Login form */}
          <section className="">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-5 col-md-8">
                <div className="card rounded-5">
                  <div className="card-body p-4">
                    <form onSubmit={handlePasswordSumbit}>
                    <br />

                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                      >
                        <div>
                          {/* Password input */}
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              value={password}
                              className="form-control"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>

                          <div>
                          {/* confirmPassword input */}
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                              type="Password"
                              id="confirmPassword"
                              name="confirmPassword"
                              value={confirmPassword}
                              className="form-control"
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </div>

                          {isLoading === true ? (
                            <button
                              disabled
                              type="button"
                              className="btn btn-primary w-100"
                            >
                              <span className="mr-2">Processing</span>
                              <i className="fas fa-spinner fa-spin" />
                            </button>
                          ) : (
                            <button
                              onClick={handlePasswordSumbit}
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              <span className="mr-2">Save password</span>
                              <i className="fas fa-check-circle" />
                            </button>
                          )}

                          <div className="text-center">
                            <p className="mt-4">
                              Want to sign in? <Link to="/login">Login</Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </section>
  );
}

export default CreatePassword;
