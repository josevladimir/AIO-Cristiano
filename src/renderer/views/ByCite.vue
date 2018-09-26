<template>
  <div>
    <div class="full-width full-height">
      <div id="search-box">
        <form class="flex" id="searchForm">
          <vue-simple-suggest
            id="libro-input-box"
            v-model="search"
            :list="libros"
            :filter-by-query="true">
            <input 
              placeholder="Ingrese el libro..."
              id="libro-input">
          </vue-simple-suggest>
          <input type="text" name="cita-input" id="cita-input" placeholder="Ingresa la cita..." class="lighter">
          <button type="submit" id="search-btn"><i class="fas fa-search"></i></button>
        </form>
      </div>
      <div id="results-container" class="full-height">
        <div class="full-height">
          <div id="search-message" class="flex full-height">
            <div>
              <span><i class="fas fa-arrow-up"></i></span>
              <p class="lighter">Escribe la cita utilizando los cuadros de búsqueda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  form{
    display: flex; 
    align-items: flex-start;
  }
  #search-box{
    background: #212529;
    padding: 30px;
    position: fixed;
    width: 100%;
  }
  #libro-input-box{
    display: block;
    font-size: 14px;
    margin: auto;
    outline-color: transparent !important;
    outline-style: none !important;
    width: 80%;
  }
  #cita-input{
    display: block;
    border-radius: 0px!important;
    font-size: 14px;
    margin: auto;
    outline-color: transparent !important;
    outline-style: none !important;
    padding: 10px 20px !important;
    width: 80%;
  }
  #libro-input:focus,
  #cita-input:focus{
    border-color: #cde !important;
  }
  #search-btn{
    background: #f2f2f2;
    border: 1px solid #f2f2f2;
    border-radius: 0px 3px 3px 0px !important;
    color: #212529;
    display: block;
    outline-color: transparent !important;
    outline-style: none !important;
  }
  #search-btn:hover{
    cursor: pointer;
    background: #999; 
  }
  #libro-input{
    border-radius: 3px 0px 0px 3px !important;
    margin: 0px !important;
    width: 100%;
  }
  .caja-busqueda{
    background: #fff;
    border: 1px solid #aaa;
    display: block;
    position: absolute;
  }
  .caja-busqueda li{
    display: block;
    padding: 5px;
  }
  .caja-busqueda li:hover{
    background: rgba(0,0,0,.25);
    cursor: pointer;
  }
  .display{
    display: block;
  }
  .no-display{
    display: none;
  }
  #search-message p{
    text-transform: uppercase;
    text-align: center;
  }
  #search-message span{
    animation: floating 1s infinite;
    display: block;
    position: relative;
    text-align: center;
    width: 100%;
  }
  #search-message span i{
    font-size: 150px;
  }

</style>

<script>
import BibleLoader from '../services/BibleLoader.js'

import VueSimpleSuggest from 'vue-simple-suggest'

import 'vue-simple-suggest/dist/styles.css'

export default {
  name: 'ByCite',
  mounted: function () {
    let contentView = document.getElementById('content-view')
    let citaInput = document.getElementById('cita-input')
    contentView.style.width = window.innerWidth - 300 + 'px'
    document.getElementById('results-container').style.paddingTop = document.getElementById('search-box').clientHeight + 'px'
    document.getElementById('search-box').style.width = contentView.clientWidth + 'px'
    document.getElementById('search-btn').style.height = citaInput.offsetHeight + 'px'
    document.getElementById('search-btn').style.width = citaInput.offsetHeight + 'px'
    document.getElementById('searchForm').addEventListener('submit', function (ev) {
      ev.preventDefault()
      let libro = document.getElementById('libro-input').value
      let cita = document.getElementById('cita-input').value
      console.log(libro)
      console.log(cita)
      document.getElementById('search-message').innerHTML = `<div class="message-box-bible"><p class="message-style">${BibleLoader(libro, cita)}</p></div>`
    })
  },
  data: function () {
    return {
      search: '',
      libros: [
        'Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio', 'Josué', 'Jueces', 'Rut', '1 Samuel', '2 Samuel', '1 Reyes', '2 Reyes', '1 Crónicas', '2 Crónicas', 'Esdras', 'Nehemías', 'Ester', 'Job', 'Salmos', 'Proverbios', 'Eclesiastés', 'Cantares', 'Isaías', 'Jeremías', 'Lamentaciones', 'Ezequiel', 'Daniel', 'Oseas', 'Joel', 'Amós', 'Abdías', 'Jonás', 'Miqueas', 'Nahúm', 'Habacuc', 'Sofonías', 'Hageo', 'Zacarías', 'Malaquías', 'Mateo', 'Marcos', 'Lucas', 'Juan', 'Hechos', 'Romanos', '1 Corintios', '2 Corintios', 'Gálatas', 'Efesios', 'Filipenses', 'Colosenses', '1 Tesalonicenses', '2 Tesalonicenses', '1 Timoteo', '2 Timoteo', 'Tito', 'Filemón', 'Hebreos', 'Santiago', '1 Pedro', '2 Pedro', '1 Juan', '2 Juan', '3 Juan', 'Judas', 'Apocalipsis'
      ]
    }
  },
  components: {
    VueSimpleSuggest
  },
  computed: {
    filteredList: function () {
      let busqueda = this.search.toLowerCase()
      busqueda = busqueda.replace('á', 'a')
      busqueda = busqueda.replace('é', 'e')
      busqueda = busqueda.replace('í', 'i')
      busqueda = busqueda.replace('ó', 'o')
      busqueda = busqueda.replace('ú', 'u')
      console.log(busqueda)
      if (this.search === '') return []
      return this.libros.filter(libro => {
        libro = libro.toLowerCase().replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
        return libro.includes(busqueda)
      })
    }
  }
}
</script>
