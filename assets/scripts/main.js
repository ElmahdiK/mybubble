/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const _pathJSON = `./assets/data/mybubble.json`;

window.onload = _ => {
    console.log(`page loaded`);

    let _article = $(`article`);

    _loadData().then(d => {
        let _html = ``;
        // _html += `<div>`;
        for (let i = 0, j = d.length; i < j; i++) {
            // _html += `<details open><summary>${d[i].type}</summary><div>`;
            for (let a = 0, b = d[i].content.length; a < b; a++) _html += content(d[i].content[a]);
            // _html += `</div></details>`;
        }
        // _html += `</div>`;
        _article.insertAdjacentHTML(`beforeEnd`, _html);
    });

    $(`#bt-modal`).onclick=()=>{
        seeContent(null);
        closeModal();
    }
}
const content = _content => { return `<img src="${_content.img}" data-title="${_content.title}" data-video="${_content.video}" onclick='seeContent(this)'>`; };

const seeContent = _content => {
    $(`#sp_title`).innerText = _content?.dataset.title || '0';
    $(`#yt-video`).src = `https://www.youtube.com/embed/${_content?.dataset.video || ''}?autoplay=1`;
    if ($(`.div-modal`).classList.contains(`hidden`)) openModal();
}

/** 
 * @function _loadData
 * @returns {Promise} Promise object
 */
let _loadData = _ => {
    return new Promise((resolve, reject) => {
        fetch(_pathJSON)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                return response.json();
            })
            .then(_json => resolve(_json))
            .catch(error => {
                throw new Error(`HTTP error ${error}`);
            })
    });
}

const closeModal = ()=> {
    $(`.div-modal`).classList.add(`hidden`);
}

const openModal = ()=> {
    $(`.div-modal`).classList.remove(`hidden`);
}