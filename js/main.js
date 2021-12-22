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

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

// window 객체: 브라우저 창(우리가 보고있는 화면 자체.)
/* lodash.js의 throattle 함수 : _.throttle(함수, 시간(밀리세컨드단위))
  화면을 스크롤할 때 함수가 수백개 실행되는 것을
  설정한 시간 단위로 부하를 줘서 함수가 과하게 실행되는 것을 막음.
  특히 스크롤 이벤트를 통해 어떤 작업이 수행될 때 많이 사용됨. */
window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  /* window의 srollY속성:
  스크롤할때마다 scrollY속성값이 갱신되어 지금 보는 화면이 위에서 몇 픽셀에 위치하는지
  알 수 있음. */
  if (window.scrollY > 500) {
    
    // 배지숨기기 및 보이기는 css속성만으로도 충분히 표현가능하나 gsap으로 좀더 예쁘게!
    /* gsap: js 애니메이션을 처리해주는 라이브러리(사이트 만들때 굉장히 많이 사용)
      gsap.to(요소, 지속시간, 애니메이션옵션) - 옵션은 주로 객체데이터 사용하며(css속성값들 이용)
      속성값중에 문자로 입력되는 부분은 따옴표 붙여주기! */
    gsap.to(badgeEl, .6, {
      /* opacity속성처럼 값을 숫자로 입력하는 속성들은 전환효과(transition 혹은 GSAP라이브리 등)를
        통해 요소의 전/후 상태를 중간 숫자의 값으로 자연스럽게 만들어 줄 수 있지만,
        display 속성처럼 값이 숫자가 아닌 속성은 전/후 상태의 중간값이 존재하지 않기 때문에
        자연스러운 전환 효과를 적용할 수 없음 */
      opacity: 0, // 0.6초에 걸쳐 badgeEl의 투명도가 점점 낮아짐.
      display: 'none' // 요기!
    });

    gsap.to(toTopEl, .2, {
      x: 0
    })
  } else {
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });

    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300)); //300: 0.3초이며 단위는 밀리세컨드(3000ms는 3초, 300ms는 0.3초)

// to-top버튼 누르면 최상단 이동
toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, // 0.7 1.4 2.1 2.8
    opacity: 1
  });
});

// new Swiper(인수(선택자), 옵션(객체데이터형))
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});
     

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true,
  loop: true,
  autoplay : {
    delay: 5000
  },

  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어
  },

  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion // isHidePromotion의 값을 반대로 설정!

  if (isHidePromotion) {
    promotionEl.classList.add('hide');
  }
  else {
    promotionEl.classList.remove('hide');
  }
})  

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    { // 옵션
      y: size,
      repeat: -1, // 무한반복
      yoyo: true, // 실행되기 이전의 모습으로 돌아가기
      ease: Power1.easeInOut,
      delay: random(0, delay) // 애니메이션 실행전에 딜레이 넣기
  })
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

/* scrollMagic js 라이브러리 : 감시하려는 몇가지 섹션에 대한 정보들을 입력하면
  특정한 세션이 화면에 보일때 애니메이션 추가
  감시하려고 하는 spyEl 요소 각각에 'scroll-spy'클래스를 붙여줌.
  (trigger: 뭔가 행위를 강제적으로 일으킴) */

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  /*Scene() : 스크롤매직 라이브러리를 통해 특정한 요소를 감시하는 옵션을 지정
    setClassToggle() : 클래스를 넣었다 뺐다(toggle) 지정해주는 메소드.
    addTo() : 스크롤매직 라이브러리가 필요한 컨트롤러 추가
  */
  
  /* 메소드 체이닝 깔끔하게 정리(줄바꿈+들여쓰기) */
    new ScrollMagic
      .Scene({
        triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
        triggerHook: .8 // 뷰포트의 0.8 지점 부분(상위 80%)에 triggerHook을 걸어놓고 해당요소가 hook에 걸리면 trigger실행
      })
      // 인수: 토글대상, 토글할 클래스 이름
      .setClassToggle(spyEl, 'show')
      // 추가한 옵션들을 내부 컨트롤러에 할당해서 실제로 동작이 이루어지도록 함.
      .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();
