<template>
  <div class="text-caption text-grey-9">
    Найдено <span class="text-weight-bold text-black">{{ $u.fmtNum(value) }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      value: { type: Number },
    },
  }
</script>
