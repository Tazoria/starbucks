const searchEl = document.querySelector('.search'); // document 객체는 html 자체를 의미. html전체에서 search 클래스 찾기
const searchInputEl = searchEl.querySelector('input'); // search클래스 내에서 input요소 찾기

searchEl.addEventListener('click', function() {
  //Logic..
  searchInputEl.focus(); // focus()는 input처럼 포커스 가능한 요소에다가 focus를 강제적용.
})

searchInputEl.addEventListener('focus', function() {
  searchEl.classList.add('focused'); // focused 클래스가 추가되면 css를 통해서 선택자가 추가가 됐을 때 스타일변경가능
  searchInputEl.setAttribute('placeholder', '통합검색'); // 해당객체에 html의 속성을 지정
});

searchInputEl.addEventListener('blur', function() {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();