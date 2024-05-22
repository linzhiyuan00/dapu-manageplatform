const paramHandle = (Param: any) => {
    const param: any = {};
    Object.keys(Param).map((key) => {
        // console.log(key, Param[key])
        if (key.includes('time') && Param[key]) {
            if (Param[key] instanceof Array) {
                param[key] = Param[key].map((i: any) => i.format('YYYY-MM-DD'))
            } else {
                param[key] = Param[key].format('YYYY-MM-DD');
            }
        } else if (key.includes('_') && Param[key] === 'all') {
            param[key] = undefined;
        } else if (key === 'wheres') {
            param[key] = paramHandle(Param[key])
        } else if (key === 'sort' && Param[key]) {
            param[key] = [Param[key][0], Param[key][1].replace('ascend', 'asc').replace('descend', 'desc')]
        } else {
            param[key] = Param[key] || undefined
        }
    })
    return param;
}


const getPackageList = () => {
    try {
       return JSON.parse(localStorage.getItem('hy_packageList') as string || '[]') || []; 
    } catch (error) {
        
    }
}

export {
    paramHandle,
    getPackageList
}