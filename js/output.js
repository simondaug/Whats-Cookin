function cleanUp() {
    document.getElementById("foodInput").style.display = "none";
    document.getElementById("foodOutput").style.display = "block";
}

function addOutput() {
    let base = document.createElement("div");
    base.classList.add("meal-input");

    let name = document.createElement("h3");
    name.innerText = "Meal";
    base.appendChild(name);

    let close = document.createElement("span");
    close.classList = "close-button";
    close.innerHTML = "&times";
    const me = base;
    close.onclick = function() {
        document.getElementById("foodList").removeChild(me);
    }
    base.appendChild(close);

    let input = document.createElement("input");
    input.type = "text";
    base.appendChild(input);

    document.getElementById("foodOist").appendChild(base);
}
function sort() {
    cleanUp();
    console.log();
}