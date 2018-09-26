<script>
export default {
  name: 'ByContent',
  mounted: function () {
    let contentView = document.getElementById('content-view')
    contentView.style.width = window.innerWidth - 300 + 'px'
  }
}
</script>
