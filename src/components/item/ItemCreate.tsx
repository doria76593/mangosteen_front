import { defineComponent, PropType, ref } from 'vue';
import s from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref('支出');
    return () => (
      <MainLayout>
        {{
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => (
            <>
              <Tabs v-model:selected={refKind.value}>
                <Tab name="收入">1111</Tab>
                <Tab name="支出">2222</Tab>
              </Tabs>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
