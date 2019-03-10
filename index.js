$(document).ready(function () {

    var urlall = new Array();
    urlall[0] = 'https://www.baidu.com/s?word=';
    urlall[1] = 'https://cn.bing.com/search?q=';
    urlall[2] = 'http://www.sogou.com/tx?query=';
    urlall[3] = 'https://www.so.com/s?q=';
    urlall[4] = 'https://www.google.com/search?q=';

    div1 =
        '<iframe width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes" src="';
    div2 = '" ></frame>';

    function go(str, whi) {
        var url = "";
        if (whi == "1") {
            url = urlall[0];
        } else if (whi == "2") {
            url = urlall[1];
        } else if (whi == "3") {
            url = urlall[2];
        } else if (whi == "4") {
            url = urlall[3];
        } else if (whi == "5") {
            url = urlall[4];
        } else console.log("null");

        $("#search").html(div1 + url + str + div2);
        //$("#searchboxcont").attr("placeholder",str);
        $("#searchboxcont").attr("value", str);
        $("#home").hide(500);
        $("#search").show(100);
        $("#searchbox").show(100);
        $("#navtop").show(100);
    }

    $("#searchbox").hide();
    $("#search").hide();
    $("#navtop").hide();
    
    //判断是否是手机
    function IsMobile() {
        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i) ? true : false;
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i) ? true : false;
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i) ? true : false;
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
            }
        };

        return isMobile.any(); //是移动设备
    }
    
    var mobile_flag = IsMobile();
    
    if(!mobile_flag) {
        $("#where").hide();
    }
    
    $("#searbut").click(function () {
        var str = $("#searcont").val();
        var whi = $("#which").val();

        go(str, whi);
    });
    $("#searboxbut").click(function () {
        var str = $("#searchboxcont").val();
        var whi = $("#which").val();

        go(str, whi);
    });
    $("#searcont").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            $("#searbut").click();
            return false;
        }
    });
    $("#searchboxcont").keydown(function (e) {
        var curKey = e.which;
        if (curKey == 13) {
            $("#searboxbut").click();
            return false;
        }
    });
});
