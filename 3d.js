// IMPORTS
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

class SpinningAvatarScene {
	elements = {
		target: null,
		wrapper: null,
	}

	config = {
		dimensions: {
			height: 700,
			width: 700,
		},
	}

	content = {
		scene: null,
		light: null,
		camera: null,
		controls: null,
		models: {
			Avatar: null,
		},
	}

	tools = {
		modelLoader: null,
		renderer: null,
	}

	constructor() {
		this.elements.target = document.getElementById('scene3d')
		this.elements.wrapper = document.getElementById('sceneWrapper')

		this.config.dimensions = { height: 600, width: 400 }

		this.content.scene = new THREE.Scene()
		this.content.camera = new THREE.PerspectiveCamera( 30, this.config.dimensions.width / this.config.dimensions.height, 0.1, 1000 )

		// this.content.camera.position.set(0, 1, 3)
		// this.content.camera.rotation.set(0.6, 0, 0)

		this.content.camera.position.set(0, 1.5, 1)
		this.content.camera.rotation.set(0, 0, 0)

		this.content.light = new THREE.AmbientLight()
		this.content.scene.add(this.content.light)
		

		this.tools.renderer = new THREE.WebGLRenderer({alpha: true, canvas: this.elements.target})
		this.tools.renderer.physicallyCorrectLights = true
		this.tools.renderer.outputEncoding = THREE.sRGBEncoding
		this.tools.renderer.setSize(this.config.dimensions.width, this.config.dimensions.height)

		this.tools.modelLoader = new GLTFLoader()

		this.loadModels()
		this.setUp()
	}

	setUp() {
		this.elements.wrapper.style.height = this.config.dimensions.height + 'px'
		this.elements.wrapper.style.width = this.config.dimensions.width + 'px'
		this.elements.target.height = this.config.dimensions.height
		this.elements.target.width = this.config.dimensions.width
	}

	loadModels() {
		this.tools.modelLoader.load( 'me.glb', (gltf) => {
			this.content.models.Avatar = gltf.scene
			this.content.scene.add(this.content.models.Avatar)

			this.content.models.Avatar.position.y = 0
			this.content.models.Avatar.position.x = 0
			this.content.models.Avatar.position.z = 0

			this.content.models.Avatar.rotation.y = 0
			this.content.models.Avatar.rotation.x = -.2
			this.content.models.Avatar.rotation.z = 0
		})
	}

	render() {
		this.tools.renderer.render(this.content.scene, this.content.camera)
	}

	animate() {
		requestAnimationFrame(() => this.animate())
		// controls.update()

		if (this.content.models.Avatar) {
			this.content.models.Avatar.rotation.y += 0.004
		}
		
		
		this.render()
	}

	listeners = {
		onResize: () => {
			this.elements.target.height = this.config.dimensions.height
			this.elements.target.width = this.config.dimensions.width
			this.content.camera.aspect = this.elements.target.width / this.elements.target.height
			this.content.camera.updateProjectionMatrix()
			this.tools.renderer.setSize(this.elements.target.width, this.elements.target.height)
			this.render()
		},
	}
}

// RESIZEABLE

const scene = new SpinningAvatarScene

// USER INTERACTION
// const controls = new OrbitControls(scene.content.camera, scene.tools.renderer.domElement)
// controls.enableDamping = true
// controls.target.set(0, 1.5, 0)

// var minPan = new THREE.Vector3( - 2, - 2, - 2 );
// var maxPan = new THREE.Vector3( 2, 2, 2 );

// controls.target.clamp(minPan, maxPan)

scene.animate()
window.addEventListener('resize', scene.listeners.onResize, false)