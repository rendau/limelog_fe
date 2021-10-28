<template>
  <q-inner-loading :showing="showing" :dark="dark">
    <ac-spn color="primary" size="3em" :class="{'q-mb-sm': $slots['text']}"/>
  </q-inner-loading>
</template>

<script>
  export default {
    props: {
      showing: { type: Boolean },
      dark: { type: Boolean },
    },
  }
</script>
