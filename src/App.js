import React, {useEffect} from 'react';
import './App.css';
import Nav from "./pages/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import NewPoll from "./pages/polls/NewPoll";
import PollPage from "./pages/polls/PollPage";
import {connect} from "react-redux";
import Login from "./pages/Login";
import Leaderboard from "./pages/Leaderboard";
import Error404 from "./pages/404";
import Router from "./pages/Router";
import Footer from './pages/Footer';
import { initialData } from './service/actions/shared';

function App({dispatch, loggedIn}) {
    useEffect(() => {
        dispatch(initialData());
    });

    return (
        <div className="flex flex-col h-screen">
            {loggedIn && <Nav/>}
            <Routes>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/" element={<Router><Home/></Router>}/>
                <Route path="/leaderboard" exact element={<Router><Leaderboard/></Router>}/>
                <Route path="/questions/:id" element={<Router><PollPage/></Router>}/>
                <Route path="/new" exact element={<Router><NewPoll/></Router>}/>
                <Route path='*' element={<Error404 />} />
            </Routes>
            <Footer/>
        </div>
    );
}

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);
