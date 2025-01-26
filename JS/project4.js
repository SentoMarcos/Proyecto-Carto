// Inicializa el mapa
const map = L.map('map', {
    center: [41.5, -4], // Coordenadas iniciales en Castilla y León
    zoom: 7
});

// Capas base
const baseLight = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CartoDB</a> contributors',
    subdomains: 'abcd'
});

const baseDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CartoDB</a> contributors',
    subdomains: 'abcd'
});

const baseSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri'
});

// Añadir capa base predeterminada
baseLight.addTo(map);

// Cambiar capa base
function changeBaseMap(style) {
    map.eachLayer(layer => {
        if (layer !== baseLight && layer !== baseDark && layer !== baseSatellite) return; // Mantener GeoJSON
        map.removeLayer(layer);
    });

    if (style === 'light') {
        baseLight.addTo(map);
        document.querySelector('.basemap-preview img').src = "https://cartodb-basemaps-c.global.ssl.fastly.net/light_all/6/31/23.png";
    } else if (style === 'dark') {
        baseDark.addTo(map);
        document.querySelector('.basemap-preview img').src = "https://cartodb-basemaps-c.global.ssl.fastly.net/dark_all/6/31/23.png";
    } else if (style === 'satellite') {
        baseSatellite.addTo(map);
        document.querySelector('.basemap-preview img').src = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/6/31/23";
    }
    toggleMenu(); // Cierra el menú al seleccionar
}

// Alternar visibilidad del menú
function toggleMenu() {
    const menu = document.getElementById('basemapMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Cargar datos GeoJSON (sustituye con la ruta correcta)
fetch('../ZONAS_VALIDAS.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function(feature) {
                const dn = feature.properties.DN;
                return {
                    fillColor: dn === 3 ? '#2ca25f' : dn === 4 ? '#ffdd33' : dn === 5 ? '#de2d26' : '#cccccc',
                    weight: 1,
                    color: 'black',
                    fillOpacity: 0.7
                };
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(`<b>Área:</b> ${feature.properties.Area_km || 'Sin datos'} km²<br>
                       <b>Categoría:</b> ${feature.properties.DN === 3 ? 'ALTO' :
                    feature.properties.DN === 2 ? 'MEDIO' :
                        feature.properties.DN === 1 ? 'BAJO' : 'DESCONOCIDO'}`);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error al cargar el GeoJSON:', error));

// Función para pantalla completa
document.getElementById('fullscreen-btn').addEventListener('click', () => {
    const mapContainer = document.getElementById('map');
    if (!document.fullscreenElement) {
        if (mapContainer.requestFullscreen) {
            mapContainer.requestFullscreen();
        } else if (mapContainer.webkitRequestFullscreen) { /* Safari */
            mapContainer.webkitRequestFullscreen();
        } else if (mapContainer.msRequestFullscreen) { /* IE11 */
            mapContainer.msRequestFullscreen();
        }
        document.getElementById('fullscreen-btn').innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        document.getElementById('fullscreen-btn').innerHTML = '<i class="fas fa-expand"></i>';
    }
});