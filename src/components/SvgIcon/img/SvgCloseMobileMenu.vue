<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <g fill="none" fill-rule="evenodd">
      <path d="M25 0H0v25h25z"></path>
      <g :fill="color" transform="matrix(-1 0 0 1 25 4)">
        <rect width="10" height="2" y="4" rx=".3" transform="rotate(-45 5 5)"></rect>
        <rect width="20" height="2" x="2" y="7.5" rx=".3"></rect>
        <rect width="11" height="2" x="-.904" y="10.596" rx=".3" transform="rotate(45 4.596 11.596)"></rect>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgCloseMobileMenu',
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
