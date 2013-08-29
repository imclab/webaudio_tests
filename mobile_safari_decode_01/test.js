(function () {
    var context = new webkitAudioContext(),
        fileName = "test.aac",
        numberOfTimes = 10000,
        ref = numberOfTimes,
        display = document.querySelector(".num"),
        iOS = !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);

    if (!iOS) {
        display.parentElement.removeChild(display);
        document.body.innerHTML = "Please open this test on an iOS device in mobile safari 6.0 or later.";
        return;
    }
    function noop () {
        console.log("decoded", ref - numberOfTimes);
        return --numberOfTimes && next(), (display.innerHTML = ref - numberOfTimes);
    }
    function onload () {
        context.decodeAudioData(this.response, noop, onerror);
        this.response = null;
    }
    function onerror () {
        numberOfTimes = 0;
        display.innerHTML = "ERROR";
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

