import b64_hmac_sha1 from 'hmacsha1';
import { makeURLSearchQuery, sortObject } from './utils'
import api from './api'

var requestTokenUrl: string = api['REQUEST_TOKEN_URL'];

var appKey: string = '18a91e0d831c8ae7ce2f2478e8f7f2d0';

var appSecret: string = '7f91aaf323eb9674&';

var redirectUrl: string = encodeURIComponent('http://localhost:4200/');

var nonce: number = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);

var timestamp: number = new Date().valueOf();

export const REQUEST_TOKEN_PARAMS = {
    'oauth_callback': redirectUrl,
    'oauth_consumer_key': appKey,
    'oauth_nonce': nonce,
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': timestamp,
    'oauth_version': '1.0'
}

export function buildURL(params, baseUrl, secret='') {
    params = sortObject(params);
    let baseString = getBaseQuery('GET', baseUrl, params);
    return baseUrl + '?'
                + buildURIQuery(params)
                + '&oauth_signature='
                + generateSingature(baseString, appSecret + secret)
}

export function getRequestTokenURL() {
    var params = REQUEST_TOKEN_PARAMS;
    return requestTokenUrl 
            + '?' 
            + buildURIQuery(params)
            + '&oauth_signature=' + generateSingature(getBaseQuery());
}

export function getBaseQuery(method='GET', url=requestTokenUrl, params=REQUEST_TOKEN_PARAMS) {
    return  method + '&' 
            + encodeURIComponent(url) +'&'
            + encodeURIComponent(buildURIQuery(params));
}

export function generateSingature(baseString: string, secret: string = appSecret) {
    return encodeURIComponent(b64_hmac_sha1(secret, baseString));
}


function buildURIQuery(params) {
    let query = makeURLSearchQuery(params).toString();    
    return query
}
