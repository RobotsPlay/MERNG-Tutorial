import React from 'react';
import App from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:5000',
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