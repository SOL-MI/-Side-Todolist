const moonPath = "M 27.5 0 C 34.791 0 41.79 2.899 46.945 8.055 C 33.991 9.89 26.93 20.209 26.93 27.5 C 26.93 34.791 33.689 45.261 46.945 46.945 C 41.79 52.101 34.791 55 27.5 55 C 20.209 55 13.21 52.101 8.055 46.945 C 2.899 41.79 0 34.791 0 27.5 C 0 20.209 2.899 13.21 8.055 8.055 C 13.21 2.899 20.209 0 27.5 0 Z";
const sunPath = "M 27.5 0 C 34.791 0 41.79 2.899 46.945 8.055 C 52.101 13.21 55 20.209 55 27.5 C 55 34.791 52.101 41.79 46.945 46.945 C 41.79 52.101 34.791 55 27.5 55 C 20.209 55 13.21 52.101 8.055 46.945 C 2.899 41.79 0 34.791 0 27.5 C 0 20.209 2.899 13.21 8.055 8.055 C 13.21 2.899 20.209 0 27.5 0 Z";
const darkMode = document.querySelector("#dark_mode");
const container = document.querySelector(".container");
const moon = document.querySelector(".moon");
let toggle = false;

//toggle에 대해 저장된 정보 불러오기
darkmodeLoadData();
console.log(toggle);

//만약 다크모드 상태로 마쳤었다면 if문 진행
if (toggle) {
  //배경
  container.style.background = 'linear-gradient(0deg, #96ADFF, #FFEBCE)';

  //달. DOM 값 업데이트
  moon.setAttribute('d', moonPath);
  darkMode.style.transform = 'rotate(320deg)';

}

//클릭이벤트
darkMode.addEventListener("click", () => {
  //anime.js
  //여기에 타임라인을 더한다
  const timeline = anime.timeline({
    duration: 1000,
    easing: "easeOutExpo"
  });
  //add 다른 애니메이션
  timeline
    .add({
      targets: ".moon",
      d: [{ value: toggle ? sunPath : moonPath }], //moonPath ->sunpath
    }, "+=400")
    .add({
      targets: '#dark_mode',
      rotate: toggle ? 0 : 320
    }, "-=300")
    .add({
      targets: ".container",
      background: toggle ? 'linear-gradient(0deg, #FFEBCE, #EEFFF8)' : 'linear-gradient(0deg, #96ADFF, #FFEBCE)',
    }, "0");


  if (!toggle) {
    toggle = true;
    darkmodeSaveData();
  } else {
    toggle = false;
    darkmodeSaveData();
  }
});

//toggle 정보 저장 함수
function darkmodeSaveData() {
  localStorage.setItem('toggle', JSON.stringify(toggle || false));
}
//toggle 정보 불러오기 함수
function darkmodeLoadData() {
  toggle = JSON.parse(localStorage.getItem('toggle'));
}
