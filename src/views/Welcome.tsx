import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export const Welcome = defineComponent({
  setup() {
    return () => (
      <div>
        <header></header>
        <main>
          <RouterView></RouterView>
        </main>
        <footer></footer>
      </div>
    );
  },
});
