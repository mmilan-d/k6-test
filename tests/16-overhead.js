//1 - Init
// First inti getc alled, as the name suggest, here you can initilize variables, define options(VU, duration, Threaholds)
// oad only once
var counter = 1

// 2- SetUp
// Called ocne ocne before load test starts
export function setup(){
    console.log(`Inside SetUp - ${counter}`)
    return "My Name is ABCD"
}


//3 - Default
// It is main function. Entry point for virtual users, virtual user kepps on calling APIs defined here
// It is VU code. It gets called till your test is running
/*
Whats default cuntion - entry point for VU, similar to main fucntion
VU executed code in default cuntion
When code reaches till its last statmenet in default function, VU gets reset/ restart
In Restart - VU is reset, Cookies gets cleared, TCP connections torn down dependign upcon configuration
*/
export default function(data){
    console.log(`Inside Default - ${counter} VU=${__VU} ITER=${__ITER} DATA is ${data}`)
    counter = counter + 1 // First VU reaches here
}

//4 - Teardown - gets called one default unction is over. it is caled only once
export function teardown(data){
    console.log(`Inside Teardown - ${counter} DAtA is ${data}`)

}

/*

How k6 runs - 
K6 runs your test scripts/ tets cases in seperate VM which we call VU - So seprate VM interally loaded on your machine by K6 are VU
K6 loops over default function export default function(
    K6 does init, then setup, the default function looping....then finally teardown

    install too much or additional NPM packages might add overad to your scripts
    For example, to generate unique id , you use some node module/ npm packages, some third party libraries
    then it adds overhead to your K6
    this conversion takes time - might take time... alittile bit overhead of few miliseconds in response time due to this overhead is also too mush and might affect your poeject

    Each VU is seperate Virtual Machine
    JS code gets loaded insidde those VM
    Size of JS, Size of Thrd Party libraries might add overhead

    Each JS cripts loaded inside each VM executed seperately for each VU - virrtual user

    For 20-30-50 users, youmay not find any issue
    But but as you keep on increasing load, you will find issues due to this overhead

    For example
    initial startup time might be higher
    Execution gets slower
    response time affects
    Slow respnse tim
    More resoue consumption like CPU, Memory

    So
    think how many virtual user are realisitcs
    Do not overstiamte users
    If you are sure that you need 50 VU only, then just dont try to give too much load

    Test whether your machine can handle load
    Check CPU, Memoru usable while test execution is on
    You can check Cloud console for readmade graphs

    THANKS 

    

*/

