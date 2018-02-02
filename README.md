# mapbox-gl-marker-spec
Mapbox GL plugin that implements the GeoJSON marker spec.

## GeoJSON marker-spec

This is a WIP: https://paper.dropbox.com/doc/marker-spec-1-11DEmlIrR8bk1dlm3sU8B

## Usage

```javascript
map.addControl(new MapboxMarkerSpec(geojson));  // Pass a GeoJSON feature collection that follows the marker-spec
```