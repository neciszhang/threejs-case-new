function onResize() {
	viewWth = $(window).width();
	viewHgh = $(window).height();
	viewHlfHgh = viewHgh / 2;
	viewHlfWth = viewWth / 2;
	renderer.setSize(viewWth, viewHgh);
	updateCamera();
}

var renderer, viewWth, viewHgh, viewHlfWth, viewHlfHgh, fxaaPass, camRot, currentScene, nextScene, viewPixelRatio = Math.max(1.5, window.devicePixelRatio - .5),
	viewDir = 0,
	globalUniforms = {
		time: {
			value: 0
		},
		delta: {
			value: 0
		},
		fps: {
			value: 0
		},
		progress: {
			value: 0
		},
		speed: {
			value: 1
		},
		percent: {
			value: 0
		},
		spring: {
			value: 1
		},
		force: {
			value: 0
		}
	},
	isContentLoaded = !1,
	_texs = {},
	_geoms = {},
	scenes = {},
	isFreeLook = !0,
	cameraView = 0;
prepareLoading();


function prepareLoading() {
	loaderQueue = new createjs.LoadQueue();
	loaderQueue.addEventListener('complete', onLoadingComplete);
	loaderQueue.loadFile({
		src: "script/FXAAShader.js",
		type: createjs.AbstractLoader.JAVASCRIPT
	});
	loaderQueue.loadFile({
		src: "assets/loading.json",
		id: "loading",
		type: createjs.AbstractLoader.JSON
	});
	loaderQueue.loadFile({
		src: "assets/loading/talk_01.png",
		id: "talk_01"
	});
	loaderQueue.loadFile({
		src: "assets/loading/talk_02.png",
		id: "talk_02"
	})
	loaderQueue.loadFile({
		src: "assets/loading/talk_03.png",
		id: "talk_03"
	});
	loaderQueue.loadFile({
		src: "assets/loading/talk_04.png",
		id: "talk_04"
	});
	loaderQueue.loadFile({
		src: "assets/loading/LD_tv.png",
		id: "LD_tv"
	});
	loaderQueue.loadFile({
		src: "assets/loading/LD_num.png",
		id: "LD_num"
	});
	loaderQueue.loadFile({
		src: "assets/loading/noise.png",
		id: "noise"
	});
	loaderQueue.loadFile({
		src: "assets/loading/snow.png",
		id: "snow"
	});
}

function onLoadingComplete() {
	initLoading();
	loaderQueue.removeEventListener("complete", onLoadingComplete);
	// loaderQueue.removeEventListener("fileload", onImageFileLoad);
}

function initLoading() {
	renderer = new THREE.WebGLRenderer({
		antialias: false //关闭WebGL抗锯齿
	});
	renderer.setClearColor(0x000000, 1); //设置清除的颜色和透明度
	renderer.setPixelRatio(viewPixelRatio); //设置设备像素比。通常用于HiDPI设备防止模糊输出canvas
	renderer.autoClear = false; //定义渲染器是否应该在渲染之前自动清除其输出。
	D3.appendChild(renderer.domElement); //一个用来绘制输出的 Canvas 对象。
	gl = renderer.context; //从HTML5 canvas中获取的用来绘图的WebGL渲染上下文。
	initEvent();
	initEffect();
	initShader();
	initAnimation();
	initBG();
	initControl();
	onResize();
	window.addEventListener('resize', onResize);
	clock = new THREE.Clock;
	createjs.Ticker.setFPS(60);
	initStage("loading");
	start();
	prepareContent();
}

function initEvent() {
	dispatcher = new createjs.EventDispatcher;
}

function initEffect() {
	// body...
}

function initShader() {
	// body...
}

function initAnimation() {
	// body...
}

function initBG() {
	// body...
	scenebg = new THREE.Scene;
	// scenebg.
	// PlaneBufferGeometry缓存几何模型
	var material = new THREE.MeshBasicMaterial({
		color: 0xffff00,
		side: THREE.DoubleSide
	});
	var planebg = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), material);
	scenebg.add(planebg);
	//正交投影相机
	scenebg.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	//那么每一帧渲染都要检查场景和对象是否需要矩阵更新
	scenebg.autoUpdate = false;
}

function initStage(stage) {
	// body...
	var b = loaderQueue.getResult(stage);
	console.log(b);
	// initGeometry(b.basic),
	// initInstancedGeometry(b.instanced),
	// initScene(b.scene),
	// loaderQueue.remove(a)
}

function initControl() {
	// body...
	D3.addEventListener("touchstart", onTouchStart);
	D3.addEventListener("touchmove", onTouchMove);
	D3.addEventListener("touchend", onTouchEnd);
	//用来处理光线投射。光线投射主要用于物体选择、碰撞检测以及图像成像等方面。
	mouseRay = new THREE.Raycaster;
	mouseEnabled = true;
	mouseMoved = false;
	mousePosition = new THREE.Vector2;
	oldPosition = new THREE.Vector2;
	oldDelta = new THREE.Vector2;
	camRot = new THREE.Vector2;
	// camCtrl = new THREE.OrientControls;
}

function start() {
	// body...
}

function prepareContent() {
	// body...
}

function updateCamera() {

}

function onTouchStart(e) {
	// body...
	// 取消事件的默认动作。
	e.preventDefault();
	//该方法将停止事件的传播，阻止它被分派到其他 Document 节点。
	e.stopPropagation();
	mouseEnabled && (mousePosition.set(e.touches[0].clientX, e.touches[0].clientY));
	oldPosition.copy(mousePosition);
	mouseNeedsRefresh = false;
	mouseMoved = false;
	isFreeLook && createjs.Tween.removeTweens(camRot);
}

function onTouchMove(e) {
	// body...

}

function onTouchEnd() {
	// body...
}