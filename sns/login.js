const SERVER_URL = 'http://127.0.0.1:8000'

async function login(user) {
    let response = await fetch(`${SERVER_URL}/user/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'      // 이거 필요함
    })
    let data = await response.json();
    return data
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
  
function setCookie(name, value) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/";
    document.cookie = updatedCookie;
}

async function submitLogin() {
    let user = {
        //왼쪽의 키값은 백엔드 API명세서 보고 정하는 것. 임의로 X
        email: document.getElementById('id').value,
        password: document.getElementById('pw').value
    }
    let result = await login(user);
    // 로그인 하는 순간 access token이 브라우저에 세팅됨
    if (result.access_token) {
        setCookie('access_token', result.access_token);
    }
}