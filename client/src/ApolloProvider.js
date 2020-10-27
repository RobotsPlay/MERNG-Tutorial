import React from 'react';
import App from './App';
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
});

const authLink = setContext((req, pre) => {
    const token = localStorage.getItem('jwtToken');

    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const ApolloProviderComponent = function(){
    return (
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    )
}

export default ApolloProviderComponent;