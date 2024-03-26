<template>
  <section>
    <base-card>
      <h2>Submitted Experiences</h2>
      <div>
        <base-button @click="loadExpeciences">Load Submitted Experiences</base-button>
      </div>
      <p v-if="isLoanding">Loading...</p>
      <p v-else-if="!isLoanding && error">
        {{ error }}
      </p>
      <p v-else-if="!isLoanding && (!results || results.length === 0)">No stored experiences found. Start adding some survey</p>
      <ul v-else>
        <survey-result
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></survey-result>
      </ul>
    </base-card>
  </section>
</template>

<script>
import SurveyResult from './SurveyResult.vue';

export default {
  components: {
    SurveyResult,
  },
  data() {
    return {
      results: [],
      isLoanding: false,
      error: null,
    };
  },
  methods: {
    loadExpeciences() {
      this.isLoanding = true;
      this.error = null;

      fetch('https://vue-http-demo-8a376-default-rtdb.firebaseio.com/surveys.json')
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
        })
      .then(data => {
        this.isLoanding = false;
        const results = []

        for (const id in data) {
          results.push({id, name: data[id].name, rating: data[id].rating});
        }
        this.results = results;
      })
      .catch((error) => {
        console.log(error);
        this.isLoanding = false;
        this.error = 'Failed fo fetch data - please try again latter.';
      });
    },
   },
  mounted() {
    this.loadExpeciences();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
