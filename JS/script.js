const popupModal = document.querySelector(".popup");
const popupOverlay = document.querySelector(".pop-overlay");
const game = document.querySelector(".game");
const main_message_container = document.querySelector(
  ".main-message-container"
);
const Salah = document.querySelector(".balloon-main-container .salahname")
const fullscreen = document.querySelector(".fullscreen-overlay");
//loader functions

const loader = document.querySelector(".loader-container");
const container = document.querySelector(".game");
// عند بدء تحميل الوسائط
container.addEventListener("loadstart", function () {
  container.style.display = "none";
  loader.style.display = "block"; // عرض المؤشر
});

// عند تحميل البيانات الفعلية
container.addEventListener("loadeddata", function () {
  container.style.display = "block";
  loader.style.display = "none"; // عرض المؤشر
});

// يمكنك أيضًا إضافة حدث للتحقق من حالة التحميل إذا كنت تريد
container.addEventListener("error", function () {
  loader.style.display = "none"; // إخفاء المؤشر في حال وجود خطأ
  alert("Error loading video");
});

//===========SOUND PLAY

function soundPlay(el) {
  const audio = new Audio(el);
  audio.play();
}

let data = [
  {
    airballoon: "../media/images/1.png",
    salah: "../media/images/salah/1.svg",
    mytype: "الفجر",
    trueanswer: 2,
    id: "indexof0",
    title: "../media/images/title/1.svg",
  },
  {
    airballoon: "../media/images/2.png",
    salah: "../media/images/salah/2.svg",
    mytype: "الظهر",
    trueanswer: 4,
    id: "indexof1",
    title: "../media/images/title/2.svg",
  },
  {
    airballoon: "../media/images/3.png",
    salah: "../media/images/salah/3.svg",
    mytype: "العصر",
    trueanswer: 4,
    id: "indexof2",
    title: "../media/images/title/3.svg",
  },
  {
    airballoon: "../media/images/4.png",
    salah: "../media/images/salah/4.svg",
    mytype: "المغرب",
    trueanswer: 3,
    id: "indexof3",
    title: "../media/images/title/4.svg",
  },
  {
    airballoon: "../media/images/5.png",
    salah: "../media/images/salah/5.svg",
    mytype: "العشاء",
    trueanswer: 4,
    id: "indexof4",
    title: "../media/images/title/5.svg",
  },
];

// يمكنك الآن العمل مع المصفوفة "data"

let arr = Object.keys(data);

shuflle(arr);

function shuflle(arr) {
  let current = arr.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = arr[current];
    arr[current] = arr[random];

    arr[random] = temp;
  }
}

let currentPage = 0,
  question_contianer = document.querySelector(".questions-container-inner");
const main_titleImg = document.querySelector(
  ".question-item-container .qustion-title"
);

const nav = document.querySelector(".result-true-false-container nav");
let selectedItem;
let wrongAnswers = 0;
let message_icon = document.getElementById("message-icone");
let feedback = document.getElementById("feedback");
let result_percent = document.querySelector(".result-container span");
let navItems = document.querySelectorAll(
  ".result-true-false-container nav li a"
);
let itemsArr = Array.from(navItems);

function changeImg() {
  question_contianer.setAttribute(
    "airballoon",
    data[arr[currentPage]].airballoon
  );
  Salah.style.backgroundImage = `url(${
    data[arr[currentPage]].salah
  })`;
  question_contianer.setAttribute("id", data[arr[currentPage]].id);
  question_contianer.setAttribute("mytype", data[arr[currentPage]].mytype);
  question_contianer.setAttribute("salah", data[arr[currentPage]].salah);
  question_contianer.setAttribute(
    "trueanswer",
    data[arr[currentPage]].trueanswer
  );

  question_contianer.style.backgroundImage = `url(${
    data[arr[currentPage]].airballoon
  })`;
  question_contianer.style.backgroundImage = `url(${
    data[arr[currentPage]].airballoon
  })`;
  question_contianer.querySelector(
    ".qustion-title"
  ).style.backgroundImage = `url(${data[arr[currentPage]].title})`;

  itemsArr[currentPage].classList.add("active");
}
changeImg();

let numbers = document.querySelectorAll(".numbers-container-inner .number");

numbers.forEach((num, index) => {
  num.addEventListener("click", () => clickbutton(num));
});

function clickbutton(el) {
  let clickvalue = el.getAttribute("clickvalue");
  let trueValue = question_contianer.getAttribute("trueanswer");

   if(main_titleImg.classList.contains("slideInDown")){
     main_titleImg.classList.remove("slideInDown")
   }
   setTimeout(()=>{
     main_titleImg.classList.add("slideInDown")
   } , 10)

  numbers.forEach((num) => {
    num.classList.add("disabled");
  });
  //في حالة ان الاجابة صحيحة
  if (trueValue == clickvalue) {
    el.classList.add("true");

    soundPlay("../media/audios/correct.mp3");

    itemsArr[currentPage].style.backgroundImage =
      "url(../media/images/navs/Right.png)";
    itemsArr[currentPage].classList.add("animated");

    setTimeout(() => {
      if (currentPage < data.length - 1) {
        currentPage++;
        changeImg();
        numbers.forEach((num) => {
          num.classList.remove("disabled");
        });
      } else {
        main_message_container.classList.add("active");
        soundPlay("../media/audios/101.mp3");
        rateAnswer();
      }
      el.classList.remove("true");
    }, 1000);
  } else {
    //في حال ان الاجابة خطا
    wrongAnswers++;

    itemsArr[currentPage].style.backgroundImage =
      "url(../media/images/navs/Wrong.png)";
    itemsArr[currentPage].classList.add("animated");

    el.classList.add("false");

    soundPlay("../media/audios/error.mp3");

    numbers.forEach((num) => {
      if (num.getAttribute("clickvalue") == trueValue) {
        num.classList.add("true");
        setTimeout(() => {
          numbers.forEach((num) => {
            num.classList.remove("disabled");
          });
          num.classList.remove("true");
        }, 1000);
      }
    });

    setTimeout(() => {
      if (currentPage < data.length - 1) {
        currentPage++;
        changeImg();
      } else {
        main_message_container.classList.add("active");
        soundPlay("../media/audios/101.mp3");
        rateAnswer();
      }

      el.classList.remove("false");
    }, 1000);
  }
}

main_message_container
  .querySelector(".reload")
  .addEventListener("click", () => window.location.reload());

function rateAnswer() {
  let percent = (wrongAnswers / data.length) * 100;

  let resultPercet = 100 - percent;

  if (percent < 20) {
    message_icon.classList.add("wellDonw-icon");

    feedback.classList.add("wellDonw");
  } else if (percent >= 20 && percent < 70) {
    message_icon.classList.add("good-icon");

    feedback.classList.add("good");
  } else {
    message_icon.classList.add("tryAgain-icon");

    feedback.classList.add("tryAgain");
  }

  result_percent.innerHTML = resultPercet.toFixed(0) + "%";
}

rateAnswer();

const checkScreen = () => {
  const isPortrait = window.matchMedia("(orientation: portrait)").matches;
  const isMobile = window.innerWidth < 768 && isPortrait;
  return isMobile;
};
window.addEventListener("load", () => {
  const is_mobile = checkScreen();
  if (is_mobile) {
    popupModal.style.visibility = "visible";
    popupOverlay.style.visibility = "visible";
  } else {
    popupModal.style.visibility = "hidden";
    popupOverlay.style.visibility = "hidden";
    game.style.visibility = "visible";
  }
});
document.addEventListener("contextmenu", function (event) {
  var target = event.target;
  if (target.tagName === "IMG") {
    event.preventDefault();
  }
  return false;
});

window.addEventListener("orientationchange", function () {
  const is_mobile = checkScreen();
  if (window.orientation === 90 || window.orientation === -90) {
    if (is_mobile) {
      game.style.visibility = "visible";
      popupModal.style.visibility = "hidden";
      popupOverlay.style.visibility = "hidden";
    } else {
      popupModal.style.visibility = "visible";
      popupOverlay.style.visibility = "visible";
    }
  } else {
    popupModal.style.visibility = "visible";
    popupOverlay.style.visibility = "visible";
  }
});


function openFullscreen() {
  fullscreen.classList.add("hide");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    // Chrome, Safari, Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    // IE/Edge
    elem.msRequestFullscreen();
  }
}

var elem = document.documentElement;

fullscreen.addEventListener("dblclick", openFullscreen);

window.addEventListener("load", () => {
  // إخفاء الـ Loader
  loader.style.display = "none";
});
