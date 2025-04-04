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
let allSelects = document.querySelectorAll("select"); //回傳NodeList，靜態
allSelects.forEach((e) => {
  e.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });
});

//當用戶改變credits輸入框的值，GPA更新
let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

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

let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  //新增五個元素
  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("class-type");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.classList.add("class-number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("class-credit");
  newInput3.addEventListener("change", (e) => {
    setGPA();
  });

  // select及其選項
  let newSelect = document.createElement("select");
  newSelect.classList.add("select");
  var opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  //allSelects的querySelectorAll是回傳靜態NodeList，所以newSelect要再設定事件監聽器
  newSelect.addEventListener("change", (e) => {
    //e不能省略
    setGPA();
    changeColor(e.target)
  });

  //垃圾桶按鈕
  let newTrashButton = document.createElement("button");
  newTrashButton.classList.add("trash-button");
  let newITag = document.createElement("i");
  newITag.classList.add("fas");
  newITag.classList.add("fa-trash");
  newTrashButton.appendChild(newITag);

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newTrashButton);
  newForm.appendChild(newDiv);
  newForm.style.animation = "scaleUp 0.5s ease forwards"

  document.querySelector(".all-inputs").appendChild(newForm);
});
