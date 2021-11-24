
# 使用示例

## 代码导入

### 样式引入

在css中引入

```css
@import './../node_modules/ng-marked-preview/src/styles/theme/index.less'; // 预览部分的主题色
@import '~@angular/cdk/overlay-prebuilt.css'; // angular原生模态框的样式
```
在`angualr.json`中引入

```json
 {
    "your-project": {
      ...
      "architect": {
        ...
        "build": {
          "options": {
            ...
            "styles": [
              "node_modules/ng-marked-preview/src/styles/theme/index.less",
              "node_modules/@angular/cdk/overlay-prebuilt.css"
            ],
            ...
          },
        }
      }
  }
 }
```
### 模块导入

```typescript
@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    ...
    NgMarkedEditorModule
  ]
})
export class AppModule { }

```

### HTML

```html
  <!-- 简单绑定 -->
  <lib-ng-marked-editor [theme]="theme" [value]="docContext" [option]="option"></lib-ng-marked-editor>
  <!-- 使用ngModel -->
  <lib-ng-marked-editor [theme]="theme" [(ngModel)]="docContext" [option]="option"></lib-ng-marked-editor>
  <!-- 使用formGroup -->
  <form [formGroup]="fg">
    <lib-ng-marked-editor [theme]="theme" formControlName="docContext" [option]="option"></lib-ng-marked-editor>
  </form>
```

### 

# 文件上传示例

## 自定义上传

### js代码

```typescript
 fileUploadChange = ($event: File): Observable<string> => {
    const url = `${fileurl}?`;
    const formData = new FormData();
    formData.append('file', $event);
    return this.httpClient.post(url, formData, { withCredentials: false }).pipe(map((res: any) => {
      return res.url; // 返回的一定时string类型，也就是文件访问路径
    }));
  }
```
### html代码

```html
    <lib-ng-marked-editor [fileUploadChange]="fileUploadChange" [theme]="theme" [(ngModel)]="bindValue" (saveChange)="saveChange($event)" [option]="option"></lib-ng-marked-editor>
```

# 扩展示例

模块导入时使用`forRoot`API进行自定义

## 扩展渲染函数

```typescript
  NgMarkedEditorModule.forRoot({
    newRender: {
      text: (text: string) => {
        const match = text.match(/^\$\$\n[\s|\S]+\n\$\$$/);
        if (match) {
          text = match[0].split(/^[\$]+|[\$]+$/).join('').split('\n').join('');
          const html = katex.renderToString(text, { throwOnError: false });
          return html;
        }
        return text + '10086';
      }
    }
  }),
```

更多扩展参考 [renderer扩展](https://marked.js.org/using_pro#renderer)

## 扩展解析器

```typescript
  NgMarkedEditorModule.forRoot({
     newTokenizer: {
      inlineText: (src: string) => {
        const match = src.match(/^\$[\s|\S]+\$$/);
        if (match) {
          return {
            type: 'text',
            raw: match[0],
            text: src + '解析'
          };
        }
        return false;
      }
    }
  })
```
更多扩展参考 [tokenizer扩展](https://marked.js.org/using_pro#tokenizer)

暂时只支持这两部分扩展，后续陆续开放更多扩展功能