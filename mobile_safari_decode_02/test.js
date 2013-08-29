(function () {
    var context = new webkitAudioContext(),
        fileName = "test.aac",
        numberOfTimes = 1000,
        ref = numberOfTimes,
        xhr = new XMLHttpRequest(),
        display = document.querySelector(".num"),
        fileSize;

    if (!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
        fileName = "test.ogg";
    }

    function log () {
        var num = ref - numberOfTimes;
        display.innerHTML = ref - numberOfTimes;
    }
    function ondecode () {
        return --numberOfTimes && next(), log();
    }
    function onload () {
        context.decodeAudioData(this.response, ondecode, onerror);
        this.response = null;
    }
    function onerror () {
        numberOfTimes = 0;
        display.innerHTML = "error loading/decoding data";
        console.log("error loading/decoding data");
    }
    function next () {
        xhr.open("GET", fileName, true);
        xhr.send(null);
    }
    xhr.open("GET", fileName, true);
    xhr.responseType = "arraybuffer";
    xhr.addEventListener("load", onload, false);
    xhr.addEventListener("error", onerror, false);
    xhr.send(null);
})();

