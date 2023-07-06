// Creator: WebInspector 537.36

// k6 run -e USERNAME="mmiland" -e PASSWORD="{7vJ)~+D8vi!ByTsj%~5}" admin_suli_es_kepek_test.js

import { sleep, group } from 'k6'
import http from 'k6/http'

import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js'

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
  let formData, response, sessionId, kc_token

  const username = __ENV.USERNAME;
  const password = __ENV.PASSWORD;

  group(
    'page_1 - https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/auth?client_id=qdak-admin&redirect_uri=https%3A%2F%2Fadmin.mvtest.qdak.hu&state=075402f9-5137-4edc-83c3-896e639ace96&response_mode=fragment&response_type=code&scope=openid&nonce=6b0cfd43-6d4a-40b2-88e6-e18e4aa23cd2&code_challenge=pFBszQYc-Uha5cLVDPv4XJEgoR6ywslEc7nWDAxH280&code_challenge_method=S256',
    function () {
      response = http.get(
        'https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/auth?client_id=qdak-admin&redirect_uri=https%3A%2F%2Fadmin.mvtest.qdak.hu&state=075402f9-5137-4edc-83c3-896e639ace96&response_mode=fragment&response_type=code&scope=openid&nonce=6b0cfd43-6d4a-40b2-88e6-e18e4aa23cd2&code_challenge=pFBszQYc-Uha5cLVDPv4XJEgoR6ywslEc7nWDAxH280&code_challenge_method=S256',
      )

    //Extracting session_code
    let html = response.body;
    let sessionCode = getSessionCode(html);
    
    // Exctracting session_id
    let jar = http.cookieJar();

    let cookies = jar.cookiesForURL('https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/auth?client_id=qdak-admin&redirect_uri=https%3A%2F%2Fadmin.mvtest.qdak.hu&state=075402f9-5137-4edc-83c3-896e639ace96&response_mode=fragment&response_type=code&scope=openid&nonce=6b0cfd43-6d4a-40b2-88e6-e18e4aa23cd2&code_challenge=pFBszQYc-Uha5cLVDPv4XJEgoR6ywslEc7nWDAxH280&code_challenge_method=S256');
    sessionId = cookies['AUTH_SESSION_ID'][0]
    kc_token = cookies['KC_RESTART'][0]

      response = http.post(
        `https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/login-actions/authenticate?session_code=${sessionCode}&execution=deb44c74-4860-4f4a-8394-f388f116c4a7&client_id=qdak-admin&tab_id=QJO1j1Cz8E4`,
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
              `AUTH_SESSION_ID=${sessionId}; AUTH_SESSION_ID_LEGACY=${sessionId}; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg0NjcsImlhdCI6MTY4Nzk1MjQ2NywianRpIjoiZjk3MmViOWItMDI5Ni00NmNlLWE5ZWEtYjYzZGU2MDA0ODg4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzdGF0ZV9jaGVja2VyIjoiaHBHTmtCWG40aUh5OVRjRjlKOEJtQ1Vpa2FLaEd5VDRUQmptT2NyZDhmdyJ9.keoZ_VENWIFeb5y97hh4bgXG7YSTCmbX8aP4mfOSey0; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg0NjcsImlhdCI6MTY4Nzk1MjQ2NywianRpIjoiZjk3MmViOWItMDI5Ni00NmNlLWE5ZWEtYjYzZGU2MDA0ODg4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzdGF0ZV9jaGVja2VyIjoiaHBHTmtCWG40aUh5OVRjRjlKOEJtQ1Vpa2FLaEd5VDRUQmptT2NyZDhmdyJ9.keoZ_VENWIFeb5y97hh4bgXG7YSTCmbX8aP4mfOSey0; KEYCLOAK_SESSION=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}; KEYCLOAK_SESSION_LEGACY=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}`,
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
              `KEYCLOAK_3P_COOKIE_SAMESITE=supported; KEYCLOAK_3P_COOKIE=supported; AUTH_SESSION_ID=${sessionId}; AUTH_SESSION_ID_LEGACY=${sessionId}; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg0NjcsImlhdCI6MTY4Nzk1MjQ2NywianRpIjoiZjk3MmViOWItMDI5Ni00NmNlLWE5ZWEtYjYzZGU2MDA0ODg4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzdGF0ZV9jaGVja2VyIjoiaHBHTmtCWG40aUh5OVRjRjlKOEJtQ1Vpa2FLaEd5VDRUQmptT2NyZDhmdyJ9.keoZ_VENWIFeb5y97hh4bgXG7YSTCmbX8aP4mfOSey0; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg0NjcsImlhdCI6MTY4Nzk1MjQ2NywianRpIjoiZjk3MmViOWItMDI5Ni00NmNlLWE5ZWEtYjYzZGU2MDA0ODg4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzdGF0ZV9jaGVja2VyIjoiaHBHTmtCWG40aUh5OVRjRjlKOEJtQ1Vpa2FLaEd5VDRUQmptT2NyZDhmdyJ9.keoZ_VENWIFeb5y97hh4bgXG7YSTCmbX8aP4mfOSey0; KEYCLOAK_SESSION=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}; KEYCLOAK_SESSION_LEGACY=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}`,
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
              `AUTH_SESSION_ID=${sessionId}; AUTH_SESSION_ID_LEGACY=${sessionId}; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg0NjcsImlhdCI6MTY4Nzk1MjQ2NywianRpIjoiZjk3MmViOWItMDI5Ni00NmNlLWE5ZWEtYjYzZGU2MDA0ODg4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzdGF0ZV9jaGVja2VyIjoiaHBHTmtCWG40aUh5OVRjRjlKOEJtQ1Vpa2FLaEd5VDRUQmptT2NyZDhmdyJ9.keoZ_VENWIFeb5y97hh4bgXG7YSTCmbX8aP4mfOSey0; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg0NjcsImlhdCI6MTY4Nzk1MjQ2NywianRpIjoiZjk3MmViOWItMDI5Ni00NmNlLWE5ZWEtYjYzZGU2MDA0ODg4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzdGF0ZV9jaGVja2VyIjoiaHBHTmtCWG40aUh5OVRjRjlKOEJtQ1Vpa2FLaEd5VDRUQmptT2NyZDhmdyJ9.keoZ_VENWIFeb5y97hh4bgXG7YSTCmbX8aP4mfOSey0; KEYCLOAK_SESSION=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}; KEYCLOAK_SESSION_LEGACY=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}`,
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
          code: `369355e5-ca0f-4f0b-b68c-cd85c4ddefa7.${sessionId}.qdak-admin`,
          grant_type: 'authorization_code',
          client_id: 'qdak-admin',
          redirect_uri: 'https://admin.mvtest.qdak.hu',
          code_verifier:
            'd2ppRbqhWJESARdoEPcO6kaW1HWyEhlksdU7XT6hT2Frd1PkSPjWjAsUttRBvQyXeescVCUd1alGJBER4rtt9jfEnDaebl4d',
        },
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            cookie:
              `AUTH_SESSION_ID=${sessionId}; AUTH_SESSION_ID_LEGACY=${sessionId}; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg0NjcsImlhdCI6MTY4Nzk1MjQ2NywianRpIjoiZjk3MmViOWItMDI5Ni00NmNlLWE5ZWEtYjYzZGU2MDA0ODg4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzdGF0ZV9jaGVja2VyIjoiaHBHTmtCWG40aUh5OVRjRjlKOEJtQ1Vpa2FLaEd5VDRUQmptT2NyZDhmdyJ9.keoZ_VENWIFeb5y97hh4bgXG7YSTCmbX8aP4mfOSey0; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg0NjcsImlhdCI6MTY4Nzk1MjQ2NywianRpIjoiZjk3MmViOWItMDI5Ni00NmNlLWE5ZWEtYjYzZGU2MDA0ODg4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzdGF0ZV9jaGVja2VyIjoiaHBHTmtCWG40aUh5OVRjRjlKOEJtQ1Vpa2FLaEd5VDRUQmptT2NyZDhmdyJ9.keoZ_VENWIFeb5y97hh4bgXG7YSTCmbX8aP4mfOSey0; KEYCLOAK_SESSION=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}; KEYCLOAK_SESSION_LEGACY=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}`,
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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/pop-up-notifications/active', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/orders', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get(
        'https://auth.mvtest.qdak.hu/realms/iskolaevkonyv/protocol/openid-connect/login-status-iframe.html/init?client_id=qdak-admin&origin=https%3A%2F%2Fadmin.mvtest.qdak.hu',
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'cache-control': 'no-cache',
            cookie:
              `AUTH_SESSION_ID=${sessionId}; AUTH_SESSION_ID_LEGACY=${sessionId}; KEYCLOAK_IDENTITY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg0NjcsImlhdCI6MTY4Nzk1MjQ2NywianRpIjoiZjk3MmViOWItMDI5Ni00NmNlLWE5ZWEtYjYzZGU2MDA0ODg4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzdGF0ZV9jaGVja2VyIjoiaHBHTmtCWG40aUh5OVRjRjlKOEJtQ1Vpa2FLaEd5VDRUQmptT2NyZDhmdyJ9.keoZ_VENWIFeb5y97hh4bgXG7YSTCmbX8aP4mfOSey0; KEYCLOAK_IDENTITY_LEGACY=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyM2E5MTNmNC05OTdmLTQ1YjMtYjhlYi0zZmJjMGExMTJjZmQifQ.eyJleHAiOjE2ODc5ODg0NjcsImlhdCI6MTY4Nzk1MjQ2NywianRpIjoiZjk3MmViOWItMDI5Ni00NmNlLWE5ZWEtYjYzZGU2MDA0ODg4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLm12dGVzdC5xZGFrLmh1L3JlYWxtcy9pc2tvbGFldmtvbnl2Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiU2VyaWFsaXplZC1JRCIsInNlc3Npb25fc3RhdGUiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJzdGF0ZV9jaGVja2VyIjoiaHBHTmtCWG40aUh5OVRjRjlKOEJtQ1Vpa2FLaEd5VDRUQmptT2NyZDhmdyJ9.keoZ_VENWIFeb5y97hh4bgXG7YSTCmbX8aP4mfOSey0; KEYCLOAK_SESSION=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}; KEYCLOAK_SESSION_LEGACY=iskolaevkonyv/a31256f3-51b0-4d9b-94cc-08893ffabec6/${sessionId}`,
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups', null, {
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7723', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7723',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups',
        '{"name":"Test-Suli","createdAt":null,"isActive":false,"inheritModifiers":false,"isSecured":false,"category":"","belongsTo":null,"modifierTemplate":{"id":7723},"searchKey":""}',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups', null, {
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups', null, {
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/cover', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/groups', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/cover',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/groups',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/cover', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734', null, {
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/groups', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/cover',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/groups',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/products?page=1&size=10&sort=name,asc',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/products?page=1&size=10&sort=name,asc',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/modifiers', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/modifiers', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7723', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7723',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7732', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7732',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups',
        '{"name":"Test-Osztály","createdAt":null,"isActive":false,"inheritModifiers":true,"isSecured":true,"accessKey":"uhWUbhxb","category":"","belongsTo":{"id":7734,"name":"Test-Suli","shopId":676,"createdAt":"2023-06-28T13:41:32","isActive":false,"inheritModifiers":false,"isSecured":true,"accessKey":"uhWUbhxb","searchKey":"uhWUbhxb","category":"","modifierTemplate":{"id":7723,"name":"k6-test","technical":false,"shopId":676},"modifiers":[{"id":1,"name":"Nyomtatott","description":"A képet nyomtatva lehet kérni","category":"Formátum","priority":1,"optional":false,"unitPrice":{"netAmount":0,"grossAmount":0,"vatAmount":0,"taxRate":0,"currency":"HUF"},"modifierUriSegment":"mod#id:1/pf#pt:paper","enabled":true,"validUntil":"2025-05-13T23:59:59","compatibleWith":[3,4,5,6,7,8,9,10,13]},{"id":2,"name":"Digitális","description":"Digitálisan előállított kép letölthető formátumban","category":"Formátum","priority":1,"optional":false,"unitPrice":{"netAmount":0,"grossAmount":0,"vatAmount":0,"taxRate":0,"currency":"HUF"},"modifierUriSegment":"mod#id:2/pf#pt:email","enabled":true,"validUntil":"2026-05-13T23:59:59","compatibleWith":[11,12,14]},{"id":3,"name":"2db 6x9 Nyomtatott","description":"2db 6x9 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":417,"grossAmount":500,"vatAmount":83,"taxRate":0.2,"currency":"HUF"},"modifierUriSegment":"mod#id:3/mon#t:2x1-e:3000x2000","enabled":true,"validUntil":"2025-05-13T23:59:59","additionalModifiers":["psize#w:88.9-h:127","size#w:1689-h:1689"],"compatibleWith":[1]},{"id":4,"name":"1db 9x13 Nyomtatott","description":"1db 9x13 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":416,"grossAmount":499,"vatAmount":83,"taxRate":0.2,"currency":"HUF"},"modifierUriSegment":"mod#id:4/size#w:3000-h:3000","enabled":true,"validUntil":"2025-05-13T23:59:59","additionalModifiers":["psize#w:88.9-h:127"],"compatibleWith":[1]},{"id":5,"name":"2 db 7x10 Nyomtatott","description":"2 db 7x10 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":420,"grossAmount":500,"vatAmount":80,"taxRate":0.19,"currency":"HUF"},"modifierUriSegment":"mod#id:5/mon#t:2x1-e:3000x2000","enabled":true,"validUntil":"2025-05-13T23:59:59","additionalModifiers":["size#w:1689-h:1689","psize#w:101.6-h:152.4"],"compatibleWith":[1]},{"id":6,"name":"1db 13x18 Nyomtatott","description":"1db 13x18 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":417,"grossAmount":500,"vatAmount":83,"taxRate":0.2,"currency":"HUF"},"modifierUriSegment":"mod#id:6/size#w:3000-h:3000","enabled":true,"validUntil":"2025-05-13T23:59:59","additionalModifiers":["psize#w:127-h:190.5"],"compatibleWith":[1]},{"id":7,"name":"4db Igazolványkép","description":"4 db előhívott Igazolványkép","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":416,"grossAmount":499,"vatAmount":83,"taxRate":0.2,"currency":"HUF"},"modifierUriSegment":"mod#id:7/mon#t:2x2-e:1500x2250","enabled":true,"validUntil":"2025-05-13T23:59:59","additionalModifiers":["psize#w:88.9-h:127","size#w:900-h:900"],"compatibleWith":[1]},{"id":8,"name":"1db 20x30 cm-es Nyomtatott","description":"1 db 20x30 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":417,"grossAmount":500,"vatAmount":83,"taxRate":0.2,"currency":"HUF"},"modifierUriSegment":"mod#id:8/size#w:3000-h:3000","enabled":true,"validUntil":"2025-05-13T23:59:59","additionalModifiers":["psize#w:203.2-h:304.8"],"compatibleWith":[1]},{"id":9,"name":"9db Bélyegkép","description":"9 db Előhívott Bélyegkép","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":417,"grossAmount":500,"vatAmount":83,"taxRate":0.2,"currency":"HUF"},"modifierUriSegment":"mod#id:9/mon#t:3x3-e:2250x3375","enabled":true,"validUntil":"2025-05-13T23:59:59","additionalModifiers":["size#w:900-h:900","psize#w:101.6-h:152.4"],"compatibleWith":[1]},{"id":10,"name":"1db 30x45 cm-es nyomtatott kép","description":"1 db 30x45 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":500,"grossAmount":600,"vatAmount":100,"taxRate":0.2,"currency":"HUF"},"modifierUriSegment":"mod#id:10/size#w:3000-h:3000","enabled":true,"validUntil":"2025-05-13T23:59:59","additionalModifiers":["psize#w:304.8-h:450"],"compatibleWith":[1]},{"id":11,"name":"1200x1800 Digitális","description":"1200x1800 méretű digitális kép","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":417,"grossAmount":500,"vatAmount":83,"taxRate":0.2,"currency":"HUF"},"modifierUriSegment":"mod#id:11/size#w:1800-h:1800","enabled":true,"validUntil":"2026-05-13T23:59:59","compatibleWith":[2]},{"id":12,"name":"600x900 Digitális","description":"600x900 méretű digitális kép","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":417,"grossAmount":500,"vatAmount":83,"taxRate":0.2,"currency":"HUF"},"modifierUriSegment":"mod#id:12/size#w:900-h:900","enabled":true,"validUntil":"2026-05-13T23:59:59","compatibleWith":[2]},{"id":13,"name":"1 db 10x15 cm-es Nyomtatott","description":"1db 10x15 cm-es előhívott fotó","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":417,"grossAmount":500,"vatAmount":83,"taxRate":0.2,"currency":"HUF"},"modifierUriSegment":"mod#id:13/size#w:3000-h:3000","enabled":true,"validUntil":"2025-05-13T23:59:59","additionalModifiers":["psize#w:101.6-h:152.4"],"compatibleWith":[1]},{"id":14,"name":"Eredeti Digitális","description":"Eredeti méretű digitális kép","category":"Méret","priority":2,"optional":true,"unitPrice":{"netAmount":4202,"grossAmount":5000,"vatAmount":798,"taxRate":0.19,"currency":"HUF"},"modifierUriSegment":"mod#id:14/psize#w:101.6-h:152.4","enabled":true,"validUntil":"2026-05-13T23:59:59","compatibleWith":[2]}]},"searchKey":""}',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups', null, {
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

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups',
        '{"name":"Csoportképek","createdAt":null,"isActive":false,"inheritModifiers":true,"isSecured":true,"accessKey":"uhWUbhxb","category":"","belongsTo":{"name":"Test-Osztály","id":7735},"searchKey":""}',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups', null, {
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/groups', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/groups',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/cover', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products?page=1&size=10&sort=name,asc',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/cover',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products?page=1&size=10&sort=name,asc',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7735', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/cover', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/groups', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups/7735', null, {
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

      response = http.get('https://api.mvtest.qdak.hu/admin/modifiers', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/cover',
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

      response = http.get(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products?page=1&size=10&sort=name,asc',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/groups',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products?page=1&size=10&sort=name,asc',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7736/cover', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7736/products?page=1&size=10&sort=name,asc',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7736/cover',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7736/products?page=1&size=10&sort=name,asc',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/modifiers', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734', null, {
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

      response = http.get('https://api.mvtest.qdak.hu/admin/modifiers', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7723', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7723',
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

      formData = new FormData()
      formData.boundary = '----WebKitFormBoundaryWvS17wkRaktAwmh0'
      formData.append('imageFile', '(bináris)')
      formData.append('productDTO', '(bináris)')

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        formData.body(),
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryWvS17wkRaktAwmh0',
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

      formData = new FormData()
      formData.boundary = '----WebKitFormBoundaryu0e32BA5CXPDXB5q'
      formData.append('imageFile', '(bináris)')
      formData.append('productDTO', '(bináris)')

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        formData.body(),
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryu0e32BA5CXPDXB5q',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
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

      formData = new FormData()
      formData.boundary = '----WebKitFormBoundaryjGhK4IQF4GHMiFRs'
      formData.append('imageFile', '(bináris)')
      formData.append('productDTO', '(bináris)')

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        formData.body(),
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryjGhK4IQF4GHMiFRs',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
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

      formData = new FormData()
      formData.boundary = '----WebKitFormBoundaryOUArOvbrH3RJLnwD'
      formData.append('imageFile', '(bináris)')
      formData.append('productDTO', '(bináris)')

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        formData.body(),
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryOUArOvbrH3RJLnwD',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
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

      formData = new FormData()
      formData.boundary = '----WebKitFormBoundaryIAhyUK2wSvyLye5v'
      formData.append('imageFile', '(bináris)')
      formData.append('productDTO', '(bináris)')

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        formData.body(),
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryIAhyUK2wSvyLye5v',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
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

      formData = new FormData()
      formData.boundary = '----WebKitFormBoundarytGxh9xq1yMYE1GtR'
      formData.append('imageFile', '(bináris)')
      formData.append('productDTO', '(bináris)')

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        formData.body(),
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundarytGxh9xq1yMYE1GtR',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
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

      formData = new FormData()
      formData.boundary = '----WebKitFormBoundaryDahnRzABD6jAwE8w'
      formData.append('imageFile', '(bináris)')
      formData.append('productDTO', '(bináris)')

      response = http.post(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        formData.body(),
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryDahnRzABD6jAwE8w',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products',
        null,
        {
          headers: {
            accept: '*/*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            'access-control-request-headers': 'authorization',
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

      response = http.get(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products?page=1&size=10&sort=name,asc',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products?page=1&size=10&sort=name,asc',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7737/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7745/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7743/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7737/thumbnail',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7745/thumbnail',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7741/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7739/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7743/thumbnail',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7749/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7741/thumbnail',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7747/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7739/thumbnail',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7749/thumbnail',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7747/thumbnail',
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

      response = http.put(
        'https://api.mvtest.qdak.hu/admin/shops/676/products',
        '{"id":7737,"groupId":7735,"name":"letöltés_másolata_(2).png","shopId":676,"createdAt":"2023-06-28T13:42:10","inheritModifiers":true,"isActive":true,"attachments":[{"id":7738,"fileRef":"3834","mimeType":"image/png"}],"modifierTemplate":{"id":7723,"name":"k6-test","technical":false,"shopId":676},"modifiers":null}',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.put(
        'https://api.mvtest.qdak.hu/admin/shops/676/products',
        '{"id":7745,"groupId":7735,"name":"letöltés_másolata_(3).png","shopId":676,"createdAt":"2023-06-28T13:42:11","inheritModifiers":true,"isActive":true,"attachments":[{"id":7746,"fileRef":"3838","mimeType":"image/png"}],"modifierTemplate":{"id":7723,"name":"k6-test","technical":false,"shopId":676},"modifiers":null}',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization,content-type',
          'access-control-request-method': 'PUT',
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

      response = http.put(
        'https://api.mvtest.qdak.hu/admin/shops/676/products',
        '{"id":7743,"groupId":7735,"name":"letöltés_másolata_(4).png","shopId":676,"createdAt":"2023-06-28T13:42:11","inheritModifiers":true,"isActive":true,"attachments":[{"id":7744,"fileRef":"3837","mimeType":"image/png"}],"modifierTemplate":{"id":7723,"name":"k6-test","technical":false,"shopId":676},"modifiers":null}',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization,content-type',
          'access-control-request-method': 'PUT',
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

      response = http.put(
        'https://api.mvtest.qdak.hu/admin/shops/676/products',
        '{"id":7741,"groupId":7735,"name":"letöltés_másolata_(5).png","shopId":676,"createdAt":"2023-06-28T13:42:11","inheritModifiers":true,"isActive":true,"attachments":[{"id":7742,"fileRef":"3836","mimeType":"image/png"}],"modifierTemplate":{"id":7723,"name":"k6-test","technical":false,"shopId":676},"modifiers":null}',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.put(
        'https://api.mvtest.qdak.hu/admin/shops/676/products',
        '{"id":7739,"groupId":7735,"name":"letöltés_másolata_(6).png","shopId":676,"createdAt":"2023-06-28T13:42:11","inheritModifiers":true,"isActive":true,"attachments":[{"id":7740,"fileRef":"3835","mimeType":"image/png"}],"modifierTemplate":{"id":7723,"name":"k6-test","technical":false,"shopId":676},"modifiers":null}',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.put(
        'https://api.mvtest.qdak.hu/admin/shops/676/products',
        '{"id":7749,"groupId":7735,"name":"letöltés_másolata.png","shopId":676,"createdAt":"2023-06-28T13:42:11","inheritModifiers":true,"isActive":true,"attachments":[{"id":7750,"fileRef":"3840","mimeType":"image/png"}],"modifierTemplate":{"id":7723,"name":"k6-test","technical":false,"shopId":676},"modifiers":null}',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization,content-type',
          'access-control-request-method': 'PUT',
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

      response = http.put(
        'https://api.mvtest.qdak.hu/admin/shops/676/products',
        '{"id":7747,"groupId":7735,"name":"letöltés.png","shopId":676,"createdAt":"2023-06-28T13:42:11","inheritModifiers":true,"isActive":true,"attachments":[{"id":7748,"fileRef":"3839","mimeType":"image/png"}],"modifierTemplate":{"id":7723,"name":"k6-test","technical":false,"shopId":676},"modifiers":null}',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization,content-type',
          'access-control-request-method': 'PUT',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization,content-type',
          'access-control-request-method': 'PUT',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization,content-type',
          'access-control-request-method': 'PUT',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products', null, {
        headers: {
          accept: '*/*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          'access-control-request-headers': 'authorization,content-type',
          'access-control-request-method': 'PUT',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products?sort=name,desc&size=7&page=1',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products?sort=name,desc&size=7&page=1',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7747/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7749/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7747/thumbnail',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7739/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7741/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7749/thumbnail',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7743/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7745/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/products/7737/thumbnail', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7739/thumbnail',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7741/thumbnail',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7743/thumbnail',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7745/thumbnail',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/products/7737/thumbnail',
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

      response = http.del('https://api.mvtest.qdak.hu/admin/shops/676/products/7747', null, {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.del('https://api.mvtest.qdak.hu/admin/shops/676/products/7749', null, {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.del('https://api.mvtest.qdak.hu/admin/shops/676/products/7739', null, {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.del('https://api.mvtest.qdak.hu/admin/shops/676/products/7741', null, {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products/7747', null, {
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
      })
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products/7749', null, {
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
      })
      checkResponseStatus(response);

      response = http.del('https://api.mvtest.qdak.hu/admin/shops/676/products/7743', null, {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products/7739', null, {
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
      })
      checkResponseStatus(response);

      response = http.del('https://api.mvtest.qdak.hu/admin/shops/676/products/7745', null, {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.del('https://api.mvtest.qdak.hu/admin/shops/676/products/7737', null, {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products/7741', null, {
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
      })
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products/7743', null, {
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
      })
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products/7745', null, {
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
      })
      checkResponseStatus(response);

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/products/7737', null, {
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
      })
      checkResponseStatus(response);

      response = http.get(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products?sort=name,desc&size=7&page=1',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7735/products?sort=name,desc&size=7&page=1',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7736', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7736/cover', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups/7736', null, {
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7736/groups', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7736/cover',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/modifiers', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7736/products?page=1&size=10&sort=name,asc',
        {
          headers: {
            accept: 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-GB,en;q=0.9',
            authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7736/groups',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7736/products?page=1&size=10&sort=name,asc',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7735', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups/7735', null, {
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

      response = http.get('https://api.mvtest.qdak.hu/admin/modifiers', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7723', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates/7723',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/modifiers/templates', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups', null, {
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/cover', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.get('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/groups', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/cover',
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

      response = http.options(
        'https://api.mvtest.qdak.hu/admin/shops/676/groups/7734/groups',
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

      response = http.del('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734', null, {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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

      response = http.options('https://api.mvtest.qdak.hu/admin/shops/676/groups/7734', null, {
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
      })
      checkResponseStatus(response);

      response = http.get('https://api.mvtest.qdak.hu/admin/pop-up-notifications/active', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-GB,en;q=0.9',
          authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJWNjB3TUVReDBzWUw1Y3hRTUJLMjBOb0diSWYtbE1PblptTGNFM01wTFBvIn0.eyJleHAiOjE2ODc5NTYwNjgsImlhdCI6MTY4Nzk1MjQ2OCwiYXV0aF90aW1lIjoxNjg3OTUyNDY3LCJqdGkiOiI4YTNjMmM5NC04ZDA1LTQ3OWUtYmRlMC0xMGZjMGMxODVmMzgiLCJpc3MiOiJodHRwczovL2F1dGgubXZ0ZXN0LnFkYWsuaHUvcmVhbG1zL2lza29sYWV2a29ueXYiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTMxMjU2ZjMtNTFiMC00ZDliLTk0Y2MtMDg4OTNmZmFiZWM2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicWRhay1hZG1pbiIsIm5vbmNlIjoiN2JkZjVhOGMtOTk1Zi00Yjg2LWEzZjMtM2YwNDBiNDYyYjEyIiwic2Vzc2lvbl9zdGF0ZSI6Ijg3OTU1NzEzLTNmNjgtNDMwNy1hMmYyLWI2NmMzNzU3NWQ0ZCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2FkbWluLm12dGVzdC5xZGFrLmh1Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJpbnZvaWNlX3ZlbmRvcl9nZXQiLCJzaG9wX3VwZGF0ZSIsImRlbGl2ZXJ5X2l0ZW1fY3JlYXRlIiwib3JkZXJfYWRtaW4iLCJwYXltZW50X3ZlbmRvcl91cGRhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9nZXQiLCJkZWxpdmVyeV9pdGVtX2dldCIsInByb2R1Y3RfZ3JvdXBfdXBkYXRlIiwiY29tbWlzc2lvbl9kZWxldGUiLCJzaG9wX2RlbGV0ZSIsIm1pbmltYWxfY3JlYXRlIiwicHJvZHVjdF9ncm91cF9kZWxldGUiLCJwYXltZW50X3ZlbmRvcl9kZWxldGUiLCJzaG9wX2FkbWluIiwiZHluYW1pY3NfY29udHJhY3QiLCJub3RpZmljYXRpb25fZ2V0IiwicGF5bWVudF9jcmVhdGUiLCJjb21taXNzaW9uX3VwZGF0ZSIsIm5vdGlmaWNhdGlvbl9hZG1pbiIsIm9yZGVyX2RlbGV0ZSIsIm1vZGlmaWVyX3RlbXBsYXRlX2FkbWluIiwicGF5bWVudF92ZW5kb3JfZ2V0IiwibW9kaWZpZXJfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfdXBkYXRlIiwicHJvZHVjdF9nZXQiLCJ1bWFfYXV0aG9yaXphdGlvbiIsInNjb3Blc19nZXQiLCJwcm9kdWN0X3JlYWQiLCJvcmRlcl91cGRhdGUiLCJkZWxpdmVyeV9nZXQiLCJkZWxpdmVyeV9wcmludCIsInByb2R1Y3RfdXBkYXRlIiwib3JkZXJfY3JlYXRlIiwiY29tbWlzc2lvbl9jcmVhdGUiLCJzaG9wX3JlYWQiLCJtb2RpZmllcl91cGRhdGUiLCJwYXltZW50X2dldCIsImRlbGl2ZXJ5X2RlbGV0ZSIsImNvbW1pc3Npb25fZ2V0IiwicXVvdGVfZ2V0IiwicmVwb3J0X3Byb2Nlc3NfdHJhbnNhY3Rpb25hbF9kYXRhIiwiaW52b2ljZV91cGRhdGUiLCJjYXJ0X2RlbGV0ZSIsInByb2R1Y3RfZ3JvdXBfY3JlYXRlIiwibW9kaWZpZXJfdGVtcGxhdGVfY3JlYXRlIiwicGF5bWVudF9kZWxldGUiLCJzdGF0aWNfY29udHJhY3QiLCJTVEFUSUNTX0NPTlRSQUNUIiwiZGVsaXZlcnlfdmVuZG9yX2RlbGV0ZSIsIm9yZGVyX2dldCIsImludm9pY2VfdmVuZG9yX2RlbGV0ZSIsImRlbGl2ZXJ5X2l0ZW1fZGVsZXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl9jcmVhdGUiLCJtaW5pbWFsX3VwZGF0ZSIsIm1pbmltYWxfZ2V0Iiwib2ZmbGluZV9hY2Nlc3MiLCJkZWxpdmVyeV92ZW5kb3JfZ2V0IiwiaW52b2ljZV92ZW5kb3JfdXBkYXRlIiwicGF5bWVudF92ZW5kb3JfY3JlYXRlIiwiaW52b2ljZV9jcmVhdGUiLCJkZWxpdmVyeV9jcmVhdGUiLCJkZWxpdmVyeV9pdGVtX3VwZGF0ZSIsImRlbGl2ZXJ5X3ZlbmRvcl91cGRhdGUiLCJtaW5pbWFsX2RlbGV0ZSIsInByb2R1Y3RfZGVsZXRlIiwiY2FydF9nZXQiLCJjYXJ0X2FkbWluIiwicGF5bWVudF9hZG1pbiIsImRlbGl2ZXJ5X3VwZGF0ZSIsImRlbGl2ZXJ5X2FkbWluIiwicHJvZHVjdF9ncm91cF9yZWFkIiwiY29tbWlzc2lvbl9hZG1pbiIsInByb2R1Y3RfZ3JvdXBfZ2V0IiwiY2FydF9jcmVhdGUiLCJpbnZvaWNlX2dldCIsInByb2R1Y3RfYWRtaW4iLCJxdW90ZV9jcmVhdGUiLCJtb2RpZmllcl90ZW1wbGF0ZV9kZWxldGUiLCJpbnZvaWNlX2RlbGV0ZSIsInByb2R1Y3RfY3JlYXRlIiwibW9kaWZpZXJfZ2V0IiwibW9kaWZpZXJfZGVsZXRlIiwibWluaW1hbF9hZG1pbiIsInNob3BfY3JlYXRlIiwiZGVsaXZlcnlfdmVuZG9yX2NyZWF0ZSIsImRlZmF1bHQtcm9sZXMtaXNrb2xhZXZrb255diIsInBheW1lbnRfdXBkYXRlIiwiZ2xvYmFsX25vdGlmaWNhdGlvbl91cGRhdGUiLCJ1c2VyIiwiaW52b2ljZV92ZW5kb3JfY3JlYXRlIiwic2hvcF9nZXQiLCJjYXJ0X3VwZGF0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiI4Nzk1NTcxMy0zZjY4LTQzMDctYTJmMi1iNjZjMzc1NzVkNGQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6Ik1vbG7DoXIgTWlsw6FuIETDoW5pZWwiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJtbWlsYW5kIiwiZ2l2ZW5fbmFtZSI6Ik1vbG7DoXIiLCJmYW1pbHlfbmFtZSI6Ik1pbMOhbiBEw6FuaWVsIiwiZW1haWwiOiJtbWlsYW5kMjAwM0BnbWFpbC5jb20ifQ.V8QWbbuMcd7O7pcxMGvF5rchfKU9JNOEi_-pElpesnEIMhMVPhfS_83y5dtAFXI5A-JEwSKef5mC1xh6N5lwKj33lxP5t0Mv6o6UIplFEe0cGOZrkgBnUt67J-RmTkOdehwH6mvmaw9jjsCyMWiWvvVppfTpHRwMBRwcouaOFkdXpc2UT3GGfgRqmJCGJKIVHUKcrrd93ZujvJnH7WTNoyFQPPu30Ad4TxBU9lMRu-hV_aGUuWnYyLi-LipuNi3i6fYnTgPmQYXiDC05-VYgZydggZDF4yRe5XbR_GRJDXNblIvP_cmcWzo5AlEHYaAAk1bUUYfltAfQeCX0-1Xzpw',
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
