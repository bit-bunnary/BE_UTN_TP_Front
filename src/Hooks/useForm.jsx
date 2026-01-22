import { useState } from "react"

const useForm = ({initial_form_fields, onSubmit}) => {
    const [form_state, setFormState] = useState(initial_form_fields)

    /* trackea el valor de un campo */
    const onChangeFieldValue = (event) => {
        const {name, value} = event.target
        
        setFormState(
            (prevFormState) => {
                return {...prevFormState, [name]: value}
            }
        )
    }

    /* previene la recarga del evento submit y activa la función de envio */
    const onSubmitForm = (event) => {
        event.preventDefault()
        onSubmit(form_state)
    }
    
    return{
        form_state,
        onChangeFieldValue,
        onSubmitForm
    }
}

export default useForm