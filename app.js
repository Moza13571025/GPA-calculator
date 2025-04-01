let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper"); //注意：不能省略section，否則抓不到

const time_line = new TimelineMax();

//Gsap有關.fromTo()文件連結https://gsap.com/docs/v3/GSAP/Timeline/
//參數1表示對象、參數2表示duration、參數3表示起始狀態、參數4表示結束狀態
// time_line
//   .fromTo(hero, 1.2, { height: "0%" }, { height: "100%", ease: Power2.easeInOut }) //Power2是Gsap提供的緩動函式
//   .fromTo(hero, 1, { width: "80%" }, { width: "100%", ease: Power2.easeInOut })
//   .fromTo(slider, 1, { x: "-100%" }, { x: "0%" },"-=1.2")//參數5表示提早1.2秒開始
//   .fromTo(animation, 0.3, {opacity:1}, {opacity:0});

// window.setTimeout( ()=>{ animation.style.pointerEvents= "none"} ,2500);
// //setTimeout屬性詳閱https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
// //pointer-events屬性詳閱https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events

//避免誤提交表單：禁止網站使用enter鍵
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

//防止表單內部的按鈕提交表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//根據所選的成績變換背景顏色
let allSelects = document.querySelectorAll("select"); //回傳NodeList
allSelects.forEach((e) => {
  e.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });
});

//當用戶改變credits輸入框的值，GPA更新
let credits = document.querySelectorAll(".class-credit")
credits.forEach((credit)=>{
  credit.addEventListener("change",()=>{
    setGPA();
  })
})

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B" ||
    target.value == "B-" ||
    target.value == "B+"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C" ||
    target.value == "C-" ||
    target.value == "C+"
  ) {
    target.style.backgroundColor = "orange";
  } else if (
    target.value == "D" ||
    target.value == "D-" ||
    target.value == "D+"
  ) {
    target.style.backgroundColor = "red";
  } else if (target.value == "F") {
    target.style.backgroundColor = "gray";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
  }
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".class-credit");
  let selects = document.querySelectorAll(".select");
  let sum = 0; //計算GPA之分子
  let creditSum = 0; //計算GPA之分母

  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) creditSum += credits[i].valueAsNumber;
  }

  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber))
      sum += convertor(selects[i].value) * credits[i].valueAsNumber;
  }

  if (creditSum === 0) {
    result = 0;
  } else {
    result = sum / creditSum;
  }

  document.getElementById("result-gpa").innerText = result.toFixed(2);
}
