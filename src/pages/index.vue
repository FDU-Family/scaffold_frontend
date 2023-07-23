<script setup lang="ts">
import '@/styles/main.css'
import { useModal } from '@uni-helper/uni-use'

function onClick() {
  const showModal = useModal({
  /* 传入配置 */
  })
  showModal() // 显示模态弹窗
}
function jump() {
  uni.navigateTo({
    url: 'user',
  })
}
</script>

<template>
  <div class="red bg-aa">
    123
    <div class="w-75px" bg-green>
      123345
    </div>
    <button @click="onClick">
      123
    </button>
    <button @click="jump">
      jump
    </button>
  </div>
</template>

<style>
.text {
  width: 75px;
}
</style>
