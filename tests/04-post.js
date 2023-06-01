import http from 'k6/http';

export default function () {
  var url = 'https://run.mocky.io/v3/54eadb05-14c5-4110-ad9b-006b20deesdad359';
  var payload = JSON.stringify({
    email: 'aaa',
    password: 'bbb',
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);

  http.del(url, null, null)
}