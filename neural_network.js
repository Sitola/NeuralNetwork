// SAGE2 is available for use under the SAGE2 Software License
//
// University of Illinois at Chicago's Electronic Visualization Laboratory (EVL)
// and University of Hawai'i at Manoa's Laboratory for Advanced Visualization and
// Applications (LAVA)
//
// See full text, terms and conditions in the LICENSE.txt included file
//
// Copyright (c) 2014


function addScript( url, callback ) {
	var script = document.createElement( 'script' );
	if( callback ) script.onload = callback;
	script.type = 'text/javascript';
	script.src = url;
	document.body.appendChild( script );
}


function addCss(url)
{
	var css = document.createElement('link');
	css.rel="stylesheet"
	css.href=url;
	document.body.appendChild(css);
}



function addFragment(name, value)
{
	var script = document.createElement( 'script' );
	//if( callback ) script.onload = callback;
	script.type = 'x-shader/x-fragment';
	script.id = name;
	script.innerText = value;
	document.body.appendChild( script );
}


function addShader(name, value)
{
	var script = document.createElement( 'script' );
	//if( callback ) script.onload = callback;
	script.type = 'x-shader/x-vertex';
	script.id = name;
	script.innerText = value;
	document.body.appendChild( script );
}


function createElement(name, id)
{
	var element = document.createElement(name);
	element.id = id;
	return element;
}

var neural_network = SAGE2_App.extend( {
	construct: function() {
		arguments.callee.superClass.construct.call(this);

		this.resizeEvents = "continuous";
	},

	init: function(data) {

		// call super-class 'init'
		arguments.callee.superClass.init.call(this, "div", data);
		this.element.id = "container";

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
		}");

		addFragment("fragmentshader-axon", "\
		uniform vec3 color;\
		varying float opacityNew;\
		void main() {\
			gl_FragColor = vec4(color, opacityNew);\
		}");



		addCss(pref_c + "app.css");


		//addScript(pref_s + "Detector.js");
		//addScript(pref_s + "dat.gui.min.js");
		//addScript(pref_s + "stats.min.js");
		//addScript(pref_s + "three.min.js");
		addScript(pref_s + "OrbitControls.js");
		addScript(pref_s + "OBJLoader.js");
		addScript(pref_s + "three-app.js");


	},

	load: function(state, date) {
	},

	draw: function(date) {
	},

	resize: function(date) {
		this.refresh(date);
	},

	event: function(eventType, position, user_id, data, date) {

	}
});
