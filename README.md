github 部署的地址：https://doria76593.github.io/mangosteen_front/dist/index.html

### 一些关键的步骤

### init 配置

init 项目

```typescript
npm create vite@latest mangosteen_front -- --template vue-ts
```

- init pnpm ，并且将 globalBinDir 配置到环境变量

```typescript
 pnpm config set store-dir "D:\software\pnpm\storeDir"
 pnpm config set global-dir "D:\software\pnpm\globalDir"
 pnpm config set global-bin-dir "D:\software\pnpm\globalBinDir"
 pnpm config set state-dir "D:\software\pnpm\state"
 pnpm config set cache-dir "D:\software\pnpm\cache"
```

- 安装 vue3 vite tsx 插件

```
pnpm i @vitejs/plugin-vue-jsx -D
```

并且配置

```typescript
export default defineConfig({
  // base: "/mangosteen_front/dist/",
  plugins: [
    vue(),
    vueJsx({
      // transformOn: true,这个属性开启或者关闭感觉影响不太大呀
      mergeProps: true,
      // options are passed on to @vue/babel-plugin-jsx
    }),
  ],
});
```

- 安装配置路由,并进行模块拆分、配置子路由

```typescript
pnpm install vue-router@4 -S
```

- 使用 css module(不用配置，直接使用即可，并且使用 scss)

```scss
pnpm add -D sass
```

- init reset.css 和跨平台字体：font.css github 黑体

```css
flex-shrink: 0; 不伸缩，默认为1
flex-grow:1;占的比例 默认为0。当其他为0或者没有设置的时候，设置为1就会占父级元素的100%。
```

### 插槽的一些用法

1-定义插槽

```typescript
方式1
export const First = defineComponent({
  setup: (props, context) => {
    const aa = {
      icon: () => <img src={pig} />,
      title: () => (
        <h2>
          会挣钱
          <br />
          还要会省钱
        </h2>
      ),
      buttons: () => (
        <>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/welcome/2">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </>
      ),
    };
    return () => <WelcomeLayout>{aa}</WelcomeLayout>;
  },
});
```

```typescript
方式2：
export const First = defineComponent({
  setup: (props, context) => {
    const aa = {
      icon: () => <img src={pig} />,
      title: () => (
        <h2>
          会挣钱
          <br />
          还要会省钱
        </h2>
      ),
      buttons: () => (
        <>
          <RouterLink class={s.fake} to="/start">
            跳过
          </RouterLink>
          <RouterLink to="/welcome/2">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </>
      ),
    };
    return () => <WelcomeLayout v-slots={aa}></WelcomeLayout>;
  },
});
```

接受插槽

```typescript
export const WelcomeLayout = defineComponent({
  setup: (props, { slots }) => {
    console.log('slots', slots);
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          {/* {slots.default()} */}
          {slots?.icon?.()}
          {slots?.title?.()}
        </div>
        <div class={s.actions}>{slots?.buttons?.()}</div>
      </div>
    );
  },
});
```



### router动画

```typescript
//RouterView 插槽的tsx渲染 
核心：
 {(obj: any) => {
              // console.log('obj', obj);
     return obj.Component
 }}
 <RouterView name="main">
    {({ Component: X, route: R }: { Component: VNode; route: RouteLocationNormalizedLoaded }) => {
              return (
                <Transition
                  enterFromClass={s.slide_fade_enter_from}
                  enterActiveClass={s.slide_fade_enter_active}
                  leaveToClass={s.slide_fade_leave_to}
                  leaveActiveClass={s.slide_fade_leave_active}
                >
                  {X}
                </Transition>
              );
            }}
   </RouterView>
```







- 自定义插件：svg插件

- 滑动切换路由

### 自定义组件（class、props、事件、）

#### class:在使用的组件那里绑定的class

在使用的组件那里绑定的class,会直接映射到根元素上

```typescript
<Button class={s.button}>测试</Button> 会直接映射到Button内部组件的根元素上
```



#### props中的typescript

```typescript
as PropType： 理解为PropType尖括号内 的ts类型 回去约束String,最终为type的类型
props: {
    direction: {
      type: String as PropType<'-' | '|' | 'horizontal' | 'vertical'>,表示type是PropType括号中的一种
      default: 'horizontal',
    },
     onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
    name: {
      type: String as PropType<string>,
    },
    onUpdateSelected: {
      type: Function as PropType<(name: string) => void>,
    },
  },
```

#### props接收参数

```typescript
//定义button组件
import { defineComponent } from 'vue';
import s from './Button.module.scss';

interface Props { //对于要接受的参数，需要props接收，1-要么通过Props【ts】接受，2要么通过props【js,vue中运行】接受（同上），只能二选一
  onClick: (e: MouseEvent) => void;
}

export const Button = defineComponent<Props>({
  setup: (props, context) => {
    return () => <button class={s.button}>{context.slots.default?.()}</button>;
  },
});
```

#### props接收参数-事件1

```typescript
2-使用Button组件，vue3在【使用的组件上】设置了【事件】。然后在Button组件内部的根组件button那里，【事件】会被自动绑定在根元素【button]上。 
<Button class={s.button} onClick={onClick}>测试</Button>
```



#### props接收参数-事件2

如果props声明了onclick，就必须在内部元素上自己绑定，vue在这时候不会帮忙绑定

```typescript
<Icon name="menu" class={s.navIcon} onClick={onClickMenu} />,
```

```typescript
export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconName>,
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <svg class={s.icon} onClick={props.onClick}>
        <use xlinkHref={'#' + props.name}></use>
      </svg>
    );
  },
});
```



### 双向数据绑定

#### 1-默认的v-model

```typescript
<EmojiSelect v-model={formData.sign} class={[s.formItem, s.emojiList, s.error]} />
```

```typescript
默认的v-model是modelValue属性
export const EmojiSelect = defineComponent({
  props: {
    modelValue: {//1-接受参数
      type: String,
    },
  },
  setup: (props, context) => {
    const onClickEmoji = (emoji: string) => {
      context.emit('update:modelValue', emoji);//2-emit update:modelValue
    };
    const emojis = computed(() => {
      return selectedItem.map((category) =>
        emojiList
          .find((item) => item[0] === category)?.[1]
          .map((item) => (
            <li class={item === props.modelValue ? s.selectedEmoji : ''} 
               onClick={() => onClickEmoji(item)}>
              {item}
            </li>
          ))
      );
    });
    return () => (
      <div class={s.emojiList}>
        <ol>{emojis.value}</ol>
      </div>
    );
  },
});
```



#### 2- 带属性的 v-model

```typescript
 <Tabs v-model:selected={refKind.value}>//1-v-model:selected
                <Tab name="收入">1111</Tab>
                <Tab name="支出">2222</Tab>
              </Tabs>
```

```typescript
export const Tabs = defineComponent({
  props: {
    selected: {//2-默认就会接受v-model后面的参数为传进进来的参数
      type: String as PropType<string>,
      required: false,
    },
  },
   emits: ['update:selected'],3-所有emit的事件，必须先在这里声明
  setup: (props, context) => {
    const array = context.slots.default?.();

    return () => (
      <div class={s.tabs}>
        <ol class={s.tabs_nav}>
          {array.map((item) => (
            <li class={item.props?.name === props.selected ? s.selected : ''} onClick={() => context.emit('update:selected', item.props?.name)}>//4-emit触发到外面的事件也是update:对应属性
              {item.props?.name}
            </li>
          ))}
        </ol>
      </div>
    );
  },
});
```

#### 3-属性传值的方式（和2是一样的效果，只是使用的时候不一样）

```typescript
  <Tabs selected={refSelected.value} onUpdate:selected={(name) => {refSelected.value = name;}} >1-使用的时候 需要传递属性和事件【onUpdate:绑定的属性】
                <Tab name="收入">1111</Tab>
                <Tab name="支出">2222</Tab>
              </Tabs>
```

```typescript
和2是一样的
export const Tabs = defineComponent({
  props: {
    selected: {//2-默认就会接受v-model后面的参数为传进进来的参数
      type: String as PropType<string>,
      required: false,
    },
  },
   emits: ['update:selected'],3-所有emit的事件，必须先在这里声明
  setup: (props, context) => {
    const array = context.slots.default?.();

    return () => (
      <div class={s.tabs}>
        <ol class={s.tabs_nav}>
          {array.map((item) => (
            <li class={item.props?.name === props.selected ? s.selected : ''} onClick={() => context.emit('update:selected', item.props?.name)}>//4-emit触发到外面的事件也是update:对应属性
              {item.props?.name}
            </li>
          ))}
        </ol>
      </div>
    );
  },
});
```



### typescript-杂

```typescript
interface FData {
  //1.interface可以循环引用自己，type不可以
  [k: string]: string | number | null | undefined | FData;
}

type Rule<T> = {
  key: keyof T;
  message: string;
} & ({ type: 'required' } | { type: 'pattern'; regex: RegExp });
// 2.【| 或运算符】必须有一个属性是互斥的，才有效,比如这里的type

// 3.箭头函数加泛型 必须结合extends
export const validate = <T extends FData>(formData: T, rules: Rules<T>) => {
    ...
}
 4-如果某个类型没有对象没有写类型，ts会自动推到类型，后面可能会和实际想要的类型冲突。
    
```





### 杂记-css

```css
fill:red
在svg的父级元素设置fill,子孙的svg元素也是生效的。
```

```css
  display: grid;//1-设置grid布局
  grid-template-areas://2-设置grid分区，分区不能以数字开头
    'n1 n2 n3 d'
    'n4 n5 n6 d'
    'n7 n8 n9 s'
    'n0 n0 nd s';
  grid-auto-rows: 48px;//设置每个高度
  grid-auto-columns: 1fr;//设置等分
  gap: 1px;//gap设置行和行、列与列的空隙
3-设置每个元素的位置，和2的分区对应
> button {
    border: none;
    background: var(--button-bg);
    &:nth-child(1) {
      grid-area: n1;
    }
    &:nth-child(2) {
      grid-area: n2;
    }
    &:nth-child(3) {
      grid-area: n3;
    }
    &:nth-child(4) {
      grid-area: n4;
    }
    &:nth-child(5) {
      grid-area: n5;
    }
    &:nth-child(6) {
      grid-area: n6;
    }
    &:nth-child(7) {
      grid-area: n7;
    }
    &:nth-child(8) {
      grid-area: n8;
    }
    &:nth-child(9) {
      grid-area: n9;
    }
    &:nth-child(10) {
      grid-area: nd;
    }
    &:nth-child(11) {
      grid-area: n0;
    }
    &:nth-child(12) {
      grid-area: d;
    }
    &:nth-child(13) {
      grid-area: s;
      background: var(--button-bg-important);
      color: var(--button-text-important);
    }
  }
```

编辑器排序

vscode: ctrl+shift+p :sort 排序

### 一些外链

[Vue3中watch和watchEffe]: https://zhuanlan.zhihu.com/p/528715632

