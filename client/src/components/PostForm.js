import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {gql, useMutation} from '@apollo/client';

import {FETCH_POSTS_QUERY} from '../util/graphql';
import {useForm} from '../util/hooks';

function PostForm() {
    const [errors, setErrors] = useState({});

    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    });
    
    const [createPost] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });

            const updateData = {...data, getPosts: [result.data.createPost, ...data.getPosts]};
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data: updateData});
            values.body = '';
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
    })

    function createPostCallback() {
        setErrors({});
        createPost();
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                
                <Form.Field>
                    <Form.Input
                        placeholder="Hi World!"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={(errors && errors.body) ? true : false}
                    />

                    <Button type="submit" color="teal">
                        Submit
                    </Button>
                </Form.Field>
            </Form>

            {
                Object.keys(errors).length > 0 && (
                    <div className="ui error message" style={{marginBottom: '20px'}}>
                        <ul className="list">
                            {Object.values(errors).map(value => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )
            }
        </>
    )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;