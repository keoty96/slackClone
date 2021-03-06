import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import db from "./firebase";
import { auth, provider } from "./firebase";

function App() {

  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const getChannels = () => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(snapshot.docs.map((doc) => {
        return { id: doc.id, name: doc.data().name };
      }))

    });
  };

  useEffect(() => {
    getChannels();
  }, []);

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
      localStorage.removeItem("user");
    });
  };

  return (
    <div className="App">
      <Router>
        {
          !user
            ? <Login setUser={setUser} />
            : <Container>
              <Header user={user} signOut={signOut} />
              <Main>
                <SideBar rooms={rooms} />
                <Switch>
                  <Route path="/room/:channelId">
                    <Chat user={user} />
                  </Route>
                  <Route path="/">
                    Select or Create Channel
                  </Route>
                </Switch>
              </Main>
            </Container>
        }
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  width:100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
`;