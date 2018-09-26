<template>
  <div>
    <input id="search-input" type="text" @focus="onFocusHandle" @keyup="onKeyUpHandle" @blur="onBlurHandle" :placeholder="placeholder" v-model="search">
    <div v-if="this.overflow" class="absolute" id="result-list">
      <li v-if="filteredList.length && (isSelected || isFocused)" v-for="item in filteredList" :key="item" @click="setValue(item)" >{{item}}</li>
    </div>

    <div v-else id="result-list">
      <li v-if="filteredList.length && (isSelected || isFocused)" v-for="item in filteredList" :key="item" @click="setValue(item)" >{{item}}</li>
    </div>
  </div>
</template>

<style scoped>
  input{
    display: block;
    font-size: 14px;
    font-weight: lighter;
    padding: 10px;
    width: 100%;
  }
  #result-list{
    background: #fff;
    border-radius: 0px 0px 10px 10px;
    max-height: 200px;
    overflow-y: scroll;
    width: 100%;
  }
  #result-list li{
    padding: 10px;
    border-left: 1px solid rgba(0,0,0,.125);
    border-right: 1px solid rgba(0,0,0,.125);
    border-bottom: 1px solid rgba(0,0,0,.125);
  }
  #result-list li:first-child{
    border: 1px solid rgba(0,0,0,.125);
  }
  #result-list li:last-child{
    border-radius: 0px 0px 10px 10px;
  }
  #result-list li:hover{
    cursor: pointer;
    background: rgba(0,0,0,.125);
  }
  .absolute{
    position: absolute;
  }
</style>

<script>

export default {
  name: 'SuggestBox',
  props: {
    placeholder: String,
    datos: Array,
    overflow: Boolean
  },
  mounted: function () {
    if (this.overflow) document.getElementById('result-list').style.width = document.getElementById('search-input').clientWidth + 'px'
  },
  data: function () {
    return {
      array: this.datos,
      search: '',
      isSelected: true,
      isFocused: false
    }
  },
  computed: {
    filteredList: function () {
      var busqueda = this.search.toLowerCase().trim().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')
      if (!busqueda) return []
      return this.array.filter(item => {
        return item.toLowerCase().trim().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').includes(busqueda)
      })
    }
  },
  methods: {
    setValue: function (value) {
      this.search = value
      this.isSelected = false
    },
    onBlurHandle: function () {
      this.isFocused = false
      setTimeout(function () {
        this.isSelected = false
      }, 500)
    },
    onFocusHandle: function () {
      this.isFocused = true
    },
    onKeyUpHandle: function () {
      this.isSelected = true
    }
  }
}
</script>
