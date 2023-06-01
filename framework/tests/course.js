/*

Define Main Test Cases related to Course

What are main parts of test script - 
Create Course  -{{courseURL}}?wstoken=585a5e34abe199537fec2640b8252ef7&moodlewsrestformat=json&wsfunction=core_course_create_courses&courses[0][fullname]=mycourses&courses[0][shortname]=mycourses123&courses[0][categoryid]=1&courses[0][visible]=1&courses[0][summary]=text&courses[0][enablecompletion]=0&courses[0][summaryformat]=1&courses[0][format]=topics&courses[0][numsections]=0
Whta re section of this API
CourseURL - env Variable
wstoken - Token - Sensitive data - define inside Env variable - For Dev/Int/Prod, this token will be different
it contains test data
it contaisn common funtion that will create course so that any other test script can use create cpurse common function
it is responsibility of that fucntion that you define in Utility directory to measure/log performance of CREATE COURSE API


Get Course

Delete Course

Lets check Postman /  Dev Document

*/

// 1 - Declare import - import * from

import * as courseService from '../utility/courseService.js'
// we need tets data - lets decide this later

import * as testData from '../testdata/testData.js'

// we need env variables i.e. env.js
import * as env from '../../env.js'

// 2 - Options - VU 
// Env vairbales
/*
Do you want to hard code 10 and 20 here - NO - NEVER
We have configured this inside env.sh file. User will pass this at runtime
So, lest remove hard coded values
` - Press first key top left side of keyboard

Done !

NO

Why

other test cases might need to use same virtual users
So vu needs to be removed from test.js file
It is act as common tets data
so lest declare this nside test data
*/
export let options = {
    vus: testData.VUS, // in case of errros in importing, variables wont be auto populated
    duration: testData.DURATION,
    teardownTimeout: "20s" // if ther is tear down fucntion, it can go to infinite loop due to isssues or coding error, so here you define max time whthin whihc teardown should work. In case of failures, function will get timeout
}

// so this is how we can think of creating framework

// 3 - Test Life Cycle - Init - One time Init
// if you look at Moodle or Create Course or toerh fatures ,  we need token
// token is different for int/dev/prod environment
// URL/ API/Endpoint is different for each Environment
// Each test case should run for every environment whithut any change in code or test script/
// so User should pass environment - int/ dev/ prod/any other and based upon what user enters, we need to choose token or URL
// So lest code !

// INIT
let environment;
let token;

// we need envirnment
if (`${__ENV.ENVIRONMENT}` == env.int) {
    environment = env.intEnvironment;
    token = `${__ENV.INT_TOKEN}`
}
else if (`${__ENV.ENVIRONMENT}` == env.dev) {
    environment = env.devEnvironment;
    token = `${__ENV.DEV_TOKEN}`
}
// same for prod or any other environment
// Now your environment variable contaisn all the URLs of that environment
// this is how you can set Token
// Thats It !::)



// 4 - Test Life Cycle - SetUp
export function setUp() {
    // there is no set up required
}

// 5 - Test Life Cycle - Default function - VU Main function
export default function () {
    try {
        // call course workflow
        console.log(`ENV -> ${environment.SERVER_ENDPOINT}`)
        let responseBody = courseService.createCourse(`${environment.SERVER_ENDPOINT}`, token);

        courseService.getCourse(environment.SERVER_ENDPOINT, token, responseBody[0].id)

        courseService.deleteCourse(environment.SERVER_ENDPOINT, token, responseBody[0].id)

    }
    catch (ex) {
        console.log(`error occurs in execution`)
    }
}

// 6 - Test Life Cycle - teardown - CleanUp if any

// so we write script, API - now lest execute the same...I am sure, it will throw lots of errors.. lets see

// lets execute

// we declare env.sh - how to set this locally ---we need to set ENV
// soure env.sh will set variables
// in CI/CD, we dont need to declare anything

// we added more logs, 
// if there is any defect, we might need corrlation id
// you can share this id with dev team so that they can track all the logs whihc will help them in resolving defect

// so this is how you will resolve this 
// I have not reolved all the issues
// but now, you will try to resolve the issue
// I am going to check-in corrct version of this code in GIT and you will get this URL in Sessions

// So Please try to resolve the errors

// Its easy :)