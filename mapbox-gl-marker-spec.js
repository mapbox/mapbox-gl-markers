/**
* A [Mapbox GL JS plugin](https://www.mapbox.com/blog/build-mapbox-gl-js-plugins/) that
* adds interactive map markers to a GeoJSON that follows the marker-spec schema
* @constructor
* @param {object} geojson - A GeoJSON object that conforms to the marker-spec
* @param {object} options - Options to configure the plugin.
*/

// Mapbox Marker Spec
// template based on github.com/mapbox/mapbox-gl-traffic/blob/master/mapbox-gl-traffic.js

function MapboxMarkerSpec(geojson, options) {
  if (!(this instanceof MapboxMarkerSpec)) {
    throw new Error('MapboxMarkerSpec needs to be called with the new keyword');
  }
  
  this.sourceName = 'markerspec';
  this.geojson = geojson;

  this.options = Object.assign({
    enabled: true,
    showControl: true,
    marker: {
      image: 'https://www.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png'
    },
    popup: {
      content: ''
    },
    style: {
      label: '{name}',
      labelSize: 10,
      color: 'blue',
      size: 2,
      opacity: 0.1,
      layers: null
    }
  }, options);
  
  this.toggle = this.toggle.bind(this);
  this.render = this.render.bind(this);
  this._hide = this._hide.bind(this);
  this._show = this._show.bind(this);
  this._hasSource = this._hasSource.bind(this);
  this._updateMap = this._updateMap.bind(this);
  this._toggle = new pluginButton({show: this.options.showControl, onToggle: this.toggle.bind(this)});
}

MapboxMarkerSpec.prototype.onAdd = function(map) {
  this._map = map;
  map.on('load', this.render);
  map.on('moveend', this._updateMap);
  return this._toggle.elem;
};

MapboxMarkerSpec.prototype.onRemove = function() {
  this._map.off('load', this.render);
  var elem = this._toggle.elem;
  elem.parentNode.removeChild(elem);
  this._map = undefined;
};


MapboxMarkerSpec.prototype.toggle = function() {
  this.options.enabled = !this.options.enabled;
  this.render();
};

/**
* Render the plugin elements
*/
MapboxMarkerSpec.prototype.render = function() {

  // Add the source and style layers for the first time
  if (!this._hasSource()) {

    var _this = this;

    // Generate HTML markers for each feature
    this.geojson.features.forEach(function(marker) {
      
      if( marker.geometry.type=='Point'){
        
        // Generate the marker elements
        var markerEl = document.createElement('div');
        markerEl.className = 'markerspec marker';
        markerEl.style = `background-image:url('${marker.properties["marker-image"] || _this.options.marker.image}')`;
  
        var popupHTML = `<h3>${marker.properties.title}</h3><p>${marker.properties.description}</p>`;
  
        // Add the marker for each feature in the GeoJSON
        new mapboxgl.Marker(markerEl)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(popupHTML))
        .addTo(map);
      }
    });

    this._map.addSource('markerspec', {
      type: 'geojson',
      data: this.geojson
    });
    
    // Compute where to insert the additional style layers
    var roadLayers = this._map.getStyle().layers.filter(function(layer) {
      return layer['source-layer'] === 'road';
    });
    var topRoadLayer = roadLayers[roadLayers.length - 1].id;
    
    // Build the style layers for the data
    if (!this.options.style.layers) {
      this.options.style.layers = buildStyleLayers(this.options.style);
    }
    // Add the style layers
    var style = this._map.getStyle();
    var mapStyle = addStyleLayers(style, this.options.style.layers, topRoadLayer);
    this._map.setStyle(mapStyle);
    this._toggle._input.onkeypress = (e) => {
      // On hitting return in the query input
      if (e.key === 'Enter') {
        this.options.query = this._toggle._input.value;
        this._updateMap();
        return true;
      }
    }
  }
  
  // Change plugin icon based on state
  if (this.options.enabled) {
    this._show();
    this._toggle.setMapIcon();
  } else {
    this._hide();
    this._toggle.setPluginIcon();
  }
  
};

// Update the results when the map is moved
MapboxMarkerSpec.prototype._updateMap = function() {
  if (this.options.enabled && this.options.geojson) {
    console.log('Nothing to update');
  }
}

// UI controls

// Create a button element
function button() {
  var btn = document.createElement('button');
  btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-markerspec';
  btn.type = 'button';
  btn['aria-label'] = 'Inspect';
  return btn;
}

// Create an input text box element
function textInput() {
  var ti = document.createElement('input');
  ti.id = 'marker-search';
  ti.type = 'text';
  ti.placeholder = 'Marker Search';
  ti.style.display = 'none'
  return ti;
}

// Plugin controls container
function container(button, input, show) {
  var container = document.createElement('div');
  container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group markerspec';
  container.appendChild(button);
  container.appendChild(input);
  if (!show) {
    container.style.display = 'none';
  }
  return container;
}

// Create the plugin control
function pluginButton(options) {
  options = Object.assign({
    show: true,
    onToggle: function() {}
  }, options);
  
  this._btn = button(); // Plugin toggle button
  this._btn.onclick = options.onToggle;
  this._input = textInput(); // Plugin  text input
  this.elem = container(this._btn, this._input, options.show);
}

pluginButton.prototype.setPluginIcon = function() {
  this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-markerspec';
};

pluginButton.prototype.setMapIcon = function() {
  this._btn.className = 'mapboxgl-ctrl-icon mapboxgl-ctrl-map';
};

// Show layers
MapboxMarkerSpec.prototype._show = function() {

  // Markers
  Array.from(document.getElementsByClassName("markerspec marker")).forEach(function(marker){
    marker.style.display = 'inline';
  });

  // Make all the layers visible
  var sourceRegExp = new RegExp(this.sourceName);
  var style = this._map.getStyle();
  style.layers.forEach(function(layer) {
    if (sourceRegExp.test(layer['source'])) {
      layer['layout'] = layer['layout'] || {};
      layer['layout']['visibility'] = 'visible';
    }
  });
  this._map.setStyle(style);

  // Show the text input
  this._toggle._input.style.display = 'inline';
};

// Hide layers that have the target source
MapboxMarkerSpec.prototype._hide = function() {

  // Markers
  Array.from(document.getElementsByClassName("markerspec marker")).forEach(function(marker){
    marker.style.display = 'none';
  });

  // Style layers that match the source name
  var sourceRegExp = new RegExp(this.sourceName);
  var style = this._map.getStyle();
  style.layers.forEach(function(layer) {
    if (sourceRegExp.test(layer['source'])) {
      layer['layout'] = layer['layout'] || {};
      layer['layout']['visibility'] = 'none';
    }
  });
  this._map.setStyle(style);
  this._toggle._input.style.display = 'none';
};

// Return true if source layers has been added already on first run
MapboxMarkerSpec.prototype._hasSource = function() {
  var style = this._map.getStyle();
  var sourceRegExp = new RegExp(this.sourceName);
  return Object.keys(style.sources).filter(function(sourceName) {
    return sourceRegExp.test(sourceName);
  }).length > 0;
};

/**
* Define layers
*/
function buildStyleLayers(options) {
  var styleLayers = [
    {
      'id': 'markerspec fill',
      'type': 'fill',
      'source': 'markerspec',
      'paint': {
        'fill-color': options.color,
        'fill-opacity': options.opacity
      },
      'filter': ["==", "$type", "Polygon"]
    }, {
      'id': 'markerspec line',
      'type': 'line',
      'source': 'markerspec',
      'paint': {
        'line-color': options.color,
        'line-width': options.size,
        'line-opacity': options.opacity
      }
    }, {
      'id': 'markerspec circle',
      'type': 'circle',
      'source': 'markerspec',
      'paint': {
        'circle-color': options.color,
        'circle-radius': options.size,
        'circle-opacity': options.opacity
      }
    }, {
      'id': 'markerspec symbol',
      'type': 'symbol',
      'source': 'markerspec',
      'layout': {
        'text-field': options.label,
        'text-size': options.labelSize,
        "text-font": [
          "Open Sans Semibold", "Arial Unicode MS Bold"
        ],
        'text-anchor': 'top'
      }
    }
  ];
  
  return styleLayers;
  
}

// Add style layers to the map
function addStyleLayers(style, layers, before) {
  for (var i = 0; i < style.layers.length; i++) {
    var layer = style.layers[i];
    if (before === layer.id) {
      var newLayers = style.layers.slice(0, i).concat(layers).concat(style.layers.slice(i));
      return Object.assign({}, style, {layers: newLayers});
    }
  }
  return style;
}

// Export plugin
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = MapboxMarkerSpec;
} else {
  window.MapboxTraffic = MapboxMarkerSpec;
}