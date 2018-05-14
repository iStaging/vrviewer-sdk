<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    <defs>
      <filter x="-1.7%" y="-12.5%" width="103.3%" height="135.0%" filterUnits="objectBoundingBox" id="filter-1">
        <feOffset dx="0" dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
        <feGaussianBlur stdDeviation="1" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
        <feColorMatrix
          values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
          type="matrix"
          in="shadowBlurOuter1"
          result="shadowMatrixOuter1">
        </feColorMatrix>
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </defs>
    <g fill="none" fill-rule="evenodd" :filter="shadow ? 'url(#filter-1)' : ''">
      <path d="M0 0h19.2v19.2H0z"></path>
      <path :fill="color" d="M9.8 4c-4 0-7.416 2.488-8.8 6 1.384 3.512 4.8 6 8.8 6 4 0 7.416-2.488
        8.8-6-1.384-3.512-4.8-6-8.8-6zm0 10c-2.208 0-4-1.792-4-4s1.792-4 4-4 4 1.792 4 4-1.792 4-4
        4zm0-6.4A2.397 2.397 0 0 0 7.4 10c0 1.328 1.072 2.4 2.4 2.4 1.328 0 2.4-1.072 2.4-2.4
        0-1.328-1.072-2.4-2.4-2.4z">
      </path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgView',
  props: {
    color: {
      type: String,
      default () {
        return '#fff'
      }
    },
    shadow: {
      type: Boolean,
      default () {
        return false
      }
    }
  }
}
</script>

