import { useNavigate } from "react-router"
import useRequest from "./useRequest"
import { useState } from "react"
import useForm from "./useForm"
import { createWorkspace } from "../Services/workspaceService"

const useCreateWorkspace = () => {
    const navigate = useNavigate()
    const {loading, error, sendRequest} = useRequest()
    const [errors, setErrors] = useState({})

    const handleCreateWorkspace = async (form_values) => {
        const newErrors = {};

        if(!form_values.description || form_values.description.trim() === ''){
            newErrors.description = 'Es obligatorio una descripción para el espacio de trabajo.';
        } else if (form_values.description.lenght > 120){
            newErrors.description = 'La descripción no puede sobrepasar los 120 caracteres.';
        }

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors)
        } else{
            setErrors({});
            await sendRequest(async () => {
                await createWorkspace(form_values)
                navigate('/home')
            })
        }
    }

    const {form_state, onChangeFieldValue, onSubmitForm} = useForm({
        initial_form_fields: {
            'title': '',
            'description': ''
        },
        onSubmit: handleCreateWorkspace
    })

    return{
        form_state,
        onChangeFieldValue,
        onSubmitForm,
        isLoading: loading,
        error,
        errors
    }
}

export default useCreateWorkspace