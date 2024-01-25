export const BASEUrl = process.env.NODE_ENV !== 'production'? 'http://localhost:8000' : ''

export const getData : (url: string, signal: AbortSignal ) => Promise<Response> = async (url,signal) =>{
let response = new Response('',{statusText: 'Something went wrong.', status: 500})
    try{
        response = await fetch(BASEUrl+url,{
            signal: signal,    
            credentials: 'include'
        })
    }
    catch(err : any){
        throw new Response('Something went wrong. This could be an issue with the server, try again later',{statusText: err.message, status: 500})
    }
    
    if (!response.ok){
        
        let data = ''
        try{
            //check if data is json using headers
            let contentType = response.headers.get('content-type')
            if (contentType && contentType.includes('application/json'))
            {
                const R = await response.json()
                data = R.detail
            }
            else
                data= response.statusText
            
        }
        catch(err : any){
            throw new Response('Bad error, contact admin.',{statusText: err.message, status: 500})
        }
        throw new Response(data,{statusText: data, status: response.status})   
    }


    return response
}

export const makeRequest = async (url: string, request: Request, data: FormData) =>{
    var response : Response | null = null
    const cookie = document.cookie
    
    //get csrf token from cookie
    const csrfToken = cookie.split(';').find(c => c.trim().startsWith('csrftoken='))?.split('=')[1]

    try{

        
        if(request.method == 'GET'){

            response = await fetch(BASEUrl+url,{
                method: request.method,
                signal: request.signal,
                headers: {
                    'Accept': 'application/json',
                    'X-CSRFToken': csrfToken || '',
                },
                credentials: 'include'
            })
        }
            
        else{

            response = await fetch(BASEUrl+url,{
                method: request.method,
                signal: request.signal,
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'X-CSRFToken': csrfToken || '',
                },
                credentials: 'include'
            })
        }
    }
    catch(err : any){
        throw new Response('Something went wrong. This could be an issue with the server, try again later',{statusText: err.message, status: 500})
    }

    var json = null
    
    try{
        json = await response.json()
    }
    catch(err : any){
        throw new Response('JSON Parse error',{statusText: 'Unable to parse JSON.', status: response.status})
    }

    let message = ''

    if (!response.ok){
        try{
            
            if( 'type' in json && json.type && json.type == 'error')
                message = json.message
            else
                message = json.detail       
        }
        catch(err : any){
            message = 'Bad error, contact admin.'
        }
    }
    return {json, message, response}
}

