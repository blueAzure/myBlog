$(function () {
    var header = document.getElementById("header");
    $.ajax({
        url: "/header.html",
        success: function (data) {
            header.innerHTML += data;
        },
        error: function () {
            window.alert("can't read header.html")
        }
    });
});