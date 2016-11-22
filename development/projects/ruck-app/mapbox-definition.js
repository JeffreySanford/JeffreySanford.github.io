(function(){
  mapboxgl.accessToken =  'pk.eyJ1IjoiamVmZnJleXNhbmZvcmQiLCJhIjoiY2lya3FyN2E1MDAzNGZnbTh4cWZrYjQzNSJ9.YGbWQc4BIuvtnfs_0xbJPQ';
  L.mapbox.accessToken = 'pk.eyJ1IjoiamVmZnJleXNhbmZvcmQiLCJhIjoiY2lya3FyN2E1MDAzNGZnbTh4cWZrYjQzNSJ9.YGbWQc4BIuvtnfs_0xbJPQ';

  // var map = new mapboxgl.Map({
  //     container: 'map',
  //     style: 'mapbox://styles/mapbox/basic-v9',
  //     zoom: 13,
  // });

  var map = L.mapbox.map('map');
  L.mapbox.tileLayer('mapbox.outdoors').addTo(map);

  var overlay = L.mapbox.tileLayer('mapbox.satellite').addTo(map);
  var range = document.getElementById('range');

  function clip() {
    var nw = map.containerPointToLayerPoint([0, 0]),
        se = map.containerPointToLayerPoint(map.getSize()),
        clipX = nw.x + (se.x - nw.x) * range.value;

    overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
  }

  L.geoJson({
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {},
      geometry: {
          type: 'LineString',
          coordinates: [[40.45, -105.41], [40, -104]]
      }
    }, {
      type: 'Feature',
      properties: {},
      geometry: {
          type: 'Point',
          coordinates: [0, 0]
      }
    }]
  }).addTo(map);
  range['oninput' in range ? 'oninput' : 'onchange'] = clip;
  map.on('mousemove', function (e) {
      document.getElementById('info').innerHTML = 'pointer: ' + JSON.stringify(e.layerPoint.x.toFixed(2)) + ' ' + JSON.stringify(e.layerPoint.y.toFixed(2));
document.getElementById('latitude').innerHTML = e.latlng.lat.toFixed(2);
document.getElementById('longitude').innerHTML = e.latlng.lng.toFixed(2);
  });
  map.on('move', clip);
  var mapContainer = document.getElementById('map-container');
  mapContainer.onmouseleave = function () {
    document.getElementById('info').innerHTML = '';
    document.getElementById('latitude').innerHTML = '';
    document.getElementById('longitude').innerHTML = '';
  };
  map.setView([40.3428, -105.6836], 8);
  clip();
}());
