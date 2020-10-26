import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Button, Form} from 'semantic-ui-react';

import {useForm} from '../util/hooks';

function Register(props) {
    const [errors, setErrors] = useState({});
    
    const {onChange, onSubmit, values} = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, {loading}] = useMutation(REGISTER_USER, {
        update(_, result) {
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    function registerUser() {
        addUser();
    }

  
    return (
        <>
            <h1 className="page-title">Register</h1>

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
                        label="Email"
                        placeholder="Email..."
                        name="email"
                        value={values.email}
                        error={errors.email ? true : false}
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

                    <Form.Input
                        label="Confirm Password"
                        placeholder="Enter Password Again..."
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        onChange={onChange}
                    ></Form.Input>

                    <Button type="submit" primary>Register</Button>
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

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register;