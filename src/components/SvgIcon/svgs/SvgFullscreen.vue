<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
    <g fill="none" fill-rule="evenodd">
      <path d="M0 0h22.167v22.167H0z"></path>
      <path
        :fill="color"
        d="M14.083 3l2.125 2.124-2.67 2.651 1.312 1.312 2.65-2.67
          2.125 2.125V3h-5.542zM3 8.542l2.124-2.125 2.651 2.67 1.312-1.312-2.67-2.65L8.542
          3H3v5.542zm5.542 11.083l-2.125-2.124 2.67-2.651-1.312-1.312-2.65 2.67L3
          14.083v5.542h5.542zm11.083-5.542l-2.124 2.125-2.651-2.67-1.312 1.312
          2.67 2.65-2.125 2.125h5.542v-5.542z">
      </path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgFullscreen',
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
