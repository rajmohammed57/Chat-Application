

// function makeConnection(){

//     console.log("Initiating connection");
//     const socket = io();
//     socket.emit('user-joined',document.getElementById("name"),function(){
//         return true;
//     });


// console.log(evt.timeStamp);
// console.log("io connection requested to server");
// const socket = io().then(socket.emit('user-joined',document.getElementById("name").content).then(function(){
//     console.log("Emitted");
//     return true;
// }));




document.getElementById("firstForm").addEventListener('submit', (e) => {
    // e.preventDefault();
    console.log('submit event listener trigerred');
    if (!makeconnection())
        return false;
    else {
        
        return true;
        
    }
})

function makeconnection() {
    let socket = io();
    socket.emit('user-joined',document.getElementById('nametag').value);
    sessionStorage.setItem('username',document.getElementById('nametag').value);
    console.log('name on session storage is:'+sessionStorage.getItem('username'));
    return true;

}