/////////////////////////////////////////////////////////////////////
//Treehouse Techdegree: FSJS project 2 - List Filter and Pagination//
/////////////////////////////////////////////////////////////////////

/////////////////////
//Initial Variables//
/////////////////////
let students = document.getElementsByClassName('student-item');
let displayState = students[0].style.display;

let page = document.getElementById('main');
let pageNumbers = document.createElement('ul');
pageNumbers.setAttribute('class', 'pagination');

/////////////////////////////
//Generate Search Elements///
/////////////////////////////
let form = document.createElement('form');
form.setAttribute('class', 'student-search');

let searchBox = document.createElement('input');
searchBox.setAttribute('type','text');
searchBox.setAttribute('placeholder','Search for students...');

let searchButton = document.createElement('button');
searchButton.innerHTML = "Search";
let searchFor = 'search(searchBox.value)';
searchButton.setAttribute('onClick', searchFor)

form.appendChild(searchBox);
form.appendChild(searchButton);

let addSearchBox = document.getElementById('page-header');
let addit = addSearchBox.appendChild(form);

let noneFound = document.createElement('p');
noneFound.innerHTML = "No Matches Found";
noneFound.style.display = 'none';
let pagination = document.querySelector('ul');
pagination.appendChild(noneFound);


//////////////
//Functions///
//////////////

//Determines number of page #'s needed
function pagesNeeded(count){
  let pagesToCreate = Math.floor(count/10);
  if(count%10 != 0) {
    pagesToCreate += 1;
  };
  return pagesToCreate;
};

//Gets the range of names to display ('Names 0-10 or Names 30-40')
function displayRange(goToPage) {
  if(goToPage == 1) {
    let min = 0;
    let max = 10;
    showHide(min, max);
  } else {
    let stringify = goToPage.toString() + "0";
    let min = parseInt(stringify) - 10;
    let max = parseInt(stringify);
    showHide(min, max)
  };
};

//Hides all students then displayes appropriate students
function showHide(min, max) {
  for(let i = 0; i < students.length; i++) {
    students[i].style.display = 'none';
  }
  for(let i = min; i < max; i++) {
    students[i].style.display = displayState;
  }
};

//Creates Pagination Links (Page numbers at bottom of screen);
function addPaginationLinks(studentLength) {
  let pagesToCreate = pagesNeeded(studentLength);
  for(let i = 1; i < pagesToCreate + 1; i+=1) {
    let numberToAdd = document.createElement('li');
    let pageNumberLink = document.createElement('a');
    pageNumberLink.innerHTML = i;
    let displayCall = 'displayRange(' + i + ')';
    pageNumberLink.setAttribute('onClick', displayCall)
    pageNumberLink.setAttribute('href', '#')
    numberToAdd.appendChild(pageNumberLink);
    let pageNumber = pageNumbers.appendChild(numberToAdd);
  }
  page.appendChild(pageNumbers);
};

//Lets you search for students by name or email
function search(searchFor) {
  noneFound.style.display = 'none';
  if(searchFor === '') {
    displayRange(1);
    return
  }
  let showing = 0;
  let names = document.getElementsByTagName('h3');
  let emails = document.getElementsByClassName('email');
  for(let i = 0; i < names.length; i++) {
    if(names[i].innerHTML.includes(searchFor) || emails[i].innerHTML.includes(searchFor)) {
      names[i].parentNode.parentNode.style.display = displayState;
      showing+=1;
    } else {
      names[i].parentNode.parentNode.style.display = 'none';
    }
  }
  if(showing == 0) {
    noneFound.style.display = displayState;
  } else {
    addPaginationLinks(showing);
  };
};


//Adds pagination links and sets default view to 10 people
addPaginationLinks(students.length);
displayRange(1);
