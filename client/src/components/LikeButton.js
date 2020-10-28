import React, {useEffect, useState} from 'react';
import {Button, Icon, Label } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {gql, useMutation} from '@apollo/client';

function LikeButton({user, post: {id, likeCount, likes}}) {
    const [liked, setLiked] = useState(false);
    
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        }
        else {
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id},
        onError: () => {console.log('User not found')}
    });

    const likeButton = user ? (
        liked ? (
            <Button color="teal" title="Unlike this post">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="teal" basic title="Like this post">
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="teal" basic title="Like this post">
            <Icon name="heart" />
        </Button>
    )

    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
            {likeButton}

            <Label basic color="teal" pointing="left">
                {likeCount}
            </Label>
        </Button>
    );
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId) {
            id
            likes{
                id username
            }
            likeCount
        }
    }
`

export default LikeButton