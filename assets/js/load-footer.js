$(function () {
    var footer = document.getElementById("footer");
    $.ajax({
        url: "assets/footer.html",
        success: function (data) {
            footer.innerHTML += data;
        },
        error: function () {
            window.alert("can't read footer.html")
        }
    });
});