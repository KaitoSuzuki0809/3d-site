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

    const canvas = document.getElementById("bloomElement");
    const canvasElement = $('#bloomElement');

    const canvasFire = $('#fireElement');

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

    // const spheres = sphere();
    let kiras = makeKira(scene);

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

    let scrollOpacity = 1;
    let topOpacity = 0;
    let philOpacity = 0;
    let endOpacity = 1;

    animationScripts.push({
        start: 0,
        end: 10,
        function() {
            canvasElement.css('display', 'block');
            canvasElement.css('opacity', 1);
            canvasFire.css('display', 'block');
            canvasFire.css('opacity', 1);

            kiras.forEach(kira => {
                if (kira.mat.position.x != 0) {
                    outParticle(kira);
                }
            });

            if (topOpacity < 1) {
                topOpacity += 0.05;
                $('.corp-name').css('opacity', topOpacity);
                $('.scrolldown3').css('opacity', topOpacity);
            }

            if (philOpacity > 0) {
                philOpacity -= 0.05;
                $('.phil-main').css('opacity', philOpacity);
                $('.phil-sub').css('opacity', philOpacity);
            }

            endOpacity = 1;
        },
    });

    animationScripts.push({
        start: 10,
        end: 20,
        function() {
            canvasElement.css('display', 'block');
            canvasElement.css('opacity', 1);
            canvasFire.css('display', 'block');
            canvasFire.css('opacity', 1);

            const startParticle = 0;
            const endParticle = 10;
            for (let i = startParticle; i < endParticle; i++) {
                updateParticle(kiras[i]);
            }

            for (let i = endParticle; i < 200; i++) {
                if (kiras[i].mat.position.x != 0) {
                    outParticle(kiras[i]);
                }
            }

            if (topOpacity < 1) {
                topOpacity += 0.05;
                $('.corp-name').css('opacity', topOpacity);
                $('.scrolldown3').css('opacity', topOpacity);
            }

            if (philOpacity > 0) {
                philOpacity -= 0.05;
                $('.phil-main').css('opacity', philOpacity);
                $('.phil-sub').css('opacity', philOpacity);
            }

            endOpacity = 1;
        },
    });

    animationScripts.push({
        start: 20,
        end: 30,
        function() {
            canvasElement.css('display', 'block');
            canvasElement.css('opacity', 1);
            canvasFire.css('display', 'block');
            canvasFire.css('opacity', 1);

            const startParticle = 0;
            const endParticle = 50;
            for (let i = startParticle; i < endParticle; i++) {
                updateParticle(kiras[i]);
            }

            for (let i = endParticle; i < 200; i++) {
                if (kiras[i].mat.position.x != 0) {
                    outParticle(kiras[i]);
                }
            }

            if (topOpacity < 1) {
                topOpacity += 0.05;
                $('.corp-name').css('opacity', topOpacity);
                $('.scrolldown3').css('opacity', topOpacity);
            }

            if (philOpacity > 0) {
                philOpacity -= 0.05;
                $('.phil-main').css('opacity', philOpacity);
                $('.phil-sub').css('opacity', philOpacity);
            }

            endOpacity = 1;
        },
    })

    animationScripts.push({
        start: 30,
        end: 40,
        function() {
            canvasElement.css('display', 'block');
            canvasElement.css('opacity', 1);
            canvasFire.css('display', 'block');
            canvasFire.css('opacity', 1);

            const startParticle = 0;
            const endParticle = 100;
            for (let i = startParticle; i < endParticle; i++) {
                updateParticle(kiras[i]);
            }

            for (let i = endParticle; i < 200; i++) {
                if (kiras[i].mat.position.x != 0) {
                    outParticle(kiras[i]);
                }
            }

            if (topOpacity < 1) {
                topOpacity += 0.05;
                $('.corp-name').css('opacity', topOpacity);
                $('.scrolldown3').css('opacity', topOpacity);
            }

            if (philOpacity > 0) {
                philOpacity -= 0.05;
                $('.phil-main').css('opacity', philOpacity);
                $('.phil-sub').css('opacity', philOpacity);
            }

            endOpacity = 1;
        },
    })

    animationScripts.push({
        start: 40,
        end: 50,
        function() {
            canvasElement.css('display', 'block');
            canvasElement.css('opacity', 1);
            canvasFire.css('display', 'block');
            canvasFire.css('opacity', 1);

            const startParticle = 0;
            const endParticle = 150;
            for (let i = startParticle; i < endParticle; i++) {
                updateParticle(kiras[i]);
            }

            for (let i = endParticle; i < 200; i++) {
                if (kiras[i].mat.position.x != 0) {
                    outParticle(kiras[i]);
                }
            }

            if (topOpacity < 1) {
                topOpacity += 0.05;
                $('.corp-name').css('opacity', topOpacity);
                $('.scrolldown3').css('opacity', topOpacity);
            }

            if (philOpacity > 0) {
                philOpacity -= 0.05;
                $('.phil-main').css('opacity', philOpacity);
                $('.phil-sub').css('opacity', philOpacity);
            }

            endOpacity = 1;
        },
    })



    animationScripts.push({
        start: 50,
        end: 90,
        function() {
            scrollOpacity = 1 - lerp(0, 1, scaleParcent(50, 90));
            canvasElement.css('opacity', scrollOpacity);
            canvasFire.css('opacity', scrollOpacity)

            if (topOpacity < 1) {
                topOpacity += 0.05;
                $('.corp-name').css('opacity', 1);
                $('.scrolldown3').css('opacity', 1);

            }

            if (philOpacity < 1) {
                philOpacity += 0.05;
                $('.phil-main').css('opacity', philOpacity);
                $('.phil-sub').css('opacity', philOpacity);

                setTimeout(function(){
                    $('.phil-main').addClass('line-on');
                    $('.marker').addClass('on');
                }, 1500);
            }

            const startParticle = 0;
            const endParticle = 200;
            for (let i = startParticle; i < endParticle; i++) {
                updateParticle(kiras[i]);
            }

            endOpacity = 1;
        },
    })


    animationScripts.push({
        start: 91,
        end: 101,
        function() {
            if (endOpacity > 0) {
                endOpacity -= 0.05;
                $('.corp-name').css('opacity', endOpacity);
                $('.scrolldown3').css('opacity', endOpacity);
                $('.phil-main').css('opacity', endOpacity);
                $('.phil-sub').css('opacity', endOpacity);
            }

                topOpacity = 0;
                philOpacity = 0;
        },
    })


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
        console.log(scrollPercent); //0~100%で取得
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
}

function setHelper(scene) {
    // GridHelper
    const gridHelper = new THREE.GridHelper(200, 10);
    scene.add(gridHelper);

    // AxesHelper
    const axesHelper = new THREE.AxesHelper(180);
    scene.add(axesHelper);
}

function sphere() {
    // グループを作る
    // const group = new THREE.Group();
    let group = [];

    // 3D空間にグループを追加する
    // scene.add(group);

    const objectLength = 10;
    for (var i = 0; i < objectLength; i++) {
        // const sphereSize = Math.random() * 0.05 + 0.05;
        const sphereSize = 0.01 + Math.random() * 0.09; // 0.01から0.1までのランダムな値を生成
        const geometry = new THREE.SphereGeometry(sphereSize, 32, 32);
        const material = new THREE.MeshNormalMaterial();
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.y =  -1;

        // 光の動き
        const move = Math.random() * 0.05;

        // group.add(sphere);
        group.push({'mesh' : sphere, 'move' : move});
        // group.push(sphere);
        scene.add(sphere);
    }

    return group;
}

function makeKira(scene) {
    let kiras = [];
    const length = 200;

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
            'random' : Math.floor(Math.random() * (max - min + 1)) + min
        };

        scene.add(mesh);
        kiras.push(kira);
    }

    return kiras;
}

function updateParticle(kira) {
    kira.mat.position.x += kira.speed / kira.random;
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
    kira.mat.position.x += kira.speed / kira.random;
    kira.mat.position.y += kira.speed;
    kira.life -= 1;
}
