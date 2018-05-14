<template>
  <div class="i-map">
    <div v-if="searchable" class="search-container">
      <input
        ref="pac-input"
        class="controls"
        :placeholder="$t('hints.searchMapHint')">
      <i class="fa fa-search"></i>
    </div>
    <div v-if="shouldShowAddress && markers.length" class="result">
      <button
        type="button"
        class="close"
        @click="clearMarkers">
        <span>&times;</span>
      </button>
      <p class="address">{{ address }}</p>
      <p class="latlng">{{ latLng.lat }}, {{ latLng.lng }}</p>
    </div>
    <div id="google-map"></div>
  </div>
</template>

<script>
export default {
  name: 'IMap',
  props: {
    lat: {
      type: Number,
      default () {
        return 0
      }
    },
    lng: {
      type: Number,
      default () {
        return 0
      }
    },
    draggable: {
      type: Boolean,
      default () {
        return false
      }
    },
    searchable: {
      type: Boolean,
      default () {
        return false
      }
    },
    showDecimalPoint: {
      type: Number,
      default () {
        return 0
      }
    },
    shouldShowAddress: {
      type: Boolean,
      default () {
        return true
      }
    },
    hasMapTypeControl: {
      type: Boolean,
      default () {
        return true
      }
    },
    hasScaleControl: {
      type: Boolean,
      default () {
        return true
      }
    },
    hasStreetViewControl: {
      type: Boolean,
      default () {
        return true
      }
    },
    hasRotateControl: {
      type: Boolean,
      default () {
        return true
      }
    },
    hasFullscreenControl: {
      type: Boolean,
      default () {
        return true
      }
    }
  },

  data () {
    return {
      latLng: {
        lat: this.lat,
        lng: this.lng
      },
      address: '',
      markers: []
    }
  },

  mounted () {
    /* eslint-disable */
    const googleMap = document.getElementById('google-map')
    if (googleMap) {
      const map = new google.maps.Map(googleMap, {
        zoom: 15,
        center: this.latLng,
        mapTypeControl: this.hasMapTypeControl,
        scaleControl: this.hasScaleControl,
        streetViewControl: this.hasStreetViewControl,
        rotateControl: this.hasRotateControl,
        fullscreenControl: this.hasFullscreenControl
      })
      this.initMarker(map)
      if (this.searchable) {
        this.initSeearBox(map)
      }
      this.setPosition(this.latLng)
    }
    /* eslint-enable */
  },

  methods: {
    initMarker (map) {
      /* eslint-disable */
      // only one now
      const marker = new google.maps.Marker({
        position: this.latLng,
        draggable: this.draggable,
        animation: google.maps.Animation.DROP,
        map: map
      })
      this.markers.push(marker)

      if (this.draggable) {
        google.maps.event.addListener(marker, 'dragend', event => {
          const position = marker.getPosition()
          const latLng = {lat: position.lat(), lng: position.lng()}
          this.setPosition(latLng)
        })
      }
      /* eslint-enable */
    },

    initSeearBox (map) {
      /* eslint-disable */
      const pacInput = this.$refs['pac-input']
      const searchBox = new google.maps.places.SearchBox(pacInput)
      google.maps.event.addDomListener(pacInput, 'keydown', event => {
        if (event.keyCode === 13) {
            event.preventDefault()
        }
      })
      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds())
      })
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces()
        if (!places.length) {
          return
        }

        this.clearMarkers()
        const bounds = new google.maps.LatLngBounds()
        places.forEach(place => {
          if (!place.geometry) {
            window.alert("Returned place contains no geometry")
            return
          }

          this.markers.push(new google.maps.Marker({
            map: map,
            // icon: icon,
            title: place.name,
            position: place.geometry.location
          }))
          this.setPosition(place.geometry.location)
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport)
          } else {
            bounds.extend(place.geometry.location)
          }
        })
        map.fitBounds(bounds)
      })
      /* eslint-enable */
    },

    clearMarkers () {
      this.markers.forEach(marker => {
        marker.setMap(null)
      })
      this.markers = []
    },

    setPosition (latLng) {
      /* eslint-disable */
      const self = this
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({
        location: latLng
      }, (results, status) => {
        if (status === 'OK') {
          const newMarkerInfo = results[0]
          const lat = newMarkerInfo.geometry.location.lat()
          const lng = newMarkerInfo.geometry.location.lng()

          self.address = newMarkerInfo.formatted_address
          if (self.showDecimalPoint) {
            self.latLng = {
              lat: lat.toFixed(self.showDecimalPoint),
              lng: lng.toFixed(self.showDecimalPoint)
            }
          } else {
            self.latLng = {
              lat,
              lng
            }
          }
        } else {
          console.log('no address')
        }
      })
      /* eslint-enable */
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~css/variables.styl'
@import '~css/extends.styl'

.i-map {
  padding-top: 20px
  height: 100%
  z-index: 1
}

#google-map {
  @extend .full
}

.i-map, #google-map {
  position: relative
  width: 100%
  font-family: "PingFangTC"
}

.search-container {
  position: absolute
  z-index: $map-search-container-z
  width: 310px
  height: 40px
  background-color: $white
  margin: 10px 0 0 12px
  border-radius: 5px

  .controls {
    border: 1px solid transparent
    width: calc(100% - 30px)
    height: 40px
    outline: none
    padding: 0 10px
    font-size: 14px
    font-weight: 500
    text-overflow: ellipsis

    &:focus {
      border-color: white
    }
  }

  .fa {
    color: $light-gray2
  }
}

.pac-container {
  display: none
}

.result {
  position: absolute
  left: 0
  top: 0
  width: 310px
  z-index: $map-result-z
  margin: 55px 0 0 12px
  padding: 20px 10px 10px 10px
  border-radius: 5px
  background-color: $white

  .close {
    position: absolute
    top: 3px
    right: 8px
  }

  .address {
    margin: 0
    font-weight: 500
    font-size: 12px
    color: $black
  }

  .latlng {
    margin: 0
    font-size: 10px
    color: $light-gray2
  }
}

#target {
  width: 345px
}

@media (min-width: $response) {
  .i-map {
    padding-top: 30px
  }
}
</style>
