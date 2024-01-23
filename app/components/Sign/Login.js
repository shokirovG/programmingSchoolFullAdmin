import { ToastContainer } from "react-toastify";
import {
  useDispatch,
  useSelector,
} from "@/node_modules/react-redux/dist/react-redux";
import React, { useEffect } from "react";
import SelectMonth from "../List/Select__Month/SelectMonth";
import SideBar from "../SideBar";
import SignIn from "./SignIn";
import { auth, fetchingStudents, loaded } from "@/app/redux/actions";
import Loader from "../Loader/Loader";

const Login = ({ children }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchingStudents());
  //   dispatch(
  //     auth(localStorage.getItem("login"), localStorage.getItem("parol"))
  //   );
  //   dispatch(loaded());
  // }, []);
  return (
    <>
      {/* {store.loading === "loading" ? (
        <Loader />
      ) : (
        <div>
          {store.login == process.env.NEXT_PUBLIC_LOGIN &&
          store.parol == process.env.NEXT_PUBLIC_PAROL ? (
            <>
              <SideBar />
              <div className="children">
                <SelectMonth />
                <ToastContainer />
                {children}
              </div>
            </>
          ) : (
            <SignIn />
          )}
          
        </div>
      )} */}

      <>
        <SideBar />
        <div className="children">
          <SelectMonth />
          <ToastContainer />
          {children}
        </div>
      </>
    </>
  );
};

export default Login;
