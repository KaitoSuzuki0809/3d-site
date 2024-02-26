// TextTypingというクラス名がついている子要素（span）を表示から非表示にする定義
function TextTypingAnime() {
    $('.TextTyping').each(function () {
        var elemPos = $(this).offset().top - 50;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        var thisChild = "";
        if (scroll >= elemPos - windowHeight) {
        thisChild = $(this).children(); //spanタグを取得

        //spanタグの要素の１つ１つ処理を追加
        thisChild.each(function (i) {
            var time = 100;
            //時差で表示する為にdelayを指定しその時間後にfadeInで表示させる
            $(this).delay(time * i).fadeIn(time);
        });
        } else {
        thisChild = $(this).children();
        thisChild.each(function () {
            $(this).stop(); //delay処理を止める
            $(this).css("display", "none"); //spanタグ非表示
        });
        }
    });
}

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    //spanタグを追加する
    var element = $(".TextTyping");
    element.each(function () {
        var text = $(this).html();
        var textbox = "";
        text.split('').forEach(function (t) {
        if (t !== " ") {
            textbox += '<span>' + t + '</span>';
        } else {
            textbox += t;
        }
        });
        $(this).html(textbox);
    });

    TextTypingAnime();
});

// スクロールアニメーション
// 理念（メイン）
$(window).scroll(function() {
    var top = $(".phil-main").offset().top; // ターゲットの位置取得
    var position = top - $(window).height();  // ターゲットが上からスクロールしたときに見える位置
    var position_bottom = top + $(".phil-main").height();  // ターゲットが下からスクロールしたときに見える位置
    if($(window).scrollTop() > position && $(window).scrollTop() < position_bottom){
        // 要素が見えたときの動き
        $('.philosophy').css('animation', 'slide-bg 4s cubic-bezier(0.215, 0.61, 0.355, 1) forwards');
        $('.bg-card').css('animation', 'slide-card 4s cubic-bezier(0.215, 0.61, 0.355, 1) forwards');
        $('.phil-main').addClass('slide-phil');
        $('.phil-main').css('opacity', '1')
        setTimeout(function(){
            $('.phil-main').addClass('line-on');
        }, 1500);
    }else{
        // それ以外の動き
        $('.phil-main').css('opacity', '0')
        $('.phil-main').removeClass('slide-phil');
        $('.phil-main').removeClass('line-on');
    }
});

// 理念（サブ）
$(window).scroll(function() {
    var top = $(".phil-sub").offset().top; // ターゲットの位置取得
    var position = top - $(window).height();  // ターゲットが上からスクロールしたときに見える位置
    var position_bottom = top + $(".phil-sub").height();  // ターゲットが下からスクロールしたときに見える位置
    if($(window).scrollTop() > position && $(window).scrollTop() < position_bottom){
        // 要素が見えたときの動き
        $('.phil-sub').addClass('slide-phil');
        $('.phil-sub').css('opacity', '1')
        setTimeout(function(){
            $('.marker').addClass('on');
        }, 1500);
    }else{
        // それ以外の動き
        $('.phil-sub').css('opacity', '0')
        $('.phil-sub').removeClass('slide-phil');
        $('.marker').removeClass('on');
    }
});

// 画像ホバー時カラー変更
$(document).ready(function(){
    var corporateImages = $('.corporate-image');

    // マウスエンターイベント
    corporateImages.mouseenter(function(){
        $(this).css('filter', 'grayscale(0)');
    });

    corporateImages.mouseleave(function(){
        $(this).css('filter', '');
    });
});
