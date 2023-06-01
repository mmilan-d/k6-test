/*

Lets us create mock API for tetsing - Dummy API - 
https://designer.mocky.io/ - use this

Now, we need to do nfr test on https://run.mocky.io/v3/8bb4ece5-9482-4ac1-8706-2cd2ff867ce0

Lets execute this

Press tab to auto fill


How to decide whether this tets has passed or failed....There is nothing in logs ...
For example, if http response is 200, then Pass.. else some problem in API

So here we are tetsing
Request URL: https://run.mocky.io/v3/8bb4ece5-9482-4ac1-8706-2cd2ff867ce0
Request Method: GET
Status Code: 200 OK

Status code has to be 200

So, we will checks

Checks are asserts but they dont stop test execution ... :)
assert will fail the test and stop test exection, check wont stop tets execution
they just store whether tets is passed or failed

so lets write checks


res = 2000 - GREEN


So now lets change value 200 and see what happens

so you are exepctting that API shoudl return 404, but it retuns 200


So it aboue basics of chcks

useful to decie tets case pass or fail but do not halt tets execution


---

lets us execute tets again for multiple users


Chscks = 0% i.e. passing rate is 0%, you expect 404 and all the times API returns 200 or soemthing else other than 404


 ✓ is response status is 200 : 

    checks.....................: 100.00% ✓ 1   ✗ 0

    100% success rate - all the times API returns 200, no failures ... 


    Let us add one more check
    respknse. body . length

     response body length 0 becuase we did nt specify any body while creating mock
     you remeber you jsut select 200 but not added headr or any response body like this API mjst return Ok


         ✓ is response status is 200 : 
    ✓ body size is 0 bytes :

    Both the checks Passed

    __VU will print VU Number i..e 1 to 5 becuase we se max --vus = 5

    Lets print iteration number
    Whats iteration ? VU will keep on producing load for 10 secodns i.e duration that we have specified


    Lets create another API


    Second API returns response = {
"Message" : "API Executed Successfully"
}
Size of this is 43

Whats 43 i.e. lenght

it is JSON format

It ahs some length

So this is how we can add mutiple checks 
*/

import http from 'k6/http'

import {check} from 'k6'


export default function(){
    // this function returns response, so
    //let response = http.get('https://run.mocky.io/v3/8bb4ece5-9482-4ac1-8706-2cd2ff867ce0')

    //let response = http.get('https://run.mocky.io/v3/8352b5ae-2610-487b-bf3d-909c8f71d399') // returns response
    // Print logs
    let response = http.get('https://run.mocky.io/v3/852a05f3-de78-492e-b8a7-4f373138bae2')

    console.log(`response body length ${response.body.length} for VU= ${__VU} ITERA = ${__ITER}`) // Virtual user number

    const checks = check(response, {
        'is response status is 404 :' : (r) => r.status === 404,
       // 'body size is 43 bytes :' : (r) => r.body.length == 43,
    })
    //we use ===, so along with 200, it also checks for data type i..e number === number, string  === string.
    //expected and actual data type as weel as value has to be same

    let body = JSON.parse(response.body);
    body.data.forEach(element => {
        console.log(element.id)
    });

}
