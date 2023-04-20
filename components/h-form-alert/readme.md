### 输入弹窗

弹窗组件。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import hFormAlert from '@/components/h-form-alert/h-form-alert.vue';
export default {
    components: {hFormAlert}
}
```

基本用法

```html
<hFormAlert v-if="控制显示隐藏"  @confirm="确认点击监听" @cancel="取消点击监听"></hFormAlert>
```

例子

```html
<hFormAlert v-if="cancelShow"  name="cancel_desc" placeholder="请输入取消原因" @confirm="confirm" @cancel="cancel"></hFormAlert>
```


**属性说明：**

|属性名|类型|默认值	|说明|
|---|----|---|---|
|title|String|提示|弹窗头部文字|
|name|String|text|输入框的name|
|type|String|text|输入框的类型，就是input组件默认的type|
|placeholder|String|请点击输入|输入框的占位文字|
|value|String|‘’|输入框默认值|
|cancelColor|String|#999999|取消按钮文本颜色|
|cancelText|String|取消|取消按钮文本|
|confirmColor|String|#333333|确认按钮文本颜色|
|confirmText|String|确认|确认按钮文本|

**事件说明：**

|事件称名|说明|返回参数|
|---|----|---|
|confirm|确认按钮点击触发事件，返回参数是用户输入内容|{text:输入内容}|
|cancel|取消按钮点击触发事件，无返回参数|