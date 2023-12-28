
const makeRegex = (str : string)=>{
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

const getLookup = (obj : Record<string, any>,str : string) : string=>{
    var s = str.split('.')
    var r = structuredClone(obj)
    s.forEach((item)=>{
        r = r[item]
    })
    return r as unknown as string
}

export const Search : <T>(list: any[], search: string, lookup: string) => any[]  = (list, search, lookup)=>{
    var result1 = list.filter((item)=> makeRegex(getLookup(item, lookup)).includes(makeRegex(search)))

    var remaining = list.filter((item)=> !makeRegex(getLookup(item, lookup)).includes(makeRegex(search)))

    var result2 = remaining.filter((ix)=>{
        var item = getLookup(ix, lookup)
        var itemWords = item.split(' ')
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

export default Search