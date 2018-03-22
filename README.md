# mapbox-gl-markers

![new1](https://user-images.githubusercontent.com/126868/35832156-2f69edfe-0a9a-11e8-8f9f-cd4add6e9555.gif)

A Mapbox GL JS plugin that turns your [GeoJSON](http://geojson.io/#id=gist:anonymous/96d84a56487ec7221365ab3781326671&map=1/36/19) into an interactive map in minutes.


## Usage

**1. Using the web tool**

1. Create and save your [geojson](http://geojson.io/#id=gist:anonymous/11d74ac48876bafa64868658d99c4846&map=1/-12/-1) to an open hosting service like [Github Gist](https://gist.github.com/anonymous/11d74ac48876bafa64868658d99c4846). For Gists, copy the raw url `https://gist.githubusercontent.com/anonymous/11d74ac48876bafa64868658d99c4846/raw/c6a8c80959cbf1814afeb28bd1757b68bd5f78a8/map.geojson`
2. Open the [Mapbox Markers web tool](https://mapbox.github.io/mapbox-gl-markers/) and add the url to your geojson as a `?data=<url>` parameter before the map hash.
    - eg. [https://mapbox.github.io/mapbox-gl-markers/?data=https://gist.githubusercontent.com/anonymous/11d74ac48876bafa64868658d99c4846/raw/c6a8c80959cbf1814afeb28bd1757b68bd5f78a8/map.geojson](https://mapbox.github.io/mapbox-gl-markers/?data=https://gist.githubusercontent.com/anonymous/11d74ac48876bafa64868658d99c4846/raw/c6a8c80959cbf1814afeb28bd1757b68bd5f78a8/map.geojson#1/37.8/-20)


**2. Using Mapbox GL JS or NPM `mapbox-gl-markers`**

Include the JS and CSS in the <head>:

```html
<script src='https://rawgit.com/mapbox/mapbox-gl-markers/master/dist/mapbox-gl-markers.js'></script>
<link href='https://rawgit.com/mapbox/mapbox-gl-markers/master/dist/mapbox-gl-markers.css' rel='stylesheet' />
```

Add the plugin after initializing your [Mapbox GL map](https://www.mapbox.com/mapbox-gl-js/example/simple-map/):

```javascript
map.addControl(new MapboxMarkers(geojson[, options]));  // Pass a GeoJSON feature collection that follows the marker-spec
```

See [available options](https://github.com/mapbox/mapbox-gl-markers/blob/master/mapbox-gl-markers.js#L23-L42). You can also set the following using URL parameters:
- **data** URL to an external GeoJSON. Use a [Gist](https://gist.github.com/anonymous/11d74ac48876bafa64868658d99c4846).

## GeoJSON marker-spec

Supported fields:
- `marker-image` Image to use for the marker
- `title` Title of the marker popup
- `description` Description in the popup
- `image` An image to add in the popup
- `website` Link to a website, defaults to an OSM link to the location if blank

This is a WIP: https://paper.dropbox.com/doc/marker-spec-1-11DEmlIrR8bk1dlm3sU8B . Note: Other properties in the GeoJSON [simplestyle-spec](https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0) has not been implemented yet.

## Contributing

- `npm start` to run the development page with live reload
- `npm run build` to update the final dist/mapbox-gl-markers.js file
