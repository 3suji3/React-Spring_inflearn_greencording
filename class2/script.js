const screen = document.getElementById("screen"); //태그 여러개를 리스트 형태로 담아서 변수로 담음
const buttons = document.querySelectorAll("button");

const operatorRegex = /^(\d+|\*\*|[+\-*/])$/;
const numberRegex = /[0-9]/g;

//input 태그 화면에 숫자 또는 연산자를 추가하는 함수
function appendToScreen(value) {
  screen.value += value;
}

//화면 초기화 함수
function clearScreen(){
  screen.value = "";
}

//연산 수행 함수
function calculate(operator, numbers){
  const [num1, num2] = numbers.map(Number);
  //numbers에다가 배열로 된 데이터들을 넣을거임. (숫자와연산자.)
  switch(operator){
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num2 !== 0 ? num1 / num2 : "Error";
    default:
      return "";
  }
}

//버튼 클릭 시 동작 처리 함수
function handleButtonClick(event){
  event.preventDefault();
  //새로고침 방지
  const buttonText = event.target.innerText;

  if(numberRegex.test(buttonText) == true){
    appendToScreen(buttonText);
  }else if(operatorRegex.test(buttonText) == true){
    appendToScreen(buttonText);
  }
}

//버튼 클릭 이벤트 리스너 등록 함수
function initializeButtonListeners(){
  buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClick);
  })
}

//"=" 버튼 클릭 시 계산 결과를 화면에 표시
function handleResultClick(){
  const screenValue = screen.value;

  if(screenValue.includes("+")){
    const [num1, num2] = screenValue.split("+");
    screen.value = calculate("+",[num1, num2]);
  } else if(screenValue.includes("-")){
    const [num1, num2] = screenValue.split("-");
    screen.value = calculate("-",[num1, num2]);
  } else if(screenValue.includes("*")){
    const [num1, num2] = screenValue.split("*");
    screen.value = calculate("*",[num1, num2]);
  } else if(screenValue.includes("/")){
    const [num1, num2] = screenValue.split("/");
    screen.value = calculate("/",[num1, num2]);
  }
}

//초기화 버튼 클릭 시 화면 초기화
document.getElementById("resetButton").addEventListener("click",function() {
  clearScreen();
});

//"="버튼 클릭 시 계산 실행
document.getElementById("result").addEventListener("click", handleResultClick)

//계산기 기능 실행
initializeButtonListeners();