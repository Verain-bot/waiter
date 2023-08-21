import { makeRequest } from "./fetchData"

export const fetchUserData = async () => {

    const request = new Request('api/account/', {
        method: 'GET',
    })
    
    return await makeRequest('api/account/', request, new FormData())

}