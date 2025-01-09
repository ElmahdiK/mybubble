/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PATH_DATA = `./assets/data/mybubble.json`;

const article = $(`article`);
const templateContent = $(`#template-img`);
for (let i = 0; i < 50; i++) article.append(templateContent.content.cloneNode(true))

window.onload = _ => {
    console.log(`page loaded`);

    loadData().then(d => {
        let _html = ``;
        for (let i = 0, j = d.length; i < j; i++) _html += content(d[i]);
        article.innerHTML = _html;
    });

    $(`#bt-modal`).onclick = () => {
        seeContent(null);
        closeModal();
    }

    $$(`#nav-filter button`).forEach(_btn => {
        _btn.onclick = _ => {
            $$(`#nav-filter button`).forEach(_b => _b.classList.remove(`active`));
            _btn.classList.add(`active`);

            $$(`article img`).forEach(_img => {
                if (_btn.innerText === `all`) _img.classList.remove(`hidden`);
                else if (_img.dataset.type !== _btn.innerText) _img.classList.add(`hidden`);
                else _img.classList.remove(`hidden`);
            })
        }
    })
}
const content = _content => { return `<img src="${_content.img}" data-title="${_content.title}" data-type="${_content.type}" data-video="${_content.video}" onclick='seeContent(this)'>`; };

const seeContent = _content => {
    $(`#sp_title`).innerText = _content?.dataset.title || '0';
    $(`#yt-video`).src = `https://www.youtube.com/embed/${_content?.dataset.video || ''}?autoplay=1`;
    if ($(`.div-modal`).classList.contains(`hidden`)) openModal();
}

const loadData = async _ => {
    const response = await fetch(PATH_DATA);
    const data = await response.json();
    return data;
}

const closeModal = () => {
    $(`.div-modal`).classList.add(`hidden`);
}

const openModal = () => {
    $(`.div-modal`).classList.remove(`hidden`);
}