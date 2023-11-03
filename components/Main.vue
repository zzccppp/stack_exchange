<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-page-header>
              <template #content>
                <div class="flex-container">
                  <IconStackOverflow style="width: 6em; margin-right: 8px" />
                  <span class="text-large font-600 mr-3">
                    <div>Knowledge System</div>
                  </span>
                </div>
              </template>
            </el-page-header>
          </el-col>
        </el-row>
      </el-header>
      <el-row>
        <el-col :span="4" :offset="4">
          <el-aside width="170px">
            <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect">
              <el-menu-item index="1">
                <el-icon>
                  <ElIconMenu />
                </el-icon>
                <span>All Questions</span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon>
                  <ElIconMenu />
                </el-icon>
                <span>Navigator Two</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <el-icon>
                  <ElIconDocument />
                </el-icon>
                <span>Navigator Three</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon>
                  <ElIconSetting />
                </el-icon>
                <span>Navigator Four</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
        </el-col>
        <el-col :span="12">
          <NuxtPage></NuxtPage>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
function handleSelect(index: string) {
  if (index === '1') {
    navigateTo('/')
  } else if (index === '2') {
    navigateTo('/post')
  } else if (index === '3') {
    console.log('Navigator Three')
  } else if (index === '4') {
    console.log('Navigator Four')
  }
}
</script>

<style>
.flex-container {
  display: flex;
  align-items: center;
}
</style>