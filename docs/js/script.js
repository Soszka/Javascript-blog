'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optActiveTagsSelector = 'a.active[href^="#tag-"]',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';
const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorsListLink: Handlebars.compile(document.querySelector('#template-all-authors-link').innerHTML),
  }


function titleClickHandler(event){

  console.log(event);
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
    
  const clickedElement = this;
  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
}   


function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let html= ' ';
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();


function calculateTagsParams(tags){
  const params = {max: 0, min: 999999};
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}


function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax   = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return classNumber;
}


function generateTags(){

  const allTags ={};
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    const tagsList = article.querySelector(optArticleTagsSelector);
    let html = ' ';
    tagsList.innerHTML = " ";
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray){ 
      const linkHTMLData = {id: tag, tagName: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      html = html + ' ' + linkHTML;
      if(!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    tagsList.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = {tags: []};
  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();


function tagClickHandler(event){

  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for(let activeTagLink of activeTagLinks){
    activeTagLink.classList.remove('active');
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for( let tagLink of tagLinks){
    tagLink.classList.add('active');
  }
  
  generateTitleLinks('[data-tags~="' + tag + '"]'); 
}
function addClickListenersToTags(){
  let links = document.querySelectorAll('a[href^="#tag-"]');
  for(let link of links) {
    link.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();


function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    const articleAuthor = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const author = article.getAttribute('data-author');
    const authorLinkHTMLData = {id: author, authorName: author};
    const authorLink = templates.authorLink(authorLinkHTMLData);
    html = html + authorLink;
    articleAuthor.innerHTML = html;
    if(!allAuthors.hasOwnProperty(author)){
    allAuthors[author] = 1;
    } else {
    allAuthors[author]++;
    }
  }

  const authorsList = document.querySelector(optAuthorsListSelector);
  authorsList.innerHTML = '';
  let allAuthorsLinkData = {authors: []};
  for(let author in allAuthors){
   allAuthorsLinkData.authors.push({
    author: author,
    count: allAuthors[author]
   });
  }

  authorsList.innerHTML = templates.authorsListLink(allAuthorsLinkData);
}
generateAuthors();


function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for(let activeAuthorLink of activeAuthorLinks){
    activeAuthorLink.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll('[href="#author-' + href + '"');
  for(let authorLink of authorLinks){
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}
function addClickListenersToAuthors (){
  let links = document.querySelectorAll('a[href^="#author-"]');
  for(let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();