import React from 'react'
import * as THREE from 'three'

class GeoAnimation extends React.Component {
  constructor(props) {
    super(props)
    this.scene = null
    this.renderer = null
    this.camera = null
    this.shapes = []
  }

  componentDidMount() {
    this.init()

    const animate = () => {
      setTimeout(function() {
        requestAnimationFrame(animate)
      }, 1000 / 30)
      this.animateShapes()
    }
    animate()
  }

  buildRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setClearColor(0xffffff, 0)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document
      .querySelector('#geo-animation')
      .appendChild(this.renderer.domElement)
  }

  buildCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 1
  }

  animateShapes() {
    for (let m of this.shapes) {
      m.rotation.x += 0.01
      m.rotation.y += 0.02
    }

    this.renderer.render(this.scene, this.camera)
  }

  randomDec(min, max) {
    return Math.floor((Math.random() * (max - min) + min) * 100) / 100
  }

  init() {
    this.buildCamera()
    this.scene = new THREE.Scene()
    let scene = this.scene

    this.shapes = [
      this.makeInstance(scene, true),
      this.makeInstance(scene),
      this.makeInstance(scene),
      this.makeInstance(scene, true),
      this.makeInstance(scene),
      this.makeInstance(scene),
      this.makeInstance(scene, true),
      this.makeInstance(scene),
      this.makeInstance(scene, true),
      this.makeInstance(scene),
      this.makeInstance(scene, true),
      this.makeInstance(scene),
    ]

    this.addLight(-1, 2, 4)
    this.addLight(1, -1, -2)
    this.buildRenderer()
  }

  addLight(...pos) {
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(...pos)
    this.scene.add(light)
  }

  get randomShapeName() {
    const ary = [
      'OctahedronGeometry',
      'OctahedronGeometry',
      'IcosahedronGeometry',
      'TetrahedronGeometry',
    ]
    return ary[Math.floor(Math.random() * ary.length)]
  }

  makeInstance(scene, skew = false) {
    let material = new THREE.MeshLambertMaterial({ color: 0xffffff })
    const geometry = new THREE[this.randomShapeName](
      this.randomDec(0.05, 0.3),
      0
    )
    const mesh = new THREE.Mesh(geometry, material)

    const max = 1
    const min = -1
    const x = this.randomDec(min, max)
    const y = this.randomDec(min, max)
    mesh.position.set(x, y, 0)

    if (skew) {
      for (var i = 0, l = geometry.vertices.length; i < l; i++) {
        // we'll move the x & y position of each vertice by a random amount
        geometry.vertices[i].x += -0.1 + Math.random() * 0.2
        geometry.vertices[i].y += -0.1 + Math.random() * 0.2
      }
    }

    this.scene.add(mesh)
    return mesh
  }

  render() {
    return (
      <div
        id="geo-animation"
        style={{
          opacity: 0.3,
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      ></div>
    )
  }
}

export default GeoAnimation
