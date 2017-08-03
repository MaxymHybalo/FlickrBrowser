import b64_hmac_sha1 from 'hmacsha1';
import { makeURLSearchQuery, sortObject } from './utils'
import api from './api'

var requestTokenUrl: string = api['REQUEST_TOKEN_URL'];

var appKey: string = '18a91e0d831c8ae7ce2f2478e8f7f2d0';

var appSecret: string = '7f91aaf323eb9674&';

var nonce: number = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);

var timestamp: number = new Date().valueOf();

const REQUEST_TOKEN_PARAMS = {
    'oauth_consumer_key': appKey,
    'oauth_nonce': nonce,
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': timestamp,
    'oauth_version': '1.0'
}

export function buildURL(params, baseUrl, secret='') {
    var assignedParams = params ? Object.assign(REQUEST_TOKEN_PARAMS, params) : REQUEST_TOKEN_PARAMS;
    assignedParams = sortObject(assignedParams);
    let baseString = getBaseQuery('GET', baseUrl, assignedParams);
    return baseUrl + '?'
                + buildURIQuery(assignedParams)
                + '&oauth_signature='
                + generateSingature(baseString, appSecret + secret)
}

function getBaseQuery(method='GET', url=requestTokenUrl, params=REQUEST_TOKEN_PARAMS) {
    return  method + '&' 
            + encodeURIComponent(url) +'&'
            + encodeURIComponent(buildURIQuery(params));
}

function generateSingature(baseString: string, secret: string = appSecret) {
    return encodeURIComponent(b64_hmac_sha1(secret, baseString));
}


function buildURIQuery(params) {
    let query = makeURLSearchQuery(params).toString();    
    return query
}
