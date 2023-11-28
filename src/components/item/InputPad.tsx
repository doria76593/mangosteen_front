import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../shared/Icon';
import { time } from '../../shared/time';
import s from './InputPad.module.scss';
import { DatePicker, NumberKeyboard, Popup, Calendar } from 'vant';
export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const now = new Date();
    const refDate = ref<Date>(now);
    const appendText = (n: number | string) => (refAmount.value += n.toString());
    const buttons = [
      {
        text: '1',
        onClick: () => {
          appendText(1);
        },
      },
      {
        text: '2',
        onClick: () => {
          appendText(2);
        },
      },
      {
        text: '3',
        onClick: () => {
          appendText(3);
        },
      },
      {
        text: '4',
        onClick: () => {
          appendText(4);
        },
      },
      {
        text: '5',
        onClick: () => {
          appendText(5);
        },
      },
      {
        text: '6',
        onClick: () => {
          appendText(6);
        },
      },
      {
        text: '7',
        onClick: () => {
          appendText(7);
        },
      },
      {
        text: '8',
        onClick: () => {
          appendText(8);
        },
      },
      {
        text: '9',
        onClick: () => {
          appendText(9);
        },
      },
      {
        text: '.',
        onClick: () => {
          appendText('.');
        },
      },
      {
        text: '0',
        onClick: () => {
          appendText(0);
        },
      },
      { text: '清空', onClick: () => {} },
      { text: '提交', onClick: () => {} },
    ];
    const refDatePickerVisible = ref(false);
    const showDatePicker = () => (refDatePickerVisible.value = true);

    const onConfirm = (value: any) => {
      refDatePickerVisible.value = false;
      refDate.value = new Date(value);
    };
    const refAmount = ref('');
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="date" class={s.icon} />
            <span>
              <span onClick={showDatePicker}>{time(refDate.value).format()}</span>
              <Calendar v-model:show={refDatePickerVisible.value} onConfirm={onConfirm} />
            </span>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
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
