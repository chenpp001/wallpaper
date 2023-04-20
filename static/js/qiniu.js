(function () {
    // 请参考demo的index.js中的initQiniu()方法，若在使用处对options进行了赋值，则此处config不需要赋默认值。init(options) 即updateConfigWithOptions(options)，会对config进行赋值
    var config = {
        // bucket 所在区域。ECN, SCN, NCN, NA, ASG，分别对应七牛云的：华东，华南，华北，北美，新加坡 5 个区域
        qiniuRegion: '',
        // 七牛云bucket 外链前缀，外链在下载资源时用到
        qiniuBucketURLPrefix: '',

        // 获取uptoken方法三选一即可，执行优先级为：uptoken
        qiniuUploadToken: '',
    
        qiniuShouldUseQiniuFileName: false
    }

    // init(options) 将七牛云相关配置初始化进本sdk
    // 在整个程序生命周期中，只需要 init(options); 一次即可
    // 如果需要变更七牛云配置，再次调用 init(options); 即可
    function init(options) {
        updateConfigWithOptions(options);
    }

    // 更新七牛云配置
    function updateConfigWithOptions(options) {
        if (options.region) {
            config.qiniuRegion = options.region;
        } else {
            console.error('qiniu uploader need your bucket region');
        }
        if (options.uptoken) {
            config.qiniuUploadToken = options.uptoken;
        } 
        if (options.domain) {
            config.qiniuBucketURLPrefix = options.domain;
        }
		if(options.shouldUseQiniuFileName){
			config.qiniuShouldUseQiniuFileName = options.shouldUseQiniuFileName
		}
    }

    // 正式上传的前置方法，做预处理，应用七牛云配置
    function upload(filePath, success, fail, options, progress, cancelTask) {
        if (null == filePath) {
            console.error('qiniu uploader need filePath to upload');
            return;
        }
        if (options) {
            updateConfigWithOptions(options);
        }
        if (config.qiniuUploadToken) {
            doUpload(filePath, success, fail, options, progress, cancelTask);
        }  else {
            console.error('qiniu uploader need one of [uptoken, uptokenURL, uptokenFunc]');
            return;
        }
    }

    // 正式上传
    function doUpload(filePath, success, fail, options, progress, cancelTask) {
        if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
            console.error('qiniu UploadToken is null, please check the init config or networking');
            return
        }
        var url = uploadURLFromRegionCode(config.qiniuRegion);
        var fileName = filePath.split('//')[1];
        if (options && options.key) {
            fileName = options.key;
        }
        var formData = {
            'token': config.qiniuUploadToken
        };
        if (!config.qiniuShouldUseQiniuFileName) {
            formData['key'] = fileName
        }
        var uploadTask = uni.uploadFile({
            url: url,
            filePath: filePath,
            name: 'file',
            formData: formData,
            success: function (res) {
                var dataString = res.data
                try {
                    var dataObject = JSON.parse(dataString);
                    // 拼接fileURL
                    var fileURL = config.qiniuBucketURLPrefix  + dataObject.key;
                    dataObject.fileURL = fileURL;
                    dataObject.imageURL = fileURL;
                    if (success) {
                        success(dataObject);
                    }
                } catch (e) {
                    if (fail) {
                        fail(e);
                    }
                }
            },
            fail: function (error) {
                if (fail) {
                    fail(error);
                }
            }
        })

        // 文件上传进度
        uploadTask.onProgressUpdate((res) => {
            progress && progress(res)
        })

        // 中断文件上传
        cancelTask && cancelTask(() => {
            uploadTask.abort()
        })
    }



    // 选择七牛云文件上传接口，文件向匹配的接口中传输。ECN, SCN, NCN, NA, ASG，分别对应七牛云的：华东，华南，华北，北美，新加坡 5 个区域
    function uploadURLFromRegionCode(code) {
        var uploadURL = null;
        switch (code) {
            case 'ECN': uploadURL = 'https://up.qiniup.com'; break;
            case 'NCN': uploadURL = 'https://up-z1.qiniup.com'; break;
            case 'SCN': uploadURL = 'https://up-z2.qiniup.com'; break;
            case 'NA': uploadURL = 'https://up-na0.qiniup.com'; break;
            case 'ASG': uploadURL = 'https://up-as0.qiniup.com'; break;
            default: console.error('please make the region is with one of [ECN, SCN, NCN, NA, ASG]');
        }
        return uploadURL;
    }

    module.exports = {
        init: init,
        upload: upload,
    }
})();