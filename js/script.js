//★ブラウザの言語設定を取得する関数
var browserLanguage = function() {
  var ua = window.navigator.userAgent.toLowerCase();
  try {
    // chrome
    if( ua.indexOf( 'chrome' ) != -1 ){
      return ( navigator.languages[0] || navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
    }
    // それ以外
    else{
      return ( navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2);
    }
  }
  catch( e ) {
    return undefined;
  }
}

//★URLのパラメータを取得する取得する関数（パラメータの配列を返却）
function getParam() {
  // URLのパラメータを取得
  var urlParam = location.search.substring(1);

  // URLにパラメータが存在する場合
  if(urlParam) {
    // 「&」が含まれている場合は「&」で分割
    var param = urlParam.split('&');

    // パラメータを格納する用の配列を用意
    var paramArray = [];

    // 用意した配列にパラメータのKey-Valueペアを格納
    for (i = 0; i < param.length; i++) {
      var paramItem = param[i].split('=');
      paramArray[paramItem[0]] = paramItem[1];
    }

    // パラメータのKey-Valueペアを格納した配列を返す
    return paramArray;

  } else {
    //パラメータがなかったら何もしない
    return false;
  }

}

//★言語の切り替え処理をする関数
function setLang(lang) {

  //現在のURLを取得
  var url = location.href;
  //URLに含まれるパラメーターを配列として取得
  var param = getParam();

  //☆ URLのパラメーターを差し替える処理

  // URLにパラメータが存在する場合
  if(param) {
    if(param.lang) {
      //パラメータにlang=**が含まれていたら指定された言語に置換
      url_relpace = url.replace(/lang=[a-z]{2}/, 'lang=' + lang);
      history.replaceState(null,null, url_relpace);
    } else {
      //パラメータにlang=**が含まれていなかったら、末尾に指定された言語のパラメータを追加
      history.replaceState(null,null, url + '&lang=' + lang);
    }
  } else {
    //パラメータがなかったら、末尾に指定された言語のパラメータを追加
    history.replaceState(null,null, url + '?lang=' + lang);
  }

  //☆ 言語のラジオボタンを切り替える処理

  if(lang == 'ja') {
    $('#btn_ja').addClass('active');
    $('#radio_ja').prop('checked', true);
    $('#btn_en').removeClass('active');
    $('#radio_en').prop('checked', false);
  } else {
    $('#btn_ja').removeClass('active');
    $('#radio_ja').prop('checked', false);
    $('#btn_en').addClass('active');
    $('#radio_en').prop('checked', true);
  }

  //☆ 最大文字数とテキストエリアを初期化

  if(lang == 'ja') {
    initForm('140');
  } else {
    initForm('280');
  }

  //☆ ヘルプのリンク先を設定

  if(lang == 'ja') {
    $('#help_link').attr('href', 'https://github.com/littlebirdjp/tweet-pad/blob/master/README_ja.md');
  } else {
    $('#help_link').attr('href', 'https://github.com/littlebirdjp/tweet-pad/');
  }

}

//★テキストエリアを空にして残り文字数を初期化する処理
function initForm(num) {

  //☆テキストエリアの入力内容を削除する処理
  $('#textarea').val('');

  //☆残り文字数を初期化する処理
  $('#result').text(num);

  //本文を空にしたツイートリンクを生成してページに挿入
  var tweet_link= '<a href="https://twitter.com/intent/tweet?text=" target="_blank" class="btn btn-primary"><i class="fe fe-twitter"></i> Tweet</a>';
  $('#tweet').html(tweet_link);

}

//★ページをロードした時に実行する処理

//URLに含まれるパラメーターを配列として取得
var param = getParam();

//パラメータにdebug=trueが含まれていたら「Test」ボタンを表示
if(param.debug == 'true') {
  var debug_button = '<button id="test" class="btn btn-primary"><i class="fe fe-bug"></i> Test</button>';
  $('#debug').html(debug_button);
}

//ブラウザの言語設定を取得
var lang = browserLanguage();

if(lang == 'ja' || lang == 'zh' || lang == 'ko' ) {
  //ブラウザの言語が日本語・中国語・韓国語だったら、日本語モードに設定
  setLang('ja');
} else {
  //ブラウザの言語がそれ以外だったら、英語モードに設定
  setLang('en');
}

//★テキストエリアに文字を入力する度に実行する関数
$('#textarea').on('input', function () {

  //☆残り文字数を計算して表示する処理

  //URLに含まれるパラメーターを配列として取得
  var param = getParam();

  if(param.lang == 'ja') {
    //Twitterに投稿できる最大文字数
    var max_count = 140;
    //1URL毎に短縮される文字数
    var url_count = 11.5;
  } else {
    //Twitterに投稿できる最大文字数
    var max_count = 280;
    //1URL毎に短縮される文字数
    var url_count = 23;
  }

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

  if(param.lang == 'ja') {
    //半角0.5文字、全角1文字換算として合計文字数を計算
    //サロゲートペアの数を数えて全体の文字数から引く
    var word_count = (half.length / 2) + full.length - (text_plane.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[]).length;
  } else {
    //半角1文字、全角2文字換算として合計文字数を計算
    //サロゲートペアの数を数えて全体の文字数から引く
    var word_count = half.length + (full.length * 2) - ((text_plane.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[]).length * 2);
  }

  //最大文字数から入力文字数を引いて、残り文字数を計算
  var rest_count = max_count - word_count;
  //計算結果をページ上に表示
  $('#result').text(rest_count);

  //☆入力された文字をリンクに埋め込んでツイートさせる処理

  //ツイート本文用にテキストエリアの内容を改めて取得
  var text_all = $('#textarea').val();
  //ツイート用のリンクタグを生成
  var tweet_link = '<a href="https://twitter.com/intent/tweet?text=' + text_all + '" target="_blank" class="btn btn-primary"><i class="fe fe-twitter"></i> Tweet</a>';
  //生成したリンクタグをページに挿入
  $('#tweet').html(tweet_link);

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

  //URLに含まれるパラメーターを配列として取得
  var param = getParam();

  //☆テキストエリアの入力内容を削除する処理
  $('#textarea').val('');

  //☆ URLのパラメーターに応じて初期化処理を実行
  if(param.lang == 'ja') {
    initForm(140);
  } else {
    initForm(280);
  }

});

//★「Ja」ボタンを押した時に実行する関数
$('#btn_ja').on('click', function () {
  setLang('ja');
});

//★「En」ボタンを押した時に実行する関数
$('#btn_en').on('click', function () {
  setLang('en');
});


//★「Test」ボタンを押した時に実行する関数
$('#test').on('click', function () {

  console.log('test');

});
