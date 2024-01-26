
const makeRegex = (str : string)=>{
    const regex = /[a-zA-Z0-9]/
    str=str.toLowerCase()
    let res = ''
    for (let i=0;i<str.length;i++)
    {
        if (regex.test(str[i]))
            res+=str[i]
    }
    return res
}

const getLookup = (obj : Record<string, any>,str : string) : string=>{
    const s = str.split('.')
    let r = structuredClone(obj)
    s.forEach((item)=>{
        r = r[item]
    })
    return r as unknown as string
}

export const Search : <T>(list: any[], search: string, lookup: string) => any[]  = (list, search, lookup)=>{
    const result1 = list.filter((item)=> makeRegex(getLookup(item, lookup)).includes(makeRegex(search)))

    const remaining = list.filter((item)=> !makeRegex(getLookup(item, lookup)).includes(makeRegex(search)))

    const result2 = remaining.filter((ix)=>{
        const item = getLookup(ix, lookup)
        const itemWords = item.split(' ')
        const searchWords = search.split(' ')
        if (itemWords.length === searchWords.length)
        {
            for (let i=0;i<itemWords.length;i++)
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