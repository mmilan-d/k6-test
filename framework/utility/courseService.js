/*
Lets write Service Apis

// So what we need from Stakeholders/ dev team/architect

APis that needs to be tested
API FOrmat - UTL
API Headers - For example toke, content type is JSON / content type is plain text/ html
Body to be passed - For example body is JSON, Pass email and password  values For example {email:abc,password:abc}
Resonse body of API
For example, API returns {message:success,id:1}


Lets take example of course API
API is {{courseURL}}?wstoken=585a5e34abe199537fec2640b8252ef7&moodlewsrestformat=json&wsfunction=core_course_create_courses&courses[0][fullname]=mycourses&courses[0][shortname]=mycourses123&courses[0][categoryid]=1&courses[0][visible]=1&courses[0][summary]=text&courses[0][enablecompletion]=0&courses[0][summaryformat]=1&courses[0][format]=topics&courses[0][numsections]=0
BODY - null, no need to pass anything
Request Accepts  -query string - pass data in query string
Create Course returns JSOn Array
[{id:12}] - it is course Id


So first stpe is to colelct all such things
It is recommneded to take developer documents of API/ API documentation / 
Then reviwew this document for its correctness
Do not proced if document is not correct or incomplete
Do not directly start coding if document is not complete

So lets CODE :)

What all thinsg we will verify/ measure

Checks - response 200, check any one parameter from http response
Rate - Verify Failure Rate of APIs
Deine Trend - HTTP REQ Duration timings of API


So lest code :)

*/

// import
import { check, fail } from 'k6'
import { Rate } from 'k6/metrics'
import http from 'k6/http'
import { Trend } from 'k6/metrics'

// Check Failure Rate or Error Rate
let failureRate = new Rate("failure_rate")

// define trends -  we will be tetsing create course, get course and delete course ... so 3 trends
var createCourseTrend = new Trend("Trend_CreateCourse")
var getCourseTrend = new Trend("Trend_GetCourse")
var deleteCourseTrend = new Trend("Trend_DeleteCourse")// copy paste is also better :) it saves time :)

// Now we neeed to start writing functions


// logging
export function logger(endPoint, token, response) {
    console.log(`Logger Started VU=${__VU} ITER=${__ITER}`)
    console.log(`Endpoint is ${endPoint} Token is ${token} VU=${__VU} ITER=${__ITER}`)
    console.log(`Response Status is ${response.status} VU=${__VU} ITER=${__ITER}`)
    console.log(`Body is ${JSON.stringify(JSON.parse(response.body))}`)

    try {
        // add correlation id
        console.log(`Correlation Id is ${JSON.stringify(JSOn.parse(response.headers))['X-Correlation-Id']}`)
    }
    catch (ex) { }
}

// Moodle format of requests is application/x-www-form-urlencoded
export const setHeader = () => {
    return {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
}

function generateRandomString(length) {
    var chars = "asbyqwasdasdkadjqwueu17364748kadsadsjd12345678909sdiuqweyqehqwehwqehweethvnmxcpasksookl123456789lsdfokaj"
    var results;
    for (var i = length; i > 0; --i) {
        results += chars[Math.floor(Math.random() * chars.length)]
    }

    return results;

}

// declare const for URL
// {{courseURL}}?wstoken=585a5e34abe199537fec2640b8252ef7&moodlewsrestformat=json&wsfunction=core_course_create_courses&courses[0][fullname]=mycourses&courses[0][shortname]=mycourses123&courses[0][categoryid]=1&courses[0][visible]=1&courses[0][summary]=text&courses[0][enablecompletion]=0&courses[0][summaryformat]=1&courses[0][format]=topics&courses[0][numsections]=0
// if u remeber in Postmane, course short name has to be unique, so just copy from there
export const route_createCourse = (endPoint, token) => `${endPoint}?wstoken=${token}&moodlewsrestformat=json&wsfunction=core_course_create_courses&courses[0][fullname]=mycourses&courses[0][shortname]=${generateRandomString(15)}&courses[0][categoryid]=1&courses[0][visible]=1&courses[0][summary]=text&courses[0][enablecompletion]=0&courses[0][summaryformat]=1&courses[0][format]=topics&courses[0][numsections]=0`

// http://127.0.0.1:83/webservice/rest/server.php?wstoken=585a5e34abe199537fec2640b8252ef7&wsfunction=core_course_get_courses&options[ids][0]=11&moodlewsrestformat=json
// lets declare const for URL
export const route_getCourse = (endPoint, token, courseId) => `${endPoint}?wstoken=${token}&wsfunction=core_course_get_courses&options[ids][0]=${courseId}&moodlewsrestformat=json`

// {{courseURL}}?wstoken=585a5e34abe199537fec2640b8252ef7&moodlewsrestformat=json&wsfunction=core_course_delete_courses&courseids[0]={{courseId}}
export const route_deleteCourse = (endPoint, token, courseId) => `${endPoint}?wstoken=${token}&moodlewsrestformat=json&wsfunction=core_course_delete_courses&courseids[0]=${courseId}`

// Create Course - What would be function
// signatore - we need token, URL
// better to paste name of function inside console.log
// when 10000s of users calls the API, it generates many logs, you should be able to find/search logs in case of defects/ failures of API
export function createCourse(endPoint, token) {
    console.log(`Inside createCourse token=${token}`)
    // create course - measn post, so you also need this data frm dev team, whether call is POST, GET, UPDATE, DELETE, PATCH
    // header - it accepts JSON
    // Now, there are many APIS which accepts header as JSON, measn its common, so define seperate function to accept heade rparams
    let postResponse = http.post(`${route_createCourse(endPoint, token)}`, null, setHeader())
    // lets add trend
    createCourseTrend.add(postResponse.timings.duration)
    // Now define check for 200 - resposne code  = 200
    let checkPostResponse = check(postResponse, {
        "Create Course status 200 : ": r => r.status === 200
    })
    // Now define Error Rate
    failureRate.add(!checkPostResponse)

    // add Logs
    logger(endPoint, token, postResponse)

    // Now lest read response
    let responseBody = JSON.parse(postResponse.body)
    // It returns array containign id...as we are creating only one course at a time, we can direclt read value of id from response body

    // now this line can throuw exception if any error occurs in code or there is deefct, so we also need to track this in check and error rate

    try {
        var id = responseBody[0].id;
        console.log(`Create Course returns body as ${JSON.stringify(responseBody)}`)
        console.log(`course id is ${id}`)
        if (`${responseBody[0].id}` == 'undefined') {
            checkPostResponse = check(postResponse, {
                "Create Course returns Undefined Id ": r => r.status === 999 // add any invalid value here
            })
            failureRate.add(!checkPostResponse)
        }
    }
    catch (ex) {
        // here we need to add check
        // in case of exception user must see a log on K6 console
        checkPostResponse = check(postResponse, {
            "Create Course does not return valid data ": r => r.status === 999 // provide any invalid Id, so that Create Course does not return valid datamessage can be visible on K6 console as failure
        })
        failureRate.add(!checkPostResponse)

    }
    return responseBody;
}

// Lets tets GET Course API
/*
Collect API Signatrue, body, parameter, response format, APi si get/post/delete or anything else from dev team
*/
export function getCourse(endPoint, token, courseId) {

    const getResponse = http.get(`${route_getCourse(endPoint, token, courseId)}`, null)
    // lets add check
    var checkGetResponse = check(getResponse, {
        "Get Course status is 200 ": r => r.status === 200
    })
    // add error rate
    failureRate.add(!checkGetResponse)
    // add trend
    getCourseTrend.add(getResponse.timings.duration)

    // read Body, get call returns array of course Id
    // [{id:20}] - this may not be valdi format, lets log this .. it can be {[id:20], [id:21]}
    let getResponseBody = JSON.parse(getResponse.body)

    // add Logs
    logger(endPoint, token, getResponse)

    // lets log id
    // add check in vase of id not found
    try {
        // Now here course id can be undefined
        // if course id is undefined, we need to log this inside K6 logs

        // id exists inside array but value is undefined
        if (`${getResponseBody[0].id}` == 'undefined') {
            checkGetResponse = check(getResponse, {
                "Get Course returns Undefined Id ": r => r.status === 999 // add any invalid value here
            })
            failureRate.add(!checkGetResponse)
        }
        console.log(`get course body is ${JSON.stringify(getResponseBody)}`)
        console.log(`course id is ${getResponseBody[0].id}`)
    }
    catch (ex) {
        checkGetResponse = check(getResponse, {
            "Get Course does not return valid data ": r => r.status === 999 // provide any invalid Id, so that Create Course does not return valid datamessage can be visible on K6 console as failure
        })
        failureRate.add(!checkGetResponse)
    }

    // return response body
    return getResponseBody;

}

// Lets code delete Api
// so collect all the necessary information from dev team
export function deleteCourse(endPoint, token, courseId) {
    console.log(`Inside delete course. course id is ${courseId}`)

    // define response
    let deleteResponse = http.del(`${route_deleteCourse(endPoint, token, courseId)}`, null, setHeader())
    // add Logs
    logger(endPoint, token, deleteResponse)

    // define check
    var checkDeleteResponse = check(deleteResponse, {
        "Delete Course status 200 ": r => r.status === 200
    })
    // define error rate
    failureRate.add(!checkDeleteResponse)
    // measure trend - http response time
    deleteCourseTrend.add(deleteResponse.timings.duration)

}


/*
Create Course
Get Course
Delete Copurse


Edit Couse
GetAll Courses

*/
