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
