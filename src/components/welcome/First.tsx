import s from './welcome.module.scss';
import { defineComponent, FunctionalComponent, ref, watchEffect } from 'vue';
import { useSwipe } from '../../hooks/useSwipe';

export const First = defineComponent({
  setup() {
    return () => (
      <div class={s.card}>
        <svg>
          <use xlinkHref="#pig"></use>
        </svg>
        <h2>
          会挣钱
          <br />
          还会省钱
        </h2>
      </div>
    );
  },
});
