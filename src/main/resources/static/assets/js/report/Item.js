class Item {
    constructor(props) {
        const { el } = props;
        this.extractor = new AnswerExtractor({el :el});
        this.el = el;
        this.el.classList.add('page');
        this.el.innerHTML = '';
        const inner = document.createElement('div');
        inner.classList.add('inner');
        this.questionDiv = document.createElement('div');
        this.questionDiv.classList.add('question');
        inner.appendChild(this.questionDiv);
        this.el.appendChild(inner);
        this.render(props);
    }

    getElement(){
        return this.el;
    }

    setItem(itemId){
        this.el.classList.remove('type01');
        this.questionDiv = this.el.getElementsByClassName('question')[0];
        this.questionDiv.classList.remove('type01');
        this.questionDiv.innerHTML = '';
        this.render({itemId : itemId});
    }

    render(props){
        const { requestYn } = props;
        if(requestYn !== 'N') {
            this.request(props).then((data) => {
                if(data.result === true){
                    this.renderContents(data.data);
                    this.renderAdditionalElement(props);
                }else{
                    alert('에러가 발생했습니다.');
                }
            });
        }else {
            this.extractor.setItemType(props);
            this.renderPassage(props);
            this.renderContent(props);
            this.renderData(props);
            this.renderAnswer(props);
            this.renderAdditionalElement(props);
        }
    }

    async request(props){
        const { itemId } = props;
        const data = fetch('/user/item/item-view?item_id=' + itemId, {
            method: 'GET',
        }).then((response) => {
            return response.json();
        });
        return data;
    }

    renderPassage(data){
        const { passageHTML } = data;
        if(Boolean(passageHTML) === true ){
            this.el.classList.add('type01');
            this.questionDiv.classList.add('type01');
            const passageDiv = document.createElement('div');
            passageDiv.classList.add('left');
            passageDiv.innerHTML = `
                <div class="txt">${passageHTML}</div>
            `;
            this.questionDiv.appendChild(passageDiv);
            const rightDiv = document.createElement('div');
            rightDiv.classList.add('right');
            this.questionDiv.appendChild(rightDiv);
            this.questionDiv = rightDiv;
        }
    }

    renderContent(data){
        const { itemContent } = data;
        this.questionDiv.innerHTML = itemContent;
    }

    renderContents(data){
        const { itemContents } = data;
        this.el.innerHTML = itemContents;
    }

    renderData(data){
        const { itemDataHTML } = data;
        this.questionDiv.innerHTML += itemDataHTML;
    }

    renderAnswer(data){
        const { itemAnswerHTML,itemExplainText } = data;
        this.questionDiv.innerHTML += itemAnswerHTML;
        this.questionDiv.innerHTML += `<div class="commentary">
            <p className="tit">해설</p>
            <span class="txt">${itemExplainText}</span>
            </div>`
    }

    renderAdditionalElement(data){
        const button = document.createElement('button');
        button.classList.add('btn-close');
        button.innerHTML = `<span class="hbar"></span><span class="hbar"></span><span class="hide-txt">닫기</span>`;
        button.addEventListener('click',function (){
            $('html, body').removeClass('h100');
            $('.popup').hide();
        });
        this.el.appendChild(button);
    }

    async test(){
        return this.extractor.test();
    }
}