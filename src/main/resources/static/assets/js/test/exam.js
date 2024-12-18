const enterFullscreenBtn = document.querySelector('.enterFullscreenBtn')
const container = document.querySelector('.wrap')
enterFullscreenBtn.addEventListener('click', e => {
    fullscreen(container)
})
const fullscreen = element => {
    if (element.requestFullscreen) return element.requestFullscreen()
    if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen()
    if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
    if (element.msRequestFullscreen) return element.msRequestFullscreen()
}


$(function(){
    var swiper = new Swiper(".mySwiper", {
        allowTouchMove: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
    });

    var nowIndex;

    swiper.on('transitionEnd', function(idx){
        nowIndex = swiper.realIndex
        let $canvas;
        let context;

        $('.drawing-btn').on('click', function(){
            $canvas = $('.swiper-slide ').eq(nowIndex).find($('.sketchpad'));
            context = $canvas[0].getContext('2d');
            let color = $('#ECD13F');
            let lastEvent,
                mousedown = false;

            $canvas
                .mousedown(function (event) {
                    lastEvent = event;
                    mousedown = true;
                })
                .mousemove(function (event) {
                    if (mousedown) {
                        // Draw lines
                        context.beginPath();
                        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
                        context.lineTo(event.offsetX, event.offsetY);
                        context.strokeStyle = 'rgba(255,255,0, 0.2)';
                        context.stroke();
                        context.lineWidth = 22;
                        lastEvent = event;
                    }
                })
                .mouseup(function (event) {
                    mousedown = false;
                })

                .mouseleave(function (event) {
                    mousedown = false;
                });

            _this.toggleClass('active');

            if(_this.hasClass('active')) {
                clearBtn.show('slide', 400);
                $canvas.show();
                $('.sketchpad').removeClass('disabled');
            } else {
                clearBtn.hide('slide', 400);
                context.clearRect(0, 0, 1260, 1216);
                $canvas.hide();
                $('.sketchpad').addClass('disabled');
            }

        })

        $('.clear-btn').on('click', function(){
            context.clearRect(0, 0, 1260, 1216);
        })
    })

    // drag and drop
    let txt;
    $('.drag').on({
        //드래그 시작시 요소 id 저장
        'dragstart':function(e){
            txt = $(this).text();
            $(this).css('border','solid 1px #ccc');
        },
        //드래그 종료
        'dragend':function(e){

            // let name = $('.drop.on').find('span').text();
            // $(".drag[data-name='" + name + "']").css('opacity', '0.5')

            let name = $(this).data('name');
            $(".drag[data-name='" + name + "']").css('opacity', '0.5')

            console.log(name)

        }
    });

    $('.drop').on({
        'dragenter':function(e){

        },
        //브라우저 표중 동작 취소
        'dragover':function(e){
            e.preventDefault();
        },
        'drop':function(e){
            $(this).append('<span class="txt">' + txt + '</span>')
            e.preventDefault();
            let num = $(this).find('span').length;
            let name = $(this).find('span').text();

            $(this).addClass('on')

            if(num > 1) {
                let text = $(this).find('span:first-child()').text();
                $(this).find('span:first-child()').remove();
                $(".drag[data-name='" + text + "']").css('opacity', '1')
            }

            $(this).on('click', function(){
                let text = $(this).find('span').text();
                let _idx = $(this).find('span').parents('.drop').index();
                $(this).find('span').remove();
                $(".drag[data-name='" + text + "']").css('opacity', '1')


                $(this).removeClass('on')
            })
        }
    });

    $('svg g').on('click', function(){
        $(this).toggleClass('on');
    })

    //tab
    $('.tab-btn a').on('click', function(){
        let _this = $(this)
        let _idx = $(this).index();

        $('.tab-btn a').removeClass('on');
        $(this).addClass('on');

        $('.tab-cnt .cnt').removeClass('on');
        $('.tab-cnt .cnt').eq(_idx).addClass('on');
    })

    //line
    let btn = $('.btn');
    let leftBtn = $('.left');
    let rightBtn = $('.right');
    let line = $('line')
    let x1, y1, x2, y2;


    leftBtn.on('click', function(e){
        let _this = $(this);
        x1 = _this.position().left;
        y1 = _this.position().top + 10;

    })

    rightBtn.on('click', function(e){
        let _this = $(this);
        let _idx = _this.index();

        x2 = _this.position().left - 20;
        y2 = _this.position().top + 10;


    })

    btn.on('click', function(){
        $(this).siblings('.btn').removeClass('active');
        $(this).toggleClass('active')

        if($('.left.active').length == 1 && $('.right.active').length == 1){
            $('svg').append('<line x1=' + x1 + ' y1=' + y1 + ' x2=' + x2 + ' y2=' + y2 + '></line>');
            $(".drawline-wrap").html($(".drawline-wrap").html());
            $('.left , .right').removeClass('active')
        }
    })

    $('body').on('click', 'line', function(){
        let _this = $(this);

        _this.remove();
    })

    //popup
    let popBtn = $('.pop-btn');
    let popCnt = $('.pop-memo');
    let closeBtn = $('.pop-close');
    let drawingBtn = $('.drawing-btn');
    let clearBtn = $('.clear-btn')
    let page = $('.swiper-pagination-bullet');
    let $canvas = $('.sketchpad');
    let context = $canvas[0].getContext('2d');


    function popOpen(){
        let _this = $(this);
        _this.toggleClass('active');

        if(_this.hasClass('active')) {
            popCnt.show();
        } else {
            popCnt.hide();
        }

    }

    function popClose(){
        popCnt.hide();
        popBtn.removeClass('active');
    }

    function canvasOpen(){
        let _this = $(this);
        //canvas2
        let color = $('#ECD13F');
        let lastEvent,
            mousedown = false;


        $canvas
            .mousedown(function (event) {

                lastEvent = event;
                mousedown = true;
            })
            .mousemove(function (event) {
                if (mousedown) {
                    // Draw lines
                    context.beginPath();
                    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
                    context.lineTo(event.offsetX, event.offsetY);
                    context.strokeStyle = 'rgba(255,255,0, 0.2)';
                    context.stroke();
                    context.lineWidth = 22;

                    lastEvent = event;
                }
            })
            .mouseup(function (event) {
                mousedown = false;


            })
            .mouseleave(function (event) {
                mousedown = false;
            });

        _this.toggleClass('active');

        if(_this.hasClass('active')) {
            clearBtn.show('slide', 400);
            $canvas.show();
            $('.sketchpad').removeClass('disabled');
        } else {
            clearBtn.hide('slide', 400);
            $canvas.hide();
            $('.sketchpad').addClass('disabled');
        }


    }

    function canvasClear(){
        context.clearRect(0, 0, 1260, 1216);
    }

    function canvasIng(){
        if(drawingBtn.hasClass('active')) {
            let _this = $(this)
            let _idx = $(this).index();
            $canvas = $('.swiper-slide').eq(_idx).find('.sketchpad');
            context = $canvas[0].getContext('2d');
            $('.swiper-slide').find($canvas).hide();
            $('.swiper-slide').eq(_idx).find($canvas).show();
        }
    }

    popBtn.on('click', popOpen)
    closeBtn.on('click', popClose)
    drawingBtn.on('click', canvasOpen)
    clearBtn.on('click', canvasClear)
    page.on('click', canvasIng)


})

// canvas
$(document).ready(function(){
    var drawCanvas = document.getElementById('drawCanvas');
    var drawBackup = new Array();
    if (typeof drawCanvas.getContext == 'function') {
        var ctx = drawCanvas.getContext('2d');
        var isDraw = false;
        var width = $('#width').val();
        var color = $('#color').val();
        var pDraw = $('#drawCanvas').offset();
        var currP = null;

        $('#width').bind('change', function(){ width = $('#width').val(); });
        $('#color').bind('change', function(){ color = $('#color').val(); });

        // 저장된 이미지 호출
        if (localStorage['imgCanvas']) {
            loadImage();
        } else {
            ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        }

        // Event (마우스)
        $('#drawCanvas').bind('mousedown', function(e) {
            if (e.button===0) {
                saveCanvas();
                e.preventDefault();
                ctx.beginPath();
                isDraw = true;
            }
        });
        $('#drawCanvas').bind('mousemove', function(e) {
            var event = e.originalEvent;
            e.preventDefault();
            currP = { X:event.offsetX, Y:event.offsetY };
            if(isDraw) draw_line(currP);
        });
        $('#drawCanvas').bind('mouseup', function(e) {
            e.preventDefault();
            isDraw = false;
        });
        $('#drawCanvas').bind('mouseleave', function(e) {
            isDraw = false;
        });

        // Event (터치스크린)
        $('#drawCanvas').bind('touchstart', function(e) {
            saveCanvas();
            e.preventDefault();
            ctx.beginPath();
        });
        $('#drawCanvas').bind('touchmove', function(e) {
            var event = e.originalEvent;
            e.preventDefault();
            currP = { X:event.touches[0].pageX-pDraw.left, Y:event.touches[0].pageY-pDraw.top };
            draw_line(currP);
        });
        $('#drawCanvas').bind('touchend', function(e) {
            e.preventDefault();
        });

        // 선 그리기
        function draw_line(p) {
            ctx.lineWidth = width;
            ctx.lineCap = 'round';
            ctx.lineTo(p.X, p.Y);
            ctx.moveTo(p.X, p.Y);
            ctx.strokeStyle = color;
            ctx.stroke();
        }

        function loadImage() { // reload from localStorage
            var img = new Image();
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
            }
            img.src = localStorage.getItem('imgCanvas');
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
            ctx.beginPath();
            localStorage.removeItem('imgCanvas');
        }

        function saveCanvas() {
            drawBackup.push(ctx.getImageData(0, 0, drawCanvas.width, drawCanvas.height));
        }

        $('#btnClea').click(function() {
            clearCanvas();
        });

    }

    $('svg line').on('click', function(){
        $(this).remove();
    })

});
