export default function (libro, cita) {
  libro = libro.trim().toLowerCase().replace(/ /g, '_').replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')
  var libroArray = require(`./bible/${libro}.js`)
  cita = cita.trim().replace(/ /g, '')
  if (cita.indexOf(':') !== -1) {
    var citaArray = cita.split(':')
    var capitulo = parseInt(citaArray[0]) - 1
    var versos = citaArray[1]
    if (versos.indexOf('-') !== -1) {
      let from = parseInt(versos.split('-')[0]) - 1
      let to = parseInt(versos.split('-')[1]) - 1
      let aux = ''
      for (var i = from; i <= to; i++) {
        aux += `<sup>${i + 1}</sup>${libroArray[capitulo][i]}`
      }
      return aux
    }
    versos -= 1
    return libroArray[capitulo][versos]
  } else {
    let texto = ''
    libroArray[cita - 1].forEach((versiculos, index) => {
      texto += `<sup>${index + 1}</sup>${versiculos}`
    })
    return texto
  }
}
