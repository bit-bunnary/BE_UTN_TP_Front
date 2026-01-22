import { useState } from "react"
/* maneja el estado de consultas, siempre es (error, response, loading) */
function useRequest() {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    
    async function sendRequest (request) {
        try {
            setLoading(true)
            setResponse(null)
            setError(null)
            const response = await request()
            setResponse(response)
        }
        
        catch (error) {
            if(error.status){
                setError(error)
            }
            else{
                setError(
                    {
                        message: 'Ha ocurrido una excepción'
                    }
                )
            }
        }

        finally{
            setLoading(false)
        }
    }

    return{
        loading,
        response,
        error,
        sendRequest
    }
}

export default useRequest