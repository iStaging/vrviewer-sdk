<template>
  <svg width="22px" height="20px" viewBox="0 0 22 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
      <polygon points="1 0 20.2 0 20.2 19.2 1 19.2"></polygon>
      <path
        d="M1.8,16.8 L5,16.8 L5,7.2 L1.8,7.2 L1.8,16.8 L1.8,16.8 Z M19.4,8 C19.4,7.12 18.68,6.4 17.8,6.4
          L12.752,6.4 L13.512,2.744 L13.536,2.488 C13.536,2.16 13.4,1.856 13.184,1.64 L12.336,0.8 L7.072,6.072 C6.776,6.36
          6.6,6.76 6.6,7.2 L6.6,15.2 C6.6,16.08 7.32,16.8 8.2,16.8 L15.4,16.8 C16.064,16.8 16.632,16.4 16.872,15.824
          L19.288,10.184 C19.36,10 19.4,9.808 19.4,9.6 L19.4,8.072 L19.392,8.064 L19.4,8 L19.4,8 Z"
        :fill="color">
      </path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgLike',
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
