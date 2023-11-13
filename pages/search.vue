<template>
    <el-input v-model="searchInput" placeholder="Please input" class="input-with-select">
        <template #prepend>
            <el-button :icon="ElIconSearch" @click="onSearchClick" />
        </template>
    </el-input>
    <ElDivider />

    <el-space direction="vertical" :fill="true">
        <el-card v-for="q in searchResult" class="card-question">
            <template #header>
                <div>
                    <NuxtLink :to="'/post/' + q.PostId">
                    <div v-html="hightlight(q.Title)">
                    </div>
                    </NuxtLink>
                    <div>
                        <el-tag v-for="t in q.Tags" :key="t" size="small" class="ml-2" :color="getTagColor(t)">{{ t
                        }}</el-tag>
                    </div>
                </div>
            </template>
            <div v-html="hightlight(q.Body)">
            </div>
        </el-card>
    </el-space>
</template>

<script setup>

const searchInput = ref('')
const searchResult = ref([])

const hightlight = (keyword) => {
    return keyword.replace(searchInput.value, `<span style="background-color: yellow;">${searchInput.value}</span>`)
}

const onSearchClick = async () => {
    await useFetch('/api/search', {
        method: 'POST',
        body: {
            keyword: searchInput.value,
            limit: 10,
        },
        onResponse: ({ request, response, options }) => {
            console.log(response._data)
            searchResult.value = response._data
        },
        onResponseError({ request, response, options }) {
            ElMessage({
                message: 'Failed to get question number',
                type: 'error',
            })
        }
    });
}

</script>