async function SetAHref(){

    const response = await fetch("php/getWebs.php", {
        mode: "no-cors"
    }).then(res => {
        return res.text();
    })

    console.log(response);
    let allData = JSON.parse(response);
    let fullDir = allData.webs;
    
    let navRight = document.querySelector(".navbar > .right")
    for(let i = 0; i < fullDir.length; i++){
        let currObj = fullDir[i];

        let isActive = false, directFile = document.URL.split("/");
        let compare;
        if(directFile[directFile.length - 1].includes(".html")){
            compare = directFile[directFile.length - 1];
        }
        else{
            compare = "index.html";
        }

        if(compare == currObj.link){
            isActive = true;
        }


        let paste = `<a href="${currObj.link}"${isActive ? "class=active" : ""}>${currObj.title}</a>`;



        if(isActive){
            document.querySelector("head>title").innerHTML = currObj.title;
        }


        
        navRight.innerHTML += paste;
    }


    document.getElementById("favicon").setAttribute("href", allData.favicon);
    document.querySelector(".bottom").innerHTML += allData.contact;
    document.querySelector(".ver").innerHTML = "Wersja: " + allData.version;
}







async function SetCategories(){
    if(document.title != "Gry"){
        return;
    }




    const response = await fetch("php/getCategories.php", {
        mode: "no-cors"
    }).then(res => {
        return res.text();
    });

    let fullObject = JSON.parse(response);
    let filtersTab = fullObject.categories;
    filtersTab = filtersTab.sort((a, b) => {
        return a.id - b.id;
    });

    let filtersButtons = document.querySelector(".bottom>.gamepanel>.filters>.buttons");


    for(let i = 0; i < filtersTab.length; i++){
        let currFilt = filtersTab[i];
        let paste = `
        <div class="filt${currFilt.color == 'NONE' ? '' : ' ' + currFilt.color}" id="Filter${currFilt.id}" onclick='SetFilter({selector: ".gamefilters",value: "${currFilt.name}",source: "Filter${currFilt.id}"})'>
            ${currFilt.svg}
            ${currFilt.name}
        </div>`;



        filtersButtons.innerHTML += paste;
    }




    let gamesTab = fullObject.games;
    let parentGames = document.querySelector(".bottom>.gamepanel>.games>.aligner");
    for(let i = 0; i < gamesTab.length; i++){
        let currGame = gamesTab[i];

        let filtersPaste = '';
        
//================================================
        for(let j = -1; j < currGame.categ.length; j++){

            let currFilt;
            let error = false;
            
            if(j == -1){
                let backDate = GetGoogleDate(currGame.dateAdd);
                let todaysDate = {
                    day: Number(), 
                    month: Number(), 
                    year: Number()
                }
                let date = new Date();
                todaysDate.day = date.getDate();
                todaysDate.month = date.getMonth() + 1;
                todaysDate.year = date.getFullYear();

                if(DaysDifference(todaysDate, backDate) > 14){
                    error = true;
                }
                else{
                    currFilt = filtersTab[0];
                }
                

            }
            else{
                //
                currFilt = function() {
                    for(let k = 0; k < filtersTab.length; k++){
                        if(filtersTab[k].id == currGame.categ[j]){
                            return filtersTab[k];
                        }                        
                    }
                    error = true;
                    return null;
                }();
                //
            }

            if(!error){
                let paste = `
                <div class="filt${currFilt.color == 'NONE' ? '' : ' ' + currFilt.color}">
                    ${currFilt.svg}
                    ${currFilt.name}
                </div>`;

                filtersPaste += paste;
            }
            
        }


        let fullPaste = `
                    <a href="${currGame.link}" target="_blank">
                        <div class="minigame">
                            <div class="title">${currGame.name}</div>
                            <img src="img/_GAMES/${currGame.id}.png">
                            <div class="gamefilters">
                                ${filtersPaste}
                            </div>
                        </div>
                    </a>
        `;

        parentGames.innerHTML += fullPaste;
    }
}




async function SetUpAll(){
    await SetAHref();
    await SetCategories();
}


SetUpAll();
