import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import styled from "styled-components";
import InfoIcon from '@material-ui/icons/Info';
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import db from '../firebase';

function Chat({ user }) {

    let { channelId } = useParams();
    const [channel, setChannel] = useState();
    const [messages, setMessages] = useState([]);

    const getMessages = () => {
        db.collection('rooms')
            .doc(channelId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                let message = snapshot.docs.map((doc) => doc.data());
                console.log(message);
                setMessages(message);
            })
    }

    const getChannel = () => {
        db.collection('rooms')
            .doc(channelId)
            .onSnapshot((snapshot) => {
                setChannel(snapshot.data());
            })
    };

    useEffect(() => {
        getChannel();
        getMessages();
    }, [channelId]);

    const sendMessage = (text) => {
        if (channelId) {
            let payload = {
                text: text,
                timestamp: firebase.firestore.Timestamp.now(),
                user: user.name,
                userImage: user.photo
            }

            db.collection('rooms')
                .doc(channelId)
                .collection('messages')
                .add(payload)

            console.log(payload);
        }
    }

    return (
        <Container>
            <Header>
                <Channel>
                    <ChannelName>
                        # {channel && channel.name}
                    </ChannelName>
                    <ChannelInfo>
                        A space to chat
                    </ChannelInfo>
                </Channel>
                <ChannelDetails>
                    <div>Details</div>
                    <Info />
                </ChannelDetails>
            </Header>
            <MessageContainer>
                {
                    messages.length > 0 &&
                    messages.map((data) => (

                        <ChatMessage
                            text={data.text}
                            name={data.username}
                            image={data.userImage}
                            timestamp={data.timestamp}
                        />
                    ))
                }
            </MessageContainer>
            <ChatInput sendMessage={sendMessage} />
        </Container>
    )
};

const Container = styled.div`
    display: grid;
    grid-template-rows: 64px auto min-content;
    min-height: 0
`;
const Header = styled.div`
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgb(83, 39, 83, 13);
`;
const Channel = styled.div``;
const ChannelDetails = styled.div`
    display: flex;
    align-items: center;
    color: #606060;
`;
const ChannelName = styled.div`
    font-weight: 700
`;
const ChannelInfo = styled.div`
    font-weight: 400;
    color: #606060;
    font-size: 13px;
    margin-top: 8px;
`;
const Info = styled(InfoIcon)`
    margin-left: 10px;
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;

export default Chat;
