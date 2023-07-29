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

export const getData = async (url) =>{
    const response = await fetch(BASEUrl+url)
    return response
}