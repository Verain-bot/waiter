import { json } from 'react-router-dom'

export const BASEUrl = 'http://localhost:8000/'

export const getData : (url: string, signal: AbortSignal ) => Promise<Response> = async (url,signal) =>{
let response = new Response('',{statusText: 'Something went wrong.', status: 500})
    try{
        response = await fetch(BASEUrl+url,{
            signal: signal,    
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