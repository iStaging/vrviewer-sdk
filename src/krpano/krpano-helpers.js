// Note: all function should use by .call(this)
const krpanoHelpers = {
  stopAutoRotateEvent () {
    const autoRotateSettings = this.getAutoRotateSettings()
    const keydownHandler = (e) => {
      if (e.keyCode === 37 ||
        e.keyCode === 38 ||
        e.keyCode === 39 ||
        e.keyCode === 40) {
        this.stopAutoRotate(true, autoRotateSettings.restartTime)
      }
    }
    const stopAutoRotateHandler = () => {
      this.stopAutoRotate(true, autoRotateSettings.restartTime)
    }
    return {
      addEvent () {
        window.addEventListener('keydown', keydownHandler)
        window.addEventListener('mousedown', stopAutoRotateHandler)
        window.addEventListener('touchstart', stopAutoRotateHandler)
      },
      removeEvent () {
        window.removeEventListener('keydown', keydownHandler)
        window.removeEventListener('mousedown', stopAutoRotateHandler)
        window.removeEventListener('touchstart', stopAutoRotateHandler)
      }
    }
  }
}

export default krpanoHelpers
