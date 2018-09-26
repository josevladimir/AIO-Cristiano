<template>
        <div class="full-height full-width">
            <h2 id="section-title"><span><i class="fa fa-star"/></span> Alabanzas Favoritas</h2>
            <div id="favoritesContainer" class="full-height">
                <div class="full-height">
                    <div v-if="!this.songsList.length" class="favorites-message flex full-height">
                        <div>
                            <span><i class="fas fa-star"></i></span>
                            <p class="lighter">Aún no has agregado ninguna alabanza a tu lista de favoritos!</p>
                        </div>
                    </div>
                    <div id="song-list" v-else>
                        <div class="card" v-for="song in songsList" :key="song.title" @click="renderSong(song.id)">
                            <div>
                                <span>
                                    <i class="fas fa-music"></i>
                                </span>
                            </div>
                            <div>
                                <span><i class="fas fa-star favorite" @click="setFavorites(song.id)"></i></span>
                                <h2 class="center lighter">{{song.title}}</h2>
                                <h4 v-if="song.singer" class="center lighter">{{song.singer}}</h4>
                                <h4 v-if="song.number" class="center lighter">Himno {{song.number}}</h4>
                                <h5 class="center lighter">{{song.type}}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<style scoped>
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
        text-align: center;
        width: 100%;
    }
    .card div:nth-child(2) span i{
        font-size: 25px;
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
    .favorites-message p{
        text-transform: uppercase;
        text-align: center;
    }
    .favorites-message span{
        animation: floating 1s infinite;
        display: block;
        position: relative;
        text-align: center;
        width: 100%;
    }
    .favorites-message span i{
        font-size: 150px;
    }
</style>

<script>
import songs from '../services/Database-fs.js'
import Notify from '../services/Notifications.js'

export default {
  name: 'FavoritesSongs',
  mounted: function () {
    let contentView = document.getElementById('content-view')
    contentView.style.width = window.innerWidth - 300 + 'px'
    document.getElementById('section-title').style.width = contentView.clientWidth + 'px'
    document.getElementById('favoritesContainer').style.paddingTop = document.getElementById('section-title').clientHeight + 20 + 'px'
  },
  data: function () {
    return {
      songsList: songs.favorites
    }
  },
  methods: {
    renderSong: function (id) {
      if (this.render) {
        songs.getSong(id)
        document.getElementById('songView').scrollTop = 0
        document.getElementById('songView').classList.add('getFront')
        document.getElementById('songView').classList.remove('goBack')
      }
      this.render = true
    },
    setFavorites: function (id) {
      let indice = null
      let filtro = []
      songs.favorites.forEach((favorite, index) => {
        if (favorite.id === id) {
          indice = index
          filtro.push(favorite)
        }
      })
      if (filtro.length === 0) {
        songs.favorites.push(songs.songs.filter(song => song.id === id)[0])
        Notify('Añadido a tus Favoritos!', 'success')
      } else {
        songs.favorites.splice(indice, 1)
        Notify('Se ha quitado de tus Favoritos!', 'success')
      }
      let file = ''
      songs.favorites.forEach((favorite, index) => {
        if (index !== (songs.favorites.length - 1)) file += `${JSON.stringify(favorite)}\n`
        else file += JSON.stringify(favorite)
      })
      songs.updateFavorites(file)
      this.render = false
    }
  }
}
</script>
