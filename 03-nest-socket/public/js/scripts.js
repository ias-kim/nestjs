//* 공용 함수
const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

//* get DOM Element
const helloStranerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function helloUser() {
    const username = prompt('What is your name?');
    socket.emit("new_user", username); // 서버로 보내기
    socket.on("hello_user", (data) => {
        console.log(data);
    });
}

function init() {
    helloUser();
}
init();