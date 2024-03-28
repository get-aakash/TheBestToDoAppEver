export const randomStrGenerator = length =>{
    let str = ""
    const collectionStr = "qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP"
    for(let i =0; i<length;i++){
        const charPosition = Math.round(Math.random()*collectionStr.length)
        str += collectionStr[charPosition]
    }
    return str;
}