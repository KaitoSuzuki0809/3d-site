'use strict';

import * as THREE from './build/three.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { EffectComposer } from "./jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "./jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "./jsm/postprocessing/UnrealBloomPass.js";

const bloomParams = {
    /** トーンマッピング: 露光量 */
    exposure: 1.0,
    /** 発光エフェクト: 強さ */
    bloomStrength: 10.0,
    /** 発光エフェクト: 半径 */
    bloomRadius: 1,
    /** 発光エフェクト: 閾値 */
    bloomThreshold: 0.0,
};

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

const canvas = document.getElementById("bloomElement");
const canvasElement = $('#bloomElement');
// const canvasFire = $('#fireElement');
let invert = 1;
let topOpacity = 0;
let mainPhilOpacity = 0;
let subPhilOpacity = 0;
let endOpacity = 1;
let headerLogo = $('.site-header-logo img');
let headerContact = $('#header-contact');
let kiras;
const philImages = $('#philImages');
let philImagesPosition = 100; // パーセント

init();

function init() {
    // シーンの追加
    const scene = new THREE.Scene();

    // カメラの追加
    const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
      );
    camera.position.z = 6;

    // レンダラーの追加
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight); // サイズ調整
    // parentElement.appendChild(renderer.domElement); // レンダリングしたいDOM要素と紐付け


    // Canvasのサイズを変更する関数
    function resizeCanvas() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height); // Canvasのサイズを変更
        camera.aspect = width / height; // カメラのアスペクト比を更新
        camera.updateProjectionMatrix(); // カメラのプロジェクション行列を更新
    }

    // ウィンドウのリサイズイベントリスナーを追加
    window.addEventListener('resize', resizeCanvas);

    // エフェクト: 通常レンダリング
    const renderPass = new RenderPass(scene, camera);

    // エフェクト: 発光エフェクト
    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
        bloomParams.bloomStrength,
        bloomParams.bloomRadius,
        bloomParams.bloomThreshold,
    );

    // エフェクトのセットアップ
    const effectComposer = new EffectComposer(renderer);
    effectComposer.addPass(renderPass);
    effectComposer.addPass(bloomPass);
    effectComposer.setSize(canvas.clientWidth, canvas.clientHeight);

    kiras = makeKira(scene);
    makeStartingLight(scene);

    /**
     * 線形補間
     * lerp(min, max, ratio)
     * eg,
     * lerp(20, 60, .5)) = 40
     * lerp(-20, 60, .5)) = 20
     * lerp(20, 60, .75)) = 50
     * lerp(-20, -10, .1)) = -.19
     */
    function lerp(x, y, a) {
        return (1 - a) * x + a * y;
    }

    /**
     * 特定のスクロール率で開始、終了
     **/
    function scaleParcent(start, end) {
        return (scrollPercent - start) / (end - start);
    }

    /**
     * 関数用の空の配列を準備
     */
    const animationScripts = [];

    /**
     * 初期表示
     */
    animationScripts.push({
        start: 0,
        end: 5,
        function() {
            viewTopCanvases();
            // 社名表示
            TextTypingAnime();

            kiras.forEach(kira => {
                if (kira.mat.position.x != 0) {
                    outParticle(kira);
                }
            });

            if (topOpacity < 1) {
                topOpacity += 0.05;
                $('.scrolldown3').css('opacity', topOpacity);
            }

            viewDownPhilElements();

            // プログレスバーを白に変更
            $('#progressGuide').css('border-left', '1px solid gray');
            $('#progressPercent').css('border-left', '1px solid white');
            $('#progressNav li').css('color', 'white');

            endOpacity = 1;
            philImagesPosition = 100;
            resetGroupCompanies();
            scrolledByUnder = false;
            $('splash').css('opacity', 0);
            $('#ceoIntroduction').css('display', 'none');
            $('#infoContact').css('opacity', 0);
            infoContactOpacity = 0;
            $('#infoContact').css('z-index', 6);
            $('#footer').css('opacity', 0);
        },
    });

    // パーティクル数のみ違うアニメーションのループ
    function loopAnimation(start, end, particleLength) {
        animationScripts.push({
            start: start,
            end: end,
            function() {
                 // プログレスバーを白に変更
                $('#progressGuide').css('border-left', '1px solid gray');
                $('#progressPercent').css('border-left', '1px solid white');
                $('#progressNav li').css('color', 'white');

                moveParticles(particleLength);

                viewTopCanvases();
                viewUpTopElements();
                viewDownPhilElements();
                // 社名表示
                // $('.corp-name').css('display', 'block');
                // $('.corp-name').fadeIn();
                TextTypingAnime();

                endOpacity = 1;
                philImagesPosition = 100;
                resetGroupCompanies();
                scrolledByUnder = false;
                $('splash').css('opacity', 0);
                $('#ceoIntroduction').css('display', 'none');
                $('#infoContact').css('opacity', 0);
                infoContactOpacity = 0;
                $('#infoContact').css('z-index', 6);
                $('#footer').css('opacity', 0);
            },
        });
    }

    loopAnimation(5, 10, 100);
    loopAnimation(10, 15, 150);
    loopAnimation(15, 20, 200);

    /**
     * メイン経営理念の表示
     */
    animationScripts.push({
        start: 20,
        end: 30,
        function() {
            // プログレスバーを白に変更
            $('#progressGuide').css('border-left', '1px solid gray');
            $('#progressPercent').css('border-left', '1px solid white');
            $('#progressNav li').css('color', 'white');

            moveParticles(300);
            viewTopCanvases();

            // 社名をフェードアウト
            $('.corp-name').fadeOut();

            if (topOpacity < 1) {
                topOpacity += 0.05;
                $('.scrolldown3').css('opacity', topOpacity);
            }

            // メイン経営理念表示
            if (mainPhilOpacity < 1) {
                mainPhilOpacity += 0.05;
                $('.phil-main').css('opacity', mainPhilOpacity);

                setTimeout(function(){
                    $('.phil-main').addClass('line-on');
                }, 750);
            }

            // サブ経営理念非表示
            if (subPhilOpacity > 0) {
                subPhilOpacity -= 0.05;
                $('.phil-sub').css('opacity', subPhilOpacity);
                philImages.css('opacity', subPhilOpacity);
            }

            // viewDownPhilElements();


            endOpacity = 1;
            philImagesPosition = 100;
            resetGroupCompanies();
            scrolledByUnder = false;
            $('splash').css('opacity', 0);
            $('#ceoIntroduction').css('display', 'none');
            $('#infoContact').css('opacity', 0);
            infoContactOpacity = 0;
            $('#infoContact').css('z-index', 6);
            $('#footer').css('opacity', 0);
        },
    })

    /**
     * サブ経営理念の表示
     */
    animationScripts.push({
        start: 30,
        end: 40,
        function() {
            // プログレスバーを白に変更
            $('#progressGuide').css('border-left', '1px solid gray');
            $('#progressPercent').css('border-left', '1px solid white');
            $('#progressNav li').css('color', 'white');

            moveParticles(200);
            viewTopCanvases();
            viewUpTopElements();

            // メイン経営理念非表示
            if (mainPhilOpacity > 0) {
                mainPhilOpacity -= 0.5;
                $('.phil-main').css('opacity', mainPhilOpacity);
            }

            // サブ経営理念表示
            if (subPhilOpacity < 1) {
                subPhilOpacity += 0.05;
                $('.phil-sub').css('opacity', subPhilOpacity);
                // 画像表示
                philImages.css('opacity', subPhilOpacity);

                // 一時的にoff
                // setTimeout(function() {
                //     $('.marker').addClass('on');
                // }, 1500);

                // philImages.fadeIn();
            }

            // 画像移動
            philImagesPosition -= 0.5;
            // philImagesPosition = 5;
            philImages.css('top', philImagesPosition);


            // 社名をフェードアウト
            $('.corp-name').fadeOut();

            endOpacity = 1;

            if (invert > 0) {
                invert -= 2;
                headerLogo.css('filter', 'invert(' + invert + '%)');
                headerContact.css('filter', 'invert(' + invert + '%)');
            }

            resetGroupCompanies();
            $('body').removeClass('appear');
            $('splash').css('opacity', 0);
            scrolledByUnder = false;
            $('#ceoIntroduction').css('display', 'none');
            $('#infoContact').css('opacity', 0);
            infoContactOpacity = 0;
            $('#infoContact').css('z-index', 6);
            $('#footer').css('opacity', 0);
        },
    })

    let company1FadeOutOpacity = 0;
    let company2FadeOutOpacity = 0;
    let company3FadeOutOpacity = 0;
    let company4FadeOutOpacity = 0;
    let scrolledByUnder = false;

    /**
     * 会社１（株式会社Eureka Holdings）紹介
     */
    animationScripts.push({
        start: 40,
        end: 50,
        function() {
            if (endOpacity > 0) {
                endOpacity -= 0.05;
                canvasElement.css('opacity', endOpacity);
                // canvasFire.css('opacity', endOpacity);
                $('.corp-name').css('opacity', endOpacity);
                $('.scrolldown3').css('opacity', endOpacity);
                $('.phil-sub').css('opacity', endOpacity);
                philImages.css('opacity', endOpacity);
            }
            moveParticles(0);

            // ヘッダーを白にする
            if (invert < 100) {
                invert += 2;
                headerLogo.css('filter', 'invert(' + invert + '%)');
                headerContact.css('filter', 'invert(' + invert + '%)');
            }

            // 経営理念非表示
            if (mainPhilOpacity > 0) {
                mainPhilOpacity -= 0.05;
                $('.phil-main').css('opacity', mainPhilOpacity);
            }

            if (endOpacity < 0 && mainPhilOpacity < 0) {
                // 白にフェード
                $('splash').css('opacity', 1);
                $("#splash").fadeOut('slow',function() {
                    $('body').addClass('appear')

                    // プログレスバーを黒に変更
                    $('#progressGuide').css('border-left', '1px solid gainsboro');
                    $('#progressPercent').css('border-left', '1px solid black');
                    $('#progressNav li').css('color', 'black');
                });
            }

            if (!$('#company1 .corporate-name').hasClass('fadeIn')) {
                if (scrolledByUnder) {
                    // 下からのスクロール対応
                    setTimeout(() => {
                        $('#company1 .corporate-name').addClass('fadeIn');
                        $('#company1 .about-us').addClass('fadeIn');

                        setTimeout(function(){
                            $('#company1 .strength').addClass('fadeIn');
                            $('#company1 .corporate-philosophy').addClass('fadeIn');
                        }, 500);
                    }, 500);
                } else {
                    // 上からのスクロール対応
                    setTimeout(() => {
                        $('#company1 .corporate-name').addClass('fadeIn');
                        $('#company1 .about-us').addClass('fadeIn');

                        setTimeout(function(){
                            $('#company1 .strength').addClass('fadeIn');
                            $('#company1 .corporate-philosophy').addClass('fadeIn');
                        }, 500);
                    }, 2200);
                }
            }

            company1FadeOutOpacity = 1;
            fadeOutCompany(1);

            topOpacity = 0;
            subPhilOpacity = 0;
            philImagesPosition = 100;
            $('#ceoIntroduction').css('display', 'none');
            $('#infoContact').css('opacity', 0);
            infoContactOpacity = 0;
            $('#infoContact').css('z-index', 6);
            $('#footer').css('opacity', 0);
        },
    })

    /**
     * 会社２（株式会社Eureka）紹介
     */
    animationScripts.push({
        start: 50,
        end: 60,
        function() {
            // プログレスバーを黒に変更
            $('#progressGuide').css('border-left', '1px solid gainsboro');
            $('#progressPercent').css('border-left', '1px solid black');
            $('#progressNav li').css('color', 'black');

            if (endOpacity > 0) {
                endOpacity -= 0.03;
                canvasElement.css('opacity', endOpacity);
                // canvasFire.css('opacity', endOpacity);
                $('.corp-name').css('opacity', endOpacity);
                $('.scrolldown3').css('opacity', endOpacity);
                $('.phil-sub').css('opacity', endOpacity);
                philImages.css('opacity', endOpacity);
            }
            moveParticles(0);

            // 経営理念非表示
            if (mainPhilOpacity > 0) {
                mainPhilOpacity -= 0.05;
                $('.phil-main').css('opacity', mainPhilOpacity);
            }

            if (endOpacity < 0 && mainPhilOpacity < 0) {
                // 白にフェード
                $('splash').css('opacity', 1);
                $("#splash").fadeOut('slow',function() {
                    $('body').addClass('appear');
                });
            }

            // ヘッダーを白にする
            if (invert < 100) {
                invert += 2;
                headerLogo.css('filter', 'invert(' + invert + '%)');
                headerContact.css('filter', 'invert(' + invert + '%)');
            }

            if (endOpacity < 0 && mainPhilOpacity < 0) {
                // 白にフェード
                $('splash').css('opacity', 1);
                $("#splash").fadeOut('slow',function() {
                    $('body').addClass('appear');
                });
            }

            topOpacity = 0;
            subPhilOpacity = 0;
            philImagesPosition = 100;


            company2FadeOutOpacity = 1;

            setTimeout(() => {
                fadeInCompany(2);
            }, 500);

            fadeOutCompany(2);
            scrolledByUnder = true;
            $('#ceoIntroduction').css('display', 'none');
            $('#infoContact').css('opacity', 0);
            infoContactOpacity = 0;
            $('#infoContact').css('z-index', 6);
            $('#footer').css('opacity', 0);
        },
    })

    /**
     * 会社３（株式会社Enigma）紹介
     */
    animationScripts.push({
        start: 60,
        end: 70,
        function() {
            // プログレスバーを黒に変更
            $('#progressGuide').css('border-left', '1px solid gainsboro');
            $('#progressPercent').css('border-left', '1px solid black');
            $('#progressNav li').css('color', 'black');

            if (endOpacity > 0) {
                endOpacity -= 0.03;
                canvasElement.css('opacity', endOpacity);
                // canvasFire.css('opacity', endOpacity);
                $('.corp-name').css('opacity', endOpacity);
                $('.scrolldown3').css('opacity', endOpacity);
                $('.phil-sub').css('opacity', endOpacity);
                philImages.css('opacity', endOpacity);
            }
            moveParticles(0);

            // 経営理念非表示
            if (mainPhilOpacity > 0) {
                mainPhilOpacity -= 0.05;
                $('.phil-main').css('opacity', mainPhilOpacity);
            }

            if (endOpacity < 0 && mainPhilOpacity < 0) {
                // 白にフェード
                $('splash').css('opacity', 1);
                $("#splash").fadeOut('slow',function() {
                    $('body').addClass('appear');
                });
            }

            // ヘッダーを白にする
            if (invert < 100) {
                invert += 2;
                headerLogo.css('filter', 'invert(' + invert + '%)');
                headerContact.css('filter', 'invert(' + invert + '%)');
            }

            if (endOpacity < 0 && mainPhilOpacity < 0) {
                // 白にフェード
                $('splash').css('opacity', 1);
                $("#splash").fadeOut('slow',function() {
                    $('body').addClass('appear');
                });
            }

            topOpacity = 0;
            subPhilOpacity = 0;
            philImagesPosition = 100;

            company3FadeOutOpacity = 1;

            setTimeout(() => {
                fadeInCompany(3);
            }, 500);

            fadeOutCompany(3);
            scrolledByUnder = true;
            $('#ceoIntroduction').css('display', 'none');
            $('#infoContact').css('opacity', 0);
            infoContactOpacity = 0;
            $('#infoContact').css('z-index', 6);
            $('#footer').css('opacity', 0);
        },
    })

    /**
     * 会社４（株式会社EDEN）紹介
     */
    animationScripts.push({
        start: 70,
        end: 80,
        function() {
            // プログレスバーを黒に変更
            $('#progressGuide').css('border-left', '1px solid gainsboro');
            $('#progressPercent').css('border-left', '1px solid black');
            $('#progressNav li').css('color', 'black');

            if (endOpacity > 0) {
                endOpacity -= 0.03;
                canvasElement.css('opacity', endOpacity);
                // canvasFire.css('opacity', endOpacity);
                $('.corp-name').css('opacity', endOpacity);
                $('.scrolldown3').css('opacity', endOpacity);
                $('.phil-sub').css('opacity', endOpacity);
                philImages.css('opacity', endOpacity);
            }
            moveParticles(0);

            // 経営理念非表示
            if (mainPhilOpacity > 0) {
                mainPhilOpacity -= 0.05;
                $('.phil-main').css('opacity', mainPhilOpacity);
            }

            if (endOpacity < 0 && mainPhilOpacity < 0) {
                // 白にフェード
                $('splash').css('opacity', 1);
                $("#splash").fadeOut('slow',function() {
                    $('body').addClass('appear');
                });
            }

            // ヘッダーを白にする
            if (invert < 100) {
                invert += 2;
                headerLogo.css('filter', 'invert(' + invert + '%)');
                headerContact.css('filter', 'invert(' + invert + '%)');
            }

            if (endOpacity < 0 && mainPhilOpacity < 0) {
                // 白にフェード
                $('splash').css('opacity', 1);
                $("#splash").fadeOut('slow',function() {
                    $('body').addClass('appear');
                });

            }
            // 黒フェードの要素を戻す
            $('splash-2').css('opacity', 0);
            $('body').removeClass('appear-2');

            topOpacity = 0;
            subPhilOpacity = 0;
            philImagesPosition = 100;

            company4FadeOutOpacity = 1;

            setTimeout(() => {
                fadeInCompany(4);
            }, 500);

            fadeOutCompany(4);
            scrolledByUnder = true;
            $('#ceoIntroduction').css('display', 'none');
            $('#infoContact').css('opacity', 0);
            infoContactOpacity = 0;
            $('#infoContact').css('z-index', 6);
            $('#footer').css('opacity', 0);
        },
    });

    /**
     * CEOの紹介
     */
    animationScripts.push({
        start: 80,
        end: 89,
        function() {
            if (endOpacity > 0) {
                endOpacity -= 0.03;
                canvasElement.css('opacity', endOpacity);
                $('.corp-name').css('opacity', endOpacity);
                $('.scrolldown3').css('opacity', endOpacity);
                $('.phil-sub').css('opacity', endOpacity);
                philImages.css('opacity', endOpacity);
            }
            moveParticles(0);

            // 経営理念非表示
            if (mainPhilOpacity > 0) {
                mainPhilOpacity -= 0.05;
                $('.phil-main').css('opacity', mainPhilOpacity);
            }

            topOpacity = 0;
            subPhilOpacity = 0;
            philImagesPosition = 100;


            fadeOutCompany(4);
            // 白にフェード
            $('#splash-2').css('opacity', 1);
            $("#splash-2").fadeOut('slow',function() {
                $('body').removeClass('appear');
                $('body').addClass('appear-2');

                // プログレスバーを白に変更
                $('#progressGuide').css('border-left', '1px solid gray');
                $('#progressPercent').css('border-left', '1px solid white');
                $('#progressNav li').css('color', 'white');

                // ceo紹介の表示
                $('#ceoIntroduction').css('display', 'block');
            });


            // 白フェードの要素を戻す
            $('splash').css('opacity', 0);

            // ヘッダーを黒にする
            if (invert > 0) {
                invert -= 2;
                headerLogo.css('filter', 'invert(' + invert + '%)');
                headerContact.css('filter', 'invert(' + invert + '%)');
            }

            scrolledByUnder = true;
            $('#infoContact').css('opacity', 0);
            $('#infoContact').css('z-index', 6);
            infoContactOpacity = 0;
            $('#footer').css('opacity', 0);
        },
    })

    let infoContactOpacity = 0;
    /**
     * 会社情報とお問い合わせ
     */
    animationScripts.push({
        start: 90,
        end: 101,
        function() {
            // プログレスバーを白に変更
            $('#progressGuide').css('border-left', '1px solid gray');
            $('#progressPercent').css('border-left', '1px solid white');
            $('#progressNav li').css('color', 'white');

            if (endOpacity > 0) {
                endOpacity -= 0.03;
                canvasElement.css('opacity', endOpacity);
                $('.corp-name').css('opacity', endOpacity);
                $('.scrolldown3').css('opacity', endOpacity);
                $('.phil-sub').css('opacity', endOpacity);
                philImages.css('opacity', endOpacity);
            }
            moveParticles(0);

            // 経営理念非表示
            if (mainPhilOpacity > 0) {
                mainPhilOpacity -= 0.05;
                $('.phil-main').css('opacity', mainPhilOpacity);
            }

            topOpacity = 0;
            subPhilOpacity = 0;
            philImagesPosition = 100;

            fadeOutCompany();
            scrolledByUnder = true;

            // 黒にフェード
            $('splash-2').css('opacity', 1);
            $("#splash-2").fadeOut('slow',function() {
                $('body').addClass('appear-2');
            });

            // 白フェードの要素を戻す
            $('splash').css('opacity', 0);
            $('body').removeClass('appear');

            // ヘッダーを黒にする
            if (invert > 0) {
                invert -= 2;
                headerLogo.css('filter', 'invert(' + invert + '%)');
                headerContact.css('filter', 'invert(' + invert + '%)');
            }

            // 社長紹介の非表示
            $('#ceoIntroduction').css('display', 'none');

            // 会社情報・contact表示
            if (infoContactOpacity < 1) {
                infoContactOpacity += 0.05;
                $('#infoContact').css('opacity', infoContactOpacity);
                $('#footer').css('opacity', infoContactOpacity);
            }
            $('#infoContact').css('z-index', 7);

            // フッターの表示
        },
    })

    function fadeInCompany(number) {
        $('#company' + number + ' .corporate-name').addClass('fadeIn');
        $('#company' + number + ' .strength').addClass('fadeIn');

        setTimeout(function() {
            $('#company' + number + ' .about-us').addClass('fadeIn');
            $('#company' + number + ' .corporate-philosophy').addClass('fadeIn');
        }, 500);

    }

    function fadeOutCompany(exit_number) {
        if (exit_number != 1) {
            if (company1FadeOutOpacity > 0) {
                company1FadeOutOpacity -= 0.3;
                $('#company1 .corporate-name').css('opacity', company1FadeOutOpacity);
                $('#company1 .strength').css('opacity', company1FadeOutOpacity);
                $('#company1 .corporate-philosophy').css('opacity', company1FadeOutOpacity);
                $('#company1 .about-us').css('opacity', company1FadeOutOpacity);
            }

            $('#company1 .corporate-name').removeClass('fadeIn');
            $('#company1 .about-us').removeClass('fadeIn');
            $('#company1 .strength').removeClass('fadeIn');
            $('#company1 .corporate-philosophy').removeClass('fadeIn');
        }

        if (exit_number != 2) {
            if (company2FadeOutOpacity > 0) {
                company2FadeOutOpacity -= 0.3;
                $('#company2 .corporate-name').css('opacity', company2FadeOutOpacity);
                $('#company2 .strength').css('opacity', company2FadeOutOpacity);
                $('#company2 .corporate-philosophy').css('opacity', company2FadeOutOpacity);
                $('#company2 .about-us').css('opacity', company2FadeOutOpacity);
            }

            $('#company2 .corporate-name').removeClass('fadeIn');
            $('#company2 .about-us').removeClass('fadeIn');
            $('#company2 .strength').removeClass('fadeIn');
            $('#company2 .corporate-philosophy').removeClass('fadeIn');
        }

        if (exit_number != 3) {
            if (company3FadeOutOpacity > 0) {
                company3FadeOutOpacity -= 0.3;
                $('#company3 .corporate-name').css('opacity', company3FadeOutOpacity);
                $('#company3 .strength').css('opacity', company3FadeOutOpacity);
                $('#company3 .corporate-philosophy').css('opacity', company3FadeOutOpacity);
                $('#company3 .about-us').css('opacity', company3FadeOutOpacity);
            }

            $('#company3 .corporate-name').removeClass('fadeIn');
            $('#company3 .about-us').removeClass('fadeIn');
            $('#company3 .strength').removeClass('fadeIn');
            $('#company3 .corporate-philosophy').removeClass('fadeIn');
        }

        if (exit_number != 4) {
            if (company4FadeOutOpacity > 0) {
                company4FadeOutOpacity -= 0.3;
                $('#company4 .corporate-name').css('opacity', company4FadeOutOpacity);
                $('#company4 .strength').css('opacity', company4FadeOutOpacity);
                $('#company4 .corporate-philosophy').css('opacity', company4FadeOutOpacity);
                $('#company4 .about-us').css('opacity', company4FadeOutOpacity);
            }

            $('#company4 .corporate-name').removeClass('fadeIn');
            $('#company4 .about-us').removeClass('fadeIn');
            $('#company4 .strength').removeClass('fadeIn');
            $('#company4 .corporate-philosophy').removeClass('fadeIn');
        }
    }


    /**
     * スクロールアニメーション開始
     */
    function playScrollAnimation() {
        animationScripts.forEach((animation) => {
            if (scrollPercent >= animation.start && scrollPercent < animation.end) {
                animation.function();
            }
        });
    }

    /**
     * ブラウザのスクロール率を導出
     */
    let scrollPercent = 0;
    let progressHeight = 0;

    document.body.onscroll = () => {
        //現在のスクロールの進捗をパーセントで計算する
        scrollPercent =
        (document.documentElement.scrollTop /
            (document.documentElement.scrollHeight -
            document.documentElement.clientHeight)) *
        100;
        // console.log(document.documentElement.scrollTop); //一番上からの距離
        // console.log(document.documentElement.scrollHeight); //5029
        // console.log(document.documentElement.clientHeight); //927
        // console.log(Math.floor(scrollPercent)); //0~100%で取得
        if (Math.floor(scrollPercent) <= 20) {
            progressHeight = lerp(0, 20, scaleParcent(0, 20));
        } else if (Math.floor(scrollPercent) <= 40) {
            progressHeight = lerp(20, 40, scaleParcent(20, 40));
        } else if (Math.floor(scrollPercent) <= 80) {
            progressHeight = lerp(40, 60, scaleParcent(40, 80));
        } else if (Math.floor(scrollPercent) <= 90) {
            progressHeight = lerp(60, 80, scaleParcent(80, 90));
        } else if (Math.floor(scrollPercent) <= 100) {
            progressHeight = lerp(80, 100, scaleParcent(90, 100));
        }

        $('#progressPercent').css('height', progressHeight + '%');
    };

    // const Controls = new OrbitControls(camera, renderer.domElement); // マウス操作
    // setHelper(scene); // グリッドヘルパーの表示

    // レンダリングループ
    function animate() {
        requestAnimationFrame(animate);
        playScrollAnimation();

        renderer.render(scene, camera);
        effectComposer.render();
    }

    animate();

    //ブラウザのリサイズ操作
    window.addEventListener("resize", () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    // beforeunload : 更新直前にイベント処理
    window.addEventListener('unload', (e) => {
        scrollPercent = 0;
        location.reload();
    });
}

function setHelper(scene) {
    // GridHelper
    const gridHelper = new THREE.GridHelper(200, 10);
    scene.add(gridHelper);

    // AxesHelper
    const axesHelper = new THREE.AxesHelper(180);
    scene.add(axesHelper);
}

function viewTopCanvases() {
    canvasElement.css('display', 'block');
    canvasElement.css('opacity', 1);
    // canvasFire.css('display', 'block');
    // canvasFire.css('opacity', 1);
    headerLogo.css('filter', 'invert(0%)');
    headerContact.css('filter', 'invert(0%)');
}

function viewUpTopElements() {
    if (topOpacity < 1) {
        topOpacity += 0.05;
        $('.corp-name').css('opacity', topOpacity);
        $('.scrolldown3').css('opacity', topOpacity);
    }
}

function viewDownPhilElements() {
    if (mainPhilOpacity > 0) {
        mainPhilOpacity -= 0.05;
        $('.phil-main').css('opacity', mainPhilOpacity);
    }

    if (subPhilOpacity > 0) {
        subPhilOpacity -= 0.05;
        $('.phil-sub').css('opacity', subPhilOpacity);
        philImages.css('opacity', subPhilOpacity);
    }
}

function makeStartingLight(scene) {
    // const sphereSize = 0.01 + Math.random() * 0.05; // 0.01から0.1までのランダムな値を生成
    const startingLightGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const startingLightMaterial = new THREE.MeshNormalMaterial();
    const startingLightMesh = new THREE.Mesh(startingLightGeometry, startingLightMaterial);
    startingLightMesh.position.y = -3;

    scene.add(startingLightMesh);
}

function makeKira(scene) {
    let kiras = [];
    const length = 300;

    for (let i = 0; i < length; i++) {

        // // 初期位置
        // const x = Math.random() * (20 - -20) + -20;
        // // const x = 0
        // const y = -10;
        // const z = Math.random() * (20 - -20) + -40;
        // const vec = new THREE.Vector3(x, y, z);

        // ライフ
        const life = Math.floor(Math.random() * (400 - 40)) + 40;

        // スピード
        const speed = Math.random() * (0.15 - 0.05) + 0.02;

        // マテリアル
        // const mat = new THREE.SpriteMaterial({map: new THREE.TextureLoader().load(imagePath + 'circle-1.png')});
        const sphereSize = 0.01 + Math.random() * 0.05; // 0.01から0.1までのランダムな値を生成
        const geometry = new THREE.SphereGeometry(sphereSize, 32, 32);
        const material = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -3;

        // キラキラ
        const max = 10;
        const min = -10;

        const kira = {
            'mat' : mesh,
            'life' : life,
            'startLife' : life,
            'speed' : speed,
            'random' : Math.floor(Math.random() * (max - min + 1)) + min, // maxからminまでの数値をランダムで取得
            'x' : (Math.random() < 0.7 ? 1 : -1) * 0.07,
        };

        scene.add(mesh);
        kiras.push(kira);
    }

    return kiras;
}

function moveParticles(maxParticles) {
    const startParticle = 0;
    const endParticle = maxParticles;

    // パーティクルの表示
    for (let i = startParticle; i < endParticle; i++) {
        kiras[i].mat.position.x += kiras[i].x + kiras[i].speed / kiras[i].random;
        // kiras[i].mat.position.x += kiras[i].random ;
        kiras[i].mat.position.y += kiras[i].speed;
        // kiras[i].mat.position.y += kiras[i].random ;
        kiras[i].mat.scale.set(1, 1, 1);
        kiras[i].life -= 1;
        if (kiras[i].life <= 0) {
            kiras[i].mat.position.x= 0;
            kiras[i].mat.position.y = -3;
            kiras[i].life = kiras[i].startLife;
        }
    }

    // パーティクルの非表示
    for (let i = endParticle; i < 300; i++) {
        if (kiras[i].mat.position.x != 0) {
            kiras[i].mat.position.x += kiras[i].x + kiras[i].speed / kiras[i].random;
            kiras[i].mat.position.y += kiras[i].speed;
            kiras[i].life -= 1;
        }
    }
}

function updateParticle(kira) {
    kira.mat.position.x += kira.x + kira.speed / kira.random;
    kira.mat.position.y += kira.speed;
    kira.mat.scale.set(1, 1, 1);
    kira.life -= 1;
    if (kira.life <= 0) {
        kira.mat.position.x= 0;
        kira.mat.position.y = -3;
        kira.life = kira.startLife;
    }
}

function outParticle(kira) {
    kira.mat.position.x += kira.x + kira.speed / kira.random;
    kira.mat.position.y += kira.speed;
    kira.life -= 1;
}

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
});

function resetGroupCompanies() {
    for (let i=1; i < 5; i++) {
        $('#company' + i + ' .corporate-name').removeClass('fadeIn');
        $('#company' + i + ' .strength').removeClass('fadeIn');
        $('#company' + i + ' .corporate-philosophy').removeClass('fadeIn');
        $('#company' + i + ' .about-us').removeClass('fadeIn');

        $('#company' + i + ' .corporate-name').css('opacity', 0);
        $('#company' + i + ' .strength').css('opacity', 0);
        $('#company' + i + ' .corporate-philosophy').css('opacity', 0);
        $('#company' + i + ' .about-us').css('opacity', 0);
    }
}