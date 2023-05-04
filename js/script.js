"use strict";
var Selectors;
(function (Selectors) {
    Selectors["selectorArticle"] = ".post";
    Selectors["selectorTitle"] = ".post-title";
    Selectors["selectorTitleList"] = ".titles";
    Selectors["selectorArticleTags"] = ".post-tags .list";
    Selectors["selectorArticleAuthor"] = ".post-author";
    Selectors["selectorAuthorsList"] = ".list.authors";
    Selectors["selectorTagsList"] = ".sidebar .tags";
})(Selectors || (Selectors = {}));
const titleClickHandler = (e) => {
    e.preventDefault();
    let clickedElement = e.target;
    clickedElement = clickedElement.parentNode;
    const activeLink = document.querySelector(".titles a.active");
    if (activeLink)
        activeLink.classList.remove("active");
    clickedElement.classList.add("active");
    const activeArticle = document.querySelector(".posts article.active");
    if (activeArticle)
        activeArticle.classList.remove("active");
    const hrefAttribute = clickedElement.getAttribute("href");
    const targetArticle = document.querySelector(hrefAttribute);
    if (targetArticle)
        targetArticle.classList.add("active");
};
const generateTitleLinks = (customSelector = "") => {
    const titleList = document.querySelector(Selectors.selectorTitleList);
    titleList.innerHTML = "";
    let html = "";
    const articles = document.querySelectorAll(Selectors.selectorArticle + customSelector);
    for (let article of articles) {
        const articleID = article.getAttribute("id");
        const articleTitle = article.querySelector(Selectors.selectorTitle).innerHTML;
        const linkHTML = `<li><a href="#${articleID}"><span>${articleTitle}</span></a></li>`;
        html = html + linkHTML;
    }
    titleList.insertAdjacentHTML("afterbegin", html);
    const links = document.querySelectorAll(".titles a");
    for (let link of links) {
        link.addEventListener("click", titleClickHandler);
    }
};
const generateTags = () => {
    const allTags = [];
    const articles = document.querySelectorAll(Selectors.selectorArticle);
    for (let article of articles) {
        const tagWrapper = article.querySelector(Selectors.selectorArticleTags);
        let html = "";
        const dataTag = article.getAttribute("data-tags");
        const tagsArray = dataTag.split(" ");
        for (let tag of tagsArray) {
            const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
            html = html + linkHTML;
            if (!allTags.includes(tag)) {
                allTags.push(tag);
            }
        }
        tagWrapper.insertAdjacentHTML("afterbegin", html);
    }
    const tagList = document.querySelector(Selectors.selectorTagsList);
    let allTagsHTML = "";
    for (let tag of allTags) {
        allTagsHTML += `<li><a href="#tag-${tag}">${tag}</a></li>`;
    }
    tagList.innerHTML = allTagsHTML;
};
const generateAuthors = () => {
    let allAuthors = [];
    const articles = document.querySelectorAll(Selectors.selectorArticle);
    for (let article of articles) {
        const articleAuthor = article.querySelector(Selectors.selectorArticleAuthor);
        const author = article.getAttribute("data-author");
        if (!allAuthors.includes(author)) {
            allAuthors.push(author);
        }
        const html = `by <a href="#author-${author}">${author}</a>`;
        articleAuthor.insertAdjacentHTML("beforeend", html);
    }
    const authorList = document.querySelector(Selectors.selectorAuthorsList);
    for (let author of allAuthors) {
        authorList.insertAdjacentHTML("afterbegin", `<li><a href="#">${author}</a></li>`);
    }
};
generateTitleLinks();
generateTags();
generateAuthors();
//# sourceMappingURL=script.js.map