const getDataAsString = (data: any): string => {
    const isObject =  typeof data === 'object';
    
    if(isObject){
        const isDate = data instanceof Date;
        if(isDate){
            return  data.toString();
        }
        return JSON.stringify(JSON.stringify(data));
    }
    return`${data}`;
}

export default getDataAsString;
