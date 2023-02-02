const SERVER_URL = "http://127.0.0.1:8000"

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

//카테고리 가져오기
async function getCATs() {
    let response = await fetch(`${SERVER_URL}/blog/category`);
    let data = await response.json();
    return data
}

async function insertCATS() {
    let cats = await getCATs();
    cats.forEach(cat => {
        console.log(cat);
        category.insertAdjacentHTML('beforeEnd', `
            <option value="${cat.id}">${cat.name}</option>
        `)
    })               
}
insertCATS();

async function postArticle(article) {
    let token = getCookie('access_token');          // access token 가져와서
    let response = await fetch(`${SERVER_URL}/blog/article`, {
        method: 'POST',
        body: article,   // formdata이기 때문에 json 함수 필요 없음
        headers: {
            'Authorization': `Bearer ${token}`      // 인증정보 알려주기
        }
    })
    let data = await response.json();
    return data
}

//form 태그 가져와서 formdata 형태로 만들어준 후 백엔드에 보낼 수 있도록
async function submitArticle() {
    let form = document.getElementById('form');
    let formData = new FormData(form);
    let result = await postArticle(formData);
    console.log(result);
}

