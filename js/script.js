'use strict';

function titleClickHandler(event){
  console.log('Link was clicked!');
  console.log(event);
  
  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
    
  /* [IN PROGRESS] add class 'active' to the clicked link */

  const clickedElement = this;
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

}   


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optActiveTagsSelector = 'a.active[href^="#tag-"]',
  optArticleAuthorSelector = '.post-author'

  
  function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  let html= ' ';

  const articles=document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');
  
    /* find the title element */
    /* get the title from the title element */
    
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  
    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

}

generateTitleLinks();


function generateTags(){

  /* find all articles */

  const articles =document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */

    const tagsList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = ' ';
    tagsList.innerHTML = " ";

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /* generate HTML of the link */
      
      const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>'
      
      /* add generated code to html variable */

      html = html + ' ' + linkHtml;
      
    /* END LOOP: for each tag */

    }
  
    /* insert HTML of all the links into the tags wrapper */

    tagsList.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  
  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all ta.querg links with class active */

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  
  for(let activeTagLink of activeTagLinks){

    /* remove class active */

    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for( let tagLink of tagLinks){
  
    /* add class active */

    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */
  
  generateTitleLinks('[data-tags~="' + tag + '"]');

}



function addClickListenersToTags(){

  /* find all links to tags */

  let links = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for(let link of links) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */

  }
}
addClickListenersToTags();


function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    const articleAuthor = article.querySelector(optArticleAuthorSelector);
    let html = ' ';
    const author = article.getAttribute('data-author');
    const authorLink = '<a href="#author-' + author + '">' + author + '</a>';
    html = html + authorLink;
    articleAuthor.innerHTML = html;
  }
}
generateAuthors();


function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute(href);
  const author = href.replace('#author', ' ');
  const activeAuthorLink = 'a.active[href^="#author-"]';
  activeAuthorLink.classList.remove(active);
  const authorLink = document.querySelector('[href="#author-' + href + '"');
  authorLink.classList.add(active);
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors (){
  let links = document.querySelectorAll('a[href^="#author"]');
  for(let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();