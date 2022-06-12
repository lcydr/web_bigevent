$.ajaxPrefilter((options) => {
    options.url = "http://big-event-api-t.itheima.net" + options.url;
    if (options.url.indexOf("/my/")) {
        options.headers = {
            Authorization: localStorage.getItem("token"),
        };
    }
    // 权限校验
    options.complete = (res) => {
        console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem('token');
            location.href = "/login.html"
        }
    };
});