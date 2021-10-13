const transformData = <T>(data: string):T => {

    const isNotNumber = isNaN(parseFloat(data));

    if(!isNotNumber){
        const size = parseFloat(data).toString().length;
        const isDiffSize = size !== data.length;
        if (!isDiffSize){
            return parseFloat(data) as unknown as T;
        }
        return data as unknown as T;
    }

    const startsWith = data.includes('{\\\"');
    const endsWith = data.includes('}');

    if (!startsWith && !endsWith){
        return data as unknown as  T;
    }

    return JSON.parse(data);
}

export default transformData;
