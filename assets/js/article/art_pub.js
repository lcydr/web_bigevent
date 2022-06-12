$(function () {
    const form = layui.form;
    // 初始化富文本编辑器
    initEditor()
    const initCate = () => {
        $.ajax({
            type: 'GET',
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) return layer.msg("获取文章分类失败");
                const htmlStr = template("tpl-cate", res);
                $("[name=cate_id").html(htmlStr);
                form.render("select")
            },
        });
    };

    // 模拟点击文件上传
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    // 获取到上传图片
    $("#coverFile").change((e) => {
        const filelen = e.target.files.length;
        if (filelen === 0) return;

        // 获取图片
        const file = e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        $image
            .cropper("destroy")
            .attr("src", imgUrl)
            .cropper(options);
    })

    let art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })

    // 发布文章
    // $("#form-pub").submit(function (e) {
    //     e.preventDefault();
    //     // 获取表单数据
    //     const fd = new FormData($(this)[0]);
    //     fd.append("state", art_state);
    //     // console.log(fd.get("title"));
    //     // console.log(fd.get("cate_id"));
    //     // console.log(fd.get("content"));
    //     // console.log(fd.get("state"));
    // });
    // 为表单绑定 submit 提交事件
    $("#form-pub").on("submit", function (e) {
        e.preventDefault();
        // 获取表单数据
        const fd = new FormData($(this)[0]);
        fd.append("state", art_state);
        $image
            .cropper("getCroppedCanvas", {
                width: 400,
                height: 200,
            })
            .toBlob(function (blob) {
                fd.append("cover_img", blob);
                publishArticle(fd);
            });
    });
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = "/article/art_list.html";
                window.parent.change();
            }
        })
    }







    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    initCate();
})