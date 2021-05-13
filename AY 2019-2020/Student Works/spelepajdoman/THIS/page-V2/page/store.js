
var user = localStorage.getItem("user");
var acc = document.getElementById("acc");

var img1 = localStorage.getItem("img1");
var img2 = localStorage.getItem("img2");
var img3 = localStorage.getItem("img3");
var img4 = localStorage.getItem("img4");

var images = {
    1: img1,
    2: img2,
    3: img3,
    4: img4
}

var colors = {
    1: "rgba(52, 152, 219, 0.6)",
    2: "rgba(0, 155, 0, 0.6)",
    3: "rgba(128, 0, 128, 0.6)",
    4: "rgba(128, 128, 128, 0.6)"
}

for(let i in images){
    if(Object.entries(images) == null){
        $('body').css('background-image', 'url("images/1.jpg")');
        $('.pajs').css('background', 'rgba(52, 152, 219, 0.6');
        break;
    }if(images[i] !== null){
        $('body').css('background-image', 'url("images/' +i+ '.jpg")');
        $('.pajs').css('background', colors[i]);
        break;
    }
}

if(user == "" || user == null){
    acc.innerText = "ACCOUNT";
}else{
    acc.innerText = user;
}

for(let i=1; i<5; i++){
    document.getElementById("" +i).onclick = () => { 
        switch(i){
            case 1:
                $('body').css('background-image', 'url("images/1.jpg")');
                for(let j=2; j<5; j++) localStorage.removeItem("img" +j); //switching pictures for skins
                localStorage.setItem("img1", i);
                window.top.location = window.top.location;
                break;
            case 2:
                $('body').css('background-image', 'url("images/2.jpg")');
                for(let j=3; j<5; j++) localStorage.removeItem("img" +j);
                localStorage.removeItem("img1");
                localStorage.setItem("img2", i);
                window.top.location = window.top.location;
                break;
            case 3:
                $('body').css('background-image', 'url("images/3.jpg")');
                for(let j=4; j<5; j++) localStorage.removeItem("img" +j);
                for(let k=1; k<3; k++) localStorage.removeItem("img" +k);
                localStorage.setItem("img3", i);
                window.top.location = window.top.location;
                break;
            case 4:
                $('body').css('background-image', 'url("images/4.jpg")'); 
                for(let j=1; j<4; j++) localStorage.removeItem("img" +j);
                localStorage.setItem("img4", i);
                window.top.location = window.top.location;
                break;    
        }
    }
}
