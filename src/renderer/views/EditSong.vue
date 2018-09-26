<template>
  <form id="newSongForm" class="full-width full-height">
    <h2 id="section-title"><span><i class="fa fa-plus"/></span> Agregar Nueva Alabanza</h2>
    <div id="newSongContainer">
      <label for="selectCategory" class="setting">¿Qué tipo de alabanza desea agregar?</label>
      <select id="selectCategory" name="selectCategory" v-model="selected">
        <option value=""></option>
        <option value="Coro">Coro</option>
        <option value="Especial">Especial</option>
      </select>

      <div id="editor-section"  v-if="this.selected">

        <div class="newSongFormItem">
          <p class="setting">Título del {{this.selected}}:</p>
          <input type="text" name="songTitle" id="songTitle" class="inputNewSongForm full-width" placeholder="Ingrese aquí el Título de la Alabanza...">
        </div>

        <div class="newSongFormItem" v-if="this.selected === 'Especial'">
          <p class="setting">Cantante de la Alabanza:</p>
          <input type="text" name="songSinger" id="songSinger" class="inputNewSongForm full-width" placeholder="Ingrese aquí el Nombre del Cantante de la Alabanza">
        </div>

        <div class="newSongFormItem">
          <p class="setting">Letra del {{this.selected}}:</p>
          <textarea type="text" name="songChorus" id="songChorus" :placeholder="`Ingresa aquí la letra del ${this.selected}..`" class="inputNewSongForm full-width lighter"></textarea>
        </div>

        <div class="newSongFormItem">
          <p class="setting">¿En qué categoría ubica esta alabanza?</p>
          <div class="radioTypeAlabanza"> 
            <input type="radio" name="typeAlabanza" id="avivamiento Opt" value="avivamiento" checked>
            <label for="avivamientoOpt">Avivamiento</label>
          </div>
          <div class="radioTypeAlabanza">
            <input type="radio" name="typeAlabanza" id="adoracionOpt" value="adoracion">
            <label for="adoracionOpt">Adoración</label>
          </div>
          <div v-if="this.selected !== 'Coro'" class="radioTypeAlabanza">
            <input type="radio" name="typeAlabanza" id="villancicosOpt" value="villancicos">
            <label for="villancicosOpt">Villancicos</label>
          </div>
          <div v-if="this.selected !== 'Coro'" class="radioTypeAlabanza">
            <input type="radio" name="typeAlabanza" id="infantilOpt" value="infantil">
            <label for="infantilOpt">Infantil</label>
          </div>
        </div>

        <div id="buttonGroup">
          <button type="button" id="cancelBtn" @click="cancelSong">CANCELAR</button>
          <button type="button" id="saveBtn" @click="saveSong">GUARDAR</button>
        </div>
      </div>

    </div>
  </form>
</template>

<style scoped>
    #buttonGroup{
        border-top: 1px solid #212529;
        margin-top: 40px;
        overflow: hidden;
        padding: 20px 0px; 
    }
    #buttonGroup button{
        cursor: pointer;
        float: right;
        margin-left: 10px;
        padding: 10px 20px;
        position: relative;
    }
    #cancelBtn{
        border: 2px solid #666;
        background: none;
        box-sizing: border-box !important;
        color: #666;
    }
    #cancelBtn:hover{
        background: #666;
        color: #fff;
    }
    #newSongContainer{
        padding: 50px;
    }
    #saveBtn{
        color: #fff;
        background: rgb(52,58,64);
        border: 2px solid rgb(52,58,64);
    }
    #saveBtn:hover{
        background: #212529;
    }
    #selectCategory{
        font-size: 14px;
        margin-left: 10px;
        width: 200px;
    }
    #songChorus{
        height: 300px;
        resize: none;
    }
    .inputNewSongForm{                                
        font-size: 16px;  
        padding: 5px 10px;
        font-weight: lighter;
    }
    .newSongFormItem{
        margin: 20px 0px;
    }
    .radioTypeAlabanza{
        display: inline-block;
        margin-right: 20px;
    }
    .radioTypeAlabanza label{
        font-size: 14px;
        font-weight: lighter;
        margin-left: 10px;
    }
    .setting{
        display: block;
        font-size: 14px;
        font-weight: lighter;
        margin-bottom: 5px;
    }
</style>

<script>
import { addSong } from '../services/Database-fs.js'
import Notify from '../services/Notifications.js'
export default {
  name: 'AddSongs',
  data: function () {
    return {
      selected: ''
    }
  },
  mounted: function () {
    let contentView = document.getElementById('content-view')
    contentView.style.width = window.innerWidth - 300 + 'px'
    document.getElementById('section-title').style.width = contentView.clientWidth + 'px'
    document.getElementById('newSongContainer').style.paddingTop = document.getElementById('section-title').clientHeight + 20 + 'px'
  },
  methods: {
    cancelSong: function () {
      if (confirm('Si cancelas perderás todos los datos que no has guardado.\n\n¿Estas seguro de continuar?')) window.location = '/#/'
    },
    saveSong: function () {
      let title = document.getElementById('songTitle').value.trim()
      let category = this.selected.toLowerCase()
      let singer = ' '
      let type = document.querySelector('input[name=typeAlabanza]:checked').value
      let data = ''
      let newSong = {
        title: '',
        singer: '',
        category: '',
        number: '',
        type: '',
        id: ''
      }
      if ((document.getElementById('songTitle').value.trim() && document.getElementById('songChorus').value.trim())) {
        newSong.title = title
        newSong.category = category
        newSong.type = type
        newSong.id = title.replace(/ /g, '-').toLowerCase()
        if (this.selected === 'Especial') {
          singer = document.getElementById('songSinger').value
          if (singer) newSong.singer = singer
          else newSong.singer = 'Desconocido'
          data = `${title}##${category}## ##${type}##${newSong.singer}`
        } else data = `${title}##${category}## ##${type}## ##\n`
        data += `###${document.getElementById('songChorus').value}`
        addSong(newSong, data)
      } else Notify('Debe llenar todos los Campos...', 'error')
    }
  }
}
</script>
