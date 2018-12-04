(function ($) {
    // ����Ķ���     
    $.fn.ZUpload = function (options) {
        debug(this);
        var opts = $.extend({}, $.fn.ZUpload.defaults, options);
        if (!window.FormData && opts.alertWhenUnsuport) {
            alert(alertContentWhenUnsuport);
            return;
        }
        var i = 0;
        var files = [];
        return this.each(function () {
            $this = $(this);
            var tid = "FileZUpload" + (i++);
            var thtml = "<input type=\"file\" id=\"" + tid + "\" style=\"display: none\" " + (opts.multi ? "multiple" : "") + " accept=\"" + opts.accept + "\" />";
            $this.after(thtml)
            //$this.attr("for", tid);
            $this.bind("click", function () {
                $("#" + tid).click();
            });
            $("#" + tid).bind("change", function (e) {
                var selFiles;
                if (e.target.files.length || e.dataTransfer.files.length) {
                    selFiles = e.target.files || e.dataTransfer.files;
                }
                if (selFiles != null && selFiles.length > 0) {
                    if (!checkFileSize(selFiles, opts.fileSize)) {
                        if (opts.funcWhenSize == null) {
                            alert(opts.alertContentWhenSize);
                            return;
                        } else {
                            opts.funcWhenSize();
                            return;
                        }
                    }
                    if (!checkFileExt(selFiles, opts.fileExt)) {
                        if (opts.funcWhenExt == null) {
                            alert(opts.alertContentWhenSize);
                            return;
                        } else {
                            opts.funcWhenExt();
                        }
                    }
                    if (!opts.multi)
                        files = [];
                    for (var ii = 0; ii < selFiles.length; ii++)
                        files.push(selFiles[ii]);
                    var cnt = "";
                    for (var index = 0; index < files.length; index++) {
                        cnt += (opts.fileWaitingTmpl.replace("[filename]", selFiles[index].name).replace("[filesize]", Math.round(parseFloat(parseFloat(selFiles[index].size) / 1024), 2) + 'KB'));
                    }
                    if (opts.fileWaitingContainer != null && opts.fileWaitingContainer != "")
                        $(opts.fileWaitingContainer).html(cnt);
                }
            });
            if (opts.buttonUpload != null && opts.buttonUpload != "") {
                $(opts.buttonUpload).bind("click", function () {
                    if (files.length < 1) {
                        if (opts.funcWhenNoFile == null) {
                            if (opts.alertContentWhenNoFile != null && opts.alertContentWhenNoFile != "")
                                alert(opts.alertContentWhenNoFile);
                        } else {
                            opts.funcWhenNoFile();
                        }
                        return;
                    }
                    var oData = new FormData();
                    for (var ii = 0; ii < files.length; ii++)
                        oData.append("Filedata" + ii, files[ii]);
                    for (var ii in opts.params)
                        oData.append(ii, opts.params[ii]);
                    console.log(oData);
                    var oReq = new XMLHttpRequest();
                    oReq.open("POST", opts.url, true);
                    //���ݷ���״̬������Ӧ����
                    oReq.onreadystatechange = function (e) {
                        if (oReq.readyState === 4) {
                            if (oReq.status === 200) {
                                opts.onSuccess(oReq.responseText);
                            } else {
                                opts.onFailure(oReq.responseText);
                            }
                        }
                    };
                    oReq.send(oData);
                })
            }

            //// build element specific options     
            //var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
            //// update element styles     
            //$this.css({
            //    backgroundColor: o.background,
            //    color: o.foreground
            //});
            //var markup = $this.html();
            //// call our format function     
            //markup = $.fn.ZUpload.format(markup);
            //$this.html(markup);
        });
    };
    //˽�з���
    function debug($obj) {
        if (window.console && window.console.log)
            window.console.log('ZUpload count: ' + $obj.size());
    };
    //����ļ������ͺʹ�С����
    function checkFileSize(files, fileSize) {
        for (var index = 0; index < files.length; index++) {
            var file = files[index];
            if (file.size > parseFloat(fileSize) * 1024 * 1024) {
                return false;
            }
        }
        return true;
    }
    function checkFileExt(files, fileExt) {
        for (var index = 0; index < files.length; index++) {
            var file = files[index];
            var fileArr = file.name.split('.');
            var fileExtName = fileArr[fileArr.length - 1];
            if (fileExt.indexOf(fileExtName) < 0) {
                return false;
            }
        }
        return true;
    }
    //���з���
    //$.fn.ZUpload.Upload = function () {
    //    alert(this);
    //    return '';
    //};
    //Ĭ�ϲ���
    $.fn.ZUpload.defaults = {
        multi : true, //�Ƿ���ļ��ϴ�
        alertWhenUnsuport : true, //��֧��FormData ʱ�Ƿ���ʾ
        alertContentWhenUnsuport : "����������汾̫��,��֧���ϴ�����,�����������!", //��֧��ʱ��ʾ������
        fileSize: 1, //�ļ���С���ƣ���λ��M��
        fileExt: "*.gif;*.png;*.pdf;*.jpg;*.txt;",
        accept:"image/*,text/plain",
        alertContentWhenSize: "�ļ���С�����ˣ�",
        alertContentWhenExt: "�ļ���ʽ������Ҫ��",
        alertContentWhenNoFile: "��������Ҫ�ϴ�һ���ļ���",
        funcWhenSize: null,
        funcWhenExt: null,
        funcWhenNoFile:null,
        fileWaitingContainer : "",//���ϴ��ļ��б������ĸ�Ԫ��
        fileWaitingTmpl : "<span>[filename] [filesize]</span>",//���ϴ��ļ��б������ģ��
        buttonUpload: "input",//�ϴ�������ť
        url : "/",
        params: {},//�ϴ�����
        onSuccess: function (res) { alert(res); },
        onFailure: function (res) { alert(res); }
    };
})(jQuery); 