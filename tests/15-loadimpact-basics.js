/*
 Basics of loadimapct scripts

 Groups - 
 Groups are optional
 Allows you to grup load test k6 scripts for better visualization

 Groups can be nested i.e. group inside group


 Thresholds on groups ...
 Threasholds - we alredy discsued this in previos sessiosn
 it defines pass/fail critera for your load tests
 threashold on groups - decide pass/fail critera for group

 Tags - useful to filter out checks, APIS calls, Threasholds , trend i.e. K6 Entities
 Les see example

Thresholds on Tags - pas/fail complete load test based upon Tags
Lect check K6 losg, there is http_request_duration


*/

import http from 'k6/http'
import { check, group } from 'k6'
import { Rate, Trend } from 'k6/metrics'
// declare vairbale
export let errorRate = new Rate('errors')

// declare trend
let groupDuration = Trend("groupDuration")

let getUserApiTrend = Trend("getUserApiTrend")
let getGroupApiTrend = Trend("getGroupApiTrend")

// Lets create Trend and add tag

// Define Options
export let options = {
    vus: 20,
    duration: '60s', // you can also specify duration as '1m' or '1m10s'
    // Threashold
    thresholds: {
        errors: ['rate<0.1'],// 10% errors,

        'groupDuration{groupName:groupGetUsers}': ['avg < 200' , 'p(90) < 400'],
        'groupDuration{groupName:groupGetGroups}': ['avg< 300'],

        // Add Tags - Thresholds
        'http_req_duration{type:GETAPITAG}': ['p(95)<100'],// duration must be less than 100 miliseocnds 95% of time

        "http_req_duration{type:GETGROUPSTAG}": ["p(95)<100"],

        /*
http_req_duration................: avg=156.19ms   min=140.62ms med=147.79ms  max=308.19ms p(90)=164.53ms  p(95)=174.36ms
    ✗ { type:GETAPITAG }.............: avg=162.72ms   min=141.62ms med=148.71ms  max=308.19ms p(90)=173.46ms  p(95)=287.28ms
    ✗ { type:GETGROUPSTAG }..........: avg=149.1ms    min=140.62ms med=147.2ms   max=164.53ms p(90)=157.65ms  p(95)=162.48ms

        */

        /*
    groupDuration....................: avg=328.206897 min=142      med=188      max=1159     p(90)=998.6    p(95)=1132
    ✓ { groupName:groupGetGroups }...: avg=180.37037  min=144      med=187      max=219      p(90)=205.8    p(95)=207
    ✗ { groupName:groupGetUsers }....: avg=456.967742 min=142      med=192      max=1159     p(90)=1132     p(95)=1141
        */

        // This is how you can measure group performance and thresholds

        // We need Trend to measure group timing

    },

    ext: {
        loadimpact: {
            projectID: 3498636,
            // Test runs with the same name groups test runs together
            name: "Learn Loadimpact Basics"
        }
    }
}

// define function to measure time
function groupWithMetrics(nameOfGroup, groupFunction) {
    // start time
    let start = new Date(); // noe 11.01
    // call group
    group(nameOfGroup, groupFunction); // call get APIs
    let end = new Date();// Stop date // 11.:10

    // Add Trend timing
    groupDuration.add(end - start, { groupName: nameOfGroup }) // end -start = 9 second

}

// default main function
export default function () {
    // Logically there are 2 APIS - Get Users and Groups
    // so yo can think of having 2 groups
    // ____ API 1 __________________ Lets assume that this API returns list of Users

    groupWithMetrics("groupGetUsers", function () {
        const responseGetUsers = http.get('https://run.mocky.io/v3/d3cfd6eb-5088-43eb-b27a-0e690d870402', {
            tags: {'type' : 'GETAPITAG'}
        });
        // Tag on Checks
        const checkGetUsers = check(responseGetUsers, {
            "is response of Get Users is 200 : ": r => r.status === 200,
            tags: {
                type: "GETAPITAG"
            }
        })
        // Define error rate
        errorRate.add(!checkGetUsers);
        //groupDurationTrend.add(responseGetUsers.duration, {groupName: "groupGetUsers"})

        // Add trend
        getUserApiTrend.add(responseGetUsers.timings.duration, { type: "GETAPITAG" }) // you can gibe any name but keep it simple, do not add too much filtering, the purpose is that you shuld be able to easily find out data/ filter out performance data/ metrics



        // Youc an group multiple APIs inside group
        // For example Login to system might invole 2 APIS, so you can add them inside group named as Login ...just an example
    })

    //____ API 2 _____ Lets assume that this API returns list of Groups
    groupWithMetrics("groupGetGroups", function () {
        const responseGetGroups = http.get('https://run.mocky.io/v3/bb4ac454-8307-46e2-9281-598c9c754121', {
            tags : {'type' : 'GETGROUPSTAG'}
        });
        const checkGetGroups = check(responseGetGroups, {
            "is response of Get Groups is 200 : ": r => r.status === 200,
            tags: {
                type: "GETGROUPSTAG" // type is customized name of tag, Tag = type, it can be anything
            }
        })
        // Define error rate
        errorRate.add(!checkGetGroups);
        getGroupApiTrend.add(responseGetGroups.timings.duration, { type: "GETGROUPSTAG" })
    })
}

// Lets set loadimpact
// This is how you can use loadimpact adn execute script to cloud
// we will see loadimacpt dashboard in next session

/*
 group_duration.............: avg=227.09ms min=142.15ms med=150.52ms max=887.66ms p(90)=701.41ms p(95)=818.44ms

 group duration metrics gets emitted ....
 contains totla time it took to execute that group function
 time take
*/

// On loadimacpt dashboard there will be better representation usgn groups

//lets execute withut cloud

// inside logs you will not find anythign related to tags...on cloud you will be able to filter out tags and vie better test result or better repreentation of test reults


//  http_req_duration................: avg=162.28ms   min=138.74ms med=154.58ms  max=245.33ms p(90)=190.5ms   p(95)=203.39ms
// you an not see tag
// Why ?

// Tag os on http_req_duration
// you measure duratio for API
// so add tag on API

/*
This is how tags are added on threasholds

http_req_duration................: avg=156.19ms   min=140.62ms med=147.79ms  max=308.19ms p(90)=164.53ms  p(95)=174.36ms
    ✗ { type:GETAPITAG }.............: avg=162.72ms   min=141.62ms med=148.71ms  max=308.19ms p(90)=173.46ms  p(95)=287.28ms
    ✗ { type:GETGROUPSTAG }..........: avg=149.1ms    min=140.62ms med=147.2ms   max=164.53ms p(90)=157.65ms  p(95)=162.48ms

*/

/*

we add 
tags
groups

now lest execute this with loadimpact for longer duration
so that we can analyse dashboard in better way

*/