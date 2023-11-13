<template>
    <div class="question">
        <h1>
            {{ questionData.Title }}
        </h1>
        <div v-html="questionData.Body">
        </div>
        <div v-for="c in questionData.Comments">
            <div class="comment">
                {{ c.Text }}
            </div>
        </div>
    </div>
    <ElDivider></ElDivider>
    <div class="answer" v-for="ans in questionData.Answers">
        <h1 v-if="ans.PostId === questionData.AcceptedAnswerId"> Accepted Answer </h1>

        <div v-html="ans.Body">
        </div>

        <div v-for="c in ans.Comments">
            <div class="comment">
                {{ c.Text }}
            </div>
        </div>
    </div>
</template>

<script setup>

const route = useRoute()

const questionData = ref({})

await useFetch('/api/getQuestion', {
    method: 'POST',
    body: { id: route.params.id },
    onResponse: ({ request, response, options }) => {
        // console.log(response)
        questionData.value = response._data;
    },
    onResponseError({ request, response, options }) {
        ElMessage({
            message: 'Failed to get questions',
            type: 'error',
        })
    }
});


</script>

<style>
.question {
    padding: 20px;
    margin: 20px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    background-color: rgb(150, 195, 247);
}

.answer {
    padding: 20px;
    margin: 20px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    background-color: rgb(207, 240, 198);
}

.comment {
    padding: 20px;
    margin: 20px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
}
</style>