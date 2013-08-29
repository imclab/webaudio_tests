(function () {
    var context = new webkitAudioContext(),
        fileName = "test.aac",
        numberOfTimes = 1000,
        ref = numberOfTimes,
        display = document.querySelector(".num");

    if (!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
        fileName = "test.ogg";
    }

    function ondecode () {
        console.log("decoded", ref - numberOfTimes);
        return --numberOfTimes && next(), (display.innerHTML = ref - numberOfTimes);
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
        var xhr = new XMLHttpRequest();
        xhr.open("GET", fileName, true);
        xhr.responseType = "arraybuffer";
        xhr.addEventListener("load", onload, false);
        xhr.addEventListener("error", onerror, false);
        xhr.send(null);
    }
    next();
})();

