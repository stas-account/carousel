
/* IMAGE CAROUSEL */

let containerUL = document.querySelector('.container-2 .container-ul');
let containerCarousel = document.querySelector('.container-2 .container-carousel');

/* Переменные для фиксации координат свойства translate при переключении между каруселями */
let distance0,
    distance1,
    distance2,
    distance3;

let distanceArr = [distance0 = 0, distance1 = 0, distance2 = 0, distance3 = 0];

/* Блок кода для функционала переключения между каруселями */
if (containerUL !== null) {

	containerUL.onmousedown = function (event) {

		let a = event.target.closest('ul li a');
		let li = event.target.closest('ul li');
		let ul = event.target.closest('ul');

		if (!a) return;
		if (!containerUL.contains(a)) return;

		for (let node of containerCarousel.children) {
			node.classList.remove('active');
			if (node.className === 'carousel') {
				node.style.display = 'none';
				node.style.transition = '';
			}
		}
		for (let node of ul.children) {
			node.classList.remove('active');
		}

		let i;

		if (event.target === a) {

			switch (event.target.innerHTML) {
				case 'Computer':
					i = 3;
					break;
				case 'Smartphone':
					i = 4;
					break;
				case 'Watches':
					i = 5;
					break;
				case 'Photo and Camera':
					i = 6;
					break;
			}
			li.classList.add('active');

			let carouselChild = document.querySelector(`.container-2 .carousel:nth-child(${i})`);
			carouselChild.classList.add('active');
			$(carouselChild).fadeIn(500);
		}
	};
}

/* Прокрутка карусели для событий mousedown и mouseup */
if (containerCarousel !== null) {

	containerCarousel.onmousedown = function (event) {

		let carouselEvent = event.target.closest('.carousel');
		if (!carouselEvent) return;
		if (!containerCarousel.contains(carouselEvent)) return;

		let i = -2;
		for (let node of containerCarousel.children) {

			if(node === carouselEvent) break;
			i++;
		}

		let mouseDown = event.clientX;
		let mouseMove;
		let x = 0;
		let width = -(carouselEvent.firstElementChild.offsetWidth);
		let validWidth = -(carouselEvent.firstElementChild.offsetWidth * (carouselEvent.childElementCount - 4));

		carouselEvent.style.transition = ``;

		function onMouseMove (event) {

			mouseMove = event.clientX;

			if (x > 0 || x < validWidth) {
				x = distanceArr[i] + (mouseMove - mouseDown)/2;
			} else {
				x = distanceArr[i] + (mouseMove - mouseDown)/2;
			}

			carouselEvent.style.transform = `translate(${x}px, 0px)`;
		}

		document.addEventListener ('mousemove', onMouseMove);

		document.onmouseup = function(event) {

			if (x > 0) {

				distanceArr[i] = 0;

			} else if (x < validWidth){

				distanceArr[i] = validWidth;

			} else {

				distanceArr[i] += (event.clientX - mouseDown)/2;
				let division = distanceArr[i] / width;
				division = Math.ceil(division);
				distanceArr[i] = width * division;
			}
			carouselEvent.style.transform = `translate(${distanceArr[i]}px, 0px)`;
			carouselEvent.style.transition = `all 500ms ease 0s`;

			document.removeEventListener('mousemove', onMouseMove);
			document.onmouseup = null;
		};

	};
	containerCarousel.ondragstart = function() {
		return false;
	};
}

//* Прокрутка карусели с помощью переключателя */
let iLeft = document.querySelector('.container-2 .container-carousel i:nth-child(1)');
let iRight = document.querySelector('.container-2 .container-carousel i:nth-child(2)');

if (containerCarousel !== null) {
	containerCarousel.onclick = function (event) {

		let arrow = event.target.closest('i');

		if (!arrow) return;
		if (!containerCarousel.contains(arrow)) return;

		let width;
		let validWidth;
		let carousel;
		let i = -2;
		for (let node of containerCarousel.children) {

			if(node.className === 'carousel active') {

				width = -(node.firstElementChild.offsetWidth);
				validWidth = -(node.firstElementChild.offsetWidth * (node.childElementCount - 4));
				carousel = node;
				break;
			}
			i++
		}

		for (let node of containerCarousel.children) {

			if (node === arrow) {

				if (arrow === iLeft) {

					if (distanceArr[i] >= 0) {
						distanceArr[i] = 0;
					} else if (distanceArr[i] < validWidth) {
						distanceArr[i] = 0;
					} else {
						distanceArr[i] -=  width;
					}

				} else if (arrow === iRight) {

					if (distanceArr[i] > 0) {
						distanceArr[i] = 0;
					} else if (distanceArr[i] <= validWidth) {
						distanceArr[i] = 0;
						carousel.style.transform = `translate(${distanceArr[i]}px, 0px)`;
						carousel.style.transition = `all 1000ms ease 0s`;
						break;
					} else {
						distanceArr[i] +=  width;
					}
				}
				carousel.style.transform = `translate(${distanceArr[i]}px, 0px)`;
				carousel.style.transition = `all 500ms ease 0s`;
				break;
			}
		}
	};
}

/* end IMAGE CAROUSEL */


















