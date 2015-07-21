// SAGE2 is available for use under the SAGE2 Software License
//
// University of Illinois at Chicago's Electronic Visualization Laboratory (EVL)
// and University of Hawai'i at Manoa's Laboratory for Advanced Visualization and
// Applications (LAVA)
//
// See full text, terms and conditions in the LICENSE.txt included file
//
// Copyright (c) 2014


function addScript( url, elem ,callback ) {
	var script = document.createElement( 'script' );
	if( callback ) script.onload = callback;
	script.type = 'text/javascript';
	script.src = url;
	elem.appendChild( script );
}


function addCss(url, elem)
{
	var css = document.createElement('link');
	css.rel="stylesheet"
	css.href=url;
	elem.appendChild(css);
}



function addFragment(name, value, elem)
{
	var script = document.createElement( 'script' );
	//if( callback ) script.onload = callback;
	script.type = 'x-shader/x-fragment';
	script.id = name;
	script.innerText = value;
	elem.appendChild( script );
}


function addShader(name, value, elem)
{
	var script = document.createElement( 'script' );
	//if( callback ) script.onload = callback;
	script.type = 'x-shader/x-vertex';
	script.id = name;
	script.innerText = value;
	elem.appendChild( script );
}


function createElement(name, id)
{
	var element = document.createElement(name);
	element.id = id;
	return element;
}

var neural_network = SAGE2_App.extend( {


	init: function(data) {

		// call super-class 'init'
		this.SAGE2Init("div", data);
		this.element.id = "container";
		var elem = this.element;

		this.element.appendChild(createElement("div", "canvas-container"));
		

		var pref = "uploads/apps/NeuralNetworks/";
		var pref_s = pref + "sources/";
		var pref_c = pref + "css/";

		addShader("vertexshader-axon", " \
		uniform float opacityMultiplier; \
		attribute float opacityAttr; \
		varying float opacityNew; \
		void main() { \
			opacityNew = opacityAttr * opacityMultiplier; \
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0 ); \
		}", elem);

		addFragment("fragmentshader-axon", "\
		uniform vec3 color;\
		varying float opacityNew;\
		void main() {\
			gl_FragColor = vec4(color, opacityNew);\
		}", elem);



		addCss(pref_c + "app.css", elem);


		//addScript(pref_s + "Detector.js");
		//addScript(pref_s + "dat.gui.min.js");
		//addScript(pref_s + "stats.min.js");
		//addScript(pref_s + "three.min.js");
		addScript(pref_s + "OrbitControls.js", elem);
		addScript(pref_s + "OBJLoader.js", elem);
		addScript(pref_s + "three-app.js", elem);


	},

	load: function(state, date) {
	},

	draw: function(date) {
	},

	resize: function(date) {
		var resize = new Event("resize");
		this.element.dispatchEvent(resize);

		this.refresh(date);

	},

	event: function(eventType, position, user_id, data, date) {
		if (eventType === "pointerPress" && (data.button === "left") ) {

			var x= position.x + this.element.contentDocument.getElementsByTagName("body")[0].scrollLeft;
			var y= position.y + this.element.contentDocument.getElementsByTagName("body")[0].scrollTop;

			console.log("Position: ", x,y);
			this.element.contentDocument.elementFromPoint(x,y).click();
		}
	}
});
