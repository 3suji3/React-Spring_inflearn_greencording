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

};

const checkEmptyInput = (input) => {
  if(input.value.trim() === ""){
    //인풋입력칸에 입력한 문자열중 띄어쓰기를 없애는 기능
    updateHelperText(input, '값을 입력해주세요.', false);
    return false;
  } else{
    //입력이 있으면 도움말을 지움
    updateHelperText(input,"",true);
    return true;
  }
}

//이메일형식이 올바른지 확인하는 함수
//이메일 주소가 규칙에 맞게 작성되었는지 확인하는 것
const validateEmailFormat = (input) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  if(emailPattern.test(input.value.trim()) == true){
    updateHelperText(input,"",true);
    return true
  } else{
    updateHelperText(input,"유효한 이메일 주소를 입력부탁드립니다.",false);
    return false;
  }
}

const checkPasswordStrength = (password) => {
  const stringPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
  if(stringPattern.test(password.value) == true) {
    updateHelperText(password,"비밀번호 강도: 강함", true);
    return true;
  } else{
    updateHelperText(password, "비밀번호는 8자 이상이어야하며 대문자, 소문자, 특수문자를 포함해야합니다.",false);
    return false;
  }
}

const validatePasswordMatch = (passwordInput, confirmInput) => {
  if(passwordInput.value !== confirmInput.value){
    updateHelperText(confirmInput,"비밀번호가 일치하지 않습니다.",false);
    return false;
  } else{
    updateHelperText(confirmInput,"",true);
    return true;
  }
}

const validatePhoneNumber = (input) => {
  const phonePattern = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  if(phonePattern.test(input.value.trim())){
    updateHelperText(input,"",true);
    return true;
  }else{
    updateHelperText(input, "유효한 전화번호를 입력해주세요.(예:010-1234-5678)",false);
    return false;
  }
}

const validateForm = () => {
  //boolean값으로 에러검사시 문제가 없으면 true를 값으로 가지고 있으면 false를 값으로 가진다.
  const isNicknameValid = checkEmptyInput(userNickname);
  const isEmailValid = validateEmailFormat(userEmail);
  const isPasswordStrong = checkPasswordStrength(userPassword);
  const isPasswordMatch = validatePasswordMatch(userPassword, confirmPassword);
  const isPhoneValid = validatePhoneNumber(userPhone);

  //모든 검사를 해서 모든 검사가 통과해야 회원가입버튼을 눌렀을 떄 회원가입이 진행되게끔
  return isNicknameValid&&isEmailValid&&isPasswordMatch&&isPasswordStrong&&isPhoneValid;
}

registrationForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(validateForm()==true){
    console.log("모든 필드가 유효합니다. 즉 사용이 가능합니다.");
  } else {
    console.log("위 필드중 일부분이 에러가 터집니다. 유효성 검사 실패")
  }
  console.log(e);
})

document.querySelectorAll('input').forEach(input =>{
  //forEach는 배열안의 데이터를 각각 뽑아오고 싶을 때 이용
  input.addEventListener('input',()=>{
    switch(input.id){
      case 'nickname':
        checkEmptyInput(input);
        break;
      case 'email':
        validateEmailFormat(input);
        break;
      case 'userPassword':
        checkPasswordStrength(input);
        break;
      case 'confirmPassword':
        validatePasswordMatch(userPassword, confirmPassword);
        break;
      case 'phone':
        validatePhoneNumber(input);
        break;
    }
  })
})




