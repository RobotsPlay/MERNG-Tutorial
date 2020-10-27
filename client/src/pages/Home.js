import React, {useContext} from 'react';
import {useQuery} from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import {AuthContext} from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import {FETCH_POSTS_QUERY} from '../util/graphql';

function Home() {
    const {user} = useContext(AuthContext);
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);

    return (
        <>
            <h1 className="page-title">Recent Posts</h1>
            <Grid columns={3}>
                <Grid.Row>
                    {user && (
                        <Grid.Column>
                            <PostForm />
                        </Grid.Column>
                    )} 

                    { loading ? (
                        <h2>Loading</h2>
                    ) : (
                        data.getPosts && data.getPosts.map((post, i) => (
                            <Grid.Column key={i} style={{marginBottom: '20px'}}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )}
                    
                </Grid.Row>
            </Grid>
        </>
    )
}

export default Home;