import { PropType, defineComponent } from 'vue';
import { Icon, IconName } from './Icon';
import s from './FloatButton.module.scss';
export const FloatButton = defineComponent({
  // props【js】和 Props【ts】只能二选一；PropType<IconName>,表示只能选择IconName中的一个
  props: {
    iconName: {
      type: String as PropType<IconName>,
      required: true,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton}>
        <Icon name={props.iconName} class={s.icon} />
      </div>
    );
  },
});
