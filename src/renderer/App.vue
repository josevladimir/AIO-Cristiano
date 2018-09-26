<template>
	<div id="app">
        <div id="bar" class="full-width">

		</div>
		<!--SIDEBAR-->
		<div id="sidebar" class="full-height">
			<router-link to="/" class="lighter" id="home-item"><i class="fas fa-home"></i> INICIO</router-link>
			<li class="lighter" id="songs-btn"><i class="fas fa-music"></i> ALABANZAS</li>
			<div class="sub lighter invisible" id="songs-sub">
				<router-link to="/search-songs"><i class="fas fa-search"></i> Buscar</router-link>
				<router-link to="/add-songs"><i class="fas fa-plus"></i> Agregar</router-link>
				<router-link to="/favorites-songs"><i class="fas fa-star"></i> Favoritas</router-link>
			</div>
			<li class="lighter" id="bible-btn"><i class="fas fa-book"></i> BUSCAR EN LA BIBLIA</li>
			<div id="bible-sub" class="sub lighter invisible">
				<router-link to="/by-cite"><i class="fas fa-quote-right"></i> Por Cita</router-link>
				<router-link to="/by-content"><i class="fas fa-sticky-note"></i> Por Contenido</router-link>
				<router-link to="/by-category"><i class="fas fa-folder-open"></i> Por Temática</router-link>
			</div>
			<div id="copyleft">
				<p class="lighter"><center>Cancionero Cristiano - Copyleft 2018 - Software Libre<br/>
					Desarrollado por José Vladimir Vanegas Pila</center></p>
			</div>	
		</div>
		<!--FIN-SIDEBAR-->
		<router-view id="content-view" class="full-height">
			<!--AQUÍ-SE-INYECTARÁN-LAS-VISTAS-->
		</router-view>

    <div id="notifications" class="no-visible">
      <!--Espacio para las notificaciones-->
    </div>

    <div id="songView" class="full-height full-width goBack">
      <span id="backIcon" @click="hideSongView"><i id="backBtn" class="far fa-arrow-alt-circle-left"></i></span>
      <div id="songViewContainer">
        <h1 class="center" id="titleSongView"></h1>
        <h5 class="center" id="typeSongView"></h5>
        <h5 class="center" id="categorySongView"></h5>
        <h5 class="center" id="singerSongView"></h5>
        <pre id="firstParagraphView"></pre>
        <pre id="chorusLabel">CORO</pre>
        <pre id="chorusView"></pre>
        <pre id="paragraphsView"></pre>
      </div>
      <div id="zoomControls">
        <span id="editBtn" title="Editar"><i class="fa fa-pencil-alt"></i></span>
        <span id="zoomIn" @click="zoom('In')" title="Acercar" class="itemControls"><i class="fa fa-plus"></i></span>
        <span id="zoomOut" @click="zoom('Out')" title="Alejar" class="itemControls"><i class="fa fa-minus"></i></span>
      </div>
    </div>

	</div>
</template>

<style>
	*{
		box-sizing: border-box;
		font-family: sans-serif;
		margin: 0px;
		padding: 0px;
	}
	a{
		text-decoration: none;
	}
	#app,
	body,
	html{
		height: 100%;
		width: 100%;
	}
	li,
	ul{
		list-style: none;
	}
  input,
  textarea{
    border: 1px solid #cde !important;
    font-size: 14px !important;
    border-radius: 3px !important; 
    padding: 10px !important;
    outline: none !important;
  }
  input:focus,
  textarea:focus{
    border-color: #333 !important;
  }
  #section-title{
    background: #ccc;
    border-bottom: 1px solid #212529;
    color: #212529;
    padding: 15px 50px;
    font-weight: normal;
    position: fixed;
  }
	.actived-sidebar{
		background: rgba(0,0,0,.5);
		color: #fff;
	}
  .center{
    text-align: center;
  }
  .error{
    background: rgba(92, 0, 0, 0.5) !important;
    border: 1px solid rgb(92,0,0) !important;
    border-radius: 5px !important;
    box-shadow: 5px 5px 20px rgba(92,0,0,.26) !important;
    color: #fff !important;
  }
  .flex{
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .full-height{
    height: 100%;
  }
  .full-width{
    width: 100%;
  }
  .getFront{
    z-index: 100;
  }
  .goBack{
    z-index: -4;
  }
  .invisible{
    display: none;
  }
  .lighter{
    font-weight: lighter;
  }
  .no-visible{
    display: none;
    opacity: 0;
    transition: .5s linear all;
    visibility: hidden;
  }
  .overflow-y{
    overflow-y: scroll;
  }
  .success{
    background: rgba(0, 92, 0, 0.5) !important;
    border: 1px solid rgb(0,92,0) !important;
    border-radius: 5px !important;
    box-shadow: 5px 5px 20px rgba(0,92,0,.26) !important;
    color: #fff !important;
  }
  .visible{
    display: block !important;
    opacity: 1 !important;
    transition: .5s linear all !important;
    visibility: visible !important;
  }
  .message-style{
    font-size: 45px;
    font-weight: bold;
    text-align: center;
  }
  .message-box-bible{
    align-items: center;
    justify-content: center;
    max-height: 90%;
    width: 500px;
  }
	@keyframes floating {
    from {
      top: 0px;
    } 50% {
      top: -20px;
    } to{
      top: 0px;
    }
  }
</style>

<style scoped>
	#bar{
		background: #212529;
		height: 50px;
		position: absolute;
		z-index: 100;
	}
	#content-view{
		background: #f2f2f2;
		overflow-y: scroll;
		position: relative;
		padding-top: 50px;
		right: -300px;
		top: -100%;
    z-index: 10;
	}
	#copyleft{
		bottom: 20px;
		color: #ccc;
		font-size: 12px;
		position: absolute;
		width: 300px;
	}
	#home-item{
		border-bottom: 1px solid #212529;
		color: #bbb;
		display: block;
		padding: 20px 30px;
	}
	#home-item:hover{
		background: rgba(0,0,0,.5);
		border-bottom: 1px solid #212529;
		color: #fff;
		cursor: pointer;
	}
	#sidebar{
		background: rgb(52,58,64);
		padding-top: 50px;
		width: 300px;
    z-index: 10;
	}
	#sidebar li{
		border-bottom: 1px solid #212529;
		color: #bbb;
		padding: 20px 30px;
	}
	#sidebar li:hover{
		background: rgba(0,0,0,.5);
		border-bottom: 1px solid #212529;
		color: #fff;
		cursor: pointer;
	}
  #songView{
    background: #f2f2f2;
    height: 100%;
    overflow-y: scroll;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  #songViewContainer{
      box-sizing: border-box;
      padding: 0px 50px;
      max-width: 100%;
      width: 100%;
  }
  #backIcon{
      cursor: pointer;
      position: fixed;
      top: 30px;
      left: 30px;
  }
  #backIcon i{
      font-size: 50px;
  }
  #backIcon:hover i{
      color: rgb(2, 54, 18)
  }
  #chorusLabel{
    font-size: 30px;
    font-weight: bold;
    text-align: center !important;
    width: 100%;
  }
  #firstParagraphView,
  #chorusView{
    margin: 20px 0px;
  }
  #chorusView{
    margin-top: 0px;
  }
  #firstParagraphView,
  #chorusView,
  #paragraphsView{
    font-size: 25px;
    text-align: center !important;
    width: 100%;
  }
  #songViewContainer{
    padding: 50px;
  }
  #songViewContainer h1{
    font-size: 35px;
  }
  #songViewContainer h5{
    font-size: 20px;
    font-weight: normal;
  }
  #zoomControls{
      bottom: 130px;
      position: fixed;
      right: 20px;
  }
  #zoomIn,
  #zoomOut{
      background: rgba(0,0,0,.06);
      border: 1px solid rgba(0,0,0,.06);
      box-sizing: border-box;
      cursor: pointer;
      display: block;
      padding: 10px;
  }
  #zoomIn > i,
  #zoomOut > i{
      color: rgba(0,0,0,.16);
  }
  #zoomIn:hover,
  #zoomOut:hover{
      border: 1px solid #000;
      background: rgba(0,0,0,.56);
  }
  #zoomIn:hover > i,
  #zoomOut:hover > i{
      color: #fff;
  }
  #editBtn{
      border: 1px solid black;
      border-radius: 50%;
      display: block;
      margin-bottom: 10px;
      padding: 10px;
  }
  #editBtn:hover{
      background: rgba(0,0,0,.46);
      cursor: pointer;
  }
  #editBtn:hover > i{
      color: #fff;
  }
  #notifications{
    background: rgba(0,0,0,.50);
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 5px 5px 20px rgba(0,0,0,.26);
    bottom: 30px;
    color: #fff;
    display: none;
    font-weight: lighter !important;
    opacity: 1;
    padding: 10px;
    position: absolute;
    right: 30px;
    z-index: 1000;
  }
  .desactiveCtrl:hover{
    background: rgba(0,0,0,.06) !important;
  }
  .desactiveCtrl:hover > i{
      color: rgba(0,0,0,.16) !important;
  }
	.sub{
		background: rgba(0,0,0,.5);
	}
	.sub a{
		display: block;
		color: #bbb;
		padding: 20px 30px 20px 60px;
	}
	.sub a:hover{
		color: #fff;
	}
</style>


<script>
  import songs from './services/Database-fs.js'

  var fontChorusLabel = 30
  var fontSize = 25

  export default {
    name: 'aio_cristiano_vue_electron',
    mounted: function () {
      layout()
      sidebar()
      songs.load()
    },
    methods: {
      hideSongView: function () {
        document.getElementById('songView').classList.remove('getFront')
        document.getElementById('songView').classList.add('goBack')
      },
      zoom: function (type) {
        let firstParagraphView = document.getElementById('firstParagraphView')
        let chorusLabel = document.getElementById('chorusLabel')
        let chorusView = document.getElementById('chorusView')
        let paragraphsView = document.getElementById('paragraphsView')
        if (type === 'In') {
          if (fontSize < 40) {
            fontChorusLabel += 1
            fontSize += 1
            firstParagraphView.style.fontSize = `${fontSize}px`
            chorusLabel.style.fontSize = `${fontChorusLabel}px`
            chorusView.style.fontSize = `${fontSize}px`
            paragraphsView.style.fontSize = `${fontSize}px`
            if (fontSize === 40) document.getElementById('zoomIn').classList.add('desactiveCtrl')
            else if (fontSize === 19) document.getElementById('zoomOut').classList.remove('desactiveCtrl')
          }
        } else {
          if (fontSize > 18) {
            fontChorusLabel -= 1
            fontSize -= 1
            firstParagraphView.style.fontSize = `${fontSize}px`
            chorusLabel.style.fontSize = `${fontChorusLabel}px`
            chorusView.style.fontSize = `${fontSize}px`
            paragraphsView.style.fontSize = `${fontSize}px`
            if (fontSize === 18) document.getElementById('zoomOut').classList.add('desactiveCtrl')
            else if (fontSize === 39) document.getElementById('zoomIn').classList.remove('desactiveCtrl')
          }
        }
      }
    }
  }

  function layout () {
    let contentView = document.getElementById('content-view')
    contentView.style.width = window.innerWidth - 300 + 'px'
  }

  function sidebar () {
    let subSongs = document.getElementById('songs-sub')
    let subBible = document.getElementById('bible-sub')
    document.getElementById('songs-btn').addEventListener('click', function (ev) {
      if (subSongs.classList.contains('invisible')) {
        subSongs.classList.remove('invisible')
        ev.target.classList.add('actived-sidebar')
      } else {
        subSongs.classList.add('invisible')
        ev.target.classList.remove('actived-sidebar')
      }
      if (!subBible.classList.contains('invisible')) {
        subBible.classList.add('invisible')
        document.getElementById('bible-btn').classList.remove('actived-sidebar')
      }
    })
    document.getElementById('bible-btn').addEventListener('click', function (ev) {
      if (subBible.classList.contains('invisible')) {
        subBible.classList.remove('invisible')
        ev.target.classList.add('actived-sidebar')
      } else {
        subBible.classList.add('invisible')
        ev.target.classList.remove('actived-sidebar')
      }
      if (!subSongs.classList.contains('invisible')) {
        subSongs.classList.add('invisible')
        document.getElementById('songs-btn').classList.remove('actived-sidebar')
      }
    })
}
</script>