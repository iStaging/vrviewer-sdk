<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="5" height="22" viewBox="0 0 5 22">
    <g fill="none" fill-rule="evenodd">
      <path d="M-9-1h22.167v22.167H-9z"></path>
      <g :fill="color">
        <path d="M3.759 7.817H.537A.531.531 0 0 0 0 8.342v11.55c0 .29.24.525.537.525h3.222a.531.531 0 0 0
          .536-.525V8.342c0-.29-.24-.525-.536-.525M3.759.467H.537A.531.531 0 0 0 0 .992v3.15c0 .29.24.525.537.525h3.222a.531.531
          0 0 0 .536-.525V.992c0-.29-.24-.525-.536-.525"></path>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgInformation',
  props: {
    color: {
      type: String,
      default () {
        return '#fff'
      }
    }
  }
}
</script>
