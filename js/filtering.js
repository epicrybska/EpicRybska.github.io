let _AllFilters = [];
// "{selector: ".class", value: "text", source: id_of_element}";


function SetFilter(filter = {selector: ".class", value: "text", source: "id"}){
    let error = false;
    for(let i = 0; i < _AllFilters.length; i++){
        if(_AllFilters[i].source == filter.source){
            _AllFilters[i] = filter;
            error = true;
            break;
        }
    }

    if(!error){
        _AllFilters.push(filter);
    }


    if(document.getElementById(filter.source).tagName === "DIV" && filter.source.includes("Filter")){
        document.getElementById(filter.source).setAttribute("onclick", `DeleteFilter("${filter.source}")`);
        document.getElementById(filter.source).classList.add("active");
    }

    FilterGames();
}




function DeleteFilter(source = "id"){
    for(let i = 0; i < _AllFilters.length; i++){
        if(_AllFilters[i].source == source){
            _AllFilters = _AllFilters.slice(0, i).concat(_AllFilters.slice(i + 1));
            break;
        }
    }

    if(document.getElementById(source).tagName === "DIV" && source.includes("Filter")){
        document.getElementById(source).setAttribute("onclick", `SetFilter({
            selector: ".gamefilters",
            value: "${document.getElementById(source).innerText}",
            source: "${source}"
        })`);
        document.getElementById(source).classList.remove("active");
    }


    FilterGames();
}




function FilterGames(){
    let parentGames = document.querySelector(".bottom>.gamepanel>.games>.aligner");

    let allMinigames = parentGames.children;

    for(let i = 0; i < allMinigames.length; i++){
        let isValid = true;

        for(let j = 0; j < _AllFilters.length; j++){
            let valid = allMinigames[i].querySelector(_AllFilters[j].selector).innerText.toLowerCase().includes(_AllFilters[j].value.toLowerCase());

            if(!valid){
                isValid = false;
                break;
            }
        }

        if(!isValid){
            allMinigames[i].style.display = "none";
        }
        else{
            allMinigames[i].style.display = "flex";
        }


    }


}