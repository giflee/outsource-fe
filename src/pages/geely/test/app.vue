<template>
  <div id="app">
        <mt-button type="default" @click.native="showToast">default</mt-button>
        <mt-button type="primary" @click.native="showToast">primary</mt-button>
        <mt-button type="danger" @click.native="showToast">danger</mt-button>
    </div>
</template>

<script>
  export default {
    data() {
        return {

        }
      },
    created: function(){
      // this.getList();
    },
    methods: {
      showToast() {
        
      }
    }
  }
</script>

<style lang="postcss">
  .index-card {
    width: 800px;
    margin: 100px auto;
  }
</style>
