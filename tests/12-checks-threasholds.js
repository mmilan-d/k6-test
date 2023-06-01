/*

Checks - useful for assetiosn, pass/fail result - NO
Cheks just act lise asseion, verify if things test works as expected
They dont fail the load test
so we need threasholds

Lets combine checks and threaholds to get best of both

*/

import http from 'k6/http'
import { check } from 'k6'

export let options = {
    vus: 10,
    duration: '10s',
    threasholds: {
        // rate of successful checks must be greater than 95%. >95% checksmust PASS/ SUCCESSFUL
        'checks': ['rate>0.95']
    }
}

export default function () {
    const response = http.get('https://run.mocky.io/v3/983af971-096a-4108-b262-d13ce7f46f47');

    //assume that above API retuns 500
    check(response, {
        'is status is 500 : ' : r => r.status === 500
    })

    /*
    ✗ is status is 500 :  
     ↳  0% — ✓ 0 / ✗ 613

     Total 613 requets - none returns 500

     here, threashold is configured on check metrics
     rate of successful check must be greater than 95%
     
    */
}