const myForm = document.getElementById("parameters");
const myEndgameForm = document.getElementById("endgame");

document.getElementById("startButton").disabled = false;

myForm.addEventListener('submit', function(e){
    e.preventDefault(); //prevent the page to reload on submit event

    var iaLevel, shape;

    if(document.getElementById('customRadio1').checked){
        iaLevel = document.getElementById('customRadio1').value;
    } else if(document.getElementById('customRadio2').checked){
        iaLevel = document.getElementById('customRadio2').value
    } else {
        iaLevel = document.getElementById('customRadio3').value;
    }

    if(document.getElementById('customRadio4').checked){
        shape = document.getElementById('customRadio4').value;
    } else {
        shape = document.getElementById('customRadio5').value;
    }

    const data = {iaLevel, shape};
    console.log(data);

    const options = {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    };

    fetch('/start', options).then(res => {
        console.log(res);
        if(res.status == 200){
            gameStart(data.shape, data.iaLevel);
        }
    });

});

myEndgameForm.addEventListener('submit', function(formData){
    formData.preventDefault(); //prevent the page to reload on submit event

    if(document.getElementById("validationDefaultUsername").value != null) {
        const username = document.getElementById("validationDefaultUsername").value;
        const data = {username};

        const options = {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        };

        fetch('/pushPlayerToDB', options).then(res => {
            if(res.status == 200) console.log("Player succesfully added to DB");
        });
    }
    document.getElementById("validationDefaultUsername").value = "";
    document.getElementById("endgamePopop").style.display = "none";
});
