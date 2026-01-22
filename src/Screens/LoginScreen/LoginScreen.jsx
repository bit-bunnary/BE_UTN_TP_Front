import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { login } from '../../Services/authService';
import useRequest from '../../Hooks/useRequest';
import useForm from '../../Hooks/useForm';
import useLogin from '../../Hooks/useLogin';


const LoginScreen = () => {
    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        error,
        response
    } = useLogin()

    return ( 
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={onSubmitForm}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={onChangeFieldValue} value={form_state.email}></input>
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" onChange={onChangeFieldValue} value={form_state.password}></input>
                </div>
                {
                    error && <span style={{ color: 'red' }}>{error.message}</span>
                }
                {
                    response && response.ok && <span style={{ color: 'pink' }}>Login exitoso</span>
                }
                <br/>
                <button type="submit" disabled={loading || (response && response.ok)}>Iniciar Sesión</button>
            </form>
            
            <div>
                <span>¿No tienes una cuenta?</span>
                <Link to="/register">Regístrate</Link>
            </div>
        </div>    
    )
}

export default LoginScreen