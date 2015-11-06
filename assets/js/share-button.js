/* DOMの読み込み完了後に実行 */
if (window.addEventListener) {
    window.addEventListener("load", loadShareButton, false);
} else {
    window.attachEvent("onload", loadShareButton);
}

/* SNSの共有ボタンのロード */
function loadShareButton() {

    /* 遅延ロードする場合は次の行と、終わりの方にある行のコメント(//)を外す */
    //setTimeout(function(){

    
    /* Twitter share button */
    window.twttr = (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
        t._e = [];
        t.ready = function (f) {
            t._e.push(f);
        };
        return t;
    }(document, "script", "twitter-wjs"));

    
    /* Facebook share button */
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v2.0";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    
    /* Google+ share button */
    var scriptTag = document.createElement("script");
    scriptTag.type = "text/javascript"
    scriptTag.src = "https://apis.google.com/js/platform.js";
    scriptTag.async = true;
    window.___gcfg = {lang: 'en-US'}; /* 日本語fontだと位置がずれるので、英語表記に設定。 */ 
    document.getElementsByTagName("body")[0].appendChild(scriptTag);

    
    /* pocket button */
    (! function (d, i) {
        if (!d.getElementById(i)) {
            var j = d.createElement("script");
            j.id = i;
            j.src = "https://widgets.getpocket.com/v1/j/btn.js?v=1";
            var w = d.getElementById(i);
            d.body.appendChild(j);
        }
    }(document, "pocket-btn-js"));

    //},5000);	//ページを開いて5秒後(5,000ミリ秒後)にシェアボタンを読み込む

}