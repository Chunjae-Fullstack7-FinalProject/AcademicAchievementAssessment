document.addEventListener('DOMContentLoaded', async function() {
    try {
        // API에서 문제 데이터 가져오기
        const response = await fetch(`/proxy/tsherpa/item/item-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                itemIdList: [966536, 1588525, 1588526, 1589103, 1589104] 
            })
        });

        const data = await response.json();

        if (data.successYn === 'Y') {
            const questions = data.itemList;
            renderQuestions(questions);
            renderOMRTable(questions);
            initializeSwiper();
            initializeAnswerTracking();
        } else {
            console.error('Failed to fetch questions:', data);
        }
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
});

function renderQuestions(questions) {
    const container = document.querySelector('.swiper-wrapper');
    questions.forEach(question => {
        const slide = createQuestionSlide(question);
        container.appendChild(slide);
    });
}

function createQuestionSlide(question) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    
    // 문제 유형에 따라 다른 템플릿 적용
    if (question.questionFormCode === '50') { // 5지선다
        slide.innerHTML = createMultipleChoiceTemplate(question);
    } else if (question.questionFormCode === '60') { // 단답형
        slide.innerHTML = createShortAnswerTemplate(question);
    }
    
    return slide;
}

function createMultipleChoiceTemplate(question) {
    return `
        <div class="swiper-slide">
            <div class="page type01">
                <div class="inner">
                    <div class="question type01">
                        ${question.passageHtml ? `
                            <div class="left">
                                <div class="txt">
                                    ${question.passageHtml}
                                </div>
                            </div>
                        ` : ''}
                        <div class="right">
                            <div class="top">
                                <span class="num">${question.itemNo}</span>
                                <span class="txt">${question.questionHtml}</span>
                            </div>
                            <ul class="answer-input-type radio">
                                ${createChoices(question)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createShortAnswerTemplate(question) {
    return `
        <div class="page type01">
            <div class="inner">
                <div class="question type01">
                    ${question.passageHtml ? `
                        <div class="left">
                            <div class="txt">
                                ${question.passageHtml}
                            </div>
                        </div>
                    ` : ''}
                    <div class="right" style="width: ${question.passageHtml ? '50%' : '100%'}">
                        <div class="top">
                            <span class="num">${question.itemNo}</span>
                            <div class="txt">${question.questionHtml}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createChoices(question) {
    const choices = [
        question.choice1Html,
        question.choice2Html,
        question.choice3Html,
        question.choice4Html,
        question.choice5Html
    ].filter(choice => choice);

    return choices.map((choice, index) => `
        <li>
            <input type="radio" 
                   id="answer_radio${question.itemNo}_${index + 1}" 
                   name="q${question.itemNo}" 
                   value="${index + 1}">
            <label for="answer_radio${question.itemNo}_${index + 1}">${index + 1}</label>
            <span class="txt">${choice}</span>
        </li>
    `).join('');
}

function initializeSwiper() {
    new Swiper(".mySwiper", {
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
}

function renderOMRTable(questions) {
    const resultsBody = document.getElementById('results-body');
    resultsBody.innerHTML = questions.map(question => `
        <tr>
            <td>문제 ${question.itemNo}</td>
            <td id="result-q${question.itemNo}"></td>
        </tr>
    `).join('');
}

function initializeAnswerTracking() {
    const results = {};
    
    // 객관식 답안 선택 이벤트
    document.addEventListener('change', function(e) {
        if (e.target.type === 'radio' && e.target.name.startsWith('q')) {
            const questionNumber = e.target.name.substring(1);
            const selectedAnswer = e.target.value;
            updateAnswer(questionNumber, selectedAnswer);
        }
    });

    // 단답형 답안 입력 이벤트
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('input_question_text_box')) {
            const questionNumber = e.target.closest('.swiper-slide').querySelector('.num').textContent;
            const answer = e.target.value.trim();
            updateAnswer(questionNumber, answer);
        }
    });

    function updateAnswer(questionNumber, answer) {
        results[questionNumber] = answer;
        const resultCell = document.getElementById(`result-q${questionNumber}`);
        if (resultCell) {
            resultCell.textContent = answer;
        }
    }

    // 제출 버튼 이벤트
    const submitButton = document.querySelector('.btn-submit');
    submitButton?.addEventListener('click', function() {
        const finalAnswers = Object.entries(results).map(([questionNo, answer]) => ({
            itemNo: parseInt(questionNo),
            userAnswer: answer
        }));
        
        console.log('제출할 답안:', finalAnswers);
        // TODO: API 호출로 답안 제출
    });
}
