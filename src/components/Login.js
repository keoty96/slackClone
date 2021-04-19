import React from 'react';
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login(props) {

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((res) => {
                const newUser = {
                    name: res.user.displayName,
                    photo: res.user.photoURL,
                }
                localStorage.setItem('user', JSON.stringify(newUser));
                props.setUser(newUser);
            }).catch((err) => console.log(err));
    }
    return (
        <Container>
            <Content>
                <SlackImg src="http://assets.stickpng.com/images/5cb480cd5f1b6d3fbadece79.png" />
                <h1>Sign in Slack</h1>
                <SignInButton onClick={() => signIn()}>
                    Sign in with google
                </SignInButton>
            </Content>
        </Container>
    )
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Content = styled.div`
    background: white;
    padding: 100px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 { margin-top: 5px; }
`;
const SlackImg = styled.img`
    height: 100px;
`;
const SignInButton = styled.button`
    margin-top: 50px;
    background-color: #0a8d48;
    color: #ffffff;
    border: none;
    height: 40px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;
`;

export default Login
