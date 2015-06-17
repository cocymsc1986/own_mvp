// social icons
$(document).ready(function() {
	var menuItemNum=$(".menu-item").length;
	var angle=120;
	var distance=100;
	var startingAngle=140+(-angle/2);
	var slice=angle/(menuItemNum-1);
	TweenMax.globalTimeScale(0.8);
	$(".menu-item").each(function(i){
		var angle=startingAngle+(slice*i);
		$(this).css({
			transform:"rotate("+(angle)+"deg)"
		})
		$(this).find(".menu-item-icon").css({
			transform:"rotate("+(-angle)+"deg)"
		})
	})
	var on=false;

	$(".menu-toggle-button").mousedown(function(){
		TweenMax.to($(".menu-toggle-icon"),0.1,{
			scale:0.65
		})
	})
	$(document).mouseup(function(){
		TweenMax.to($(".menu-toggle-icon"),0.1,{
			scale:1
		})
	});
	$(document).on("touchend",function(){
		$(document).trigger("mouseup")
	})
	$(".menu-toggle-button").on("mousedown",pressHandler);
	$(".menu-toggle-button").on("touchstart",function(event){
		$(this).trigger("mousedown");
		event.preventDefault();
		event.stopPropagation();
	});

	function pressHandler(event){
		on=!on;

		TweenMax.to($(this).children('.menu-toggle-icon'),0.4,{
			rotation:on?45:0,
			ease:Quint.easeInOut,
			force3D:true
		});

		on?openMenu():closeMenu();
		
	}
	function openMenu(){
		$(".menu-item").each(function(i){
			var delay=i*0.08;

			var $bounce=$(this).children(".menu-item-bounce");

			TweenMax.fromTo($bounce,0.2,{
				transformOrigin:"50% 50%"
			},{
				delay:delay,
				scaleX:0.8,
				scaleY:1.2,
				force3D:true,
				ease:Quad.easeInOut,
				onComplete:function(){
					TweenMax.to($bounce,0.15,{
						// scaleX:1.2,
						scaleY:0.7,
						force3D:true,
						ease:Quad.easeInOut,
						onComplete:function(){
							TweenMax.to($bounce,3,{
								// scaleX:1,
								scaleY:0.8,
								force3D:true,
								ease:Elastic.easeOut,
								easeParams:[1.1,0.12]
							})
						}
					})
				}
			});

			TweenMax.to($(this).children(".menu-item-button"),0.5,{
				delay:delay,
				y:distance,
				force3D:true,
				ease:Quint.easeInOut
			});
		})
	}
    
	function closeMenu(){
		$(".menu-item").each(function(i){
			var delay=i*0.08;

			var $bounce=$(this).children(".menu-item-bounce");

			TweenMax.fromTo($bounce,0.2,{
				transformOrigin:"50% 50%"
			},{
				delay:delay,
				scaleX:1,
				scaleY:0.8,
				force3D:true,
				ease:Quad.easeInOut,
				onComplete:function(){
					TweenMax.to($bounce,0.15,{
						// scaleX:1.2,
						scaleY:1.2,
						force3D:true,
						ease:Quad.easeInOut,
						onComplete:function(){
							TweenMax.to($bounce,3,{
								// scaleX:1,
								scaleY:1,
								force3D:true,
								ease:Elastic.easeOut,
								easeParams:[1.1,0.12]
							})
						}
					})
				}
			});
			

			TweenMax.to($(this).children(".menu-item-button"),0.3,{
				delay:delay,
				y:0,
				force3D:true,
				ease:Quint.easeIn
			});
		})
	}
    
    var scrollPos = $(document).scrollTop();
    
    // welcome section
    TweenMax.from(".me", 1, {opacity: 0, scale: 0, ease: Bounce.easeOut});
    TweenMax.from(".welcome-text-container", 1, {opacity: 0, y: 50, delay: 1});
    TweenMax.staggerFrom("nav li", 0.5, {opacity: 0, y: -200, delay: 1.5}, 0.2);
    TweenMax.from(".social-menu-container", 0.5, {opacity: 0, delay: 2});
    // end

    // icon drawing section
    var paths = document.querySelectorAll('.skill path');

    for(i = 0; i < paths.length; i++) {
        var current = paths[i];
        var length = current.getTotalLength();

        current.style.strokeDasharray = length;
        current.style.strokeDashoffset = length;
    };

    $('.skill h3').css('opacity','0');
    // end

    // portfolio work
    var folioAnim = TweenMax.staggerFrom(".work-example", 1, {scale: 0, paused: true}, 0.3);
    // end

    // software logos
    var softwareAnim = TweenMax.from(".software img", 1, {opacity: 0, paused: true});
    // end

    // scroll handler
    $(window).scroll(function() {
        var scrollPos = $(document).scrollTop();
        var animStartPos = scrollPos + (($(window).height() / 3) * 2);
        
        if(scrollPos > 5) {
            if($('.social-menu-container').hasClass('hide')) {
                
            } else {
                $('.social-menu-container').addClass('hide');
            }
        } else {
            $('.social-menu-container').removeClass('hide');   
        }

        if($('.skill').offset().top < animStartPos) {
            $('.skill').addClass('played');
        }

        if($('.portfolio').offset().top < animStartPos) {
            for(i = 0; i < folioAnim.length; i++) {
                folioAnim[i].paused(false);
            }
        }

        if($('.software').offset().top < animStartPos) {
            softwareAnim.paused(false);
        }
    })
    // end

})