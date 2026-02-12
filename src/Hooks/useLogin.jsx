import { useNavigate } from "react-router"
import useRequest from "./useRequest"
import { login } from "../Services/authService"
import useForm from "./useForm"
import { useContext, useEffect } from "react"
import { AUTH_TOKEN_KEY, AuthContext } from "../Context/AuthContext"

function useLogin() {
    const navigate = useNavigate()
    const {saveSession, isLogged, session} = useContext(AuthContext)
    
    console.log({isLogged, session})
    
    const initialLoginForm = {
        email: '',
        password: ''
    }
    const {response, error, loading, sendRequest} = useRequest()

    function loguearse (form_state) {
        sendRequest(
            () => {
                return login(form_state.email, form_state.password)
            }
        )
    }
    
    const {onChangeFieldValue, onSubmitForm, form_state} = useForm({initial_form_fields: initialLoginForm, onSubmit: loguearse})
    
    /* se ejecuta cada que se cambie la response, si todo está bien cambia el token */
    useEffect(() => {
            if(response && response.ok){
                saveSession(response.data.auth_token)
                navigate('/home')
            }
        }, 
        [response]
    )

    return{
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        loading,
        error,
        response
    }
}

export default useLogin