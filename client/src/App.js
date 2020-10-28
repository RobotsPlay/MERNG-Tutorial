import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

import {AuthProvider} from './context/auth';
import AuthRoute from './util/AuthRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';

import MenuBar from './components/MenuBar';

import 'semantic-ui-css/semantic.min.css';
import './App.css';


function App() {
    return (
        <AuthProvider>
            <Container>
                <Router>
                    <MenuBar />

                    <Route exact path="/" component={Home} />
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/register" component={Register} />
                    <Route exact path="/posts/:postId" component={SinglePost} />
                </Router>
            </Container>
        </AuthProvider>
    );
}

export default App;
