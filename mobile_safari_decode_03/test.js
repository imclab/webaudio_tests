(function () {
    var context = new webkitAudioContext(),
        fileName = "test.aac",
        numberOfTimes = 5000,
        ref = numberOfTimes,
        xhr = new XMLHttpRequest(),
        numSpan = document.querySelector(".num"),
        mbSpan = document.querySelector(".mb"),
        buffer,
        buffers = [],
        fileSize;

    if (!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
        fileName = "test.ogg";
    }

    function mb (bytes) {
        return "\n" + (bytes / 1048576).toFixed(4);
    }
    function log () {
        var num = (ref - numberOfTimes) + 1,
            MB = mb(num * fileSize);
        console.log(num, "files", MB, "MB");
        numSpan.innerHTML = num;
        mbSpan.innerHTML = MB;
    }
    function ondecode (res) {
        log();
        return --numberOfTimes && decode();
    }
    function decode () {
        context.decodeAudioData(buffer, ondecode, onerror);
    }
    function onload (e) {
        fileSize = this.response.byteLength;
        buffer = this.response;
        xhr.removeEventListener("load", onload, false);
        xhr.removeEventListener("error", onerror, false);
        this.response = xhr = e.target = null;
        return decode(), false;
    }
    function onerror () {
        numberOfTimes = 0;
        numSpam.innerHTML = mbSpan.innerHTML = "ERROR";
        console.log("error loading/decoding data");
    }
    function onclick () {
        xhr.open("GET", fileName, true);
        xhr.responseType = "arraybuffer";
        xhr.addEventListener("load", onload, false);
        xhr.addEventListener("error", onerror, false);
        xhr.send(null);
    }
    document.querySelector(".start")
        .addEventListener("createTouch" in document ? "touchstart" : "mousedown", onclick);
})();

