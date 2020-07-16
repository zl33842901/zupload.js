# zupload.js

基于 Formdata、JQuery 的 HTML5 上传闭包组件。

### 特点

使用简单

### 引用程序包：

```html
<script src="/js/jquery-1.8.3.min.js"></script>
<script src="/js/ZlUpload.js"></script>
```

### 使用方法：

```html
<a href="javascript:;" id="aselect">test</a>
<div></div>
<input value="tttt" type="button" id="BtnUp" />

<script type="text/javascript">
    var ddd = $("#aselect").ZUpload({ //弹出选择文件的钮。
        fileWaitingContainer: "div",//待上传的文件名，列在哪里。
        url: "/Home/Upload",//上传路径
        params: { param1 : "参数"}, //其他参数
        buttonUpload: "#BtnUp",//哪个钮执行上传动作。
        onSuccess: function (res) {
            //成功的方法
        },
        onFailure: function (res) {
            //失败的方法
        },
        funcWhenNoFile: function () { alert('Please select a file to upload'); },
        funcWhenExt: function () { alert('文件扩展名不匹配！'); },
        funcWhenSize: function () { alert('文件大小超限'); },
        accept: "image/*,text/plain"
    });
</script>
```