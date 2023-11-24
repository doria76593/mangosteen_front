import { defineComponent, ref } from 'vue';
import './App.module.scss';
import { RouterLink, RouterView } from 'vue-router';

export const App = defineComponent({
  setup() {
    return () => (
      <div>
        <RouterView></RouterView>
      </div>
    );
  },
});
