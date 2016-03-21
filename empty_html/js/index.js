window.onload = function() {
	//下拉刷新、上拉加载
	$(".tab > div").each(function(index,ele){
		$(ele).attr("flag",true);
	})
	getajax(1);
	var wheight = $(window).height();
	var hheight = $("header").height();
	var theight = $(".tab").height();
	var fheight = $("footer").height();
	$("#wrapper").height(wheight - hheight - theight - fheight - 10);
	var myscroll = new iScroll("wrapper", {
		hScrollbar: false,
		vScrollbar: true,
		fadeScrollbar:false
	})
	myscroll.refresh();

	//热点、关注切换
	$(".title").on("tap", function() {
			var index = $(this).index();
			$(".title").removeClass("active").eq(index).addClass("active");
		})
		//tab切换
	$(".tab > div").on("tap", function(e) {
		e.preventDefault();
		var index = $(this).index();
		$(".tab > div").removeClass("active").eq(index).addClass("active");
		$(".con > div").css({
			"display": "none"
		}).eq(index).css({
			"display": "block"
		});
		if($(this).attr("flag")=="true"){
			getajax(index + 1);
		}else{
			myscroll.refresh();
			myscroll.scrollTo(0, 0, 0, false);
		}
	})
	function getajax(index) {
		$.ajax({
			type: "get",
			url: "http://10.10.160.144:8080/Proxy/FootBall/tweet/json/query/hotspot.do?t=" + new Date().getTime(),
			data: "category=" + index,
			success: function(d) {
				var data = JSON.parse(d);
				var arr = data.data.tweetlist;
				//				console.info(arr);
				/*var _img = $("<img src='http://101.200.173.217:8080/FootBall"+data.data.tweetlist[0].defaultFilePath+data.data.tweetlist[0].thumbnailname+"' />");
				$("section").append(_img);*/
				for (var i = 0; i < arr.length; i++) {
					var _li = $("<li>");
					var _a = $("<a>");
					var _img = $("<img />");
					var _p = $("<p>");
					_img.attr("src", "http://101.200.173.217:8080/FootBall" + arr[i].defaultFilePath + arr[i].thumbnailname);
					_p.html(arr[i].content);
					_li.append(_a);
					_a.append(_img);
					_img[0].onload = function() {
						myscroll.refresh();
						myscroll.scrollTo(0, 0, 0, false);
					}
					_a.append(_p);
					var _ul_1 = $(".con > div").eq(index - 1).find("ul").eq(0);
					var _ul_2 = $(".con > div").eq(index - 1).find("ul").eq(1);
					//					console.info(_ul_1.height(),_ul_2.height());
					if (_ul_1.height() <= _ul_2.height()) {
						_ul_1.append(_li);
					} else {
						_ul_2.append(_li);
					}
				}
				$(".tab > div").eq(index-1).attr("flag",false);
//				console.log($(".tab > div").eq(index-1).attr("flag"),index-1)
				myscroll.refresh();
				myscroll.scrollTo(0, 0, 0, false);
			}
		})
	}
}