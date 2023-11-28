import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../shared/Icon';
import s from './InputPad.module.scss';
import { time } from '../../shared/time';
import { Calendar } from 'vant';
export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const now = new Date();
    const refDate = ref<Date>(now);
    const refDatePickerVisible = ref(false);
    const onConfirm = (value: any) => {
      refDatePickerVisible.value = false;
      refDate.value = new Date(value);
    };
    const buttons = [
      { text: '1', onClick: () => {} },
      { text: '2', onClick: () => {} },
      { text: '3', onClick: () => {} },
      { text: '清空', onClick: () => {} },
      { text: '4', onClick: () => {} },
      { text: '5', onClick: () => {} },
      { text: '6', onClick: () => {} },
      { text: '+', onClick: () => {} },
      { text: '7', onClick: () => {} },
      { text: '8', onClick: () => {} },
      { text: '9', onClick: () => {} },
      { text: '-', onClick: () => {} },
      { text: '.', onClick: () => {} },
      { text: '0', onClick: () => {} },
      { text: '删', onClick: () => {} },
      { text: '提交', onClick: () => {} },
    ];
    return () => (
      <>
        <h2>refShowPop: {refDatePickerVisible.value}</h2>

        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="date" class={s.icon} />
            <span>
              <span onClick={() => (refDatePickerVisible.value = true)}>{time(refDate.value).format()}</span>
              <Calendar v-model:show={refDatePickerVisible.value} onConfirm={onConfirm} />
            </span>
          </span>
          <span class={s.amount}>199.12</span>
        </div>

        <div class={s.buttons}>
          {buttons.map((button) => (
            <button onClick={button.onClick}>{button.text}</button>
          ))}
        </div>
      </>
    );
  },
});