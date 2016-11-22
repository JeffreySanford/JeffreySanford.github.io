var config5 = {
  "id": '582934231082524672',
  "domId": '',
  "maxTweets": 5,
  "enableLinks": true,
  "showUser": true,
  "showTime": true,
  "dateFunction": '',
  "showRetweet": false,
  "customCallback": handleTweets,
  "showInteraction": false
};

function handleTweets(tweets){
    var x = tweets.length;
    var n = 0;
    var element = document.getElementById('twitterPoll');
    var html = '<ul class="list-group">';
    while(n < x) {
      html += '<li class="list-group-item" style="margin-bottom: 20px; box-shadow: 5px 5px 5px #000;">' + tweets[n] + '</li>';
      n++;
    }
    html += '</ul>';
    element.innerHTML = html;
}

twitterFetcher.fetch(config5);
