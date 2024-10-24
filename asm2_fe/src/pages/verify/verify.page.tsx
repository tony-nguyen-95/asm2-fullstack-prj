import { AxiosError } from "axios";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authStore from "../../stores/authen.store";
import { API } from "../../apis";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

type Props = {};

export const Verify: React.FC<Props> = observer((props) => {
  const { verifyCode } = useParams();

  console.log(verifyCode);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyUserCode = async () => {
      if (verifyCode) {
        try {
          const { data } = await API.get(`/users?verifyCode=${verifyCode}`);

          if (data) {
            sessionStorage.setItem("userLogined", JSON.stringify(data));

            const sweetAlert = withReactContent(Swal);
            sweetAlert.fire({
              title: <p>Vefiry successfully!</p>,
              timer: 800,
              icon: "success",
            });

            authStore.checkLoginStatus();

            setTimeout(() => {
              navigate("/");
            }, 800);
          }
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error("Login error:", error);
          }
        }
      }
    };

    verifyUserCode();
  }, [navigate, verifyCode]);

  return (
    <div className="text-center w-full h-full text-2xl">Redirecting...</div>
  );
});
