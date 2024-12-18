class AnswerExtractor {
    constructor(props) {
        const {el, itemType} = props;
        this.el = el;
        this.itemType = itemType;
    }

    setItemType(props) {
        const {itemType} = props;
        this.itemType = itemType;
    }

    test() {
        if (this.itemType === 'IT01') {
            return this.testRadioChoice();
        } else if (this.itemType === 'IT02') {
            return this.testCheckboxChoice();
        } else if (this.itemType === 'IT05') {
            return this.testMatching();
        } else if (this.itemType === 'IT09') {
            return this.testShortAnswer();
        } else if (this.itemType === 'IT10') {
            return this.testWritingResponse();
        } else if (this.itemType === 'TT07') {
            return this.testPullAndDrop();
        } else if (this.itemType === 'TT03') {
            return this.testHotSpot();
        } else if (this.itemType === 'TT04') {
            return this.testSelect();
        } else if (this.itemType === 'TT11') {
            return this.testEditError();
        } else if (this.itemType === 'IT11') {
            return this.testExpandChoice();
        } else if(this.itemType === 'IT12'){
            return this.testDuplicateSortAnswer();
        }else if(this.itemType === 'IT13'){
            return this.testShortAndLongText();
        }else if(this.itemType === 'IT14'){
            return this.testHotSpotAndLongText();
        }else if(this.itemType === 'IT15'){
            return this.testHotSpotAndLongAndShortText();
        }else if(this.itemType === 'IT16'){
            return this.testDuplicatePullAndDropAnswer();
        }else if(this.itemType === 'IT17') {
            return this.testSocialInputAnswer();
        }else if(this.itemType === 'IT18') {
            return this.testDuplicateMultiAnswer();
        }else {
            return {};
        }
    }

    testDuplicateMultiAnswer() {
        const result = {};
        const list = [];
        const inputTextList = this.el.querySelectorAll(`input[type=text]`);

        inputTextList.forEach((item, index) => {
            if(item.value !== ''){
                list.push(item.value);
            }
        });
        if (list.length > 0) {

            const list = [];

            inputTextList.forEach((item, index) => {
                if (item.value !== '') {
                    list.push(item.value)
                } else {
                    list.push("")
                }
            });

            result["answer"] = list;
        }
        return JSON.stringify(result);
    }

    testRadioChoice() {
        const result = {};
        const choiceList = this.el.querySelectorAll('input[type=radio]');
        choiceList.forEach((item, index) => {
            if (item.checked === true) {
                result["answer"] = item.value;
            }
        });
        return JSON.stringify(result);
    }

    testCheckboxChoice() {
        const result = {};
        const list = [];
        const choiceList = this.el.querySelectorAll('input[type=checkbox]');
        choiceList.forEach((item, index) => {
            if (item.checked === true) {
                list.push(item.value);
            }
        });
        const buttonList = this.el.querySelectorAll('button');
        buttonList.forEach((item, index) => {
            if (item.classList.contains('active')) {
                list.push(index);
            }
        });
        if (list.length > 0) {
            result["answer"] = list;
        }
        return JSON.stringify(result);
    }

    testShortAnswer() {
        const result = {};
        const list = [];
        const inputTextList = this.el.querySelectorAll(`input[type=text]`);

        const textAreaList = this.el.querySelectorAll(`textarea`);

        inputTextList.forEach((item, index) => {
            if(item.value !== ''){
                list.push(item.value);
            }
        });
        textAreaList.forEach((item, index) => {
            if(item.value !== ''){
                list.push(item.value);
            }
        });

        if (list.length > 0) {

            const list = [];

            inputTextList.forEach((item,index) => {
                if (item.value !== ''){
                    list.push(item.value)
                }else{
                    list.push("")
                }
            });
            textAreaList.forEach((item, index) => {
                if (item.value !==''){
                    list.push(item.value)
                }else{
                    list.push("")
                }
            })

            result["answer"] = list;
        }

        return JSON.stringify(result);
    }

    testWritingResponse() {
        const textAreaList = this.el.querySelectorAll('textarea');
        const textInputList = this.el.querySelectorAll('input[type=text]');
        const list = [];
        textAreaList.forEach((item, index) => {
            list.push(item.value);
        });
        textInputList.forEach((item, index) => {
            list.push(item.value);
        });
        return JSON.stringify({"answer": list});
    }

    testMatching() {
        const answerList = [];
        const columnOneButtonList = this.el.querySelectorAll('button');
        columnOneButtonList.forEach((item,index) => {
           const linkNum = $(item).attr('link_num');
           const lineNum = $(item).attr('line_num');
           if(lineNum !== undefined && lineNum !== ''){
               answerList.push({"left" : item.id, "right" : linkNum});
           }
        });
        if (answerList.length > 0) {
            return JSON.stringify({"answer": answerList});
        } else {
            return JSON.stringify({});
        }
    }

    testPullAndDrop() {
        const answerList = [];
        const spanList = this.el.querySelectorAll('.drop');
        spanList.forEach((item, index) => {
            if (item.innerHTML !== "") {
                answerList.push(item.innerHTML);
            }
        });
        if (answerList.length > 0) {
            return JSON.stringify({"answer": answerList});
        } else {
            return JSON.stringify({});
        }
    }

    testHotSpot() {
        const gList = this.el.querySelectorAll('g');
        const list = [];
        gList.forEach((item, index) => {
            const classList = item.classList;
            if (classList.contains('on')) {
                list.push(index + 1);
            }
        });
        if (list.length > 0) {
            return JSON.stringify({"answer": list});
        } else {
            return JSON.stringify({});
        }
    }

    testSelect() {
        const selectList = this.el.querySelectorAll('select');
        const divSelectValue = this.el.querySelectorAll('span.selected');
        const list = [];
        selectList.forEach((item, index) => {
            if(item.value !== '선택'){
                list.push(item.value);
            }
        });
        divSelectValue.forEach((item, index) => {
            list.push(item.innerHTML);
        });
        if(list.length > 0){
            const list = [];
            selectList.forEach((item, index) => {
                if (item.value !== '선택'){
                    list.push(item.value);
                }else{
                    list.push("선택")
                }
            })
            divSelectValue.forEach((item, index) => {
                list.push(item.innerHTML);
            });
            return JSON.stringify({"answer": list});
        }else{
            return JSON.stringify({});
        }

    }

    testEditError() {
        const selectList = this.el.querySelectorAll('input[type=text]');
        const list = [];
        selectList.forEach((item, index) => {
            list.push(item.value === '' ? item.placeholder : item.value);
        });
        return JSON.stringify({"answer": list});
    }

    testExpandChoice() {
        const list = [];
        const gList = this.el.querySelectorAll('g');
        gList.forEach((item, index) => {
            const classList = item.classList;
            if (classList.contains('on')) {
                list.push(index + 1);
            }
        });
        const textAnswer = this.el.querySelector('textarea').value;
        const textAnswerArray = textAnswer.replace(' ','').split(',');
        textAnswerArray.sort();
        list.push(textAnswerArray.join(','));
        return JSON.stringify({"answer": list});
    }

    testDuplicateSortAnswer() {
        const result = {};
        const list = [];
        this.el.querySelectorAll(`input[type=text]`).forEach((item, index) => {
            if(!item.classList.contains("not-answer")) {
                if (item.value !== '') {
                    list.push(item.value);
                }
            }
        });
        this.el.querySelectorAll(`textarea`).forEach((item, index) => {
            if(item.value !== ''){
                list.push(item.value);
            }
        });
        if (list.length > 0) {
            result["answer"] = list[0];
        }
        return JSON.stringify(result);
    }

    testShortAndLongText() {
        const result = {};
        const list = [];
        const inputText = this.el.querySelectorAll(`input[type=text]`);
        inputText.forEach((item, index) => {
            if (item.value !== '') {
                list.push(item.value);
            }
        });

        const textAreaValue = this.el.querySelector(`textarea`).value;

        if (list.length > 0 || textAreaValue !== "") {
            const list = [];
            inputText.forEach((item, index) => {
                if (item.value != ''){
                    list.push(item.value);
                }else{
                    list.push("")
                }
            })
            result["answer"] = list;
            result["textarea"] = this.el.querySelector(`textarea`).value;
        }else {
            JSON.stringify({});
        }
        return JSON.stringify(result);
    }

    testHotSpotAndLongText() {
        const result = {};
        const list = [];
        const gList = this.el.querySelectorAll('g');
        gList.forEach((item, index) => {
            const classList = item.classList;
            if (classList.contains('on')) {
                list.push(index + 1);
            }
        });

        const textAreaValue = this.el.querySelector(`textarea`).value;

        if (list.length > 0 || textAreaValue !== "") {
            result["answer"] = list;
            result["textarea"] = textAreaValue;
        } else {
            return JSON.stringify({});
        }
        return JSON.stringify(result);

    }

    testHotSpotAndLongAndShortText() {
        const result = {};
        const list = [];
        const gList = this.el.querySelectorAll('g');
        gList.forEach((item, index) => {
            const classList = item.classList;
            if (classList.contains('on')) {
                list.push(index + 1);
            }
        });

        const shortTextValue = this.el.querySelector('input[type=text]').value;
        const textAreaValue = this.el.querySelector(`textarea`).value;

        if (list.length > 0 || shortTextValue !== "" || textAreaValue !== "") {
            result["answer"] = list;
            result["shortText"] = shortTextValue;
            result["textarea"] = textAreaValue;
        }else {
            JSON.stringify({});
        }

        return JSON.stringify(result);
    }


    testDuplicatePullAndDropAnswer(){
        const result = {};
        const answerList = [];
        const spanList = this.el.querySelectorAll('.drop');
        spanList.forEach((item, index) => {
            if (item.innerHTML !== "") {
                if(item.children[0].tagName === 'SPAN'){
                    answerList.push(item.children[0].innerText);
                    result["type"] = "span";
                }else if(item.children[0].tagName === 'IMG'){
                    answerList.push($(item.children[0]).attr("data-num"));
                    result["type"] = "img";
                }else{

                }
            }
        });
        if (answerList.length > 0) {
            result["answer"] = answerList;
        }
        return JSON.stringify(result);
    }

    testSocialInputAnswer(){
        const result = {};
        const list = [];
        const socialList = [];
        const inputText = this.el.querySelectorAll(`input[type=text]`);

        const social_rule = this.el.querySelectorAll('input[name=social_rule]');

        inputText.forEach((item, index) => {
            if (item.value !== '') {
                if (item.name === 'social_rule') {
                    socialList.push(item.value);
                } else {
                    list.push(item.value)
                }
            }
        });

        if (list.length > 0 || socialList.length > 0){
            result["answer"] = list;
            result["social_rule"] = socialList;
            console.log(JSON.stringify(result))
        }else {
            return JSON.stringify({});
        }

        return JSON.stringify(result);

    }

}