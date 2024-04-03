import { lookup } from "dns"

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

const getMultipleLookups = (obj : Record<string, any>,lookups : string[]) : string=>{
    let strToReturn = ''
    lookups.forEach((lookup=>{
        const r = getLookup(obj,lookup)
        strToReturn+=r
    }))
    return strToReturn
}

export const Search : <T>(list: any[], search: string, lookups: string[]) => any[]  = (list, search, lookups)=>{
        
        const result1 = list.filter((item)=> makeRegex(getMultipleLookups(item, lookups)).includes(makeRegex(search)))
        
        const remaining = list.filter((item)=> !makeRegex(getMultipleLookups(item, lookups)).includes(makeRegex(search)))
        
        const result2 = remaining.filter((ix)=>{
            const item = getMultipleLookups(ix, lookups)
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