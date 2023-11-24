import { defineComponent, ref } from 'vue';
// import { RouterLink, RouterView } from 'vue-router';

export const App = defineComponent({
  setup() {
    const count = ref(0);
    const onClick = () => {
      count.value += 100;
    };
    return () => (
      <div>
        <h2>{count.value}</h2>
        <button onClick={onClick}>+100</button>
        <br />
        <router-link to="/">Go to Home</router-link>
        <router-link to="/about">Go to About</router-link>
        <router-view></router-view>
      </div>
    );
  },
});
