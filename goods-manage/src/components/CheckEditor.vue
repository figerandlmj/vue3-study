<template>
  <div class="check-editor">
    <input class="select" type="checkbox" :checked="modelValue" @change="handleChecked" />
    <input class="title" type="text" :value="title" @input="handleTitle" />
  </div>
</template>

<script>
export default {
  name: 'CheckEditor',
  props: {
    modelValue: Boolean,
    title: String,
    titleModifiers: {
      default: () => ({})
    }
  },
  setup(props, ctx) {
    const handleChecked = e => {
      ctx.emit('update:modelValue', e.target.checked);
    }
    const handleTitle = e => {
      let value = e.target.value;
      if(props.titleModifiers.tap) {
        value = value.trim();
      }
      ctx.emit('update:title', value);
    }
    return {
      handleChecked,
      handleTitle
    }
  }
}
</script>

<style lang="less" scoped>
.check-editor{
  display: flex;
  align-items: flex-end;
  .select{
    cursor: pointer;
  }
  .title{
    width: 150px;
    outline: none;
    border: 0;
    border-bottom: 1px solid #ccc;
  }
}
</style>