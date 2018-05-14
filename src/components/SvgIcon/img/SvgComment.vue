<template>
  <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" :filter="shadow ? 'url(#filter-1)' : ''">
      <polygon points="19.2 0 19.2 19.2 0 19.2 0 0"></polygon>
      <path
        d="M16,1.6 L3.2,1.6 C2.32,1.6 1.6,2.32 1.6,3.2 L1.6,17.6 L4.8,14.4 L16,14.4 C16.88,14.4 17.6,13.68 17.6,12.8
          L17.6,3.2 C17.6,2.32 16.88,1.6 16,1.6 L16,1.6 Z M16,12.8 L4.8,12.8 L3.2,14.4 L3.2,3.2 L16,3.2 L16,12.8 L16,12.8 Z"
        :fill="color"></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgComment',
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
