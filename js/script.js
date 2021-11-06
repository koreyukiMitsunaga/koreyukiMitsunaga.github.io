$(function(){
	//ハンバーガーでナビの出し入れ
	//変数宣言コーナー
	var ckickObjct = ".hum,.nav-wrap ul li a";//クリックするオブジェクト
	var onClass = ".hum,.nav-wrap";//クラスをつけたりはずしたりするオブジェクト
	var className = "tapped";//つけるクラス名→このクラス名を付けたcssを付けてcssのtransitionプロパティでアニメーションさせる
	var bp = $(".hum").css("display");//ハンバーガーボタンの表示非表示を調べことでメディアクエリーの状態を把握
  //表示ならモバイル　非表示ならデスクトップ
  
  //↓ナビゲーションにアンダーラインを付けるための変数
	var navC = $(".nav-wrap ul li").length;//ナビゲーションの数
	var idPos = [];//ナビのhref属性の中身を取得して格納する配列
  var headerH = 40;//スクロール後上部に固定したナビの高さ
	
/* 	idPosGet();
	function idPosGet(){
		idPos = [];
		for(i = 0;i < navC;i++){
			var n = i+1;
			var idName = $(".nav-wrap ul li:nth-child("+n+") a").attr("href");
			idPos.push($(idName).offset().top);
		}
			//console.log(idPos);
	}
 */	
	$(window).resize(function(){
		bp = $(".hum").css("display");//ハンバーガーボタンの表示非表示を調べる
		//console.log(bp);
		/* idPosGet(); */
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
		//console.log(humFlag);
		//$(this).toggleClass("tapped");
	}
	
	//ページ内スクロール
	$("a[href^='#']").click(smothScroll);
	function smothScroll(){
		var target = $(this).attr("href");
		var targetPos = $(target).offset().top;
		if(bp == "none"){
			if(target != "#top"){
				targetPos = targetPos - headerH;//固定ナビの高さを引いて止める位置を調整する
			}
		}
		//console.log(targetPos);
		$("html,body").animate({"scrollTop":targetPos},500);
		return false;
	}
	
	//スクロールでトップに戻るボタンが現れたり消えたり
	//変数宣言コーナーコーナー
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
		
		//現在地のナビにアンダーラインを入れる
		for(i = 0;i < navC;i++){
			if(winscrl >= (idPos[i]-100)){
				var n = i+1;
				$(".nav-wrap ul li").removeClass("selected");
				$(".nav-wrap ul li:nth-child("+n+")").addClass("selected");
			}
		}
	}
});