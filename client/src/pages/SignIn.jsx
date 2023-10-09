import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import {auth ,previder} from "../firebase.js"

import {signInWithPopup} from "firebase/auth";
import Loading from "../components/Loading";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const ButtonNotValid = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: not-allowed;
  background-color: ${({ theme }) => theme.soft};;
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signinState=useSelector((state)=>state.user);
  const sigin=async(e)=>{
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res=await axios.post("/auth/signin",{
        email,
        password
      });
      dispatch(loginSuccess(res.data.user));
      navigate("/")
      } catch (error) {
        console.log(error);
        dispatch(loginFailure())
      }
  }
  const sigUp=async(e)=>{
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res=await axios.post("/auth/signup",{
        email,
        password,
        name
      });
      dispatch(loginSuccess(res.data.user));
      navigate("/")
      } catch (error) {
        console.log(error);
        dispatch(loginFailure())
      }
  }
  const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, previder)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data.user));
            navigate("/")
          }).catch((err)=>{
            dispatch(loginFailure());
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to LamaTube</SubTitle>
        <Input placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
        <Input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        {(email!=="" &&password!=="" )?
        <Button onClick={sigin}>Sign in</Button>
        :
        
        <ButtonNotValid disabled>Sign in</ButtonNotValid>
      }
        <Title>or</Title>
        {
          signinState.loading?
          <Loading></Loading>
          :
          <Button onClick={signInWithGoogle}>Sign in with google</Button>
        }
        <Title>or</Title>
        <Input placeholder="username" onChange={(e)=>setName(e.target.value)} />
        <Input placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
        <Input onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder="password" />

        <Button onClick={sigUp}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;