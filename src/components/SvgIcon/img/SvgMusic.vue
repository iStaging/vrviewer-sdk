<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <g fill="none" fill-rule="evenodd">
      <path :fill="color" d="M10.8.583a.538.538 0 0 0-.538.539v9.548a.537.537 0 0
        1-.673.52c-1.564-.422-3.414-.146-5.196 1.186a.546.546 0 0 0-.11.11c-3.244
        4.344-.217 9.097 3.921 9.097a5.288 5.288 0 0 0
        5.279-4.97l.01-12.261c0-.298.24-.539.538-.539h4.05a.538.538
        0 0 0 .538-.538V1.122a.538.538 0 0 0-.538-.539H10.8z">
      </path>
      <path
        v-show="color === '#fff'"
        :fill="color"
        fill-rule="nonzero"
        d="M3.524 4.07L18.335 18.88l-.707.707L2.816 4.777z">
      </path>
      <path d="M0 0h21.784v21.784H0z"></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgMusic',
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
