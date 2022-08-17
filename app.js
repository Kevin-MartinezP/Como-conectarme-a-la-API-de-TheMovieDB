let pagina = 1;

const botonAnterior = document.getElementById("btnAnterior");
const botonSiguiente = document.getElementById("btnSiguiente");

botonSiguiente.addEventListener("click", () => {
    if(pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }else {
        alert("No se encontraron más resultados")
    }
})

botonAnterior.addEventListener("click", () => {
    if(pagina > 1) {
        pagina -=1;
        cargarPeliculas();
    }else {
        alert("No puede retroceder, esta es la primer página");
    } 
})

const cargarPeliculas = async() => {

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4e99f2e036d4ade457c95ce10801c3b7&language=es-MX&page=${pagina}`);

        console.log(respuesta);

        if(respuesta.status === 200) {
            const datos = await respuesta.json();
            let peliculas = "";

            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src= 'https://image.tmdb.org/t/p/w500/${pelicula.poster_path}'>
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `
            })

            document.getElementById("contenedor").innerHTML = peliculas;

        }else if(respuesta.status === 401) {
            alert("La clave de la API no es correcta");
        }else if(respuesta.status === 404) {
            alert("Pelicula no encontrada");
        }
    } catch (error) {
        
    }
}

cargarPeliculas();