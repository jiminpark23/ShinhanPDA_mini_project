// 주소는 상수 형태로 정의
const SERVER_URL = 'http://127.0.0.1:8000'

//------------------ GET ----------------------//

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function getPosts() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json();
    return data
}

async function insertPosts() {
    let posts = await getPosts();
    posts.forEach(post => {
        document.body.insertAdjacentHTML('beforeend', `
            <div id="${post.id}">
                <h1>${post.author}</h1>
                <h1>${post.title}</h1>
                <p>${post.content}</p>
                <p>${post.category}</p>
                <button onclick="deletePost(${post.id})">삭제</button>
            </div>
        `)
    })
}
insertPosts()