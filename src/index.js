const test1 = () => {
  console.log('in test1')
}

const vrmaker = {
  init: () => {
    console.log('in init')
  }
}

// window.vrmaker = vrmaker

export {
  test1,
  vrmaker
}
