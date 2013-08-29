(function () {
    var context = new webkitAudioContext(),
        fileName = "test.aac",
        numberOfTimes = 1000,
        ref = numberOfTimes,
        xhr = new XMLHttpRequest(),
        display = document.querySelector(".num"),
        fileSize,
        iOS = !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);

    if (!iOS) {
        display.parentElement.removeChild(display);
        document.body.innerHTML = "Please open this test on an iOS device in mobile safari 6.0 or later.";
        return;
    }
    function log () {
        var num = ref - numberOfTimes;
        //console.log("decoded", num, ",", (num * fileSize) / 1024, "kb");
        display.innerHTML = ref - numberOfTimes;
    }
    function ondecode () {
        return --numberOfTimes && next(), log();
    }
    function onload () {
        //fileName = this.response.byteLength;
        context.decodeAudioData(this.response, ondecode, onerror);
        this.response = null;
    }
    function onerror () {
        numberOfTimes = 0;
        display.innerHTML = "ERROR";
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

