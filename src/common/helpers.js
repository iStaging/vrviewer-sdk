export const checkPanoramaFormat = (panorama) => {
  if (!panorama.objectId) {
    throw new Error('panorama id is required')
  }
}
