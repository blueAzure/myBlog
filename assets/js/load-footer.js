$(function () {
    var footer = document.getElementById("footer");
    $.ajax({
        url: "/footer.html",
        success: function (data) {
            footer.innerHTML += data;
        },
        error: function () {
            window.alert("can't read footer.html")
        }
    });
});