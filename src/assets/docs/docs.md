#  属性

## API

| 属性 | 说明 | 类型 | 默认值 | 支持全局配置 |
| ----- | ----- | --------| ------ | --------|
|`option`| 编辑器的配置项 | NgMarkedEditorOption| ？ |否|
|`saveChange`| 点击保存或者<kbd>Ctrl</kbd> + <kbd>S</kbd> 时回调 | ( $event: string) => void \| EventEmitter\<string\> | `null` |否|
| `theme`| 主题配置 | ThemeType = `'default'` \| `'dark'` | `'default'` | 暂不支持 | 
| `ngModel`|值绑定 ， 可双向绑定 | string | `''` | 否|
| `ngModel`|值绑定 ， 可双向绑定 | string | `''` | 否|

### 类型补充

#### NgMarkedEditorOption

#### SaveOption