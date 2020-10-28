import React from 'react';
import {Button, Icon, Popup} from 'semantic-ui-react';
import {gql, useMutation} from '@apollo/client';

import {FETCH_POSTS_QUERY} from '../util/graphql';

function DeleteButton({postId, commentId, callback}) {
    

    const [deletePost] = useMutation(DELETE_POST, {
        update(proxy) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });

            const updateData = {...data, getPosts: data.getPosts.filter(p => p.id !== postId)};
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data: updateData});
            if(callback) {
                callback();
            }
        },
        variables: {
            postId
        }
    });

    const [deleteComment] = useMutation(DELETE_COMMENT, {
        update() {
            // TODO: remove comment from cache
            if(callback) {
                callback();
            }
        },
        variables: {
            commentId,
            postId
        }
    });

    const deleteConfirmButton = <Button color='red' content={`Delete this ${commentId ? 'Comment' : 'Post'}?`} onClick={commentId ? deleteComment : deletePost} />

    return (
        <Popup
            trigger={
                <Button as="div" color="red" icon title={`Delete this ${commentId ? 'Comment' : 'Post'}`} floated="right">
                    <Icon name="trash" />
                </Button>
            }
            content={deleteConfirmButton}
            on='click'
            position='top center'
        />
    );
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId) 
    }
`

const DELETE_COMMENT = gql`
    mutation deleteComment(
        $commentId: ID!
        $postId: ID!
    ){
        deleteComment(
            commentId: $commentId
            postId: $postId
        ) {
            id
            body
            createdAt
            username
            comments{
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`

export default DeleteButton

