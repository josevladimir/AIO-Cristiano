<template>
    <div class="full-height">
        <div class="full-height" id="message">
            <div>
                <span class="icon"><i class="fas fa-hand-point-left"></i></span>
                <h1>Bienvenidos</h1>
                <h5>Busca en el panel de la izquierda la canción que desean cantar...</h5>
            </div>
        </div>
    </div>
</template>

<style scoped>
    #message{
        align-items: center;
        display: flex;
        justify-content: center;
    }
    .icon{
        color: #212529;
        display: block;
        text-align: center;
        width: 100%;
    }
    h1,
    h5{
        color: #212529;
        text-align: center;
    }
    .icon i{
        font-size: 150px;
    }
</style>

<script>
export default {
  name: 'Welcome',
  mounted: function () {
    let contentView = document.getElementById('content-view')
    contentView.style.width = window.innerWidth - 300 + 'px'
  }
}
</script>
