Datastore = require('nedb')

export class Database {
  constructor () {
    this.db = new Datastore({ filename: './db.json', autoload: true })
  }

  insert (song) {
    return new Promise((resolve, reject) => {
      return this.db.insert(song, (err, newSong) => {
        if (err) {
          reject(err)
        } else {
          resolve(newSong)
        }
      })
    })
  }

  findAll () {
    return new Promise((resolve, reject) => {
      return this.db.find({}, (err, songs) => {
        if (err) {
          reject(err)
        } else {
          resolve(songs)
        }
      })
    })
  }

  remove (id) {
    return new Promise((resolve, reject) => {
      return this.db.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) {
          reject(err)
        } else {
          resolve(numRemoved)
        }
      })
    })
  }
}
