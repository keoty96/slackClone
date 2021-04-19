import React from 'react';
import styled from "styled-components";

function ChatMessage({ text, name, timestamp, userImage }) {
    return (
        <Container>
            <UserAvatar>
                <img src={userImage} alt="Avatar" />
            </UserAvatar>
            <MessageContent>
                <Name>
                    {name}
                    <span>
                        {new Date(timestamp.toDate()).toUTCString()}
                    </span>
                </Name>
                <Text>
                    {text}
                </Text>
            </MessageContent>
        </Container>
    )
};

const Container = styled.div`
    padding: 8px 20px;
    display: flex;
    align-items: center;
`;
const UserAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 8px;

    img { width: 100% }
`;
const MessageContent = styled.div`
    display: flex;
    flex-direction: column;
`;
const Name = styled.span`
    font-weight: 900;
    font-size: 15px;
    line-height: 1.4;
    span {
        font-weight: 400;
        font-size: 13px;
        color: rgb(97, 96, 97);
        margin-left: 8px;
    }
`;
const Text = styled.span`
`;

export default ChatMessage;
