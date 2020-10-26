import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Button, Form} from 'semantic-ui-react';

import {useForm} from '../util/hooks';

function Login(props) {
    const [errors, setErrors] = useState({});
    
    const {onChange, onSubmit, values} = useForm(onLoginUser, {
        username: '',
        password: ''
    });    

    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, result) {
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function onLoginUser() {
        loginUser();
    }
  
    return (
        <>
            <h1 className="page-title">Login</h1>

            <div className="form-container">
                <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <Form.Input
                        label="Username"
                        placeholder="Username..."
                        name="username"
                        value={values.username}
                        error={errors.username ? true : false}
                        onChange={onChange}
                    ></Form.Input>

                    <Form.Input
                        label="Password"
                        placeholder="Password..."
                        name="password"
                        type="password"
                        value={values.password}
                        error={errors.password ? true : false}
                        onChange={onChange}
                    ></Form.Input>

                    <Button type="submit" primary>Login</Button>
                </Form>

                {
                    Object.keys(errors).length > 0 && (
                        <div className="ui error message">
                            <ul className="list">
                                {Object.values(errors).map(value => (
                                    <li key={value}>{value}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
            </div>
        </>
    )
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username
            password: $password
        ){
            id email username createdAt token
        }
    }
`

export default Login;