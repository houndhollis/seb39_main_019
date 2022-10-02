import React, { useEffect } from "react";
import axios from "axios";

const Kakao = () => {
  let code = new URL(window.location.href).searchParams.get("code");

  axios
    .get(`http://localhost:5173/oauth2/login/callback/kakao?code=${code}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  return <div>잠시만 기다려 주세요! 로그인 중입니다.</div>;
};

export default Kakao;
