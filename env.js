/*
declare environment variables - URls, int dev pro

Our moodle is hosted on http://127.0.0.1:83

Main servie URL is http://127.0.0.1:83/webservice/rest/server.php

*/

var SERVER_INT_URL = "http://127.0.0.1:83/webservice/rest/server.php"
var SERVER_DEV_URL = "http://127.0.0.1:84/webservice/rest/server.php" // ASSUME dev hosted on 84
var SERVER_PROD_URL = "http://www.moodle.com/webservice/rest/server.php"

// export variables so that it can be used in other JS files
export let intEnvironment = {
    SERVER_ENDPOINT: SERVER_INT_URL
}

// DEV URL THAT CAN BE USED INSIDE OTHER JS FILES
export let devEnvironment = {
    SERVER_ENDPOINT: SERVER_DEV_URL
}

// Prod URL
export let prodEnvironment = {
    SERVER_ENDPOINT: SERVER_PROD_URL
}

// Now lest declare environment types
export let int = "int"

export let dev = "dev"

export let prod = "prod"

// so we declare env.sh and env.js
// sensitive data
// easily configurable data at runtime
// int/dev/prod/prod-int - typs of URL/ Endpoints

// lots of errros... but no logs inside console... so how to resolve this ....