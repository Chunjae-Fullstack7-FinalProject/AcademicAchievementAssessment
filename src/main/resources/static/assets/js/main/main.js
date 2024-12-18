$(function(){
  
    // notice swiper
    var swiper = new Swiper(".mySwiper", {
      direction: "vertical",
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  
  
    // tab
    let tabBtn = $('.tab-btn a');
    let tabCnt = $('.tab-cnt')
  
    function tabOpen(){
      let _this = $(this);
      let _idx = $(this).parents('li').index();
  
      $('.tab-btn li').removeClass('on');
      _this.parents('li').addClass('on');
  
      tabCnt.removeClass('on');
      tabCnt.eq(_idx).addClass('on');
    }
  
    tabBtn.on('click', tabOpen)
  
  
    //popup
    $( "#popup01" ).dialog({
      title: '공지사항',
      modal: true,
      width: '700',
      height: '680',
      autoOpen: false,
      resizable: false
    });
  
    $( "#modalBtn01" ).on( "click", function() {
      $( "#popup01" ).dialog( "open" );
    });
  
    $( "#popup02" ).dialog({
      title: 'CBT 대표유형 정답 안내',
      modal: true,
      width: '700',
      height: '680',
      autoOpen: false,
      resizable: false
    });
  
    $( "#modalBtn02" ).on( "click", function() {
      $( "#popup02" ).dialog( "open" );
    });
  
  })
  
  
  function choiceCbt(schoolLevel){
      const schoolLevelText = document.querySelector('ul.tab-btn > li.on').innerText;
      if(schoolLevelText === '고등'){
        schoolLevel = 'SL03';
      }else if(schoolLevelText === '중등'){
        schoolLevel = 'SL02';
      }else {
        schoolLevel = 'SL01';
      }
      location.href = `/user/exam/user-exam-cbt?school_level=${schoolLevel}`;
  }
  
  function choiceExam(schoolLevel,year,examRound) {
  
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
      ]
      return mobileRegex.some(mobile => agent.match(mobile))
    }
  
    const isMobile = detectMobileDevice(window.navigator.userAgent)
  
    if(isMobile){
      alert("본 화면은 PC에 최적화 되어 있습니다.\nPC로 접속하면 더욱 편리하게\n이용할 수 있습니다.");
    }