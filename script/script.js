"use stríct";

function init() {
  var w = window.innerWidth
  var h = window.innerHeight

  var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('gl'),
    antialias: true
  })
  renderer.setClearColor(0x000000)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(w, h)

  var scene = new THREE.Scene()

  var camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 3000)
  //var camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 0.1, 3000)

  //var cameraHelper = new THREE.CameraHelper(camera)
  //scene.add(cameraHelper)


  var ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
  var pointLight = new THREE.PointLight(0xff0000, 1.0)

  scene.add(ambientLight)
  scene.add(pointLight)


  var geometry = new THREE.PlaneGeometry(1000, 1000)
  var material = new THREE.MeshBasicMaterial()
  var planeMesh = new THREE.Mesh(geometry, material)

  planeMesh.position.set(0, 0, -1500)
  //scene.add(planeMesh)


  var geometry = new THREE.BoxGeometry(200, 200, 200)
  var material = new THREE.MeshLambertMaterial({
    transparent: true
  })
  var mesh = new THREE.Mesh(geometry, material)

  mesh.position.set(0, 0, -1000)
  mesh.material.needsUpdate = true
  mesh.material.opacity = 0
  scene.add(mesh)

  window.mesh = mesh

  function render() {
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01

    TWEEN.update();

    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)


  new TWEEN.Tween(mesh.material)
    .to({ opacity: 1.0 }, 3000)
    //.easing(TWEEN.Easing.Linear)
    .onUpdate(function () {
      //render()
    })
    .start();



}

window.addEventListener('load', init)
