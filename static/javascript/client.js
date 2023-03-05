let socket = io();
socket.emit('user-joined',sessionStorage.getItem('username'));
document.getElementById('greeting').innerHTML = "Welcome to Chat Application: "+sessionStorage.getItem('username');
function validateMsg(){
    let msg = document.getElementById("MessageInput").value;
    console.log("Message to be validated is :"+msg);
    if(msg == "")
    {
        console.log("Message is Empty");
        return false;
    }
    else
        return true;
}
// console.log("Socket id is:"+socket.id);
function addMsg(message,position){
    let ele = document.createElement('div');
    let chat = document.querySelector("#ChatWindow");
    ele.innerText = message;
    ele.classList.add("message");
    ele.classList.add(position);
    chat.append(ele);
    chat.scrollTo({
        top: chat.scrollHeight
    });

}

socket.on('new-user-joined',(name) =>{
    let msg_text = name+" Joined The Chat!"
    let position = "center";
    addMsg(msg_text,position);

});

socket.on('send-this-msg',(name,message) =>{
    msg_text = name+": "+message;
    addMsg(msg_text,"left");
})

// function sendMsg(e){
    
    
// }

document.getElementById("msgForm").addEventListener('submit',(e) => {
    e.preventDefault();
    if(!validateMsg())
    { 
        return false;
        
    }
    // document.getElementById("ChatWindow").scrollTo(document.getElementById("ChatWindow").scrollHeight);
    console.log("Submit event fired");
    let msg_text = document.getElementById("MessageInput").value;
    addMsg(msg_text,"right");
    document.getElementById("MessageInput").value = "";
    socket.emit('receive-msg',msg_text);
    
})