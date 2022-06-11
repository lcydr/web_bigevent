$(function () {
    const form = layui.form;
    // 自定义验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        
        // 校验原密码和新密码不能相同
        samePwd: (value) => {
            if (value === $("[name=oldPwd]").val()) return "新旧密码不能相同！"
        },
        // 校验新密码和确认密码是否一致
        rePwd: (value) => {
            if (value !== $("[name=newPwd]").val()) return "两次密码不一致！"
        },
    });

    // 更新密码
    $(".layui-form").submit(function (e) {
        console.log(111)
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg("更新密码失败")
                layer.msg("更新密码成功");
                // 1.强制清空 token
                localStorage.removeItem("token");
                // 2.跳转到登录页面
                window.parent.location.href = "/login.html"
            },
        });
    });
});