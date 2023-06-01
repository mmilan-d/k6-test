/*
Lets parse array


https://run.mocky.io/v3/b2ef378b-5f93-421e-8406-aba4f319578f

Returns below array

[
    {
        "name": "leanne graham",
        "email": "leanne@gmail.com",
        "job": "web developer",
        "location": "london"
    },
    {
        "name": "ervin howell",
        "email": "ervin@gmail.com",
        "job": "tech lead",
        "location": "london"
    },{
        "name": "clementine bauch",
        "email": "clementine@gmail.com",
        "job": "web developer",
        "location": "liverpool"
    },{
        "name": "chelsey dietrich",
        "email": "chelsey@gmail.com",
        "job": "baker",
        "location": "london"
    },{
        "name": "dennis schulist",
        "email": "dennis@gmail.com",
        "job": "pen tester",
        "location": "manchester"
    }
]
*/

import http from 'k6/http'

export default function(){
    let response = http.get('https://run.mocky.io/v3/b2ef378b-5f93-421e-8406-aba4f319578f')

    //Lets red response array

    let body = JSON.parse(response.body)
    body.forEach(element => {
        console.log(`name is ${element.name}`)
    });


    /*
{
  "data": [
    {
      "name": "leanne graham",
      "email": "leanne@gmail.com",
      "job": "web developer",
      "location": "london",
      "array": [
        1,
        2,
        3
      ]
    },
    {
      "name": "ervin howell",
      "email": "ervin@gmail.com",
      "job": "tech lead",
      "location": "london",
      "array": [
        4,
        5,
        6
      ]
    },
    {
      "name": "clementine bauch",
      "email": "clementine@gmail.com",
      "job": "web developer",
      "location": "liverpool",
      "array": [
        7,
        8,
        9
      ]
    },
    {
      "name": "chelsey dietrich",
      "email": "chelsey@gmail.com",
      "job": "baker",
      "location": "london",
      "array": [
        10,
        11,
        12
      ]
    },
    {
      "name": "dennis schulist",
      "email": "dennis@gmail.com",
      "job": "pen tester",
      "location": "manchester",
      "array": [
        13,
        14,
        15
      ]
    }
  ]
}
    */
    let response1 = http.get('https://run.mocky.io/v3/a19b0ec9-5985-4064-bce0-11647d98132e')
    let body1 = JSON.parse(response1.body)
    body1.data.forEach(element => {
        console.log(`name from data is ${element.name}`)

        element.array.forEach(elementArr => {
            console.log(`name from data is ${elementArr}`)

        })
    });

    // This is how you can parse array
}