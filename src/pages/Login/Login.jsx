import React from 'react';
import { Form, Button } from 'react-bootstrap';
import logo from "../../imgs/mylogo.png"
import { userAPI } from '../../api/axios';
import './Login.css'
import { useDispatch } from 'react-redux';
import { create } from '../../redux/slices/TokenSlice';
import { Link, useNavigate } from 'react-router-dom';


function Login(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleLoginForm(e) {
        try {
            e.preventDefault()
            const formData = new FormData(e.target)
            const res = await userAPI.login(formData)
            dispatch(create({ token: res.data.signedToken, isRememberMe: formData.get("isRememberMe") }))
            navigate("/dashboard")
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <div>
            <img className="login__logo" src={logo} alt="logo" />
            <Form onSubmit={handleLoginForm}>
                <Form.Group className="mb-3">
                    <Form.Control name="username" type="text" placeholder="Type your username" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control name="password" type="password" placeholder="Type your password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formHorizontalCheck">
                    <Form.Check label="Remember me" name="isRememberMe" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formHorizontalCheck">
                    <Link to="/register" >You don't have account?</Link>
                </Form.Group>
                <Button className="login__btn" variant="primary" type="submit">
                    Log in
                </Button>
            </Form>
        </div>
    );
}

export default Login;