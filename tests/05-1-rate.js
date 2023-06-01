/*
Checks will not fail the whole load tets suite
So we will use Rate along with check

Lets use Rate to fail tets uite

Condition - Fail load tets if 10% of resuetts gets failed
For example, 1000 VU call API once
So in short API gets called 1000 times
Total 1000 requets
Failure rate should be less than 10%
less tha 10% reusts failed is allowed else please fail the load tests


ERRO[0001] some thresholds have failed
100% failure
we expect max 10%
but all requets failed

THAS IT
*/

import  {Trend} from 'k6/metrics'
import http from 'k6/http'
import {check} from 'k6'
// Imort Rate
import {Rate} from 'k6/metrics'
// export variable that we will use in test
export let errorRate = new Rate('errors')


// define options
export let options = {
    thresholds :{
        errors: ['rate<0.1'] // i.e. 10% error
    }
}


export default function(){

    let response = http.get('https://run.mocky.io/v3/8352b5ae-2610-487b-bf3d-909c8f71d399') // returns response
    console.log(`response body length ${response.body.length} for VU= ${__VU} ITERA = ${__ITER}`) // Virtual user number
    const check1 = check(response, {
        'is response status is 200 :' : (r) => r.status === 200,
    }) // PASSED
    errorRate.add(!check1); // !i.e. not 200, body lenght not matched aso add not operator

    // Wy we apply not operator
    // when one of the check gets failed insdie check() call fails, check() retusn false
    // therefore we added NOT i.e. !true
    const check2 = check(response, {
        'body size is 12 bytes :' : (r) => r.body.length == 12,
    })
    errorRate.add(!check2); // FAILED 50% , 50%


}
