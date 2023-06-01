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

// define trend
var getApiTrend = new Trend("TREND_Get_Api_Duration")
var getApiTrendWaiting = new Trend("TREND_Get_Api_Waiting")
var googleGetApiTrend = new Trend("TREND_Google_Get_Api_Duration")
var googleGetApiTrendWaiting = new Trend("TREND_Google_Get_Api_Waiting")

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

    // added response duration inside custom trend
    //     http_req_duration..........: avg=146.61ms min=146.61ms med=146.61ms max=146.61ms p(90)=146.61ms p(95)=146.61ms
    //     TREND_Get_Api_Duration.....: avg=146.6175 min=146.6175 med=146.6175 max=146.6175 p(90)=146.6175 p(95)=146.6175
    // both are same
    // imagine that in a workflow , when you tets multiple APIs inside Single Test Script files, then you neeed trend to find out response of individual API
    // http duration will provide you cummulative responses
    getApiTrend.add(response.timings.duration)
    getApiTrendWaiting.add(response.timings.waiting)



    //we use ===, so along with 200, it also checks for data type i..e number === number, string  === string.
    //expected and actual data type as weel as vale has to be same

    // Lets spit check into 2 and verify error rate


    // lets add one more API
    const googleResponse = http.get('https://www.google.com/');
    googleGetApiTrend.add(googleResponse.timings.duration)
    googleGetApiTrendWaiting.add(googleResponse.duration.waiting)
    // add trend

}

/*
From rate.js, we will send performance result to influxdb

by default influxdb started on http://localhost:8086/
page not foudn is just an error as index.htl page does not exists
its for tetsing purpse and product level deployment will very


This is how you can send results to database
but its hard to interpret
s we need dashboard
for thsi we will use Grafana dashboard
These interactive Graphs can be shared with stakeholders for bette representation


Let us see live test execution on Grafana
Imagine that you set up CI/CD, GIT -> Then stakeholders can see live results on Grafana
Develoeprs push code, it triggers their UTs, then if UTs pass, then trigger K6 tets and stakeholders will see live results

This is how you can see live rsults 
*/


/*
    TREND_Get_Api_Duration..........: avg=151.5969 min=151.5969 med=151.5969 max=151.5969 p(90)=151.5969 p(95)=151.5969
    TREND_Google_Get_Api_Duration...: avg=138.6274 min=138.6274 med=138.6274 max=138.6274 p(90)=138.6274 p(95)=138.6274
    http_req_duration...............: avg=145.11ms min=138.62ms med=145.11ms max=151.59ms p(90)=150.29ms p(95)=150.94ms

    1-2-3 all are different
    Get Api Trend - Duration of Get API
    Google API Trend - Duration of Google API call
    http req duration - cummulative reults of all the API calls made within 06-rate.js tets spec file

    // This ishow Trend works

*/