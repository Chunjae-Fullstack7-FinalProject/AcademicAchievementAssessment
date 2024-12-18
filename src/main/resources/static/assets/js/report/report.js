class Report {
    constructor(props) {
        const {el} = props;
        this.el = el;
        this.render(props);
    }

    render(props) {
        this.request(props).then((data) => {
            if (data.result === true) {
                this.renderContents(data.data);
                //this.renderAdditionalElement(props);
                this.renderExplainText(data.data);
                this.renderCorrectAnswer(data.data);
            } else {
                alert('에러가 발생했습니다.');
            }
        });
    }

    async request(props) {
        const {itemId} = props;
        const data = fetch('/user/item/item-view?item_id=' + itemId, {
            method: 'GET',
        }).then((response) => {
            return response.json();
        });
        return data;
    }

    renderContents(data) {
        const {itemContents} = data;
        this.el.innerHTML = itemContents;
        const audioList = this.el.querySelectorAll('audio');
        audioList.forEach((item, index) => {
            item.controlsList.add('noplaybackrate');
            //item.style.pointerEvents = "none";
        });

        const videoList = this.el.querySelectorAll('video');
        videoList.forEach((item, index) => {
            item.controlsList.add('noplaybackrate');
            item.controlsList.add('nodownload');
            item.disablePictureInPicture = true;
        });



    }

    renderAdditionalElement(data) {
        const button = document.createElement('button');
        button.classList.add('btn-close');
        button.innerHTML = `<span class="hbar"></span><span class="hbar"></span><span class="hide-txt">닫기</span>`;
        button.addEventListener('click', function () {
            $('html, body').removeClass('h100');
            $('.popup').hide();
        });
        this.el.querySelector('.page').appendChild(button);
    }

    renderCorrectAnswer(props) {
        const slide = this.el;
        const {itemType, correctAnswer, correctAnswerHTML} = props;
        if (itemType === 'IT01') {
            inputRadio(slide, correctAnswer);
        } else if (itemType === 'IT02') {
            inputCheckbox(slide, correctAnswer);
        } else if (itemType === 'IT05') {
            inputMatching(slide, correctAnswer);
        } else if (itemType === 'IT09') {
            inputShortSentence(slide, correctAnswer);
        } else if (itemType === 'IT10') {
            inputLongSentence(slide, correctAnswer);
        } else if (itemType === 'TT03') {
            inputHotSpot(slide, correctAnswer);
        } else if (itemType === 'TT04') {
            inputSelect(slide, correctAnswer);
        } else if (itemType === 'TT07') {
            inputDragDrop(slide, correctAnswer);
        } else if (itemType === 'TT11') {
            inputEditError(slide, correctAnswer);
        } else if (itemType === 'IT12') {
            inputDuplicateShortSentence(slide, correctAnswer);
        } else if (itemType === 'IT11') {
            inputExpandChoice(slide, correctAnswer);
        } else if (itemType === 'IT13'){
            inputShortAndLongText(slide,correctAnswer);
        } else if (itemType === 'IT14'){
            inputHotSpotAndLongText(slide, correctAnswer);
        } else if (itemType === 'IT15'){
            inputHotSpotAndLongAndShortText(slide, correctAnswer);
        } else if (itemType === 'IT16'){
            inputDuplicatePullAndDropAnswer(slide, correctAnswer);
        } else if (itemType === 'IT17'){
            inputSocialInputAnswer(slide, correctAnswer);
        } else if (itemType === 'IT18'){
            inputDuplicateMultiSentence(slide, correctAnswer);
        }
    }

    renderExplainText(props) {
        const {itemExplainText} = props;
        this.el.querySelector('.page .inner').innerHTML += `<div id="commentary" class="commentary"><p class="tit">해설</p><span class="txt">${itemExplainText}</span></div>`;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "#commentary"]);
    }

}

function inputDuplicateMultiSentence(slide, correctAnswer) {
    const studentAnswer = correctAnswer;
    const radioButtons = slide.querySelectorAll('input[type=text]');
    const answerList = JSON.parse(studentAnswer).answer;
    radioButtons.forEach((item, index) => {
        item.value = answerList[index].split(',')[0];
    });
    $('input[type=text]').attr('readonly', true);
}

function inputRadio(slide, correctAnswer) {
    const studentAnswer = correctAnswer;
    const radioButtons = slide.querySelectorAll('input[type=radio]');
    const jsonAnswer = JSON.parse(studentAnswer);
    radioButtons.forEach((item, index) => {
        if (item.value === jsonAnswer.answer) {
            item.checked = true;
        }
    });
    $("input[type=radio]").attr('disabled', true);
}

function inputCheckbox(slide, correctAnswer) {
    const studentAnswer = correctAnswer;
    const radioButtons = slide.querySelectorAll('input[type=checkbox]');
    const answerList = JSON.parse(studentAnswer).answer;
    radioButtons.forEach((item, index) => {
        if (answerList.includes(item.value) === true) {
            item.checked = true;
        }
    });
    const buttonList = slide.querySelectorAll('button');
    buttonList.forEach((item, index) => {
        if (answerList.includes(index) === true) {
            item.classList.add('active');
        }
    });
    $("input[type=checkbox]").attr('disabled', true);
}

function inputShortSentence(slide, correctAnswer) {
    const studentAnswer = correctAnswer;
    const radioButtons = slide.querySelectorAll('input[type=text]');
    const answerList = JSON.parse(studentAnswer).answer;
    radioButtons.forEach((item, index) => {
        item.value = answerList[index];
    });
    const textAreaList = slide.querySelectorAll('textarea');
    textAreaList.forEach((item, index) => {
        item.value = answerList[index];
    });
    $('input[type=text]').attr('readonly', true);
    $('textarea').attr('readonly', true);
}

function inputLongSentence(slide, correctAnswer) {
    const studentAnswer = correctAnswer;
    const answerList = JSON.parse(studentAnswer).answer;

    // slide.querySelector('textarea').value = JSON.parse(studentAnswer).answer;
    // slide.querySelector('input[type=text]').value = JSON.parse(studentAnswer).answer;


    const textAreaList = slide.querySelectorAll('textarea');
    textAreaList.forEach((item, index) =>{
        item.value = answerList[index];
    });

    const textInput = slide.querySelectorAll('input[type=text]');
    textInput.forEach((item, index) => {
        item.value = answerList[index];
    });

    $('textarea').attr('readonly', true);
    $('input[type=text]').attr('readonly', true);
}

function inputMatching(slide, correctAnswer) {
    const formJoining = slide.querySelector('.form-joining');
    const column1 = formJoining.querySelector('#column1')
    const column2 = formJoining.querySelector('#column2')
    const leftArea = formJoining.querySelector('#leftarea')

    const imageColumn = column1.querySelectorAll('div');
    const textColumn = column2.querySelectorAll('div');

    const correctAnswerList = JSON.parse(correctAnswer).answer;

    const column1Left = $(column1).position().left;
    const column1Top = $(column1).position().top; // 80
    const column2Left = $(column2).position().left;
    const column2Top = $(column2).position().top;

    let tag ='';

    imageColumn.forEach((item, index) => {
        const itemId = $(item).children().attr('id');
        tag += '<svg style="position: absolute; z-index: 999; overflow: visible">';
        tag += '    <line id="line_'+itemId+'" style="stroke-width: 2; stroke: rgb(0,0,0)">';
        tag += '</svg>';  //1_1 //1_2 //1_3
    })

    $(leftArea).append(tag);

    correctAnswerList.forEach((item, index) => {
        const correctAnswerListLeft = item.left;
        const correctAnswerListRight = item.right;

        $('#'+correctAnswerListLeft).attr('line_num', correctAnswerListRight);
        $('#'+correctAnswerListLeft).addClass('finished');

        if (item.left.includes('1_')){
            $('#line_'+correctAnswerListLeft).attr('x1',$('#'+correctAnswerListLeft).position().left-column1Left)
            $('#line_'+correctAnswerListLeft).attr('y1',$('#'+correctAnswerListLeft).position().top-column1Top)
        }
        if (item.left.includes('2_')){

            const lineNum = $('#'+correctAnswerListRight).attr('line_num');

            $('#line_'+correctAnswerListRight).attr('x2',$('#'+lineNum).position().left-column1Left)  //1_2 //2_2
            $('#line_'+correctAnswerListRight).attr('y2',$('#'+lineNum).position().top-column2Top)
        }
    })

}

function inputDragDrop(slide, correctAnswer) {
    const studentAnswerList = JSON.parse(correctAnswer)["answer"];
    slide.querySelectorAll('.drop').forEach((item, index) => {
        if (studentAnswerList[index] !== undefined) {
            if ($(studentAnswerList[index]).prop("tagName") === 'IMG') {
                const imageSRC = $(studentAnswerList[index]).attr("src");
                slide.querySelectorAll('.drag').forEach((item, index) => {
                    if ($(item.querySelector('img')).attr("src") === imageSRC) {
                        item.innerHTML = '';
                    }
                });
            }
            item.innerHTML = studentAnswerList[index];
            item.classList.add('on');
        }
    });
}

function inputSelect(slide, correctAnswer) {
    let currentIndex = 0;
    const studentAnswer = JSON.parse(correctAnswer);
    const textInput = slide.querySelectorAll('select');
    textInput.forEach((item, index) => {
        item.value = studentAnswer.answer[index];
        currentIndex = index + 1;
    });
    const spanList = slide.querySelectorAll('span.selected');
    spanList.forEach((item, index) => {
        item.innerHTML = studentAnswer.answer[currentIndex + index];
    });
    $(".wrap select").attr('disabled', true);
}

function inputHotSpot(slide, correctAnswer) {
    const gList = slide.querySelectorAll('g');
    const list = JSON.parse(correctAnswer).answer;
    gList.forEach((item, index) => {
        if (list.includes(index + 1) === true) {
            item.classList.add('on');
        }
    });
}

function inputEditError(slide, correctAnswer) {
    const textInput = slide.querySelectorAll('input[type=text]');
    const list = JSON.parse(correctAnswer).answer;
    textInput.forEach((item, index) => {
        item.value = list[index];
    });
    $('input[type=text]').attr('readonly', true);
}

function inputDuplicateShortSentence(slide, correctAnswer) {
    console.log(correctAnswer)
    const textInputList = slide.querySelectorAll('input[type=text]');
    let textInput = textInputList[0];
    for(let i = 0; i < textInputList.length; i++) {
        const inputTag = textInputList[i];
        if(!inputTag.classList.contains("not-answer")) {
            textInput = inputTag;
            break;
        }
    }
    const textArea = slide.querySelector('textarea');
    const list = JSON.parse(correctAnswer).answer;
    if (textInput == null){
        textArea.value = list[0];
    }else {
        textInput.value = list[0];
    }
    $('textarea').attr('readonly', true);
    $('input[type=text]').attr('readonly', true);
}

function inputExpandChoice(slide, correctAnswer) {
    const answerList = JSON.parse(correctAnswer).answer;
    const gList = slide.querySelectorAll('g');
    const textArea = slide.querySelectorAll('textarea');
    let currentIndex = 0;
    gList.forEach((item, index) => {
        if (answerList.includes(index + 1) === true) {
            item.classList.add('on');
            currentIndex = currentIndex + 1;
        }
    });
    textArea.forEach((item, index) => {
        item.value = answerList[currentIndex];
    });
    $('textarea').attr('readonly', true);
}

function inputShortAndLongText(slide, correctAnswer){
    const answerList = JSON.parse(correctAnswer).answer;
    const areaAnswerList = JSON.parse(correctAnswer).textarea;
    const inputBox = slide.querySelectorAll('input[type=text]');
    inputBox.forEach((item, index) =>{
        item.value = answerList[index].split(',')[0];
    });

    const textAreaList = slide.querySelectorAll('textarea');

    textAreaList.forEach((item, index) =>{
        item.value = areaAnswerList;
    });

    $('textarea').attr('readonly', true);
    $('input[type=text]').attr('readonly', true);
}

function inputHotSpotAndLongText(slide, correctAnswer){
    const gList = slide.querySelectorAll('g');
    const list = JSON.parse(correctAnswer).answer;
    gList.forEach((item, index) => {
        if (list.includes(index + 1) === true) {
            item.classList.add('on');
        }
    });

    const areaAnswerList = JSON.parse(correctAnswer).textarea;
    const textAreaList = slide.querySelectorAll('textarea');

    textAreaList.forEach((item, index) =>{
        item.value = areaAnswerList;
    });

    $('textarea').attr('readonly', true);
    $('input[type=text]').attr('readonly', true);
}

function inputHotSpotAndLongAndShortText(slide, correctAnswer){
    const gList = slide.querySelectorAll('g');
    const list = JSON.parse(correctAnswer).answer;
    gList.forEach((item, index) => {
        if (list.includes(index + 1) === true) {
            item.classList.add('on');
        }
    });

    const inputList = JSON.parse(correctAnswer).shortText;
    const inputBox = slide.querySelectorAll('input[type=text]');
    inputBox.forEach((item, index) =>{
        item.value = inputList;
    });

    const areaAnswerList = JSON.parse(correctAnswer).textarea;
    const textAreaList = slide.querySelectorAll('textarea');

    textAreaList.forEach((item, index) =>{
        item.value = areaAnswerList;
    });

    $('textarea').attr('readonly', true);
    $('input[type=text]').attr('readonly', true);

}

function inputDuplicatePullAndDropAnswer(slide, correctAnswer){
    const jsonAnswer = JSON.parse(correctAnswer);
    const correctAnswerList = jsonAnswer["answer"][0];
    const answerType = jsonAnswer["type"];
    if(answerType === 'img'){
        const dragList = slide.querySelectorAll('.drag img');
        let size = correctAnswerList.length;
        let flag = 0;
        dragList.forEach((item,index) => {
            if(correctAnswerList.includes($(item).attr("data-num"))){
                const dropList = slide.querySelectorAll('.drop');
                dropList[flag].appendChild(item);
                item.innerHTML = '';
                flag++;
            }
            if(flag === size){
                return;
            }
        });
    }else {
        const dropList = slide.querySelectorAll('span.drop');
        dropList.forEach((item, index) => {
            item.classList.add('on');
            const spanTag = document.createElement('span');
            spanTag.classList.add('txt');
            spanTag.innerText = correctAnswerList[index];
            item.appendChild(spanTag);
        });
    }
}

function inputSocialInputAnswer(slide, correctAnswer){
    const inputAnswer = JSON.parse(correctAnswer).answer;
    const socialRuleAnswer = JSON.parse(correctAnswer).social_rule;

    const textInput = slide.querySelectorAll('input[type=text]');
    const socialInput = slide.querySelectorAll('input[name=social_rule]')

    textInput.forEach((item, index)=>{
        if (item.name !== 'social_rule'){
            item.value = inputAnswer[index] === undefined ? "" : inputAnswer[index];
        }
    });

    socialInput.forEach((item, index)=> {
        item.value = socialRuleAnswer[index] === undefined ? "" : socialRuleAnswer[index];
    })


    $('textarea').attr('readonly', true);
    $('input[type=text]').attr('readonly', true);

}



function marketingConfirm(studentId, marketingYn) {
    let result = false;
    if(marketingYn === 'N'){
        if(confirm("리포트를 확인하려면 마케팅수신동의를 동의해야 합니다.\n동의하고 리포트를 확인하시겠습니까?")){
            alert("마케팅수신동의에 동의하셨습니다.")

            let data = {
                marketingYn: 'Y',
                studentId: studentId
            };

            fetch( '/user/exam/update-marketing', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then((result) => {
                    result = true;
                })
                .catch((error) => {
                    console.log("fail");
                    result = false;
                });
        }else{
            alert("마케팅수신동의에 동의하지 않아 리포트를 볼 수 없습니다.");
            event.preventDefault();
            result = false;
        }
        return result;
    }else{
        return true;
    }
}


