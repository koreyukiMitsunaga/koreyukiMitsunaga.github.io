$(function(){
	//ハンバーガーメニューーーーーーーーーーーーー
	//ハンバーガーでナビの出し入れ
	var ckickObjct = ".hum,.nav-wrap ul li a";//クリックするオブジェクト
	var onClass = ".hum,.nav-wrap";//クラスをつけたりはずしたりするオブジェクト
	var className = "tapped";//つけるクラス名→このクラス名を付けたcssを付けてcssのtransitionプロパティでアニメーションさせる
	var bp = $(".hum").css("display");//ハンバーガーボタンの表示非表示を調べことでメディアクエリーの状態を把握

	
	$(window).resize(function(){
		bp = $(".hum").css("display");//ハンバーガーボタンの表示非表示を調べる
	});
	
	var humFlag;//真偽値を入れるブーリアン変数の宣言
	$(ckickObjct).on("click",tapHum);
		
	function tapHum(){
		//!humFlagは humFlag != trueの省略形
		if(!humFlag){
			$(onClass).addClass(className);
			$(".burger-txt").empty().append("CLOSE");
			humFlag = true;
		}else{
			$(onClass).removeClass(className);
			$(".burger-txt").empty().append("MENU");
			humFlag = false;
		}
		//$(this).toggleClass("tapped");
	}
	
	//ページ内スクロールーーーーーーーーーーーーー
	var headerH = 40;//スクロール後上部に固定したナビの高さ

	$("a[href^='#']").click(smothScroll);
	function smothScroll(){
		var target = $(this).attr("href");
		var targetPos = $(target).offset().top;
		if(bp == "none"){
			if(target != "#top"){
				targetPos = targetPos - headerH;//固定ナビの高さを引いて止める位置を調整する
			}
		}
		console.log(targetPos);
		console.log(target);
		$("html,body").animate({"scrollTop":targetPos},500);
		return false;
	}
	
	//トップに戻るボタンーーーーーーーーーーーーー
	//スクロールでトップに戻るボタンが現れたり消えたり
	var speed = 500;//出る消えるスピード
	
	$(".topBtn").css("display","none");
	$(window).scroll(btnApp);
	function btnApp(){
		//bodyのスクロール量を取得する
		var winscrl = $(this).scrollTop();
		//console.log(winscrl);
		if(winscrl > 400){
			$(".topBtn").fadeIn(speed);
		}else{
			$(".topBtn").fadeOut(speed);
		}
		
		//pcの時のナビ固定
		if(winscrl > 77){
			$(".header-wrap").addClass("fix");
		}else{
			$(".header-wrap").removeClass("fix");
		}
		
	}

	//アクセスカウンターーーーーーーーーーーーー
	// getItemメソッドでlocalStorageからデータを取得
	let aCount = localStorage.getItem('count');

	//データの値を判定
	if (aCount === null) {
		//データが何もない場合「1」を代入
		aCount = 1;
	} else {
		//データがある場合「1」をプラス
		aCount++;
	}

	//setItemメソッドでlocalStorageにデータを保存
	localStorage.setItem('count', aCount);

	//コンソールで値を表示
	console.log(aCount);
	
});