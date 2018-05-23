<template>
  <svg width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <polygon points="0 0 25 0 25 25 0 25"></polygon>
      <rect :fill="color" x="2" y="6" width="20" height="2" rx="0.300000012"></rect>
      <rect :fill="color" x="2" y="11.5" width="20" height="2" rx="0.300000012"></rect>
      <rect :fill="color" x="2" y="17" width="20" height="2" rx="0.300000012"></rect>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgShowMobileMenu',
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
