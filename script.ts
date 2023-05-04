enum Selectors {
  selectorArticle = ".post",
  selectorTitle = ".post-title",
  selectorTitleList = ".titles",
  selectorArticleTags = ".post-tags .list",
  selectorArticleAuthor = ".post-author",
  selectorAuthorsList = ".list.authors",
  selectorTagsList = ".sidebar .tags",
}

const titleClickHandler = (e: Event): void => {
  e.preventDefault();
  let clickedElement = e.target as HTMLElement;
  clickedElement = clickedElement.parentNode as HTMLLinkElement;
  const activeLink = document.querySelector(
    ".titles a.active"
  ) as HTMLLinkElement;
  if (activeLink) activeLink.classList.remove("active");
  clickedElement.classList.add("active");
  const activeArticle = document.querySelector(
    ".posts article.active"
  ) as HTMLElement;
  if (activeArticle) activeArticle.classList.remove("active");
  const hrefAttribute = clickedElement.getAttribute("href") as string;
  const targetArticle = document.querySelector(hrefAttribute) as HTMLElement;
  if (targetArticle) targetArticle.classList.add("active");
};

const generateTitleLinks = (customSelector: string = ""): void => {
  const titleList = document.querySelector(
    Selectors.selectorTitleList
  ) as HTMLElement;
  titleList.innerHTML = "";
  let html: string = "";
  const articles = document.querySelectorAll(
    Selectors.selectorArticle + customSelector
  ) as NodeListOf<HTMLElement>;
  for (let article of articles) {
    const articleID = article.getAttribute("id") as string;
    const articleTitle = (
      article.querySelector(Selectors.selectorTitle) as HTMLElement
    ).innerHTML;
    const linkHTML: string = `<li><a href="#${articleID}"><span>${articleTitle}</span></a></li>`;
    html = html + linkHTML;
  }
  titleList.insertAdjacentHTML("afterbegin", html);
  const links = document.querySelectorAll(
    ".titles a"
  ) as NodeListOf<HTMLElement>;
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
};

const generateTags = () => {
  const allTags: string[] = [];
  const articles = document.querySelectorAll(
    Selectors.selectorArticle
  ) as NodeListOf<HTMLElement>;
  for (let article of articles) {
    const tagWrapper = article.querySelector(
      Selectors.selectorArticleTags
    ) as HTMLElement;
    let html: string = "";
    const dataTag = article.getAttribute("data-tags") as string;
    const tagsArray: string[] = dataTag.split(" ");
    for (let tag of tagsArray) {
      const linkHTML: string = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      html = html + linkHTML;
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    }
    tagWrapper.insertAdjacentHTML("afterbegin", html);
  }
  const tagList = document.querySelector(
    Selectors.selectorTagsList
  ) as HTMLElement;
  let allTagsHTML: string = "";
  for (let tag of allTags) {
    allTagsHTML += `<li><a href="#tag-${tag}">${tag}</a></li>`;
  }
  tagList.innerHTML = allTagsHTML;
};

const generateAuthors = () => {
  let allAuthors: string[] = [];
  const articles = document.querySelectorAll(
    Selectors.selectorArticle
  ) as NodeListOf<HTMLElement>;
  for (let article of articles) {
    const articleAuthor = article.querySelector(
      Selectors.selectorArticleAuthor
    ) as HTMLElement;
    const author = article.getAttribute("data-author") as string;
    if (!allAuthors.includes(author)) {
      allAuthors.push(author);
    }
    const html: string = `by <a href="#author-${author}">${author}</a>`;
    articleAuthor.insertAdjacentHTML("beforeend", html);
  }
  const authorList = document.querySelector(
    Selectors.selectorAuthorsList
  ) as HTMLElement;
  for (let author of allAuthors) {
    authorList.insertAdjacentHTML(
      "afterbegin",
      `<li><a href="#">${author}</a></li>`
    );
  }
};

generateTitleLinks();
generateTags();
generateAuthors();
