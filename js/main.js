// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyANyGabriDjTtXuVYCb_JaQKn9Ip8Npu84",
//   authDomain: "todolist-project-01.firebaseapp.com",
//   projectId: "todolist-project-01",
//   storageBucket: "todolist-project-01.appspot.com",
//   messagingSenderId: "445904653649",
//   appId: "1:445904653649:web:6fed25ca290bac3b9f9770",
//   measurementId: "G-0PF5GQJW5L"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

let chooseCategory = document.querySelector('.choose-category');
const inputTask = document.getElementById("input-task");
const listContainer1 = document.getElementById("list-container-1");
const listContainer2 = document.getElementById("list-container-2");
const listContainer3 = document.getElementById("list-container-3");
const addButton = document.querySelector(".material-symbols-outlined");
let titleDate = document.querySelector('.title');
let clickCount = 0;

//제목에 날짜 표기
let date = new Date();
let month;
if (date.getMonth() + 1 < 10) {
  month = '0' + (date.getMonth() + 1)
} else {
  month = date.getMonth() + 1;
}
titleDate.innerText = `${date.getFullYear().toFixed().slice(2)}.${month}.${date.getDate()}`

//카테고리 선택
chooseCategory.addEventListener('click', function () {
  clickCount++;

  switch (clickCount % 3) {
    case 1:
      chooseCategory.innerText = "🎃"
      break;
    case 2:
      chooseCategory.innerText = "🏆"
      break;
    case 0:
      chooseCategory.innerText = "👻"
      break;
  }
})

//할일 추가히기1 : add 버튼 클릭 시 작동
addButton.addEventListener('click', Add)
//할일 추가하기 2: Enter키 누를 시 작동
inputTask.addEventListener('keydown', event => {
  //영어가 아닐 땐 isComposing 속성을 이용한 설정 필요.
  if (event.key === 'Enter' && !event.isComposing) {
    Add()
  }
})

//다한 일 체크하기 및 x표 눌러서 삭제하기
listContainer1.addEventListener("click", checkAndRemove, false)
listContainer2.addEventListener("click", checkAndRemove, false)
listContainer3.addEventListener("click", checkAndRemove, false)

//할일 추가하기 함수
function Add() {
  let li = document.createElement("li");
  li.innerHTML = inputTask.value;
  if (inputTask.value === '') {
    shake();
  } else {
    if (clickCount % 3 === 1 || clickCount === 0) {
      listContainer1.appendChild(li);
    } else if (clickCount % 3 === 2) {
      listContainer2.appendChild(li);
    } else {
      listContainer3.appendChild(li);
    }

    let editbtn = document.createElement("span");
    editbtn.innerHTML = "✎";
    li.appendChild(editbtn);

    let deletebtn = document.createElement("span");
    deletebtn.innerHTML = "\u00d7";
    li.appendChild(deletebtn);
  }
  inputTask.value = "";
  saveData();
}

//데이터 저장하기
function saveData() {
  localStorage.setItem("data1", listContainer1.innerHTML);
  localStorage.setItem("data2", listContainer2.innerHTML);
  localStorage.setItem("data3", listContainer3.innerHTML);
}
//데이터 불러오기
function showTask() {
  listContainer1.innerHTML = localStorage.getItem("data1");
  listContainer2.innerHTML = localStorage.getItem("data2");
  listContainer3.innerHTML = localStorage.getItem("data3");
}
showTask();

function shake() {
  inputTask.classList.add("shake");
  setTimeout(() => {
    inputTask.classList.remove("shake")
  }, 1000)
}

function checkAndRemove(e) {
  console.log(e)
  console.log(e.target)
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
  else if (e.target.outerText === "\u00d7") {
    e.target.parentElement.remove();
    saveData();
  }else if (e.target.outerText === "✎"){
    //li.innerHTML 삭제 내용 추가
    //그자리에 input을 새로 만들어줌 prepend로 앞에 추가.
    let newInput = document.createElement("input");
    //enter키 누를 시에 input에 들어온 값을 innerHTML로 저장 + input창 삭제
  }
}

