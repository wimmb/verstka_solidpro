$(document).ready(function () {
	// TwentyTwenty init
	if ($('.before-after').length) {
		$(".before-after").twentytwenty();
	}

	// Fancybox init
	if (document.querySelector('[data-fancybox]')) {
		Fancybox.bind('[data-fancybox]', {
			dragToClose: false,
			closeButton: false,
		});
	}

	//Animate blocks
	function initializeAOS() {
		if (window.innerWidth > 1199.98) {
			AOS.init({
				//easing: 'ease-out-back',
				offset: 200,
				delay: 400,
				duration: 700,
				once: true,
			});
		}
	}
	initializeAOS();
	window.addEventListener('resize', () => {
		AOS.refreshHard();
		initializeAOS();
	});

	// Hero carousel swiper
	const hero__carousel = document.querySelector('.hero__carousel');
	if (hero__carousel) {
		const swiper = new Swiper(hero__carousel, {
			slidesPerView: 'auto',
			allowTouchMove: false,
			spaceBetween: 20,
			loop: true,
			speed: 3300,
			autoplay: {
				enabled: true,
				delay: 0,
			},
		});
	}

	// Logos carousel swiper
	const logos__carousel = document.querySelector('.logos__carousel');
	if (logos__carousel) {
		const swiper = new Swiper(logos__carousel, {
			slidesPerView: 'auto',
			allowTouchMove: false,
			spaceBetween: 70,
			loop: true,
			speed: 2200,
			autoplay: {
				reverseDirection: true,
				enabled: true,
				delay: 0,
			},
		});
	}

	// Reviews carousel swiper
	const reviews__carousel = document.querySelector('.reviews__carousel');
	if (reviews__carousel) {
		const swiper = new Swiper(reviews__carousel, {
			slidesPerView: 'auto',
			loop: true,
      		pagination: {
      			el: '.reviews__pagination',
      			clickable: true,
    		},
			navigation: {
      			nextEl: '.reviews__btn-next',
      			prevEl: '.reviews__btn-prev',
    		},
		});
	}

});

// Add .header--scroll to Header
function updateHeaderScrollClass() {
	const header = document.querySelector('.header');
	if (!header) return;
	
	if (window.scrollY > 0) {
		header.classList.add('header--scroll');
	} else {
		header.classList.remove('header--scroll');
	}
}
document.addEventListener('scroll', updateHeaderScrollClass);
document.addEventListener('DOMContentLoaded', updateHeaderScrollClass);

// Scroll links
document.addEventListener('DOMContentLoaded', function () {
	const OFFSET_DESKTOP = 64;
	const OFFSET_MOBILE = 54;
	const MOBILE_BREAKPOINT = 1079.98;

	const header = document.querySelector('.header');
	const burgerBtn = document.querySelector('.header__mobile-burger');
	const mobileMenu = document.querySelector('.header__mobile-menu');

	burgerBtn.addEventListener('click', function () {
		burgerBtn.classList.toggle('active');
		mobileMenu.classList.toggle('active');
		header.classList.toggle('open-menu');
	});

	function getHeaderOffset() {
		return window.innerWidth <= MOBILE_BREAKPOINT ? OFFSET_MOBILE : OFFSET_DESKTOP;
	}

	function scrollToTarget(id) {
		const target = document.getElementById(id);
		if (target) {
			const offset = getHeaderOffset();
			const top = target.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({
				top: top,
				behavior: 'smooth'
			});
		}
	}

	function handleLinkClick(e) {
		const href = this.getAttribute('href');
		if (href.startsWith('#') && href.length > 1) {
			e.preventDefault();
			const id = href.substring(1);
			scrollToTarget(id);

			if (window.innerWidth <= MOBILE_BREAKPOINT) {
				burgerBtn.classList.remove('active');
				mobileMenu.classList.remove('active');
				header.classList.remove('open-menu');
			}
		}
	}

	const links = document.querySelectorAll('a[href^="#"]:not([href="#"]), .scroll-btn');
	links.forEach(link => {
		link.addEventListener('click', handleLinkClick);
	});
});


//------------------------------------------ other

// Toggles FAQ
document.addEventListener('DOMContentLoaded', function () {
	const toggleBlocks = document.querySelectorAll('.faq__toggle');

	if (toggleBlocks.length === 0) {
		return;
	}

	toggleBlocks.forEach(block => {
		const header = block.querySelector('.toggle__header');
		const button = block.querySelector('.toggle__header-btn');
		const content = block.querySelector('.toggle__content');

		if (!header || !button || !content) {
			return;
		}

		header.addEventListener('click', function () {
			if (content.style.maxHeight) {
				content.style.maxHeight = null;
				content.style.paddingBottom = null;
				content.style.marginTop = null;
				button.classList.remove('v_active');
				content.classList.remove('c_active');
				block.classList.remove('t_active');
			} else {
				content.style.maxHeight = content.scrollHeight + 30 + 'px';
				content.style.paddingBottom = '20px';
				content.style.marginTop = '20px';
				button.classList.add('v_active');
				content.classList.add('c_active');
				block.classList.add('t_active');
			}
		});
	});
});

// Scroll to Top
document.addEventListener("DOMContentLoaded", function() {
    const scrollTopBtn = document.getElementById("scr_top");
    const scrollOffset = 800;

	if (!scrollTopBtn) return;

    window.addEventListener("scroll", () => {
        scrollTopBtn.classList.toggle("visible", window.scrollY > scrollOffset);
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});