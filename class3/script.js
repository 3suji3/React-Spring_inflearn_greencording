const quoteDisplayArea = document.querySelector('#quoteContainer');
const currentQuote = document.querySelector('#quote');
const loadingSpinner = document.getElementById('loader');
const favoriteQuoteList = document.getElementById('quotePick');
const nextQuoteButton = document.getElementById('nextQuote');
const saveQuoteButton = document.getElementById('selectQuote');

let currentQuoteText = "";
let isQuoteSaved = false;

function showLoadingSpinner(){
  loadingSpinner.style.display="block";
  quoteDisplayArea.style.display="none";
}

function hideLoadingSpinner(){
  loadingSpinner.style.display="none";
  quoteDisplayArea.style.display='block';
}

//한국어 명언 API 호출 및 명언 가져오는 함수
async function fetchKoreaQuotes(){
  showLoadingSpinner();
  const apiUrl = "https://korean-advice-open-api.vercel.app/api/advice"
  try {
    //명언 가져오기
    const response = await fetch(apiUrl);
    const data = await response.json();
    currentQuoteText = data.message;

    //명언을 화면에 표시
    currentQuote.innerText = currentQuoteText;
    localStorage.setItem("currentQuote", currentQuoteText);
    isQuoteSaved = false;
  } catch(error){
    console.error(`에러발생:${error}`);
    currentQuote.innerText="명언을 불러올 수 없습니다🥹"
  }
  hideLoadingSpinner();
}

//명언을 즐겨찾기 리스트에 추가
function saveFavoriteQuote(){
  const storedQuote = localStorage.getItem("currentQuote");

  if(isQuoteSaved === false && storedQuote !== null && !isQuoteAlreadyInList(storedQuote)){
    const listItem = document.createElement("li");
    //<li></li>
    listItem.innerText = storedQuote;
    //<li>명언~~</li>
    favoriteQuoteList.appendChild(listItem);
    isQuoteSaved = true; //명언 저장되었음을 표시
  } else if(isQuoteSaved == true){
    alert("이 명언은 이미 저장되었습니다.");
  } else{
    alert("이 명언은 이미 즐겨찾기에 추가되었습니다.")
  }
}

function isQuoteAlreadyInList(quote){
  const listItems = favoriteQuoteList.getElementsByTagName("li");
  for(item of listItems){
    if(item.innerText === quote){
      return true;
      //데이터가 이미 존재하는 경우 더이상 중복 데이터가 저장되면 안됨 
    }
  }
  return false;
}

//다음 버튼 클릭 시 새로운 명언 생성
nextQuoteButton.addEventListener("click", fetchKoreaQuotes);
//선택 버튼 클릭 시 명언을 즐겨찾기에 추가
saveQuoteButton.addEventListener("click", saveFavoriteQuote);

//페이지 로드시 첫 명언 호출
fetchKoreaQuotes();