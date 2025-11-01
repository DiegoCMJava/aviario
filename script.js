const fecha = new Date();
const actual = fecha.getFullYear();

document.getElementById("anio").innerText = "Desde 2025 a " + actual;

const input = document.getElementById("input-ave");
const sugerencias = document.getElementById("sugerencias");

input.addEventListener("input", () => {
  const busqueda = input.value.toLowerCase();
  sugerencias.innerHTML = '';

  if (busqueda) {
   /* fetch('https://corsproxy.io/?https://raw.githubusercontent.com/DiegoCMJava/aviario-cartagenero/main/aves.json') */fetch("aves.json")
      .then(res => res.json())
      .then(data => {
        // Crear un array de nombres únicos
        const nombresUnicos = [...new Set(data.map(ave => ave.nombre_comun))];

        // Filtrar por coincidencias con lo escrito
        const coincidencias = nombresUnicos.filter(nombre =>
          nombre.toLowerCase().includes(busqueda)
        );

        // Mostrar sugerencias sin repetir
        coincidencias.forEach(nombre => {
          const li = document.createElement('li');
          li.textContent = nombre;
          li.style.cursor = "pointer";
          li.addEventListener("click", () => {
            input.value = nombre;
            sugerencias.innerHTML = '';
          });
          sugerencias.appendChild(li);
        });
      })
      .catch(err => console.error("Error cargando sugerencias:", err));
  }
});


document.getElementById("btn-input-ave").addEventListener("click", function (e) {
  e.preventDefault();
  const busqueda = document.getElementById("input-ave").value.toLowerCase();

fetch('https://corsproxy.io/?https://raw.githubusercontent.com/DiegoCMJava/aviario-cartagenero/main/aves.json') /* fetch("aves.json")*/
    .then(res => res.json())
    .then(data => {
      const ave = data.find(ave =>
        ave.nombre_comun.toLowerCase().includes(busqueda)
      );

      if (ave) {
        document.getElementById("nombre-comun").textContent = ave.nombre_comun;
        document.getElementById("nombre-cientifico").textContent = ave.nombre_cientifico;
        document.getElementById("orden").textContent = ave.orden;
        document.getElementById("descripcion").textContent = ave.descripcion;
        document.getElementById("estado-conserv").textContent = ave.estado_conservacion;
        document.getElementById("img-ave").src = ave.imagen_url;
        document.getElementById("img-ave").alt = `Imagen de ${ave.nombre_comun}`;
      } else {
        alert("Ave no encontrada.");
      }
    })
    .catch(err => console.error("Error al cargar el JSON:", err));
});

// cargar listado de órdenes de las aves registradas
fetch('https://corsproxy.io/?https://raw.githubusercontent.com/DiegoCMJava/aviario-cartagenero/main/aves.json') /*fetch('aves.json')*/
  .then(response => {
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo JSON');
    }
    return response.json();
  })
  .then(aves => {
    const conteoPorOrden = aves.reduce((acc, ave) => {
      const orden = ave.orden;
      acc[orden] = (acc[orden] || 0) + 1;
      return acc;
    }, {});

    const ul = document.getElementById('listado-ordenes');
    for (const orden in conteoPorOrden) {
      const li = document.createElement('li');
      li.textContent =`${orden} ( ${conteoPorOrden[orden]} )`;
      ul.appendChild(li);
    }
  })
  .catch(error => {
    console.error('Error al procesar los datos de aves:', error);
  });

  // mostrar el mapa
obtenerUbicacion();
function obtenerUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarMapa, mostrarError,
    {

     enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
    );
  } else {
    alert("La geolocalización no es compatible con este navegador.");
  }
}

function mostrarMapa(posicion) {
  var lat =  10.391;//posicion.coords.latitude;
  var lon = -75.479;//posicion.coords.longitude;


  // Crear el mapa
  var mapa = L.map('espacio-mapa').setView([lat, lon], 13);

  // Cargar los tiles de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(mapa);

  // Agregar un marcador
  L.marker([lat, lon]).addTo(mapa)
    .bindPopup('¡Cartagena!')
    .openPopup();
    L.marker([10.331, -75.414]).addTo(mapa).bindPopup('Turbaco');
L.marker([10.255, -75.344]).addTo(mapa).bindPopup('Arjona');
L.marker([10.29, -75.50]).addTo(mapa).bindPopup('Pasacaballos');
L.marker([10.44, -75.36]).addTo(mapa).bindPopup('Santa Rosa de Lima');
L.marker([10.56, -75.32]).addTo(mapa).bindPopup('Clemencia');
L.marker([10.60, -75.28]).addTo(mapa).bindPopup('Santa Catalina');
L.marker([10.44, -75.27]).addTo(mapa).bindPopup('Villanueva');
L.marker([10.39, -75.15]).addTo(mapa).bindPopup('San Estanislao');
L.marker([10.23, -75.19]).addTo(mapa).bindPopup('Mahates');
L.marker([9.98, -75.29]).addTo(mapa).bindPopup('María la Baja');
L.marker([10.27, -75.44]).addTo(mapa).bindPopup('Turbaná');

};

function mostrarError(error) {
  alert("Error al obtener la ubicación: " + error.message);
};



/* 
document.getElementById("btn-input-ave").addEventListener("click", function (e) {
  e.preventDefault();
  const busqueda = document.getElementById("input-ave").value.toLowerCase();

  fetch("https://api.avesdecolombia.com/aves")
    .then(res => res.json())
    .then(data => {
      const ave = data.find(ave =>
        ave.nombreComun.toLowerCase().includes(busqueda)
      );

      if (ave) {
        document.getElementById("nombre-comun").textContent = ave.nombreComun;
        document.getElementById("nombre-cientifico").textContent = ave.nombreCientifico;
        document.getElementById("descripcion").textContent = ave.descripcion;
        document.getElementById("estado-conserv").textContent = ave.estadoConservacion;
        document.getElementById("img-ave").src = ave.imagen;
        document.getElementById("img-ave").alt = `Imagen de ${ave.nombreComun}`;
      } else {
        alert("Ave no encontrada.");
      }
    })
    .catch(err => console.error("Error al consumir la API:", err));
});

*/