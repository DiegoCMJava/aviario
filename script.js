const fecha = new Date();
const actual = fecha.getFullYear();

document.getElementById("anio").innerText = "Desde 2025 a " + actual;

const input = document.getElementById("input-ave");
const suggestion = document.getElementById("idSuggestion");
const suggestionBox = document.getElementById("idSuggestionBox");
const notes = document.getElementById("notes");

input.addEventListener("input", () => {
  const busqueda = input.value.toLowerCase();
  suggestion.innerHTML = '';

  if (busqueda) {
    fetch('https://corsproxy.io/?https://raw.githubusercontent.com/DiegoCMJava/aviario-cartagenero/main/aves.json') /* fetch("aves.json")*/
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
            suggestion.innerHTML = '';
            suggestionBox.style.display = 'none'
          });
          suggestion.appendChild(li);
         
          
          
        });
        if (coincidencias.length === 0){
          suggestionBox.style.display = 'none';
          console.log( "vale cero");
        } else {
          suggestionBox.style.display = 'block';
          console.log( "block");
        }
      })
      .catch(err => { console.error("Error cargando sugerencias:", err);
      suggestionBox.style.display = 'none';
    });
      
  } else { 
    suggestionBox.style.display = 'none';
  }
  

});


document.getElementById("sbm-input-ave").addEventListener("click", function (e) {
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


// captura de notas sobre observación de aves
document.addEventListener("DOMContentLoaded", () => {
  fetch('https://corsproxy.io/?https://raw.githubusercontent.com/DiegoCMJava/aviario-cartagenero/main/notes.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo JSON");
      }
      return response.json();
    })
    .then(data => {
      const ramdonNote = data[Math.floor(Math.random() * data.length)];
      document.getElementById("space-notes").textContent = ramdonNote.note;
      document.getElementById("source").textContent = ramdonNote.source;
    })
    .catch(error => {
      alert("Error al cargar el archivo JSON")
      console.error("Error al cargar las notas: ", error);
    })
});


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