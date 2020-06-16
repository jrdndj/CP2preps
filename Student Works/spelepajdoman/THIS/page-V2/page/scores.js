var user = localStorage.getItem("user");
var acc = document.getElementById("acc");
var realScore = localStorage.getItem("score");

var img1 = localStorage.getItem("img1");
var img2 = localStorage.getItem("img2");
var img3 = localStorage.getItem("img3");
var img4 = localStorage.getItem("img4");

var uniqid = [7627474174, 1380435828, 7788927706, 1402985624, 2391462283, 7060965142, 4898123499, 6708889643, 3844213704, 4048556997, 
    7164157681, 2140786088, 4733252441, 614904913, 5313667698, 8474947882, 8391897190, 5567400898, 1219871053, 9300313360, 8154920595, 
    7214283020, 849213198, 2543081416, 8329006848, 2662694851, 8224671721, 2815501531, 2917611732, 6765154837, 2006696530, 3651797461, 
    2094214642, 1031371489, 3502130764, 1689996492, 24108306, 8911244993, 8503524726, 7882825176, 3178122836, 8797251491, 9719881075, 
    494808781, 1373146360, 3946011303, 8499454531, 5645550071, 4822073098, 825747763];
var id = uniqid[Math.floor(uniqid.length * Math.random())];

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
        $('td').css('background', 'rgba(52, 152, 219, 0.6)');
        $('#player').css('background', 'rgba(0, 0, 0, 0.6)');
        break;
    }if(images[i] !== null){
        $('body').css('background-image', 'url("images/' +i+ '.jpg")');
        $('td').css('background', colors[i]);
        $('#player').css('background', 'rgba(0, 0, 0, 0.6)');
        $('#score').css('background', 'rgba(0, 0, 0, 0.6)');
        break;
    }
}

var player = document.getElementById("player");
var score = document.getElementById("score");

var fs = new XMLHttpRequest();
var url = "acc.json";

fs.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
        var accounts = JSON.parse(this.responseText);
        if(user == "" || user == null){
            $('body').css('background-image', 'url("images/1.jpg")')
            $('td').css('background', 'rgba(52, 152, 219, 0.6)');
            $('#player').css('background', 'rgba(0, 0, 0, 0.6)');
            $('#score').css('background', 'rgba(0, 0, 0, 0.6)');
            acc.innerText = "ACCOUNT";
            player.innerText = "Guest-" +id;
            score.innerText = realScore;
            var storePage = document.getElementById('storePage');
            storePage.remove();
        }else{
            localStorage.removeItem('score');
            acc.innerText = user;
            player.innerText = user;
            for(let i in accounts){
                if(accounts[i].username == user){
                    if(accounts[i].score == ""){
                        score.innerText = "You have no scores achieved"
                    }
                    else{
                        score.innerText = accounts[i].score;
                        continue;
                    }
                }else{
                    for(let j in images){
                        if(images[j] !== null){
                            if(accounts[i].score == ""){
                                $('#scores').append("<tr><td id=\"player" +accounts[i]+ 
                                "\" style=\"background: " +colors[j]+ "\">" +accounts[i].username+ "</td><td id=\"score" +accounts[i]+ 
                                "\" style=\"background: " +colors[j]+ "\">No scores achieved</td></tr");
                            }else{
                                $('#scores').append("<tr><td id=\"player" +accounts[i]+ 
                                "\" style=\"background: " +colors[j]+ "\">" +accounts[i].username+ "</td><td id=\"score" +accounts[i]+ 
                                "\" style=\"background: " +colors[j]+ "\">" +accounts[i].score+ "</td></tr");
                            }
                        }continue;
                    }
                }
            }
        }
    }
}
fs.open("GET", url, true);
fs.send();