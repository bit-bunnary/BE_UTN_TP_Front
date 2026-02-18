import React from "react";
import { Link } from "react-router";
import useRegister from "../../Hooks/useRegister.jsx";
import "./RegisterScreen.css";

const RegisterScreen = () => {
    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        error,
        response
    } = useRegister();

    return (
        <div className="register-container">
            <div className="register-card">

                <h1 className="register-title">🌸⋆˚BloomTalk˖°🌸</h1>
                <h2 className="register-heading">Crear Cuenta</h2>

                <form onSubmit={onSubmitForm} className="login-form">

                    <div className="input-group">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={form_state.username}
                            onChange={onChangeFieldValue}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form_state.email}
                            onChange={onChangeFieldValue}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form_state.password}
                            onChange={onChangeFieldValue}
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
                            Usuario registrado ✨ Revisa tu email para verificar tu cuenta.
                        </span>
                    )}

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading || (response && response.ok)}
                    >
                        {loading ? "Registrando..." : "Crear Cuenta"}
                    </button>
                </form>

                <div className="register-footer">
                    <span>¿Ya tienes una cuenta?</span>
                    <Link to="/login" className="link">
                        Inicia sesión
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default RegisterScreen;