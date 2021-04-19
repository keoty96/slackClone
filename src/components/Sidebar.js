import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import { sidebarItems } from "../data/SidebarData";
import db from "../firebase";

function Sidebar(props) {

    const history = useHistory();

    const goToChannel = (id) => {
        if (id) {
            history.push(`/room/${id}`);
        }
    }

    const addChannel = () => {
        const promptName = prompt("Enter channel name");

        if (promptName) {
            db.collection("rooms").add({ name: promptName })
        }
    }

    return (
        <Container>
            <WorkspaceContainer>
                <Name>
                    Clever Programmer
                </Name>
                <NewMessage>
                    <AddCircleOutlineIcon />
                </NewMessage>
            </WorkspaceContainer>

            <MainChannels>
                {sidebarItems.map((item) => (
                    <MainChannelItem>
                        {item.icon}
                        {item.text}
                    </MainChannelItem>
                ))}
            </MainChannels>

            <ChannelsContainer>
                <NewChannelContainer>
                    <div>Channel</div>
                    <AddIcon onClick={() => addChannel()} />
                </NewChannelContainer>
                <ChannelsList>

                    {props.rooms.map((item) => (
                        <Channel onClick={() => goToChannel(item.id)}>
                            # {item.name}
                        </Channel>
                    ))}

                </ChannelsList>
            </ChannelsContainer>
        </Container>
    )
};

const Container = styled.div`
    background: #350d36;
`;
const WorkspaceContainer = styled.div`
    color: #ffffff;
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    justify-content: space-between;
    border-bottom: solid 1px #532753;
`;
const Name = styled.div``;
const NewMessage = styled.div`
    width: 36px;
    height: 36px;
    background: #ffffff;
    color: #3f0e40;
    fill: #3f0e40;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
`;
const MainChannels = styled.div`
    padding-top: 20px;
`;
const MainChannelItem = styled.div`
    color: rgb(188, 177, 188);
    display: grid;
    grid-template-columns: 15% auto;
    height: 28px;
    align-items: center;
    padding-left: 19px;
    cursor: pointer; 
    &:hover {
        background: #301b3f;
    }
`;
const ChannelsContainer = styled.div`
    color: rgb(188, 177, 188);
    margin-top: 10px;
`;
const NewChannelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    padding: 0px 19px
`;
const ChannelsList = styled.div``;
const Channel = styled.div`
    height: 28px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    cursor: pointer;
    &:hover {
        background: #301b3f;
    }
`;

export default Sidebar
