<template>
  <div>
    <h3>All Questions</h3>
    <h5> Question Number: {{ questionNumber }} </h5>
  </div>
  <div>
    <el-card>
      <template #header>
        <div class="card-header">
          <span>Filter</span>
          <el-button class="button">Apply</el-button>
        </div>
      </template>

      <el-row>
        <el-col :span="8">
          <div>Sorted By</div>
          <el-radio-group v-model="queryOptions.SortedBy">
            <el-radio label="Newest">Newest</el-radio>
            <el-radio label="RecentAct">Recent activity</el-radio>
            <el-radio label="HighScore">Highest score</el-radio>
            <el-radio label="MostFreq">Most frequent</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="8">
          <div>Filter By</div>
          <el-radio-group v-model="queryOptions.FilterBy">
            <el-radio label="">Disable</el-radio>
            <el-radio label="NoAns">No answers</el-radio>
            <el-radio label="NoAccAns">No accepted answer</el-radio>
            <el-radio label="HasAccAns">Have accepted answer</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="8">
          <div>Tagged With</div>
          <el-input v-model="inputTags" placeholder="e.g. javascript,python" @blur="handleTagInputBlur"></el-input>
        </el-col>

      </el-row>

    </el-card>
  </div>
  <el-divider />
  <el-skeleton :rows="5" :loading="loading" animated />

  <el-space direction="vertical" :fill="true">
    <el-pagination v-model:current-page="currentPage" layout="prev, pager, next" :total="totalItem"
      :page-size="queryOptions.Limit" @current-change="handleCurrentChange" />
    <el-card v-for="q in questionData" class="card-question">
      <template #header>
        <div>
          <NuxtLink :to="'/post/' + q.PostId">{{ q.Title }}</NuxtLink>
          <div>
            <el-tag v-for="t in q.Tags" :key="t" size="small" class="ml-2" :color="getTagColor(t)">{{ t }}</el-tag>
          </div>
        </div>
      </template>
      <div v-html="q.Body">
      </div>
    </el-card>
  </el-space>
</template>

<script setup>
import katex from 'katex';
import KatexAutoRender from 'katex/dist/contrib/auto-render'

const loading = ref(true)

const queryOptions = ref({
  // Newest, Recent activity, Highest score, Most frequent, Bounty ending soon
  SortedBy: 'Newest',
  // No answers, No accepted answer
  FilterBy: '',
  // tags
  TaggedWith: [],
  Skip: 0,
  Limit: 10,
})

const questionNumber = ref(0);
const questionData = ref([]);

const totalItem = ref(0);
const currentPage = ref(1);

const inputTags = ref('');

const handleCurrentChange = (val) => {
  queryOptions.value.Skip = (val - 1) * queryOptions.value.Limit;
};

const handleTagInputBlur = () => {
  const tags = inputTags.value.split(',');
  // trim
  tags.forEach((t, i) => {
    tags[i] = t.trim();
  });
  queryOptions.value.TaggedWith = tags;
  console.log(queryOptions.value)
};

await useFetch('/api/questionNumber', {
  method: 'POST',
  body: queryOptions,
  onResponse: ({ request, response, options }) => {
    questionNumber.value = response._data.questionNumber
    totalItem.value = questionNumber.value
  },
  onResponseError({ request, response, options }) {
    ElMessage({
      message: 'Failed to get question number',
      type: 'error',
    })
  }
});

await useFetch('/api/questions', {
  method: 'POST',
  body: queryOptions,
  onResponse: ({ request, response, options }) => {
    loading.value = false;
    questionData.value = JSON.parse(response._data)
  },
  onResponseError({ request, response, options }) {
    ElMessage({
      message: 'Failed to get questions',
      type: 'error',
    })
    loading.value = true
  }
})
// .then((res) => {
//   console.log('questions')
//   if (res.status.value !== 'success') {
//     ElMessage({
//       message: 'Failed to get questions',
//       type: 'error',
//     })
//     return
//   }
//   loading.value = false;
//   questionData.value = JSON.parse(res.data.value);
// })

watchEffect(() => {
  const data = questionData.value; // access the reactive ref so the effect can track it
  nextTick(() => {

    const elements = document.querySelectorAll('.math-container');
    // console.log(elements)
    elements.forEach((el) => {
      // katex.render(el.textContent.replaceAll('$', ''), el, {
      //   throwOnError: true,
      //   displayMode: false,
      //   output: 'mathml'
      // });
      // // remove the class to avoid re-rendering
      // el.classList.remove('math-container');
      KatexAutoRender(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true }
        ],
        output: 'mathml',
      });
    });
  });
}, { flush: 'post' });


onMounted(() => {
  // setTimeout(() => {
  //   loading.value = false
  // }, 1000)
})

</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ml-2 {
  margin-left: 0.2rem;
}

.card-question {
  width: 100%;
  margin: 0;
  box-sizing: border-box;
}

.card-question img {
  max-width: 100%;
  height: auto;
}
</style>