    $(document).ready(function () {

        var urlall = new Array();
        urlall[0] = 'https://www.baidu.com/s?word=';
        urlall[1] = 'https://cn.bing.com/search?q=';
        urlall[2] = 'https://www.sogou.com/tx?query=';
        urlall[3] = 'https://www.so.com/s?q=';
        urlall[4] = 'https://www.google.com/search?q=';

        div1 =
            '<iframe width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes" src="';
        div2 = '" ></frame>';

        function setRa() {
            var ra = localStorage.getItem("ra");
            if (ra == null) {
                localStorage.setItem("ra", "long");
            }
            if (ra == "short") {
                $("#r1").attr("checked", true);
                $(".more").hide();
                //$("footer").attr("class", "text-center container footer navbar-fixed-bottom");
            } else {
                $("#r2").attr("checked", true);
                $(".more").show();
                $("footer").attr("class", "text-center container footer");
            }
        }

        setRa();

        function go(str, whi) {
            var url = "";
            if (whi == "1") {
                url = urlall[0];
            } else if (whi == "2") {
                url = urlall[1];
            } else if (whi == "3") {
                url = urlall[2];
                $("#which").attr("value", 1);
                window.open(url + str);
                url = urlall[0];
            } else if (whi == "4") {
                url = urlall[3];
            } else if (whi == "5") {
                url = urlall[4];
                $("#which").attr("value", 1);
                window.open(url + str);
                url = urlall[0];
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

        if (mobile_flag) {
            $("#where").hide();
            $("#navtop-which").hide();
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
        $('input:radio[name="optionsRadios"]').change(function () {
            //console.log("hi");
            if ($("input[name='optionsRadios']:checked").val() == "short") {
                $(".more").hide();
                //$("footer").attr("class", "text-center container footer navbar-fixed-bottom");
                localStorage.ra = "short";
            } else {
                $(".more").show();
                $("footer").attr("class", "text-center container footer");
                localStorage.ra = "long";
            }
            //setRa();
        });
        $.getJSON("https://www.apiopen.top/journalismApi", function (data, status) {
            var str = "";
            var strtop = '<div class="panel panel-default"><div class="panel-body">';
            var strbot = '</div></div>';
            for (var i = 0;i < data["data"]["toutiao"].length ;i++){
                str = str + strtop;
                if (data["data"]["toutiao"][i]["picInfo"][0]!=null)
                    str = str + '<p><img height=100 width=auto src="' + data["data"]["toutiao"][i]["picInfo"][0]["url"] + '" />';
                else{
                    str = str + '<p>';
                }
                str = str + '<b><h4><a href="' + data["data"]["toutiao"][i]["link"] + '">' + data["data"]["toutiao"][i]["title"] + '</a></h4></b>';
                str = str + '<p>' + data["data"]["toutiao"][i]["category"] + ' ' + data["data"]["toutiao"][i]["ptime"] + '</p></p>'
                str = str + strbot;
            }
            console.log(str);
            $("#news").html(str);
        });
    });
