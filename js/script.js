// on scroll header changes
window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// burger navigation
function openNav() {
    document.getElementById("myNav").style.width = "50%";
}
  
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
// Slider
let data = [
    {
        id: 1,
        imageUrl: 'https://ketinomosiashvili.github.io/The-Glory-Hotel-Final-Project/images/slider-img-1.jpg',
    },
    {
        id: 2,
        imageUrl: 'https://ketinomosiashvili.github.io/The-Glory-Hotel-Final-Project/images/slider-img-2.jpg',
    },
    {
        id: 3,
        imageUrl: 'https://ketinomosiashvili.github.io/The-Glory-Hotel-Final-Project/images/slider-img-3.jpg',
    },
    {
        id: 4,
        imageUrl: 'https://ketinomosiashvili.github.io/The-Glory-Hotel-Final-Project/images/slider-img-4.jpg',
    },
    {
        id: 5,
        imageUrl: 'https://ketinomosiashvili.github.io/The-Glory-Hotel-Final-Project/images/slider-img-5.jpg',
    }
]
let arrowLeft = document.getElementById('arrow-left');
let arrowRight = document.getElementById('arrow-right');
let sliderContent = document.getElementById('slider-content');
let dotsList = document.getElementsByClassName('dot');

let sliderIndex = 0;

function createBackgroundImg(item) {
    let backgrImgDiv = document.createElement('div');
    backgrImgDiv.classList.add('background-img');
    backgrImgDiv.style.backgroundImage =  "url(" + item.imageUrl + ")";
    
    return backgrImgDiv;

}
function createDots(item) {
    let dots = document.createElement('div');
    dots.classList.add('dots');

    data.forEach( (element) => {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-id', element.id - 1);

        dot.onclick = function(event) {
            let id = event.target.getAttribute('data-id');
            sliderIndex = id;
            setSlide();
        }
        dots.appendChild(dot);
    });
    return dots;
}

function setSlide() {
    sliderContent.innerHTML = '';
    let backgrImg = createBackgroundImg(data[sliderIndex]);
    let sliderDots = createDots();
    
    sliderContent.appendChild(sliderDots);
    sliderContent.appendChild(backgrImg);

    currentDotActive();
}

function currentDotActive() {
    dotsList[sliderIndex].classList.add('active');
}

function leftArrowClick() {
    if (sliderIndex <= 0) {
        sliderIndex = data.length - 1;
        setSlide();
        return;
    }
    sliderIndex--;
    setSlide();
}
function rightArrowClick() {
    if (sliderIndex >= data.length-1) {
        sliderIndex = 0;
        setSlide();
        return;
    }
    sliderIndex++;
    setSlide();
}

arrowLeft.addEventListener('click', leftArrowClick);
arrowRight.addEventListener('click', rightArrowClick);

setInterval( () => {
    rightArrowClick();
}, 3000);

setSlide();
// Posts


let mainPostWraper = document.getElementById('post-block');
let content = document.getElementById('post-content');
let postOverlay = document.getElementById('postOverlay');
let closePostOverlay = document.getElementById('closePost-icon');

function ajax(url, callBack){
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function(){
        let data = JSON.parse(request.responseText);

        callBack(data);
    })
    request.send();
};

ajax('https://jsonplaceholder.typicode.com/posts', function(data){
    printData(data)
});

function printData (data) {
    data.slice(0, 6).forEach(element => {
        createPost(element);             
    });
}

function createPost(item){

    let postWraper = document.createElement('div');
    postWraper.setAttribute('data-id', item.id);
    postWraper.classList.add('min-post');
    
    let postId = document.createElement('h2');
    postId.innerHTML =  item.id;
    postId.classList.add('post-id');

    let postTitle = document.createElement('h3');
    postTitle.innerHTML =  item.title;
    postTitle.classList.add('post-title');

    let viewPost = document.createElement('button');
    viewPost.classList.add('post-button');
    viewPost.textContent = 'View More';
    viewPost.setAttribute('data-id', item.id);

    postWraper.addEventListener('click', function(event){
        content.innerHTML = '';
        let id = event.target.getAttribute('data-id');
        postOverlayOpen(id);
    });


    postWraper.appendChild(postId);
    postWraper.appendChild(postTitle);
    postWraper.appendChild(viewPost);
    mainPostWraper.appendChild(postWraper);
}

function postOverlayOpen(id){
    postOverlay.classList.add('active');
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url, function(data){
        setPostOverlay(data);
    });
}
function setPostOverlay(item){
    let titlePost = document.createElement('h2');
    titlePost.innerText = item.title;
    titlePost.classList.add('post-title');

    let postDescr = document.createElement('p');
    postDescr.innerText = item.body;
    postDescr.classList.add('post-descr');

    postOverlay.appendChild(content);    
    content.appendChild(titlePost);
    content.appendChild(postDescr);


    closePostOverlay.addEventListener('click', function(){
        postOverlay.classList.remove('active');
        content.innerHTML = '';
    });
}
// accordion
let accordion = document.getElementsByClassName('room-div');

for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function() {
        this.classList.toggle('active-Accordion');
    })
}

// validation
document.getElementById('contact-form').addEventListener('submit', function(event) {

    event.preventDefault();
    
    let errors = {};
    let form = event.target;

// Subject

    let subject = document.getElementById('subject').value;
    let spanSubject = document.getElementById('error_subject');

    if (subject.length > 18) {
        errors.subject = 'Subject can not be more than 18 symbols';
        spanSubject.classList.add('invalid');
    }
    if(subject == ''){
        errors.subject = 'Subject can not be empty';
        spanSubject.classList.add('invalid');
    }
// Description

   let description = document.getElementById('description').value;
   let spanDescription = document.getElementById('error_description');

   if ( description.length > 100) {
       errors. description = 'Description can not be more than 100 symbols';
       spanDescription.classList.add('invalid');
   }
   if(description == ''){
       errors. description = 'Description can not be empty';
       spanDescription.classList.add('invalid');
   }
// Name

    let name = document.getElementById('name').value;
    let spanName = document.getElementById('error_name');

    if(name == ''){
        errors.name = 'Please enter your name';
        spanName.classList.add('invalid');
    }
    //    email
    let email = document.getElementById('email').value;
    let spanEmail = document.getElementById('error_email');
    let emailStructure = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(email == ''){
        errors.email = 'Email can not be empty';
        spanEmail.classList.add('invalid');
    }else if (!email.match(emailStructure)) {
        errors.email = "Your email is invalid";
        spanEmail.classList.add('invalid');   
    }

    for (let item in errors) {
        let errorSpan = document.getElementById('error_' + item);

        if (errorSpan) {
            errorSpan.textContent = errors[item];
        }
    }


    if (Object.keys(errors).length == 0) {
        
       form.submit();

    }
})



