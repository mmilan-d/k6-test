// Write in Java Script
// Call google.com - https://www.google.com/
// When 1000s of users call google.com, what will happen
// Call means get - http.het

// lets check built in metrics


import http from 'k6/http'

export let options = {
    // Declare configuration
    vus: 10,
    duration: '10s' /* 1m2s */
}

// INIT COde
// Called onlye once per virtuual user
// For example intiialize variables

// Main Fucntion where user will be spread
// Similar to main function in various langiages
// Entry point for virtual users
export default function () {
    // VU code, gets called again and again by VU
    // CAll get API, Post requests etc.
    http.get('https://www.google.com/');
    http.get('https://www.wikipedia.com/');
    // Auto format document ALT + SHIFT + F
}

// Lets us execute test with 1 Virtual User 
// k6 run tests/01-script.js 
// Command not found  - becuae env avriable not set, so restart visual studio or machine

// Press tab to auto fill values

// test successfully executed

// Later on in upcoming sessions, we will analyse logs

// Tets Executed

// DONE !

/*

 Add more Virtual USers
Many users calling lest say google.com, then what will happen ?
Image multiple parallel while loops

Change theme - better visibility while recording

10 virtual users will hit the endpoing again and again for 10 seconds

Test executed for 10 second with 10 virtual user load

k6 run --vus 10 --duration 10s tests/01-script.js

/*

OPTIONS

Instead of k6 run --vus 10 --duration 10s tests/01-script.js
we will configure this inside file

DONE !

*/


/*

### Ramp up and Ramp down VU
Means
10 users for lest say 20 seconds
Again incrase laod and lets say 20 users for next 1 minute

This is called as Ramp up and Ramp down

*/


