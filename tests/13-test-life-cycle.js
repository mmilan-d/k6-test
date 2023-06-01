/*

Test Life Cycls

*/

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
Inside Default - 69 VU=3 ITER=68
INFO[0003] Inside Default - 66 VU=4 ITER=65
INFO[0003] Inside Default - 66 VU=8 ITER=65
INFO[0003] Inside Default - 68 VU=9 ITER=67
Counter keeps on increasing in default function


Inside Teardown - 1

In this way you can return data from set up to default and teardown fucntions 



Debug K6 scripts
1 - USe console.log to print results. we already use this
2 - Use --http-debug full to produce all the logs

Actually I choose wrong script, ther are no API calls
so lets select differen scrpt

*/