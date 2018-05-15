<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(3.705 2.9)">
        <path
          :fill="color"
          d="M1.087 15.678H.566a.521.521 0 0 1-.521-.521V.567c0-.287.233-.52.52-.52h.522c.288 0
            .521.233.521.52v14.59a.521.521 0 0 1-.521.52">
        </path>
      </g>
      <g transform="translate(.579 2.9)">
        <path
          :fill="color"
          d="M1.042 15.678h-.52A.521.521 0 0 1 0 15.157V.567C0 .28.233.047.521.047h.521c.288 0
            .521.233.521.52v14.59a.521.521 0 0 1-.52.52">
        </path>
      </g>
      <g transform="translate(6.884 2.9)">
        <path
          :fill="color"
          d="M1.598 13.904l2.851-3.593 2.042 2.453L9.343 9.09l3.661 4.813H1.598zm1.774-10.51a1.693 1.693 0 1 1 0 3.387
            1.693 1.693 0 0 1 0-3.387zM14.016.046H.556a.521.521 0 0 0-.521.521v14.596c0 .287.233.52.52.52h13.461a.521.521
            0 0 0 .521-.52V.567a.521.521 0 0 0-.52-.52z">
        </path>
      </g>
      <path d="M0 0h21.621v21.621H0z"></path>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'SvgPanoSelect',
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
