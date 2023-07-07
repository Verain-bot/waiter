export const makeRegex = (str)=>{
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