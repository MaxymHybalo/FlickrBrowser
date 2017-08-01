import b64_hmac_sha1 from 'hmacsha1';

var requestTokenUrl: string = 'https://www.flickr.com/services/oauth/request_token';

var appKey: string = '18a91e0d831c8ae7ce2f2478e8f7f2d0';

var appSecret: string = '7f91aaf323eb9674';

var redirectUrl: string = encodeURIComponent('http://localhost:4200');

var nonce: number = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);

var timestamp: number = new Date().valueOf();

const requestTokenParams = {
    'oauth_callback': redirectUrl,
    'oauth_consumer_key': appKey,
    'oauth_nonce': nonce,
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': timestamp,
    'oauth_version': '1.0'
}

export function getRequestTokenURL() {
    var params = requestTokenParams;
    return requestTokenUrl 
            + '?' 
            + buildURIQuery(params)
            + '&oauth_signature=' + generateSingature(getBaseQuery());
}

export function getBaseQuery() {
    console.log('Params: ', requestTokenParams);
    
    return 'GET&' 
        + encodeURIComponent(requestTokenUrl) +'&'
        + encodeURIComponent(buildURIQuery(requestTokenParams));
}

export function generateSingature(baseString: string) {
    return encodeURIComponent(b64_hmac_sha1(appSecret + '&', baseString));
}


function buildURIQuery(params) {
    var concatParams = ''
    for (var key in params) {
        concatParams += key + '=' + requestTokenParams[key] + '&'
    }
    concatParams = concatParams.slice(0, concatParams.length-1);
    console.log(concatParams);
    
    return concatParams;
}
