// submit 버튼을 누르면 input 텍스트 값이 서버로 전달되어야함 => 서버 구현하기=>python
async function editMemo(event){
    const id = event.target.dataset.id;
    const editInput = prompt('수정할 값을 입력하세요')
    const res = await fetch(`/memos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            content: editInput,
        })
    });
    readMemo();
}

async function deleteMemo(event){
    const id = event.target.dataset.id;
    const res = await fetch(`/memos/${id}`, {
        method: "DELETE"
    });
    readMemo();
}

function displayMemo(memo){
    const ul = document.querySelector("#memo-ul");

    const li = document.createElement("li");
    li.innerText = `[id:${memo.id}] ${memo.content}`;

    const editBtn = document.createElement("button");
    editBtn.innerText = ' 수정하기 ';
    editBtn.addEventListener("click",editMemo)
    editBtn.dataset.id = memo.id;

    
    const delBtn = document.createElement("button");
    delBtn.innerText = 'x';
    delBtn.addEventListener("click",deleteMemo);
    delBtn.dataset.id = memo.id;


    li.appendChild(editBtn);
    li.appendChild(delBtn);
    ul.appendChild(li);
}

async function readMemo(){
    const res = await fetch("/memos");
    const jsonRes = await res.json();
    const ul = document.querySelector("#memo-ul");
    ul.innerHTML = '';
    jsonRes.forEach(displayMemo);
};

async function creatMemo(value){
    const res = await fetch("/memos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id:new Date().getTime(),
            content: value,
        })
    });
    // const jsonRes = await res.json();
    // ⬆️ fetch는 get이 기본값, post로 보내야 하기 때문에 method~추가

    readMemo();
}


function handleSubmit(event){
    event.preventDefault();
    const input =document.querySelector('#memo-input');
    creatMemo(input.value);
    input.value = '';

}
const form = document.querySelector('#memo-form');
form.addEventListener('submit',handleSubmit);


readMemo();