export const checkPanoramaFormat = (panorama) => {
  if (!panorama.id) {
    throw new Error('panorama id is required')
  }
}
