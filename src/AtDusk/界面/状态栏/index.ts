import { waitUntil } from 'async-wait-until';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './global.css';

// 保存本容器上的 Vue 实例，供重渲染时先卸载再挂载
let mounted_app: ReturnType<typeof createApp> | undefined;

$(() => {
  errorCatched(async () => {
    // 编辑楼层消息时，酒馆助手会重渲染该楼层并重新执行本脚本。
    // 若容器里还留着上一个实例，重复 mount 会让 Vue 拿到无效根组件而抛
    // "Right-hand side of 'instanceof' is not an object"，故先卸载并清空。
    await waitGlobalInitialized('Mvu');
    await waitUntil(
      () => document.getElementById('app') !== null && _.has(getVariables({ type: 'message' }), 'stat_data'),
    );

    const container = document.getElementById('app');
    if (!container) {
      console.warn('[AtDusk 状态栏] 未找到 #app 容器，跳过挂载');
      return;
    }

    if (mounted_app) {
      mounted_app.unmount();
      mounted_app = undefined;
    }
    container.replaceChildren();

    mounted_app = createApp(App).use(createPinia());
    mounted_app.mount(container);
  })();
});

// 本地测试钩子：仅在测试页显式设置时暴露，正常运行不生效
if ((window as unknown as { __ATDUSK_TEST__?: boolean }).__ATDUSK_TEST__) {
  Object.assign(window, { __App: App, Pinia: { createPinia }, __mountSeq: () => mounted_app });
}
