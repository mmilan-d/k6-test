/*
Threashod define pass/fail critera for tests

EXAMPLE
System does not produe more than 1% of errors
Response time for 95% of APIs/ requests shoudl be below 200 milisecond
Resonse time for 99% of requests should be below 400 milisecodns

Lets code !

So, threashold analyse performance metrics defined above
determine final tets reult
mar tets as pass/fail

*/

import http from 'k6/http'
import {Rate} from 'k6/metrics'

// Declare Rate
const failureRate = new Rate('failed requests')

// failed requests............: 0.00%  ✓ 0   ✗ 1 --  NO FAILURE 
// All below req satisfied
export let options = {
    threasholds:{
        // Define requriements
        'failed requests' : ['rate<0.1'],
        'http_req_duration' :['p(95)<001', 'p(99)<001'] // why http_req_duration /// repsone must be less than 1 miliseconds
        //     failed requests............: 0.00%  ✓ 0    ✗ 585 -- all the requests get failed becuase we speciied critera as respone must be less than 1 milisecond
        // this is how you can decide whether tets is passed or failed 
    }
};

export default function(){
    let res = http.get('https://run.mocky.io/v3/983af971-096a-4108-b262-d13ce7f46f47') // this api retuns 200, so we checked for 200 response code

    // Apply threasholdss
    failureRate.add(res.status !== 200) // if respone is not 200, then fail

    // Lets execute with multipel uer

    // no such URL exists - lest try another one

    // actually i am disconncted from internet so URL errr lest try again

   // so use --http-debug=full to get all the logs from API calls
}

