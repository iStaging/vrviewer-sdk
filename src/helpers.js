export const checkPanoramaFormat = (panorama) => {
  if (!panorama.objectId) {
    throw new Error('panorama objectId is required')
  }
}
