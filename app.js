let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper"); //注意：不能省略section，否則抓不到

const time_line = new TimelineMax();

//Gsap有關.fromTo()文件連結https://gsap.com/docs/v3/GSAP/Timeline/
//參數1表示對象、參數2表示duration、參數3表示起始狀態、參數4表示結束狀態
time_line
  .fromTo(hero, 1.2, { height: "0%" }, { height: "100%", ease: Power2.easeInOut }) //Power2是Gsap提供的緩動函式
  .fromTo(hero, 1, { width: "80%" }, { width: "100%", ease: Power2.easeInOut })
  .fromTo(slider, 1, { x: "-100%" }, { x: "0%" },"-=1.2")//參數5表示提早1.2秒開始
  .fromTo(animation, 0.3, {opacity:1}, {opacity:0});

window.setTimeout( ()=>{ animation.style.pointerEvents= "none"} ,2500);
//setTimeout屬性詳閱https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
//pointer-events屬性詳閱https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events

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
    changeColor(e.target);
  });

  //垃圾桶按鈕
  let newTrashButton = document.createElement("button");
  newTrashButton.classList.add("trash-button");
  let newITag = document.createElement("i");
  newITag.classList.add("fas");
  newITag.classList.add("fa-trash");
  newTrashButton.appendChild(newITag);

  //避免預設行為：點擊垃圾桶按鈕會重新刷新頁面。
  newTrashButton.addEventListener("click", (e) => {
    // console.log(e.target);
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newTrashButton);
  newForm.appendChild(newDiv);
  newForm.style.animation = "scaleUp 0.5s ease forwards";

  document.querySelector(".all-inputs").appendChild(newForm);
});

let allTrash = document.querySelectorAll(".trash-button");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.classList.add("remove");
  });
});
allTrash.forEach((e) => {
  let form = e.parentElement.parentElement;
  form.addEventListener("transitionend", () => {
    form.remove();
    setGPA();
  });
});

//排序功能
let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");

//排序演算法函式
function merge(a1, a2) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i].class_grade_number > a2[j].class_grade_number) {
      result.push(a2[j]);
      j++;
    } else {
      result.push(a1[i]);
      i++;
    }
  }

  while (i < a1.length) {
    result.push(a1[i]);
    i++;
  }
  while (j < a2.length) {
    result.push(a2[j]);
    j++;
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length == 0) {
    return;
  }

  if (arr.length == 1) {
    return arr;
  } else {
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle, arr.length);
    return merge(mergeSort(left), mergeSort(right));
  }
}

//DOM操作
btn1.addEventListener("click", () => {
  handleSorting("descending");
});

btn2.addEventListener("click", () => {
  handleSorting("ascending");
});

function handleSorting(direction) {
  let graders = document.querySelectorAll(".grader");
  let objectArray = []; //存放每一門class object

  //1.建立objectArray
  for (let i = 0; i < graders.length; i++) {
    let class_category = graders[i].children[0].value;
    let class_number = graders[i].children[1].value;
    let class_credit = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;
    let class_object = {
      //建立物件儲存上述資料
      class_category,
      class_number,
      class_credit,
      class_grade,
    };
    if (
      //如果任一格沒填資料，則不參與排序
      !(
        (class_category === "") &
        (class_number === "") &
        (class_credit === "") &
        (class_grade === "")
      )
    ) {
      objectArray.push(class_object);
    }
  }

  //2.取得objectArray後，把成績換成數字
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
  }

  //3.排序
  objectArray = mergeSort(objectArray);
  if (direction === "descending") {
    objectArray = objectArray.reverse();
  }

  //4.根據object array的內容，來更新網頁
  let allInputs = document.querySelector(".all-inputs");
  allInputs.innerHTML = "";

  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
          <div class="grader">
            <input type="text" value=${objectArray[i].class_category} placeholder="class category" class="class-category" list="opt"><!--
            --><input type="text" value=${objectArray[i].class_number} placeholder="class number" class="class-number"><!--
            --><input type="number" value=${objectArray[i].class_credit} placeholder="credits" min="0" max="6" class="class-credit"><!--
            --><select name="select" class="select">
              <option value=""></option>
              <option value="A">A</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="B-">B-</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="C-">C-</option>
              <option value="D+">D+</option>
              <option value="D">D</option>
              <option value="D-">D-</option>
              <option value="F">F</option>
            </select><!--
            --><button class="trash-button"><i class="fas fa-trash"></i></button>
          </div>
        </form>`;
  }
  //4.1以javaScript更改select
  graders = document.querySelectorAll(".grader"); //回傳graders是靜態note list故重抓
  for (let i = 0; i < objectArray.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  //4.1.1:(新增的innerHTML)select事件監聽
  allSelects = document.querySelectorAll("select"); //靜態NodeList
  allSelects.forEach((e) => {
    changeColor(e); //排序後新增的innerHTML先轉換顏色
    e.addEventListener("change", (e) => {
      //為新增後的元素補上原有功能
      setGPA();
      changeColor(e.target);
    });
  });

  //4.1.2:(新增的innerHTML)input.credits事件監聽
  allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  //4.1.2:(新增的innerHTML)垃圾桶按鈕功能
  allTrashs = document.querySelectorAll(".trash-button");
  allTrashs.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  });
}
