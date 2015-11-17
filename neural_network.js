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

		this.resizeEvents = "continuous"; // "onfinish";


		var elem = this.element;
		_this = this;

		this.element.appendChild(createElement("div", "canvas-container"));
		

		var pref = "user/apps/NeuralNetwork";
		var pref_s = pref + "/sources/";
		var pref_c = pref + "/css/";

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


		this.mainapp = new MasterApp();

	},

	load: function(state, date) {
	},

	draw: function(date) {
	},

	resize: function(date) {
		
		var w = parseInt(""+ this.element.style.width);
		var h = parseInt("" + this.element.style.height);

		console.log("Resizing: [%d, %d]", w, h );

		if(this.mainapp)
			_this.mainapp.resize(w, h);
		else
			console.log("Error mainapp - not inicialized");

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
