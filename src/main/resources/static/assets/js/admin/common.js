$(function(){

  let tabBtn = $('.list-tab li');
  let popBtn = $('.pop-open');
  let closeBtn = $('.pop-close');
  let popCnt = $('.pop-wrap');
  let _dim = $('.dim');

  $(document).on('click', '#chk_all', function(e){
    let _this = $(this);
    let checkCnt = _this.parents('table').find($('input[type="checkbox"]'));

    if(_this.is(':checked')) {
      checkCnt.prop('checked', true);
    } else {
      checkCnt.prop('checked', false);
    }
  })

  function tabControl(){
    let _this = $(this);
    let _idx = _this.index();

    _this.siblings('li').removeClass('active');
    _this.addClass('active');
    _this.parents('.list-tab').siblings('.list-cnt').removeClass('on');
    _this.parents('.list-tab').siblings('.list-cnt').eq(_idx).addClass('on');

  }

  function popOpen(){
    let pop = $(this).data('name');
    
    $('html, body').css({'height':'100%', 'overflow':'hidden'})
    $(".pop-wrap[data-name='" + pop + "']").addClass('on');
    _dim.addClass('active');
  }

  function popClose(){
    $('html, body').css({'height':'auto', 'overflow':'auto'})
    popCnt.removeClass('on');
    _dim.removeClass('active');
  }

  tabBtn.on('click', tabControl);
  popBtn.on('click', popOpen);
  closeBtn.on('click', popClose);



  var dragSrcEl = null;

  function handleDragStart(e) {
    // Target (this) element is the source node.
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);


  }
  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }
    this.classList.add('over');

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
  }

  function handleDragEnter(e) {
    // this / e.target is the current hover target.
  }

  function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  }

  function handleDrop(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
      // Set the source column's HTML to the HTML of the column we dropped on.
      //alert(this.outerHTML);
      //dragSrcEl.innerHTML = this.innerHTML;
      //this.innerHTML = e.dataTransfer.getData('text/html');
      this.parentNode.removeChild(dragSrcEl);
      var dropHTML = e.dataTransfer.getData('text/html');
      this.insertAdjacentHTML('beforebegin',dropHTML);
      var dropElem = this.previousSibling;
      addDnDHandlers(dropElem);
      
    }
    this.classList.remove('over');
    return false;
  }

  function handleDragEnd(e) {
    // this/e.target is the source node.
    this.classList.remove('over');

    /*[].forEach.call(cols, function (col) {
      col.classList.remove('over');
    });*/
  }

  function addDnDHandlers(elem) {
    elem.addEventListener('dragstart', handleDragStart, false);
    elem.addEventListener('dragenter', handleDragEnter, false)
    elem.addEventListener('dragover', handleDragOver, false);
    elem.addEventListener('dragleave', handleDragLeave, false);
    elem.addEventListener('drop', handleDrop, false);
    elem.addEventListener('dragend', handleDragEnd, false);

  }

  var cols = document.querySelectorAll('#columns .column');
  [].forEach.call(cols, addDnDHandlers);


})