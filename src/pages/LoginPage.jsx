import { useSelector } from "react-redux";
import Login from "../features/auth/components/Login";
import { selectAuthStatus } from "../features/auth/authSlice";
import { Circles } from "react-loader-spinner";

const LoginPage = () => {
  const status = useSelector(selectAuthStatus);
  return (
    <div>
      {status === "loading" ? (
        <div className="fixed inset-0 bg-opacity-25 z-30 bg-slate-500 flex items-center justify-center h-full w-full">
        <Circles
          height="80"
          width="80"
          color="#00A9FF"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
      ) : null}
      <Login />
    </div>
  );
};

export default LoginPage;
