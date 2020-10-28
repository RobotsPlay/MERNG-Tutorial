import React,  {useContext, useRef, useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {Button, Card, Form, Grid, Image } from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';

import {AuthContext} from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props) {
    const postId = props.match.params.postId;
    const {user} = useContext(AuthContext);

    const [comment, setComment] = useState('');
    const commentInputRef = useRef(null);

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    });

    const {data} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    let postMarkup; 
    if(!data || !data.getPost) {
        postMarkup = <p>Loading post...</p>
    }
    else {
        const {id, body, createdAt, username, comments, likes, likeCount, commentCount} = data.getPost;

        function deletePostCallback() {
            props.history.push('/');
        }

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image floated="right" size="small" src="https://react.semantic-ui.com/images/avatar/large/molly.png" />

                        <LikeButton user={user} post={{id, likeCount, likes}} />
                    </Grid.Column>

                    <Grid.Column width={14}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                    {username}
                                    
                                    {user && user.username === username && (
                                        <DeleteButton postId={id} callback={deletePostCallback} />
                                    )}    
                                </Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                        </Card>

                        <h3>Comments ({commentCount})</h3>

                        
                            <Card fluid>
                                <Card.Content>
                                    {user ? (
                                        <Form>
                                            <p><strong>Add a comment</strong></p>
                                            <div className="ui action input fluid">
                                                <input type="text" 
                                                    onChange={e => {setComment(e.target.value)}} 
                                                    placeholder="Comment..." 
                                                    name="comment" 
                                                    value={comment}
                                                    ref={commentInputRef}
                                                />
                                                <Button type="submit" color="blue" title="Add Comment" onClick={submitComment} disabled={comment.trim() === ''}>Add Comment</Button>
                                            </div>
                                        </Form>
                                    ) : (
                                        <p>
                                            <strong>
                                                <Link to="/login">Login</Link> to add a comment
                                            </strong>
                                        </p>
                                    )}
                                </Card.Content>
                            </Card>
                        
                        {comments.map((comment) => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                {user && user.username === comment.username && (
                                    <DeleteButton postId={id} commentId={comment.id} />
                                )}
                                <Card.Header>{comment.username}</Card.Header>
                                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation(
        $postId: ID!
        $body: String!
    ){
        createComment(
            postId: $postId,
            body: $body
        ){
            id
            comments{
                id body createdAt
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId) {
            id body createdAt username likeCount
            likes {
                username
            }
            commentCount
            comments {
                id username createdAt body
            }
        }
    }
`

export default SinglePost;