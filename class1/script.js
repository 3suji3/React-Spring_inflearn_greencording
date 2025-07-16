const wrapperBox = document.getElementById("wrapper");
// console.log(wrapperBox);
const inputFieldGroup = document.getElementsByClassName("inputGroup");
// console.log(`inputFieldGroup=${inputFieldGroup}`);
const allInputs = document.querySelector("input");
const userNickname = document.getElementById("nickname");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const userPhone = document.getElementById("phone");
const registrationForm = document.getElementById("registrationForm");

const updateHelperText = (input, message, isValid) => {
  const inputGroup = input.parentElement;
  console.log(userEmail.parentElement);
  //한개의 input태그의 부모 태그에 접근하는 것
  //예시로 input태그를 userEmail로 접근하였다고 하면 아래 태그들의 최상위태그를 의미한다.
  const helperText = inputGroup.getElementsByClassName("helperText")[0];
  // => 알림
  if(isValid == true) {
    // isValid에는 boolean데이터 true/false가 들어가게끔 만든다
    inputGroup.classList.remove('invalid');
    inputGroup.classList.add('valid');
    helperText.style.visibility = 'hidden';
  }
  if(isValid == false){
    inputGroup.classList.remove('valid');
    inputGroup.classList.add('invalid');
    helperText.style.visibility = 'visible';
    helperText.innerText = message;
  }

}




