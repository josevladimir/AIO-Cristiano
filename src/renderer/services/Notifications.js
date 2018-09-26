export default function notify (message, type) {
  let notifyView = document.getElementById('notifications')
  if (type === 'success') {
    notifyView.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`
  } else if (type === 'error') {
    notifyView.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`
  } else if (type === 'warning') {
    notifyView.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`
  }
  notifyView.classList.add(type)
  notifyView.classList.remove('no-visible')
  notifyView.classList.add('visible')
  setTimeout(function () {
    notifyView.classList.remove('visible')
    notifyView.classList.add('no-visible')
    notifyView.classList.remove(type)
  }, 6000)
}
