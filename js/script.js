$('#textarea').on('input', function () {
  var max_count = 140;
    text = $('#textarea').val(),
    half = text.match(/[a-zA-Z0-9]/g) !== null ? text.match(/[a-zA-Z0-9]/g) : '',
    full = text.match(/[^a-zA-Z0-9]/g) !== null ? text.match(/[^a-zA-Z0-9]/g) : '',
    word_count = (half.length / 2) + full.length,
    rest_count = max_count - word_count,
    tweet= '<a href="https://twitter.com/intent/tweet?text=' + text + '" target="_blank" class="btn btn-primary"><i class="fe fe-twitter"></i> Tweet</a>';
  $("#result").text(rest_count);
  $("#tweet").html(tweet);
});
$('#copy').on('click', function () {
  $('#textarea').select();
  $('#textarea').get(0).setSelectionRange(0,9999);
  document.execCommand('copy');
});
$('#clear').on('click', function () {
  var rest_count = 140,
    tweet= '<a href="https://twitter.com/intent/tweet?text=" target="_blank" class="btn btn-primary"><i class="fe fe-twitter"></i> Tweet</a>';
  $('#textarea').val('');
  $("#result").text(rest_count);
  $("#tweet").html(tweet);
});
