import http from 'k6/http'

// Rampup nd Ramp down users
export let options = {
    stages: [
        { duration: '10s', target: 5 }, // 5 users for 10 secodns

        { duration: '20s', target: 3 } // again 3 users for 20 seconds,

        { duration: '20s', target: 0 } // again 3 users for 20 seconds
    ]

    , vus :10, duration: "1m3s" // k6 run name of the spec file


// ALT + SHIFT + F to format document - Autp Align

// Main function, VU will call endpoint 
export default function () {
    http.get('https://www.google.com')
    http.get('https://www.wikipedia.com')
}

// Press TAB key to Auto fill , no need to type full name

// Total durarion 30 seconds, internally rampup is happedning as specified

// DONE !

// k6 run --vus 10 [name of spec file]