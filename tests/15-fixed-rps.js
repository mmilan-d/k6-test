/*
Lets execute samel script
 k6 run ./tests/15-fixed-rps.js --vus 5 --duration 5s

 Can yo tellme how many requests will be executed during 5 secodns
 lets execute 
 Total 122 requests

 I depends upon API response, your laptop/seever/vm configuration on whoch you are executing your tests

 u dont have ny control over it

 Now its iterations.................: 144   28.796679/s
 previous 122
 why
 it depends upon how fast response is, how VU gets loaded


 So many a times, you need to take control of number of requests
 so 
 we will use 
 --rps
 i.e rate per second
 request rate per second

 per second only 5 requests

 lest execute

 k6 run ./tests/15-fixed-rps.js --vus 5 --duration 5s --rps 5
 How many requsts gets called
 rps = 5, duration = 5
 5 * 5 = 25 requests
    iterations.................: 25     4.998545/s
iterations.................: 25     4.999269/s

Soe ach time it is 25
its benifit of RPS
t controls your requests

Will it be always 25 ?/
NO
If the machine on whihc you are executing tets is very very slow
OR
The API https://run.mocky.io/v3/983af971-096a-4108-b262-d13ce7f46f47 you are tetsing
returns resposne late lest say greater than 1 second
then you wont be able to achieve desireable PRPS


So this is how you can use RPS



*/

import http from 'k6/http'

export default function(){
    http.get('https://run.mocky.io/v3/983af971-096a-4108-b262-d13ce7f46f47');
}