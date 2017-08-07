
export function makeURLSearchQuery(params) {
    let search = new URLSearchParams();
    for (var key in params) {
        search.append(key, params[key]);
    }
    return search;
}

export function parseURLQuery(data: string) {
    var map = data.split('&')
    var response = {}
    map.forEach(element => {
        let keyValue = element.split('=');
        response[keyValue[0]] = keyValue[1];
    });      
    return response;
}

export function sortObject(params) {
    var sortedKeys = Object.keys(params).sort(function(a, b){
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
    })
    var sortedObject = {}
    sortedKeys.forEach(element => {
        sortedObject[element] = params[element];
    });
    return sortedObject;
}