const screen = document.getElementById("screen"); //태그 여러개를 리스트 형태로 담아서 변수로 담음
const button = document.querySelectorAll("button");

let currentInput = "";

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