import { ServerError } from "../Utilities/errorUtilities";

const URL_API= import.meta.env.VITE_API_URL /* 'http://localhost:8180' */

export async function login (email, password) {
    const response_http = await fetch(
        URL_API + '/api/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', /* avisamos que enviamos json en el request */
            },
            body: JSON.stringify({ /* transforma un objeto a JSON en formato string */
                password: password,
                email: email
            })
        }
    )

    const response = await response_http.json()
    if (!response.ok) {
        throw new ServerError(response.message, response.status)
    }
    return response
}

export async function register (username, password, email) {

    const response_http = await fetch(
        URL_API + '/api/auth/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        }
    )

    const response = await response_http.json()
    if (!response.ok) {
        throw new ServerError(response.message, response.status)
    }
    return response
}

/* 
Response body example:
    {
        "message": "Usuario creado exitosamente! (￣▽￣)",
        "ok": true,
        "status": 201,
        "data": null
    } 
*/