import http from 'k6/http'

export let options = {
    vus: 100,
    duration: '2m20s',

    distribution:{
        ashburnDistribution :{loadZone: 'amazon:us:ashburn', percent:10}, 
        dublinDistribution : {loadZone: 'amazon:ie:dublin', percent: 10}, 
        mumbaiDistribution : {loadZone: 'amazon:in:mumbai', percent: 10}, 
        tokyoDistribution : {loadZone: 'amazon:jp:tokyo', percent: 20}, 
        singaporeDistribution : {loadZone: 'amazon:sg:singapore', percent: 50} 
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/983af971-096a-4108-b262-d13ce7f46f47');     
}




