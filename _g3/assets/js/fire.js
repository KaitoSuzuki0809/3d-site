'use strict';

import * as THREE from './build/three.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';

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
    camera.position.z = 100;

    const canvas = document.getElementById("fireElement");

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

    const envlight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(envlight);

    /* 炎パーティクルを設定する変数 */
    const fireParticles = [];
    const fireParticlesNum = 50;
    const firePos = -45;
    const fireSize = 20;

    /* テクスチャの用意 */
    const loader = new THREE.TextureLoader();
    const texture = loader.load(imagePath + 'tex.png');

    /* 炎パーティクルを作成する */
    const geometry = new THREE.PlaneGeometry( fireSize, fireSize, 1 );
    for(let i = 0; i < fireParticlesNum; i++){
        const material = new THREE.MeshLambertMaterial({
        map: texture, //読み込んだテクスチャを貼る
        transparent: true, //画像の透明度有効にする
        })
        /* パーティクルをランダムな座標に配置 */
        const particle = new THREE.Mesh(geometry,material);
        particle.position.y = Math.random() * fireSize + firePos;
        particle.position.z = Math.random() * 10;
        particle.rotation.z = Math.random() * 360;
        fireParticles.push(particle);
        scene.add(particle);
    }

    /* 根本の炎作る */
    const fireRoot = [];
    const fireRootNum = 4;
    for(let i = 0; i < fireRootNum; i++){
        const material = new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        // color: new THREE.Color(0.85,0.85,1.0)
        // color: new THREE.Color(0.984, 0.392, 0.094)
        color: new THREE.Color(0.768, 0.262, 0.011)
        })
        const particle = new THREE.Mesh(geometry,material);
        particle.position.y = firePos-2;
        fireRoot.push(particle);
        scene.add(particle);
    }

    // const Controls = new OrbitControls(camera, renderer.domElement); // マウス操作
    // setHelper(scene); // グリッドヘルパーの表示

    // レンダリングループ
    function animate() {
        /* パーティクルのアニメーション設定 */
        for(let i = 0; i < fireParticlesNum; i++){

            /* 座標の動き */
            const limit = fireSize*1.5; //炎が上昇する距離
            if(fireParticles[i].position.y < firePos+limit){
                fireParticles[i].position.y += Math.random()*(fireSize/20); //上昇
                fireParticles[i].rotation.z += 0.01; //回転
            }else{
                fireParticles[i].position.y = firePos; //limitまで行ったら初期位置に戻る
            }

            /* y座標を1～0に変換 */
            let y = ((firePos+limit)-fireParticles[i].position.y)/limit;

            /* 大きさ */
            fireParticles[i].scale.x = y*0.6; //上に行くほど横幅小さく
            fireParticles[i].scale.y = y; //上に行くほど横幅小さく

            /* うねうね */
            let amp = (fireSize/15)*Math.random(); //うねうね大きさ
            let freq = 2*Math.random()+5; //うねうね量
            fireParticles[i].position.x = amp * Math.sin(freq*y*Math.PI);

            /* 色 */
            fireParticles[i].material.opacity = Math.pow(y,4); //上に行くほど透明に
            let r = Math.sin(Math.PI / 5 * y + Math.PI / 6);
            // let r = Math.sin(Math.PI / 4 * y + Math.PI / 2);
            let b = Math.pow(y, 50);
            // let b = Math.pow(y, 20);
            fireParticles[i].material.color = new THREE.Color(r, y, b);
        }

        /* 根本のアニメーション */
        for(let i = 0; i < fireRootNum; i++){
            fireRoot[i].material.opacity = Math.random()*0.8;
            let size = 0.5*Math.random() + 0.5;
            fireRoot[i].scale.y = size;
            fireRoot[i].rotation.z = Math.random()*Math.PI*2;
        }

        requestAnimationFrame(animate);
        renderer.render(scene, camera);
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
