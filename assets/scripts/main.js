/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PATH_DATA = `./assets/data/souvenirs.json`;

const article = $(`article`);
const btnCloseModal = $(`#bt-modal`);
const btRandomMemory = $(`#bt-randomMemory`);
const btnsNavigation = $$(`#nav-filter button`);
const templateContent = $(`#template-img`);
for (let i = 0; i < 50; i++) article.append(templateContent.content.cloneNode(true));

window.onload = _ => {
    loadPictures();

    btnCloseModal.onclick = () => closeModal();
    btRandomMemory.onclick = () => openRandomModal();

    btnsNavigation.forEach(_btn => {
        _btn.onclick = _ => {
            btnsNavigation.forEach(_b => {
                if (_b.textContent === _btn.innerText) _b.classList.add(`active`);
                else _b.classList.remove(`active`);
            });

            $$(`article img`).forEach(_img => {
                if (_btn.innerText === `all`) _img.classList.remove(`hidden`);
                else if (_img.dataset.type !== _btn.innerText) _img.classList.add(`hidden`);
                else _img.classList.remove(`hidden`);
            })
        }
    })
}

const openRandomModal = _ => {
    const randomIndex = Math.floor(Math.random() * $$(`article img`).length);
    const randomImg = $$(`article img`)[randomIndex];
    setModalContent(randomImg);
    openModal();
}

const loadPictures = _ => {
    loadData().then(d => {
        let _html = ``;
        for (let i = 0, j = d.length; i < j; i++) _html += picture(d[i]);
        article.innerHTML = _html;
    });
}

const picture = infosContent => `
<div>
<img class="img_back" src="${infosContent.img}" />
<img class="img_front"  src="${infosContent.img}" 
data-title="${infosContent.title}" 
data-type="${infosContent.type}" 
data-video="${infosContent.video}" 
data-date="${infosContent.date}" 
onclick='setModalContent(this);openModal();'>
</div>`;

const setModalContent = _content => {
    $(`#sp_title`).innerText = (_content?.dataset.date + " . " + _content?.dataset.title) || '0';
    $(`#yt-video`).src = `https://www.youtube.com/embed/${_content?.dataset.video || ''}?autoplay=1`;
}

const loadData = async _ => {
    const response = await fetch(PATH_DATA);
    const data = await response.json();
    return data.sort((a, b) => a.date - b.date);
    // return data;
}

const closeModal = () => {
    setModalContent(null);
    hideModal();
}

const hideModal = () => {
    if (!$(`.div-modal`).classList.contains(`hidden`)) $(`.div-modal`).classList.add(`hidden`);
}

const openModal = () => {
    if ($(`.div-modal`).classList.contains(`hidden`)) $(`.div-modal`).classList.remove(`hidden`);
}