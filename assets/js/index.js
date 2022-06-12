function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token"),
        // },
        success: (res) => {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg("获取用户信息成功")
            renderAvatar(res.data)
        },
    });
}
const renderAvatar = (user) => {
    const name = user.nickname || user.username;

    $("#welcome").html(`欢迎 ${name}`)

    if (user.user_pic !== null) {
        $('.layui-nav-img').attr("src", user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}

// 退出
$("#btnLogout").click(() => {
    layer.confirm("是否退出登录", { icon: 3, title: "提示" }, function (index) {
        localStorage.removeItem("token");
        location.href = "/login.html";
    })
})
// 切换高亮
function change() {
    $("#change").addClass("layui-this").next().removeClass("layui-this")
}



getUserInfo()