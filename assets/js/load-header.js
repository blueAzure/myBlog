$(function () {
    var header = document.getElementById("header");
    $.ajax({
        url: "assets/header.html",
        success: function (data) {
            header.innerHTML += data;
        },
        error: function () {
            window.alert("can't read header.html")
        }
    });
});