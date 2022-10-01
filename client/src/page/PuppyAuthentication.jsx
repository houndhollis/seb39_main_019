import React,{useEffect,useState,useRef} from "react";
import Header from "../components/Header";
import { useLocation, useNavigate ,Link } from "react-router-dom";
import { REST_API_KEY, REDIRECT_URI } from "../secretData";
import styled from "styled-components";
import axios from "axios";
import Button from "../components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../store/authStore";

const PuppyAuthentication = () => {
  const [ppOwner, setPpOwner] = useState("");
  const [regiNumber, setRegiNumber] = useState("");
  const ppOwnerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = location.search.split("=")[1];
  const { setIsPpAuth } = useAuthStore();



  // const getKakaoToken = () => {
  //   fetch(`https://kauth.kakao.com/oauth/token`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //     body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         sessionStorage.setItem("token", data.access_token);
  //         localStorage.setItem("token", data.refresh_token);
  //       } else {
  //         navigate("/");
  //       }
  //     });
  // };

  // //1 토큰 보내기
  const getKakaoToken = () => {
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: `https://kauth.kakao.com/oauth/token`,
      data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    }).then((response) => {
      console.log("kakaotoken:", response);
      if (response.data) {
        sessionStorage.setItem("token", response.data.access_token);
        localStorage.setItem("token", response.data.refresh_token);
        const kakaoAccessToken = response.data.access_token;
        const kakaoRefreshToken = response.data.refresh_token;
      } else {
        navigate("/");
      }
    });
  };

  // const postKakaoToken = () => {
  //   axios({
  //     method: "post",
  //     url: `백엔드 엔드포인트추가`,
  //     data: kakaoAccessToken, kakaoRefreshToken,
  //   });
  // };

  //2 토큰보내기
  const getKakaoToken2 = () => {
    axios({
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: `https://kauth.kakao.com/oauth/token`,
      data: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
    }).then((response) => {
      console.log(response);
      if (response.data) {
        const kakaoAccessToken = response.data.access_token;
        const kakaoRefreshToken = response.data.refresh_token;

        axios.post("백엔드 엔드포인트", {
          kakaoAccessToken,
          kakaoRefreshToken,
        });
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    if (!location.search) return;
    getKakaoToken();
    // postKakaoToken();
  }, []);

  const apiBtnHandler = (e) => {
    e.preventDefault();

    // postPpAuth(ppOwner, regiNumber)
    //   .then((response) => {
    //     console.log(response); /*<PpAuthDoneMdl /> */
    //     /*navigate("/PpAuthDoneMdl")*/

    //     toast.success("인증 완료 🎉 반려견 정보를 등록해주세요", {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 3000,
    //       hideProgressBar: true,
    //     });
    //     navigate("/PuppyInfoPost"); // 이 부분 수정해야함
    //   })
    //   .catch((err) =>
    //     /*navigate("/ppauthfailmdl")*/ /* <PpAuthFailMdl />*/
    //     {
    //       console.log(err);
    //       navigate("/main");
    //       toast.error(
    //         "인증 실패🚫 중복되거나 유효하지 않은 반려견 정보입니다",
    //         {
    //           autoClose: 3000,
    //           position: toast.POSITION.TOP_RIGHT,
    //           hideProgressBar: true,
    //         }
    //       );
    //     }
    //   );

    let token = sessionStorage.getItem("access_token") || "";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .post("api/v1/dogs/validation", {
        owner_nm: ppOwner,
        dog_reg_no: regiNumber,
      })
      .then((response) => {
        console.log(response); /*<PpAuthDoneMdl /> */
        /*navigate("/PpAuthDoneMdl")*/
        navigate("/mypage");
        setIsPpAuth();

        // toast.success("인증 완료 🎉 반려견 정보를 등록해주세요", {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 3000,
        //   hideProgressBar: true,
        // });
      })
      .catch((err) =>
        /*navigate("/ppauthfailmdl")*/ /* <PpAuthFailMdl />*/
        {
          alert("이미 인증된 등록번호이거나 유효하지 않은 등록번호입니다.");
          navigate("/main");
          toast.error(
            "인증 실패🚫 중복되거나 유효하지 않은 반려견 정보입니다",
            {
              autoClose: 3000,
              position: toast.POSITION.TOP_RIGHT,
              hideProgressBar: true,
            }
          );
        }
      );
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <SocialModalContainer>
        <HeaderLogo>
          <Link to={"/"}>
            <span>Puppy Buddy</span>
          </Link>
        </HeaderLogo>
        <InformMsg>
          입력하신 동물 등록 번호는 해당 번호의 중복 가입을 방지하기 위한
          용도로만 사용되며 회원 탈퇴 시 파기됩니다.
        </InformMsg>
        <InputForm>
          <h1>견주 인증</h1>
          <form /*</InputForm>*/ onSubmit={apiBtnHandler}>
            <div className='group'>
              <label htmlFor='ppOwner'>소유자</label>
              <input
                type='text'
                id='ppOwner'
                onChange={(e) => setPpOwner(e.target.value)}
                required
                // value={ppOwner}
                ref={ppOwnerRef}
              ></input>
            </div>
            <div className='group'>
              <label htmlFor='regiNumber'>등록번호</label>
              <input
                type='text'
                id='regiNumber'
                onChange={(e) => setRegiNumber(e.target.value)}
                required
                value={regiNumber}
              ></input>
            </div>
            <Button text={"인증하기"} type={"auth"}></Button>
          </form>
        </InputForm>
      </SocialModalContainer>
    </div>
  );
};

export default PuppyAuthentication;

const SocialModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  /* form {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
    } */
  /* } */
`;

const HeaderLogo = styled.div`
  /* padding-left: 20px; */
  margin-bottom: 20px;
  & span {
    font-family: KOTRAHOPE;
    font-weight: bold;
    font-size: 35px;
    color: ${(props) => props.theme.HeLogoColor};
    cursor: pointer;
    white-space: nowrap;
  }
`;

const InformMsg = styled.div`
  margin-bottom: 40px;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;
  padding: 48px 32px 32px 32px;
  background: #fafafa;
  border: 1px solid #ebebeb;
  box-shadow: rgba(0, 0, 0, 0.14902) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.09804) 0px 1px 2px 0px;

  h1 {
    margin-bottom: 50px;
    color: black;
  }
  .group {
    margin-bottom: 30px;
  }
  input {
    font-size: 18px;
    padding: 10px 90px 10px 5px;
    -webkit-appearance: none;
    display: block;
    background: #fafafa;
    color: #636363;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #757575;
  }

  input:focus {
    outline: none;
  }

  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
  }
`;
