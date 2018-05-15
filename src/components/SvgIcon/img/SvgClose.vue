<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <g :fill="color" fill-rule="evenodd" transform="translate(0 -1)">
      <rect width="25" height="2.5" x="-2.5" y="9.375" rx=".3" transform="rotate(45 10 10.625)"></rect>
      <rect width="25" height="2.5" x="-2.5" y="9.375" rx=".3" transform="rotate(-45 10 10.625)"></rect>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgClose',
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
