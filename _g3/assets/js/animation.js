'use strict';

import * as THREE from './build/three.module.js';
import {OrbitControls} from './jsm/controls/OrbitControls.js';

let planets = {};
init();
TextTypingAnime();

function init() {

    // シーンの追加
    const scene = new THREE.Scene();

    // カメラの追加
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 500);

    const canvas = document.getElementById("planets");
    // レンダラーの親要素を指定
    const parentElement = document.getElementById('parentCanvas');
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

    const planetList = {
        'earth': {scene: scene, size: 100, x: 200, y: 100, z: 0, imageName: '2k_earth_daymap.jpg'},
        'moon': {scene: scene, size: 50, x: -200, y: -100, z: 0, imageName: '2k_moon.jpg'},
    };

    for (const key in planetList) {
        if (Object.hasOwnProperty.call(planetList, key)) {
            const planet = planetList[key];
            makePlanet(planet.scene, planet.size, planet.x, planet.y, planet.z, planet.imageName);
        }
    }

    // const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    // light.position.set( 0, 0, 1 );
    // light.rotation.x = 0;
    // console.log(light);
    // scene.add(light);

    // var pointLightHelper = new THREE.PointLightHelper( light, 1);//(光源,ヘルパーオブジェクトの大きさ)
    // scene.add( pointLightHelper);

    // const Controls = new OrbitControls(camera, renderer.domElement); // マウス操作
    // setHelper(scene); // グリッドヘルパーの表示

    // マウスの座標を保持する変数
    let mouseX = 0;
    let mouseY = 0;

    // マウス移動イベントリスナー
    function onMouseMove(event) {
    // マウスの位置を正規化して、範囲を-1から1の間にする
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    document.addEventListener('mousemove', onMouseMove, false);

    // レンダリングループ
    function animate() {
        requestAnimationFrame(animate);

        // 惑星の回転
        for (const key in planets) {
            if (Object.hasOwnProperty.call(planets, key)) {
                const planet = planets[key];
                planet.rotation.y += 0.0005;
            }
        }

        // カメラの位置をマウスの位置に応じて更新
        const moveSpeed = 7;
        camera.position.x += (mouseX * moveSpeed - camera.position.x) * 0.1;
        camera.position.y += (mouseY * moveSpeed - camera.position.y) * 0.1;

        // カメラの動ける範囲を制限
        const limit = 500; // 動ける範囲の半径
        camera.position.x = Math.min(Math.max(camera.position.x, -limit), limit);
        camera.position.y = Math.min(Math.max(camera.position.y, -limit), limit);

        renderer.render(scene, camera);
    }

    animate();
}

function makePlanet(scene, size, x, y, z, imageName) {
    // ジオメトリ作成
    const geometry = new THREE.SphereGeometry(size, 64, 32);
    // 画像テクスチャの読み込み
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imgPath + imageName, function (texture) {
        // マテリアル作成
        const material = new THREE.MeshPhysicalMaterial({
            map: texture,
        });

        // メッシュ化
        let mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        mesh.rotation.y = 1;
        mesh.rotation.x = 0.5;
        scene.add(mesh);
        planets[imageName] = mesh;

        // 平行光源の追加
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        // 光の当たる位置調整
        directionalLight.position.set(0, 0, 1);
        // シーンに追加
        scene.add(directionalLight);
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
