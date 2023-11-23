import { defineComponent, ref } from 'vue';

export const App = defineComponent({
  setup() {
    const count = ref(0);
    const onClick = () => {
      count.value += 100;
    };
    return () => (
      <>
        <div>
          <h2>{count.value}</h2>
        </div>
        <div>
          <button onClick={onClick}>+100</button>
        </div>
      </>
    );
  },
});
