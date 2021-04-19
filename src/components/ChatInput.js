import React, { useState } from 'react';
import styled from "styled-components";
import SendIcon from '@material-ui/icons/Send';

function ChatInput({ sendMessage }) {

    const [input, setInput] = useState("");

    const send = (e) => {
        e.preventDefault();
        if (!input) return;
        sendMessage(input);
        setInput("");
    }
    return (
        <Container>
            <InputContainer>
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Message Here"
                    />
                    <SendButton
                        type="submit"
                        onClick={send}>
                        <Send />
                    </SendButton>
                </form>
            </InputContainer>
        </Container>
    )
};

const Container = styled.div`
    padding: 0px 20px 24px;
`;
const InputContainer = styled.div`
    border: 1px solid #8d8d8e;
    border-radius: 4px;

    form {
        display: flex;
        height: 42px;
        align-items: center;
        padding: 0px 10px;
        input {
            flex: 1;
            border: none;
            font-size: 13px;
        }
        input:focus {
            outline: none
        }
    }
`;
const SendButton = styled.button`
    background: #007a4a;
    border: none;
    border-radius: 2px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    .MuiSvgIcon-root {
        width: 18px;
    }

    :hover {
        background: #148567;
    }
`;
const Send = styled(SendIcon)`
    color: #d9d9d9
`;

export default ChatInput;
