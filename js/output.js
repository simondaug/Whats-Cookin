function cleanUp() {
    document.getElementById("foodInput").style.display = "none";

    document.getElementById("loading").style.display = "flex";
    
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";

        document.getElementById("foodOutput").style.display = "block";
    }, 5000);

}
function sort() {
    cleanUp();
    console.log();
}

function nothing() {
    let x = 1+1;
    x = x + 1;
}