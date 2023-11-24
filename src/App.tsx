import { defineComponent, ref } from 'vue';
// import { RouterLink, RouterView } from 'vue-router';

export const App = defineComponent({
  setup() {
    return () => (
      <div>
        <router-view></router-view>
      </div>
    );
  },
});
