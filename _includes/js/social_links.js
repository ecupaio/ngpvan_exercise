$(document).ready(function (){
	var text = "I'm some text that needs to be encoded"; //Text of tweet
	var urlShare = "{{ site.url }}"; //URL to share on both Facebook and Twitter
	$(".tweet-link").attr("href","https://twitter.com/intent/tweet?text="+ encodeURIComponent(text) +"&url="+ encodeURIComponent(urlShare)); //Tweet Link
	$(".fb-link").attr("href","javascript:share('"+ urlShare +"', 'Fb Share', 'Facebook share popup', 520, 350)"); //Fb Link
});
function share(url, title, descr, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    var app_id = "123142237735444";
    window.open('https://www.facebook.com/dialog/share?href=' + url + '&app_id=' + app_id, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}
