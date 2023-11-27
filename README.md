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

### 自定义组件

```typescript
//定义button组件
import { defineComponent } from 'vue';
import s from './Button.module.scss';

interface Props { //对于要接受的参数，需要props接收，所以这里要声明
  onClick: (e: MouseEvent) => void;
}

export const Button = defineComponent<Props>({
  setup: (props, context) => {
    return () => <button class={s.button}>{context.slots.default?.()}</button>;
  },
});
```



```typescript
2-使用button组件，vue3可以在这里直接设置class和事件。然后在button那里，class直接应用了；事件声明了就可以了。 
<Button class={s.button} onClick={onClick}>
            测试
          </Button>
```









