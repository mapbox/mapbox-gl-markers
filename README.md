# mapbox-gl-marker-spec

A Mapbox GL JS plugin that turns your [GeoJSON](http://geojson.io/#id=gist:anonymous/96d84a56487ec7221365ab3781326671&map=1/36/19) into an interactive map using!

## Usage

```javascript
map.addControl(new MapboxMarkerSpec(geojson[, options]));  // Pass a GeoJSON feature collection that follows the marker-spec
```

**Options**
See [available options](). You can also set the following using URL parameters:
- 'data' URL to an external GeoJSON. Use a [Gist](https://gist.github.com/anonymous/11d74ac48876bafa64868658d99c4846).

### Generating a GeoJSON

Use [geojson.io](http://geojson.io/#id=gist:anonymous/11d74ac48876bafa64868658d99c4846&map=1/-12/-1) to quickly create a custom GeoJSON dataset with the properties you need. 

### GeoJSON marker-spec

This is a WIP: https://paper.dropbox.com/doc/marker-spec-1-11DEmlIrR8bk1dlm3sU8B