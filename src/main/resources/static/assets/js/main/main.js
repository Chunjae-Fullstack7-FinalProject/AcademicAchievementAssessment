document.addEventListener('DOMContentLoaded', function() {

  // notice swiper
  var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // tab
  let tabBtn = document.querySelectorAll('.tab-btn a');
  let tabCnt = document.querySelectorAll('.tab-cnt');

  function tabOpen(event) {
    let _this = event.currentTarget;
    let _idx = Array.from(_this.closest('ul').children).indexOf(_this.closest('li'));

    document.querySelectorAll('.tab-btn li').forEach(li => li.classList.remove('on'));
    _this.closest('li').classList.add('on');

    tabCnt.forEach(cnt => cnt.classList.remove('on'));
    tabCnt[_idx].classList.add('on');
  }

  tabBtn.forEach(btn => btn.addEventListener('click', tabOpen));

  // popup
  function openDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    dialog.showModal();
  }

  document.getElementById("modalBtn01").addEventListener("click", function() {
    openDialog("popup01");
  });

  document.getElementById("modalBtn02").addEventListener("click", function() {
    openDialog("popup02");
  });

  // Initialize dialogs
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.setAttribute('open', false);
    dialog.setAttribute('style', 'width: 700px; height: 680px;');
  });

});

function choiceCbt(schoolLevel) {
  const schoolLevelText = document.querySelector('ul.tab-btn > li.on').innerText;
  if (schoolLevelText === '고등') {
    schoolLevel = 'SL03';
  } else if (schoolLevelText === '중등') {
    schoolLevel = 'SL02';
  } else {
    schoolLevel = 'SL01';
  }
  location.href = `/user/exam/user-exam-cbt?school_level=${schoolLevel}`;
}

function choiceExam(schoolLevel, year, examRound) {
  if (document.querySelector('ul.tab-btn > li.on') === null) {
    location.href = `/user/exam/user-exam-subject`;
  }
  const schoolLevelText = document.querySelector('ul.tab-btn > li.on').innerText;
  if (schoolLevelText === '고등') {
    schoolLevel = 'SL03';
  } else if (schoolLevelText === '중등') {
    schoolLevel = 'SL02';
  } else {
    schoolLevel = 'SL01';
  }
  location.href = `/user/exam/user-exam-subject?&exam_round=${examRound}&year=${year}`;
}

// 안드로이드, 아이폰 환경에서만 alert
function detectMobileDevice(agent) {
  const mobileRegex = [
    /Android/i,
    /iPhone/i,
  ];
  return mobileRegex.some(mobile => agent.match(mobile));
}

const isMobile = detectMobileDevice(window.navigator.userAgent);

if (isMobile) {
  alert("본 화면은 PC에 최적화 되어 있습니다.\nPC로 접속하면 더욱 편리하게\n이용할 수 있습니다.");
}