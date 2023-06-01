/*

POST JSON BODY to REST API

API is https://run.mocky.io/v3/983af971-096a-4108-b262-d13ce7f46f47
POST Email and password to this API in JSOn format
Above API will return 200 response

*/

import http from 'k6/http'

export default function () {
    var url = 'https://run.mocky.io/v3/983af971-096a-4108-b262-d13ce7f46f47'

    var param = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //lets define body - its acepts email and password - assuem this
    // ALT SHIFT F to format document
    var payload = JSON.stringify({
        email: "abc@gmail.com",
        password: "abcdefg"
    })

    // URL, HEADER, JSON BODY
    let response = http.post(url, param, payload)

    // So no errors here

    // this is how you can POST JSON BODY to API
}