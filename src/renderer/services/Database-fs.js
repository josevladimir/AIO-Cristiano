import Notify from './Notifications.js'

const fs = require('fs')
const path = require('path')

var songs = {
  songs: [],
  favorites: [],
  load: function () {
    fs.readFile(path.join(__dirname, '/../assets/songs/Index.txt'), 'utf-8', function (error, data) {
      if (error) return console.log(error)
      let songsList = data.split(/\n/g)
      songsList.forEach(song => {
        songs.songs.push(JSON.parse(song))
      })
    })
    fs.readFile(path.join(__dirname, '/../assets/songs/favorites.txt'), 'utf-8', function (error, data) {
      if (error) return console.log(error)
      let songsList = data.split(/\n/g)
      songsList.forEach(song => {
        songs.favorites.push(JSON.parse(song))
      })
    })
  },
  getSong: function (id) {
    let url = path.join(__dirname, `/../assets/songs/${id}.txt`)
    fs.readFile(url, 'utf-8', function (error, data) {
      if (error) return console.log(error)
      let chorus, paragraph
      let song = data.split(/###/g)
      let options = song.shift()
      options = options.split('##')
      options.forEach(option => {
        option.trim()
      })
      if (song.length === 1) paragraph = song[0]
      else {
        paragraph = []
        song.forEach(frase => {
          if (frase.includes('!!')) chorus = frase.replace(/!!/g, '')
          else paragraph.push(frase)
        })
      }
      return printSong({
        options,
        chorus,
        paragraph
      })
    })
  },
  updateFavorites: function (file) {
    fs.writeFile(path.join(__dirname, '/../assets/songs/favorites.txt'), file, 'utf-8', function (error) {
      if (error) console.log(error)
    })
  }
}

function printSong (song) {
  document.getElementById('titleSongView').innerHTML = song.options[0]
  document.getElementById('typeSongView').innerHTML = `Alabanza de ${song.options[3]}`
  document.getElementById('categorySongView').innerHTML = song.options[1]
  if (song.options[4]) document.getElementById('singerSongView').innerHTML = song.options[4]
  if (!song.chorus) {
    document.getElementById('chorusLabel').classList.add('invisible')
    document.getElementById('paragraphsView').innerHTML = song.paragraph
  } else {
    document.getElementById('chorusLabel').classList.remove('invisible')
    document.getElementById('firstParagraphView').innerHTML = song.paragraph[0].trim()
    document.getElementById('chorusView').innerHTML = song.chorus.trim()
    document.getElementById('paragraphsView').innerHTML = song.paragraph[1].trim()
  }
}

export default songs

export function addSong (newSong, data) {
  songs.songs.push(newSong)
  let songList = songs.songs
  var file = ''
  songList.forEach((song, index) => {
    if (index !== (songList.length - 1)) file = file + `${JSON.stringify(song)}\n`
    else file = file + `${JSON.stringify(song)}`
  })
  fs.writeFile(path.join(__dirname, '/../assets/songs/Index.txt'), file, 'utf-8', function (error) {
    if (error) return console.log(error)
    return fs.writeFile(path.join(__dirname, `/../assets/songs/${newSong.id}.txt`), data, 'utf-8', function (error) {
      if (error) return console.log(error)
      document.getElementById('songView').scrollTop = 0
      document.getElementById('songView').classList.add('getFront')
      document.getElementById('songView').classList.remove('goBack')
      Notify('Se ha agregado la alabanza al Cancionero!', 'success')
      return songs.getSong(newSong.id)
    })
  })
}

// ------- Artists --------

export class Artist {
  constructor () {
    this.singers = fs.readFileSync(path.join(__dirname, '/../assets/songs/Singers.txt'), 'utf-8').split(/\n/g)
    console.log(this.singers)
  }
  getSingers () {
    return this.singers
  }
  updateArtists (newArtist) {
    var data = ''
    this.singers.push(newArtist)
    this.singers.forEach((singer, index, array) => {
      if (index !== (array.length - 1)) data += `${singer}\n`
      else data += singer
    })
    fs.writeFile(path.join(__dirname, '/../assets/songs/Singers.txt'), data, 'utf-8', function (error) {
      if (error) return console.log(error)
    })
  }
}

// ----------------------

// ------- Artists --------

export class Titles {
  constructor () {
    this.titles = fs.readFileSync(path.join(__dirname, '/../assets/songs/Titles.txt'), 'utf-8').split(/\n/g)
    console.log(this.titles)
  }
  getTitles () {
    return this.titles
  }
  updateTitles (newTitle) {
    var data = ''
    this.titles.push(newTitle)
    this.titles.forEach((title, index, array) => {
      if (index !== (array.length - 1)) data += `${title}\n`
      else data += title
    })
    fs.writeFile(path.join(__dirname, '/../assets/songs/Titles.txt'), data, 'utf-8', function (error) {
      if (error) return console.log(error)
    })
  }
}

// ----------------------
