<template>
  <div>
    <RouterView /> 
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* ใส่ CSS พื้นฐานสำหรับทั้งเว็บไซต์ได้ตรงนี้ */
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #f9f9f9;
}
</style>
