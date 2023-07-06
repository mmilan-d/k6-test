// Creator: WebInspector 537.36


// k6 run -e USERNAME="mmiland" -e PASSWORD="{7vJ)~+D8vi!ByTsj%~5}" admin_arlista_test.js

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {}

// Helper function to check the status code of the response
function checkResponseStatus(response) {
  if (response.status !== 200) {
    console.log('Request to ' + response.url + ' returned status ' + response.status);
  }
}

//Session code extraction
function getSessionCode(html) {
  let sessionCodePattern = /session_code=([^&]*)/;
  let match = html.match(sessionCodePattern);
  if (match) {
      return match[1];
  } else {
      return null;
  }
}

export default function main() {
  let response, sessionId, kc_token

  const username = __ENV.USERNAME;
  const password = __ENV.PASSWORD;

  group(
    'page_1 - https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/auth?client_id=qdak-admin&redirect_uri=https%3A%2F%2Fadmin.mvtest.qdak.hu&state=075402f9-5137-4edc-83c3-896e639ace96&response_mode=fragment&response_type=code&scope=openid&nonce=6b0cfd43-6d4a-40b2-88e6-e18e4aa23cd2&code_challenge=pFBszQYc-Uha5cLVDPv4XJEgoR6ywslEc7nWDAxH280&code_challenge_method=S256',
    function () {
      response = http.get(
        'https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/auth?client_id=qdak-admin&redirect_uri=https%3A%2F%2Fadmin.mvtest.qdak.hu&state=075402f9-5137-4edc-83c3-896e639ace96&response_mode=fragment&response_type=code&scope=openid&nonce=6b0cfd43-6d4a-40b2-88e6-e18e4aa23cd2&code_challenge=pFBszQYc-Uha5cLVDPv4XJEgoR6ywslEc7nWDAxH280&code_challenge_method=S256',
      )

    //Exctracting session _code
    let html = response.body;
    let sessionCode = getSessionCode(html);

    // Exctracting session_id
    let jar = http.cookieJar();

    let cookies = jar.cookiesForURL('https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/auth?client_id=qdak-admin&redirect_uri=https%3A%2F%2Fadmin.mvtest.qdak.hu&state=075402f9-5137-4edc-83c3-896e639ace96&response_mode=fragment&response_type=code&scope=openid&nonce=6b0cfd43-6d4a-40b2-88e6-e18e4aa23cd2&code_challenge=pFBszQYc-Uha5cLVDPv4XJEgoR6ywslEc7nWDAxH280&code_challenge_method=S256');
    sessionId = cookies['AUTH_SESSION_ID'][0]
    kc_token = cookies['KC_RESTART'][0]

      response = http.post(
        `https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/login-actions/authenticate?session_code=${sessionCode}&execution=deb44c74-4860-4f4a-8394-f388f116c4a7&client_id=qdak-admin&tab_id=fKD5zX4oLEA`,
        {
          username: username,
          password: password,
          credentialId: '',
        },
        {
          headers: {
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            cookie:
              `AUTH_SESSION_ID=${sessionId}; AUTH_SESSION_ID_LEGACY=${sessionId}; KC_RESTART=${kc_token}`,
            origin: 'null',
            pragma: 'no-cache',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            'upgrade-insecure-requests': '1',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.get('https://admin.mvtest.qdak.hu/', {
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'same-site',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://admin.mvtest.qdak.hu/env-config.js', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'script',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://admin.mvtest.qdak.hu/static/js/2.48211def.chunk.js', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'script',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://admin.mvtest.qdak.hu/static/js/main.6c17b370.chunk.js', {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'script',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get(
        'https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/3p-cookies/step1.html',
        {
          headers: {
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'cache-control': 'no-cache',
            cookie:
              `AUTH_SESSION_ID=${sessionId}; AUTH_SESSION_ID_LEGACY=${sessionId}; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg4MjgsImlhdCI6MTY4Nzk1MjgyOCwianRpIjoiYWM2M2I3MDAtMmNhOC00OWQwLTk0YzItMTI2YjQ5MjI2MzVlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzdGF0ZV9jaGVja2VyIjoicmRNX2I3bzRMeWZNYzF2el9HSVpYWVViV2s3UlpqT2g0elBCb3gzSDhrYyJ9.eRYvhvMLKkplxMSaIaWAKQRtD2Mp0Hzxuv1wk-8hLbc; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg4MjgsImlhdCI6MTY4Nzk1MjgyOCwianRpIjoiYWM2M2I3MDAtMmNhOC00OWQwLTk0YzItMTI2YjQ5MjI2MzVlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzdGF0ZV9jaGVja2VyIjoicmRNX2I3bzRMeWZNYzF2el9HSVpYWVViV2s3UlpqT2g0elBCb3gzSDhrYyJ9.eRYvhvMLKkplxMSaIaWAKQRtD2Mp0Hzxuv1wk-8hLbc; KEYCLOAK_SESSION=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}; KEYCLOAK_SESSION_LEGACY=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}`,
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'iframe',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-site',
            'upgrade-insecure-requests': '1',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.get(
        'https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/3p-cookies/step2.html',
        {
          headers: {
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'cache-control': 'no-cache',
            cookie:
              `KEYCLOAK_3P_COOKIE_SAMESITE=supported; KEYCLOAK_3P_COOKIE=supported; AUTH_SESSION_ID=${sessionId}; AUTH_SESSION_ID_LEGACY=${sessionId}; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg4MjgsImlhdCI6MTY4Nzk1MjgyOCwianRpIjoiYWM2M2I3MDAtMmNhOC00OWQwLTk0YzItMTI2YjQ5MjI2MzVlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzdGF0ZV9jaGVja2VyIjoicmRNX2I3bzRMeWZNYzF2el9HSVpYWVViV2s3UlpqT2g0elBCb3gzSDhrYyJ9.eRYvhvMLKkplxMSaIaWAKQRtD2Mp0Hzxuv1wk-8hLbc; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg4MjgsImlhdCI6MTY4Nzk1MjgyOCwianRpIjoiYWM2M2I3MDAtMmNhOC00OWQwLTk0YzItMTI2YjQ5MjI2MzVlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzdGF0ZV9jaGVja2VyIjoicmRNX2I3bzRMeWZNYzF2el9HSVpYWVViV2s3UlpqT2g0elBCb3gzSDhrYyJ9.eRYvhvMLKkplxMSaIaWAKQRtD2Mp0Hzxuv1wk-8hLbc; KEYCLOAK_SESSION=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}; KEYCLOAK_SESSION_LEGACY=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}`,
            pragma: 'no-cache',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'iframe',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'upgrade-insecure-requests': '1',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.get(
        'https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/login-status-iframe.html',
        {
          headers: {
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'cache-control': 'no-cache',
            cookie:
              `AUTH_SESSION_ID=${sessionId}; AUTH_SESSION_ID_LEGACY=${sessionId}; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg4MjgsImlhdCI6MTY4Nzk1MjgyOCwianRpIjoiYWM2M2I3MDAtMmNhOC00OWQwLTk0YzItMTI2YjQ5MjI2MzVlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzdGF0ZV9jaGVja2VyIjoicmRNX2I3bzRMeWZNYzF2el9HSVpYWVViV2s3UlpqT2g0elBCb3gzSDhrYyJ9.eRYvhvMLKkplxMSaIaWAKQRtD2Mp0Hzxuv1wk-8hLbc; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg4MjgsImlhdCI6MTY4Nzk1MjgyOCwianRpIjoiYWM2M2I3MDAtMmNhOC00OWQwLTk0YzItMTI2YjQ5MjI2MzVlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzdGF0ZV9jaGVja2VyIjoicmRNX2I3bzRMeWZNYzF2el9HSVpYWVViV2s3UlpqT2g0elBCb3gzSDhrYyJ9.eRYvhvMLKkplxMSaIaWAKQRtD2Mp0Hzxuv1wk-8hLbc; KEYCLOAK_SESSION=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}; KEYCLOAK_SESSION_LEGACY=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}`,
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'iframe',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-site',
            'upgrade-insecure-requests': '1',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/token',
        {
          code: `a3c6329e-6420-4aaf-849b-4f0ac5c11c0a.${sessionId}.qdak-admin`,
          grant_type: 'authorization_code',
          client_id: 'qdak-admin',
          redirect_uri: 'https://admin.mvtest.qdak.hu',
          code_verifier:
            'xhMG7UUq3CG4F446RVCxqylJVUkWLdddmEAfXxY8otUCP37zYsEnapYXMmT1nVMMvtICs7KC4Z3Ov3Henh9nI7QRoRRcJ5hf',
        },
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            cookie:
              `AUTH_SESSION_ID=${sessionId}; AUTH_SESSION_ID_LEGACY=${sessionId}; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg4MjgsImlhdCI6MTY4Nzk1MjgyOCwianRpIjoiYWM2M2I3MDAtMmNhOC00OWQwLTk0YzItMTI2YjQ5MjI2MzVlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzdGF0ZV9jaGVja2VyIjoicmRNX2I3bzRMeWZNYzF2el9HSVpYWVViV2s3UlpqT2g0elBCb3gzSDhrYyJ9.eRYvhvMLKkplxMSaIaWAKQRtD2Mp0Hzxuv1wk-8hLbc; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg4MjgsImlhdCI6MTY4Nzk1MjgyOCwianRpIjoiYWM2M2I3MDAtMmNhOC00OWQwLTk0YzItMTI2YjQ5MjI2MzVlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzdGF0ZV9jaGVja2VyIjoicmRNX2I3bzRMeWZNYzF2el9HSVpYWVViV2s3UlpqT2g0elBCb3gzSDhrYyJ9.eRYvhvMLKkplxMSaIaWAKQRtD2Mp0Hzxuv1wk-8hLbc; KEYCLOAK_SESSION=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}; KEYCLOAK_SESSION_LEGACY=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}`,
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);
      console.log(response.body)

      response = http.get('https://admin.mvtest.qdak.hu/static/media/logo.59315359.svg', {
        headers: {
          accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'image',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-site': 'same-origin',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/users/current', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/users/current', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/users/current', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/users/current', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/users/current', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/pop-up-notifications/active', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/pop-up-notifications', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/users/current', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/orders', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/pop-up-notifications/active',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
            'access-control-request-method': 'GET',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/pop-up-notifications', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/orders', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/minimals',
        '[{"modifierId":3,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}},{"modifierId":4,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}},{"modifierId":5,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}},{"modifierId":6,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}},{"modifierId":7,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}},{"modifierId":8,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}},{"modifierId":9,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}},{"modifierId":10,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}},{"modifierId":11,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}},{"modifierId":12,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}},{"modifierId":13,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}},{"modifierId":14,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"minimalPrice":[]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/modifiers', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/quotes/calculate/minimals', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization,content-type',
          'access-control-request-method': 'POST',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
            'access-control-request-method': 'GET',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/modifiers', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get(
        'https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/login-status-iframe.html/init?client_id=qdak-admin&origin=https%3A%2F%2Fadmin.mvtest.qdak.hu',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'cache-control': 'no-cache',
            cookie:
              `AUTH_SESSION_ID=${sessionId}; AUTH_SESSION_ID_LEGACY=${sessionId}; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg4MjgsImlhdCI6MTY4Nzk1MjgyOCwianRpIjoiYWM2M2I3MDAtMmNhOC00OWQwLTk0YzItMTI2YjQ5MjI2MzVlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzdGF0ZV9jaGVja2VyIjoicmRNX2I3bzRMeWZNYzF2el9HSVpYWVViV2s3UlpqT2g0elBCb3gzSDhrYyJ9.eRYvhvMLKkplxMSaIaWAKQRtD2Mp0Hzxuv1wk-8hLbc; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg4MjgsImlhdCI6MTY4Nzk1MjgyOCwianRpIjoiYWM2M2I3MDAtMmNhOC00OWQwLTk0YzItMTI2YjQ5MjI2MzVlIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJzdGF0ZV9jaGVja2VyIjoicmRNX2I3bzRMeWZNYzF2el9HSVpYWVViV2s3UlpqT2g0elBCb3gzSDhrYyJ9.eRYvhvMLKkplxMSaIaWAKQRtD2Mp0Hzxuv1wk-8hLbc; KEYCLOAK_SESSION=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}; KEYCLOAK_SESSION_LEGACY=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}`,
            pragma: 'no-cache',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":12,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"20"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":12,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":12,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"199"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":11,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"20"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":11,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":14,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"20"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":14,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":3,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"90"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":3,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"900"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":3,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"90"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":5,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"10"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":5,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"150"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":7,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"10"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":7,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"170"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":9,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"20"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":9,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":4,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"80"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":4,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"800"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":4,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"80"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":13,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"10"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":13,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"120"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":13,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"119"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":13,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"118"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":13,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"117"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":6,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"10"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":6,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"150"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":8,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"40"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":8,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"400"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":10,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"80"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":10,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"800"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":12,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"199"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":12,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"199"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":12,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"199"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":11,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":11,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":11,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":14,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":14,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":14,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":14,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":14,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":3,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"90"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":5,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"150"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":7,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"170"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":9,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"200"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":4,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"80"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":4,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"80"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":4,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"80"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":13,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"117"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":6,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"150"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":8,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"400"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":10,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":"800"}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates',
        '{"id":null,"name":"Test-Pricing","technical":false,"modifiers":[{"id":2,"name":"Digitális","description":"Digitálisan előállított kép letölthető formátumban","category":"Formátum","priority":1,"optional":false,"modifierUriSegment":"mod#id:2/pf#pt:email","enabled":true,"validUntil":"2026-05-29T23:59:59.999Z","compatibleWith":[11,12,14],"unitPrice":{"grossAmount":0,"vatAmount":0,"netAmount":0,"taxRate":0,"currency":"HUF"}},{"id":1,"name":"Nyomtatott","description":"A képet nyomtatva lehet kérni","category":"Formátum","priority":1,"optional":false,"modifierUriSegment":"mod#id:1/pf#pt:paper","enabled":true,"validUntil":"2024-08-29T23:59:59.999Z","compatibleWith":[3,4,5,6,7,8,9,10,13],"unitPrice":{"grossAmount":0,"vatAmount":0,"netAmount":0,"taxRate":0,"currency":"HUF"}},{"id":13,"name":"1 db 10x15 cm-es Nyomtatott","description":"1db 10x15 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:13/size#w:3000-h:3000","enabled":true,"validUntil":"2024-08-29T23:59:59.999Z","additionalModifiers":["psize#w:101.6-h:152.4"],"compatibleWith":[1],"unitPrice":{"grossAmount":"117","currency":"HUF","taxRate":0.2,"netAmount":0,"vatAmount":0}},{"id":11,"name":"1200x1800 Digitális","description":"1200x1800 méretű digitális kép","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:11/size#w:1800-h:1800","enabled":true,"validUntil":"2026-05-29T23:59:59.999Z","compatibleWith":[2],"unitPrice":{"grossAmount":"200","currency":"HUF","taxRate":0.27,"netAmount":0,"vatAmount":0}},{"id":6,"name":"1db 13x18 Nyomtatott","description":"1db 13x18 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:6/size#w:3000-h:3000","enabled":true,"validUntil":"2024-08-29T23:59:59.999Z","additionalModifiers":["psize#w:127-h:190.5"],"compatibleWith":[1],"unitPrice":{"grossAmount":"150","currency":"HUF","taxRate":0.2,"netAmount":0,"vatAmount":0}},{"id":8,"name":"1db 20x30 cm-es Nyomtatott","description":"1 db 20x30 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:8/size#w:3000-h:3000","enabled":true,"validUntil":"2024-08-29T23:59:59.999Z","additionalModifiers":["psize#w:203.2-h:304.8"],"compatibleWith":[1],"unitPrice":{"grossAmount":"400","currency":"HUF","taxRate":0.2,"netAmount":0,"vatAmount":0}},{"id":10,"name":"1db 30x45 cm-es nyomtatott kép","description":"1 db 30x45 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:10/size#w:3000-h:3000","enabled":true,"validUntil":"2024-08-29T23:59:59.999Z","additionalModifiers":["psize#w:304.8-h:450"],"compatibleWith":[1],"unitPrice":{"grossAmount":"800","currency":"HUF","taxRate":0.2,"netAmount":0,"vatAmount":0}},{"id":4,"name":"1db 9x13 Nyomtatott","description":"1db 9x13 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:4/size#w:3000-h:3000","enabled":true,"validUntil":"2024-08-29T23:59:59.999Z","additionalModifiers":["psize#w:88.9-h:127"],"compatibleWith":[1],"unitPrice":{"grossAmount":"80","currency":"HUF","taxRate":0.18,"netAmount":0,"vatAmount":0}},{"id":5,"name":"2 db 7x10 Nyomtatott","description":"2 db 7x10 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:5/mon#t:2x1-e:3000x2000","enabled":true,"validUntil":"2024-08-29T23:59:59.999Z","additionalModifiers":["size#w:1689-h:1689","psize#w:101.6-h:152.4"],"compatibleWith":[1],"unitPrice":{"grossAmount":"150","currency":"HUF","taxRate":0.2,"netAmount":0,"vatAmount":0}},{"id":3,"name":"2db 6x9 Nyomtatott","description":"2db 6x9 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:3/mon#t:2x1-e:3000x2000","enabled":true,"validUntil":"2024-08-29T23:59:59.999Z","additionalModifiers":["psize#w:88.9-h:127","size#w:1689-h:1689"],"compatibleWith":[1],"unitPrice":{"grossAmount":"90","currency":"HUF","taxRate":0.2,"netAmount":0,"vatAmount":0}},{"id":7,"name":"4db Igazolványkép","description":"4 db előhívott Igazolványkép","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:7/mon#t:2x2-e:1500x2250","enabled":true,"validUntil":"2024-08-29T23:59:59.999Z","additionalModifiers":["psize#w:88.9-h:127","size#w:900-h:900"],"compatibleWith":[1],"unitPrice":{"grossAmount":"170","currency":"HUF","taxRate":0.2,"netAmount":0,"vatAmount":0}},{"id":12,"name":"600x900 Digitális","description":"600x900 méretű digitális kép","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:12/size#w:900-h:900","enabled":true,"validUntil":"2026-05-29T23:59:59.999Z","compatibleWith":[2],"unitPrice":{"grossAmount":"199","currency":"HUF","taxRate":0.27,"netAmount":0,"vatAmount":0}},{"id":9,"name":"9db Bélyegkép","description":"9 db Előhívott Bélyegkép","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:9/mon#t:3x3-e:2250x3375","enabled":true,"validUntil":"2024-08-29T23:59:59.999Z","additionalModifiers":["size#w:900-h:900","psize#w:101.6-h:152.4"],"compatibleWith":[1],"unitPrice":{"grossAmount":"200","currency":"HUF","taxRate":0.2,"netAmount":0,"vatAmount":0}},{"id":14,"name":"Eredeti Digitális","description":"Eredeti méretű digitális kép","category":"Méret","priority":2,"optional":true,"modifierUriSegment":"mod#id:14/psize#w:101.6-h:152.4","enabled":true,"validUntil":"2026-05-29T23:59:59.999Z","compatibleWith":[2],"unitPrice":{"grossAmount":"200","currency":"HUF","taxRate":0.25,"netAmount":0,"vatAmount":0}}]}',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
            'access-control-request-method': 'GET',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7751', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7751',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
            'access-control-request-method': 'GET',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":12,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":199}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":11,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":200}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":14,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":200}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":3,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":90}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":5,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":150}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":7,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":170}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":9,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":200}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":4,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":80}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":13,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":117}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":6,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":150}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":8,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":400}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        '[{"modifierId":10,"itemPrice":{"grossAmount":0,"taxRate":0,"currency":"HUF"},"formulaParameters":{"commissionInverse":[{"formulaKey":"userInput","formulaValue":800}]}}]',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/quotes/calculate/commissions/inverse',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization,content-type',
            'access-control-request-method': 'POST',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.del(
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7751',
        null,
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7751',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
            'access-control-request-method': 'DELETE',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
            'access-control-request-method': 'GET',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/pop-up-notifications/active', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/pop-up-notifications', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/orders', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTY0MzAsImlhdCI6MTY4Nzk1MjgzMCwiYXV0aF90aW1lIjoxNjg3OTUyODI4LCJqdGkiOiI2YzMxYWVkZi1kOTgzLTRmYTktYWY2Ni1iNWExNTMxNDVlOWQiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiMzJiMGY0ZDQtMmFhYi00MDQ0LTg0MGYtYjc3NjljOWUwZjMwIiwic2Vzc2lvbl9zdGF0ZSI6IjhhMDE2YTBiLWYwNDUtNDJkNi04NWE4LWI4NjMxMjg1NTZhMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4YTAxNmEwYi1mMDQ1LTQyZDYtODVhOC1iODYzMTI4NTU2YTEiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.hHYOp_057_rWB46syFSeavqDo7pN7BAkyWy3SI0a37WM7RVygtsMWF_zNx_y9ZPBNX-pnMIX2Zh6leiXgggNaiQ2EgHv-PywODG55HiqNWTUTa5TTdpge8Myx0AG68-Gx2x0FAmuBoJTqcMwp8yR2g1D0uTu0XxSOarhTdqPadYGlK7SCz5jkmHpwHP4-nz0DhgpL7NacHwsvFng6X2ldEZZ4KhNEjuTw2yboyY7af3P6DFxKVrKSXxdMNH71YdRdzNuYr69T1NwwkMjPIRn5pM08LdW6rMoN7U-HUs-Xxc1pZ4nkvO6_PVE04zFcd6gLTN95VDUl_hueF5gnDxceg',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/pop-up-notifications/active',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
            'access-control-request-method': 'GET',
            'cache-control': 'no-cache',
            origin: 'https://admin.mvtest.qdak.hu',
            pragma: 'no-cache',
            referer: 'https://admin.mvtest.qdak.hu/',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent':
              'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
          },
        }
      )
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/pop-up-notifications', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/orders', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization',
          'access-control-request-method': 'GET',
          'cache-control': 'no-cache',
          origin: 'https://admin.mvtest.qdak.hu',
          pragma: 'no-cache',
          referer: 'https://admin.mvtest.qdak.hu/',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent':
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        },
      })
      checkResponseStatus(response);
    }
  )

  // Automatically added sleep
  sleep(1)
}
