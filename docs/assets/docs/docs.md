#  属性

## API

| 属性 | 说明 | 类型 | 默认值 | 支持全局配置 |
| ----- | ----- | --------| ------ | --------|
|`option`| 编辑器的配置项 | NgMarkedEditorOption| ？ |否|
| `theme`| 主题配置 | ThemeType = `'default'` \| `'dark'` | `'default'` | 暂不支持 | 
| `ngModel`|值绑定 ， 可双向绑定`[(ngModel)]` | string | `''` | 否|
| `fileUploadChange`| 文件上传时的回调函数，当customUpload配置为`true`时配合使用 | `(file: File) => Promise<string>`，请使用箭头函数 | `''` | 否|
|`saveChange`| 点击保存或者<kbd>Ctrl</kbd> + <kbd>S</kbd> 时回调 | ( $event: string) => void \| EventEmitter\<string\> | `null` |否|


### 类型补充

#### NgMarkedEditorOption

| 属性 | 说明 | 类型 | 默认值 | 支持全局配置 |
| ----- | ----- | --------| ------ | --------|
| `tools`|枚举数据类型 ，可用值有`'blod' \| 'underline' \| 'italic' \| 'del' \| 'header' \| 'sub' \| 'sup' \| 'blockquote' \| 'ul' \| 'ol' \| 'inner-code' \| 'block-code' \| 'link' \| 'imgage' \| 'table' \| 'liuchengtu' \| 'gongshi' \| 'revoke' \| 'next' \| 'baocun' \| 'prettier' \| 'fangda' \| 'fullScreen' \| 'preview' \| 'coding' \| 'github'`  | `string[]` |  | 应该支持|
| `saveOption`| 是否自动保存 | `SaveOption` |  | 否|
| `customUpload`| 是否自定义上传 | `boolean` | `true` | 否|

#### SaveOption
| 属性 | 说明 | 类型 | 默认值 | 支持全局配置 |
| ----- | ----- | --------| ------ | --------|
| `autoSave`| 是否自动保存 | `boolean` | `` | 否|