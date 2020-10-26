import React from 'react';
import {gql, useQuery} from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

function Home() {
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);

    return (
        <>
            <h1 className="page-title">Recent Posts</h1>

            <Grid columns={3}>
                <Grid.Row> 
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

const FETCH_POSTS_QUERY = gql`
   {
        getPosts{
            id body createdAt likeCount username
            likes{
                username
            }
            commentCount
            comments{
                id username body createdAt
            }
        }
   }
`

export default Home;