import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export const Welcome = defineComponent({
  setup() {
    return () => (
      <div>
        <h2>Welcome</h2>
        <RouterView></RouterView>
      </div>
    );
  },
});
