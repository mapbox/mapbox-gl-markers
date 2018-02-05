# mapbox-gl-markers

A Mapbox GL JS plugin that turns your [GeoJSON](http://geojson.io/#id=gist:anonymous/96d84a56487ec7221365ab3781326671&map=1/36/19) into an interactive map in minutes.


## Usage

**Using the web tool**

1. Create and save your [geojson](http://geojson.io/#id=gist:anonymous/11d74ac48876bafa64868658d99c4846&map=1/-12/-1) to an open hosting service like [Github Gist](https://gist.github.com/anonymous/11d74ac48876bafa64868658d99c4846). For Gists, copy the raw url `https://gist.github.com/anonymous/11d74ac48876bafa64868658d99c4846/raw/8a688828a572a076dbd0dfeee016b4e06041ff21/map.geojson`
2. Open the [Mapbox Markers web tool](https://planemad.github.io/mapbox-gl-markers/) and add the url to your geojson as a `?data=<url>` parameter before the map hash.
    - eg. `https://planemad.github.io/mapbox-gl-markers/?data=https://gist.githubusercontent.com/anonymous/11d74ac48876bafa64868658d99c4846/raw/c6a8c80959cbf1814afeb28bd1757b68bd5f78a8/map.geojson#1/37.8/-20`

**Using Mapbox GL JS**

```javascript
map.addControl(new MapboxMarkers(geojson[, options]));  // Pass a GeoJSON feature collection that follows the marker-spec
```

See [available options](). You can also set the following using URL parameters:
- **data** URL to an external GeoJSON. Use a [Gist](https://gist.github.com/anonymous/11d74ac48876bafa64868658d99c4846).

### Generating a GeoJSON

Use [geojson.io](http://geojson.io/#id=gist:anonymous/11d74ac48876bafa64868658d99c4846&map=1/-12/-1) to quickly create a custom GeoJSON dataset with the properties you need. 

### GeoJSON marker-spec

This is a WIP: https://paper.dropbox.com/doc/marker-spec-1-11DEmlIrR8bk1dlm3sU8B