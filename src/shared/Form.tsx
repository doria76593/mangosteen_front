import { computed, defineComponent, PropType, ref, VNode } from 'vue';
import { EmojiSelect } from './EmojiSelect';
import s from './Form.module.scss';
import { Popup, DatePicker } from 'vant';
import { Time } from './time';
import { Button } from './Button';
import { getFriendlyError } from './getFriendlyError';
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    );
  },
});

export const FormItem = defineComponent({
  props: {
    label: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validationCode' | 'select'>,
    },
    error: {
      type: String,
    },
    placeholder: String,
    options: Array as PropType<Array<{ value: string; text: string }>>,
    onClick: Function as PropType<() => void>,
    countFrom: {
      type: Number,
      default: 60,
    },
    disabled: Boolean,
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {
    const refDateVisible = ref(false);
    // 验证码
    const timer = ref<number>();
    const count = ref<number>(props.countFrom);
    const isCounting = computed(() => !!timer.value);

    const startCount = () => {
      timer.value = setInterval(() => {
        count.value -= 1;
        if (count.value === 0) {
          clearInterval(timer.value);
          timer.value = undefined;
          count.value = props.countFrom;
        }
      }, 3000);
    };
    context.expose({ startCount });
    // 验证码

    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return (
            <input
              value={props.modelValue}
              placeholder={props.placeholder}
              onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
              class={[s.formItem, s.input]}
            />
          );
        case 'emojiSelect':
          return (
            <EmojiSelect
              modelValue={props.modelValue?.toString()}
              onUpdateModelValue={(value) => context.emit('update:modelValue', value)}
              class={[s.formItem, s.emojiList, s.error]}
            />
          );
        case 'validationCode':
          return (
            <>
              <input
                class={[s.formItem, s.input, s.validationCodeInput]}
                value={props.modelValue}
                onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
                placeholder={props.placeholder}
              />
              <Button disabled={isCounting.value || props.disabled} onClick={props.onClick} class={[s.formItem, s.button, s.validationCodeButton]}>
                {isCounting.value ? `${count.value}秒后可重新发送` : '发送验证码'}
              </Button>
            </>
          );
        case 'date':
          return (
            <>
              <input
                readonly={true}
                placeholder={props.placeholder}
                value={props.modelValue}
                onClick={() => {
                  refDateVisible.value = true;
                }}
                class={[s.formItem, s.input]}
              />
              <Popup position="bottom" v-model:show={refDateVisible.value}>
                <DatePicker
                  // modelValue={props.modelValue} todo组件有问题
                  modelValue={[]}
                  title="选择年月日"
                  onConfirm={(date: Date) => {
                    context.emit('update:modelValue', new Time(date).format());
                    refDateVisible.value = false;
                  }}
                  onCancel={() => (refDateVisible.value = false)}
                />
              </Popup>
            </>
          );
        case 'select':
          return (
            <select
              class={[s.formItem, s.select]}
              value={props.modelValue}
              onChange={(e: any) => {
                context.emit('update:modelValue', e.target.value);
              }}
            >
              {props.options?.map((option) => (
                <option value={option.value}>{option.text}</option>
              ))}
            </select>
          );
        case undefined:
          return context.slots.default?.();
      }
    });
    return () => {
      return (
        <div class={s.formRow}>
          <label class={s.formLabel}>
            {props.label && <span class={s.formItem_name}>{props.label}</span>}
            <div class={s.formItem_value}>{content.value}</div>
            {props.error && (
              <div class={s.formItem_errorHint}>
                <span>{props.error ? getFriendlyError(props.error) : '　'}</span>
              </div>
            )}
          </label>
        </div>
      );
    };
  },
});
