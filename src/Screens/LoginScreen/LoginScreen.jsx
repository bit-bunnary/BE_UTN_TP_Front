import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { login } from '../../Services/authService';
import useRequest from '../../Hooks/useRequest';
import useForm from '../../Hooks/useForm';
import useLogin from '../../Hooks/useLogin';
import "./LoginScreen.css"


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
        <div className="login-container">
            <div className="login-card">

                <h1 className="login-title">BloomTalk 🌸</h1>
                <h2 className="login-heading">Iniciar Sesión</h2>

                <form onSubmit={onSubmitForm} className="login-form">

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={onChangeFieldValue}
                            value={form_state.email}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={onChangeFieldValue}
                            value={form_state.password}
                            required
                        />
                    </div>

                    {error && (
                        <span className="error-message">
                            {error.message}
                        </span>
                    )}

                    {response && response.ok && (
                        <span className="success-message">
                            Login exitoso ✨
                        </span>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading || (response && response.ok)}
                    >
                        {loading ? "Ingresando..." : "Iniciar Sesión"}
                    </button>
                </form>

                <div className="login-footer">
                    <span>¿No tienes una cuenta?</span>
                    <Link to="/register" className="link">
                        Regístrate
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default LoginScreen