var baseURL = 'https://www.flickr.com/';
var apiURL = 'https://api.flickr.com/'
export default {

    REQUEST_TOKEN_URL: baseURL + 'services/oauth/request_token',

    ACCESS_TOKEN_URL: baseURL + 'services/oauth/access_token',
    
    AUTHORIZE: baseURL + 'services/oauth/authorize',

    REST: apiURL + 'services/rest'
}