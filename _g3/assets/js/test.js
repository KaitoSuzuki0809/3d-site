import * as THREE from './build/three.module.js';

// Initialize scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
console.log(scene);

// Create a gradient background
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
gradient.addColorStop(0, 'rgba(0,0,0,1)');
gradient.addColorStop(1, 'rgba(0,0,0,0)');
context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);
const backgroundTexture = new THREE.CanvasTexture(canvas);
scene.background = backgroundTexture;

// Create a sphere with a gradient material
const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial({
    map: backgroundTexture
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Set up the camera position
camera.position.z = 10;

// Function to handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// Function to handle scroll event
function onScroll() {
    const scrollTop = window.scrollY;
    camera.position.y = scrollTop * 0.1;
}
window.addEventListener('scroll', onScroll);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();