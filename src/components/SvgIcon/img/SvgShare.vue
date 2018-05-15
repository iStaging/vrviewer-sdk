<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <g fill="none" fill-rule="evenodd">
      <path d="M0 0h22v22H0z"></path>
      <path
        :fill="color"
        fill-rule="nonzero"
        d="M16.864 14.474a3.46 3.46 0 0 0-2.626 1.2l-6.305-3.622c.11-.34.172-.7.172-1.075
          0-.397-.068-.773-.188-1.128l6.264-3.596a3.455 3.455 0 0 0 2.683 1.268 3.47 3.47 0 0 0
          3.47-3.471 3.47 3.47 0 0 0-3.47-3.471 3.473 3.473 0 0 0-3.377 4.27L7.093 8.523a3.476
          3.476 0 0 0-5.935 2.458 3.47 3.47 0 0 0 3.471 3.472c.981 0 1.863-.407 2.495-1.055l6.378
          3.665a3.47 3.47 0 0 0 3.356 4.358 3.473 3.473 0 0 0 3.472-3.471 3.466 3.466 0 0
          0-3.466-3.476z">
      </path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgShare',
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
