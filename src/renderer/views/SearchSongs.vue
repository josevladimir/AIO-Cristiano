<template>
    <div>
        <div class="full-height full-width">
            <div id="search-box">
                <input type="text" name="search-input" id="search-input" v-model="search" placeholder="Buscar..." class="lighter">
                <div id="options-box">
                    <div class="search-option-controls">
                        <input type="radio" name="search-option" checked='true' value="title" id="title" v-model="parameter"/>
                        <label class="lighter" for="title">Por Título</label>
                    </div>
                    <div class="search-option-controls">
                        <input type="radio" name="search-option" value="singer" id="singer" v-model="parameter"/>
                        <label class="lighter" for="singer">Por Cantante</label>
                    </div>                  
                    <div class="search-option-controls">
                        <input type="radio" name="search-option" value="number" id="number" v-model="parameter"/>
                        <label class="lighter" for="number">Por Número</label>
                    </div>
                    <div class="search-option-controls">
                        <input type="radio" name="search-option" value="type" id="type" v-model="parameter"/>
                        <label class="lighter" for="type">Por Tipo</label>
                    </div>
                    <div class="search-option-controls">
                        <input type="radio" name="search-option" value="category" id="category" v-model="parameter"/>
                        <label class="lighter" for="category">Por Categoría</label>
                    </div>
                </div>
            </div>
            <div id="results-container" class="full-height">
                <div class="full-height">
                    <div v-if="!this.search" class="search-message flex full-height">
                        <div>
                            <span><i class="fas fa-arrow-up"></i></span>
                            <p class="lighter">Escribe en el cuadro de texto y selecciona un parámetro de Búsqueda</p>
                        </div>
                    </div>
                    <div v-else class="full-height overflow-y">
                        <div v-if="!this.filteredList.length" class="search-message flex full-height">
                            <div>
                                <span><i class="fas fa-frown"></i></span>
                                <p class="lighter">Opps! No se encontraron coincidencias...</p>
                            </div>
                        </div>
                        <div id="song-list" v-else>
                            <div class="card" v-for="song in filteredList" :key="song.title" :id="song.id" v-on:click="renderSong(song.id)">
                                <div>
                                    <span>
                                        <i class="fas fa-music"></i>
                                    </span>
                                </div>
                                <div>
                                    <span v-if="isFavorite(song.id)"><i :id="`favorite-icon-${song.id}`" class="fas fa-star favorite" @click="setFavorites(song.id)"></i></span>
                                    <span v-else><i :id="`favorite-icon-${song.id}`" class="fas fa-star" @click="setFavorites(song.id)"></i></span>
                                    <h2 class="center lighter">{{song.title}}</h2>
                                    <h4 v-if="song.singer" class="center lighter">{{song.singer}}</h4>
                                    <h4 v-if="song.number" class="center lighter">Himno {{song.number}}</h4>
                                    <h5 class="center lighter">Esta es una alabanza de {{song.type}}</h5>
                                    <h5 class="center lighter">{{song.category}}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #options-box{
        display: grid;
        grid-template-columns: repeat(5,1fr);
        width: 100%;
    }
    #search-box{
        background: #212529;
        padding: 30px;
        position: fixed;
        width: 100%;
    }
    #search-input{
        display: block;
        font-size: 14px;
        margin: auto;
        margin-bottom: 20px;
        outline-color: transparent !important;
        outline-style: none !important;
        padding: 10px 20px !important;
        width: 80%;
    }
    #song-list{
        display: block;
        overflow-y: scroll;
    }
    .card{
        background: #fff;
        border: 1px solid #999;
        margin: 20px auto;
        overflow: hidden;
        padding: 20px;
        transition: .25s linear all;
        width: 70%;
    }
    .card div:nth-child(1){
        display: block;
        float: left;
        text-align: center;
        width: 20%;
    }
    .card div:nth-child(1) span{
        align-items: center;
        background: rgb(67, 141, 226);
        border-radius: 50%;
        display: flex;
        height: 100px;
        justify-content: center;
        width: 100px;
    }
    .card div:nth-child(1) span i{
        color: #fff;
        font-size: 40px;
    }
    .card div:nth-child(2){
        display: block;
        float: left;
        width: 80%;
    }
    .card div:nth-child(2) span{
        display: block;
        height: 25px;
        margin: auto;
        text-align: center;
        width: 28.15px;
        z-index: 300;
    }
    .card div:nth-child(2) span i{
        font-size: 25px;
        z-index: 1000;
    }
    .card div:nth-child(2) span i:hover{
        color: rgb(255, 134, 53);
    }
    .card:hover{
        cursor: pointer;
        box-shadow: 0px 0px 10px rgba(0,0,0,.5);
        transform: scale(1.05);
        transition: .25s linear all;
    }
    .favorite{
        color: rgb(255, 134, 53);
    }
    .search-message p{
        text-transform: uppercase;
        text-align: center;
    }
    .search-message span{
        animation: floating 1s infinite;
        display: block;
        position: relative;
        text-align: center;
        width: 100%;
    }
    .search-message span i{
        font-size: 150px;
    }
    .search-option-controls{
        display: flex;
        justify-content: center;
    }
    .search-option-controls label{
        color: #ccc;
        font-size: 12px;
    }
    .search-option-controls input{
        margin-right: 10px;
    }
</style>

<script>

import songs from '../services/Database-fs.js'
import Notify from '../services/Notifications.js'

export default {
  name: 'SearchSongs',
  mounted: function () {
    let contentView = document.getElementById('content-view')
    contentView.style.width = window.innerWidth - 300 + 'px'
    document.getElementById('results-container').style.paddingTop = document.getElementById('search-box').clientHeight + 'px'
    document.getElementById('search-box').style.width = contentView.clientWidth + 'px'
  },
  data: function () {
    return {
      render: true,
      search: '',
      parameter: 'title',
      songsList: songs.songs
    }
  },
  computed: {
    filteredList: function () {
      return this.songsList.filter(song => {
        return song[this.parameter].toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    renderSong: function (id) {
      if (this.render) {
        songs.getSong(id)
        var fontChorusLabel = 30
        var fontSize = 25
        document.getElementById('chorusLabel').style.fontSize = `${fontChorusLabel}px`
        document.getElementById('firstParagraphView').style.fontSize = `${fontSize}px`
        document.getElementById('chorusView').style.fontSize = `${fontSize}px`
        document.getElementById('paragraphsView').style.fontSize = `${fontSize}px`
        document.getElementById('songView').scrollTop = 0
        document.getElementById('songView').classList.add('getFront')
        document.getElementById('songView').classList.remove('goBack')
      }
      this.render = true
    },
    setFavorites: function (id) {
      this.render = false
      let indice = null
      let filtro = []
      let icono = document.getElementById(`favorite-icon-${id}`)
      songs.favorites.forEach((favorite, index) => {
        if (favorite.id === id) {
          indice = index
          filtro.push(favorite)
        }
      })
      if (filtro.length === 0) {
        songs.favorites.push(songs.songs.filter(song => song.id === id)[0])
        Notify('Añadido a tus Favoritos!', 'success')
        icono.classList.add('favorite')
      } else {
        songs.favorites.splice(indice, 1)
        Notify('Se ha quitado de tus Favoritos!', 'success')
        icono.classList.remove('favorite')
      }
      let file = ''
      songs.favorites.forEach((favorite, index) => {
        if (index !== (songs.favorites.length - 1)) file += `${JSON.stringify(favorite)}\n`
        else file += JSON.stringify(favorite)
      })
      songs.updateFavorites(file)
    },
    isFavorite: function (id) {
      let result = false
      songs.favorites.forEach(favorite => {
        if (favorite.id === id) {
          result = true
        }
      })
      return result
    }
  }

}
</script>
