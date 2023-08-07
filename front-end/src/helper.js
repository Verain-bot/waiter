import { json } from 'react-router-dom'
import RouteList from './routeList'

export const BASEUrl = 'http://localhost:8000/'


const makeRegex = (str)=>{
    var regex = /[a-zA-Z0-9]/
    str=str.toLowerCase()
    var res = ''
    for (var i=0;i<str.length;i++)
    {
        if (regex.test(str[i]))
            res+=str[i]
    }
    return res
}


export const Search = (list, search, lookup)=>{
    var result1 = list.filter((item)=> makeRegex(item[lookup]).includes(makeRegex(search)))

    var remaining = list.filter((item)=> !makeRegex(item[lookup]).includes(makeRegex(search)))

    var result2 = remaining.filter((item)=>{
        var itemWords = item.name.split(' ')
        var searchWords = search.split(' ')
        if (itemWords.length === searchWords.length)
        {
            for (var i=0;i<itemWords.length;i++)
            {
                if (!makeRegex(itemWords[i]).startsWith(makeRegex(searchWords[i])))
                    return false
            }
            return true
        }
        return false

    })
    

    return  result1.concat(result2)
}

export const getData = async (url,signal) =>{
    let response = new Response('',{statusText: 'Something went wrong.', status: 500})
    try{
        response = await fetch(BASEUrl+url,{
            signal: signal,    
        })
    }
    catch(err){
        throw new Response('Something went wrong. This could be an issue with the server, try again later',{statusText: err.message, status: 500})
    }
    
    if (!response.ok){
        
        let data = ''
        try{
            //check if data is json using headers
            let contentType = response.headers.get('content-type')
            if (contentType && contentType.includes('application/json'))
            {
                data = await response.json()
                data = data.detail
            }
            else
                data= response.statusText
            
        }
        catch(err){
            throw new Response('Bad error, contact admin.',{statusText: err.message, status: 500})
        }
        throw new Response(data,{statusText: data, status: response.status})   
    }


    return response
}