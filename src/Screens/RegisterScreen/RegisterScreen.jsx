import React from "react";
import { Link } from "react-router";
import useForm from "../../Hooks/useForm.jsx";
import { register } from "../../Services/authService.js";
import useRequest from "../../Hooks/useRequest.jsx";
import useRegister from "../../Hooks/useRegister.jsx";

const RegisterScreen = () => {
    const {
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        error,
        response
    } = useRegister()
    return (
        <div>
            <h1>Registrate en la aplicación</h1>
            <form onSubmit={onSubmitForm}>
                <div>
                    <label htmlFor="username">Nombre de Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form_state.username}
                        onChange={onChangeFieldValue}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form_state.password}
                        onChange={onChangeFieldValue}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form_state.email}
                        onChange={onChangeFieldValue}
                    ></input>
                </div>
                {
                    error && <span style={{color: 'red'}}>{error.message}</span>
                }
                {
                    response && response.ok && <span style={{color: 'pink'}}>Usuario registrado, se ha enviado un mail para su verificación</span>
                }
                <br/>
                <button type="submit" disabled={loading}>Registrarse</button>
            </form>
            <div>
                <span>¿Ya tienes una cuenta?</span>
                <Link to="/login">Inicia seción</Link>
            </div>
        </div>
    );
};

export default RegisterScreen;
