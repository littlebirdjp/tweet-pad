//★テキストエリアに文字を入力する度に実行する関数
$('#textarea').on('input', function () {

  //☆残り文字数を計算して表示する処理

  //Twitterに投稿できる最大文字数
  var max_count = 140;
  //1URL毎に短縮される文字数
  var url_count = 23;
  //テキストエリアに入力された文字列を取得
  var text_plane = $('#textarea').val();
  //URLを識別するための文字パターンを定義
  var url_pattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;
  //text_planeに含まれるURLを取得して配列に代入
  var url_array = text_plane.match(url_pattern);
  //URLが含まれていたら
  if (url_array) {
    for (url in url_array) {
      //text_planeからURLを一つずつ削除
      var text_plane = text_plane.replace(url_array[url], '');
      //最大文字数から1URL分の文字数を減らす
      var max_count = max_count - url_count;
    }
  }
  //残った文字列から半角英数字を取得し、1文字ずつ配列に代入
  var half = text_plane.match(/[a-zA-z0-9!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~\s]/g) !== null ? text_plane.match(/[a-zA-z0-9!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~\s]/g) : '';
  //残った文字列から半角英数字以外（全角文字）を取得し、1文字ずつ配列に代入
  var full = text_plane.match(/[^a-zA-z0-9!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~\s]/g) !== null ? text_plane.match(/[^a-zA-z0-9!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~\s]/g) : '';
  //半角0.5文字、全角1文字換算として合計文字数を計算
  //サロゲートペアの数を数えて全体の文字数から引く
  var word_count = (half.length / 2) + full.length - (text_plane.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[]).length;
  //最大文字数から入力文字数を引いて、残り文字数を計算
  var rest_count = max_count - word_count;
  //計算結果をページ上に表示
  $("#result").text(rest_count);

  //☆入力された文字をリンクに埋め込んでツイートさせる処理

  //ツイート本文用にテキストエリアの内容を改めて取得
  var text_all = $('#textarea').val();
  //ツイート用のリンクタグを生成
  var tweet_link = '<a href="https://twitter.com/intent/tweet?text=' + text_all + '" target="_blank" class="btn btn-primary"><i class="fe fe-twitter"></i> Tweet</a>';
  //生成したリンクタグをページに挿入
  $("#tweet").html(tweet_link);

});

//★「Copy」ボタンを押した時に実行する関数
$('#copy').on('click', function () {

  //テキストエリアに入力された文字列を選択
  $('#textarea').select();
  //iOSの場合うまく選択できないのでその対応
  $('#textarea').get(0).setSelectionRange(0,9999);
  //選択された内容をクリップボードへコピー
  document.execCommand('copy');

});

//★「Clear」ボタンを押した時に実行する関数
$('#clear').on('click', function () {

  //☆テキストエリアの入力内容を削除する処理
  $('#textarea').val('');

  //☆残り文字数を140に戻す処理
  var rest_count = 140;
  $("#result").text(rest_count);

  //本文を空にしたツイートリンクを生成してページに挿入
  var tweet_link= '<a href="https://twitter.com/intent/tweet?text=" target="_blank" class="btn btn-primary"><i class="fe fe-twitter"></i> Tweet</a>';
  $("#tweet").html(tweet_link);

});

//★URLに#dubugのハッシュが付いていたら「Test」ボタンを表示
if("#debug" == location.hash) {
  var debug_button = '<button id="test" class="btn btn-primary"><i class="fe fe-bug"></i> Test</button>'
  $("#debug").html(debug_button);
}

//★「Test」ボタンを押した時に実行する関数
$('#test').on('click', function () {

  console.log('test');

});
