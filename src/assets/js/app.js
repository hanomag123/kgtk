document.addEventListener("DOMContentLoaded", () => {

  const xl = matchMedia('(max-width: 1024px)');

  class Menu {
    constructor(menuElement, buttonElement) {
      this.menu = typeof menuElement === "string" ? document.querySelector(menuElement) : menuElement;
      this.button = typeof buttonElement === "string" ? document.querySelector(buttonElement) : buttonElement;
      this.overlay = document.createElement('div');
      this.overlay.hidden = true;
      this._init();
    }

    _init() {
      document.body.appendChild(this.overlay);
      this.overlay.classList.add('overlay');

      this.overlay.addEventListener('click', this.toggleMenu.bind(this));
      this.button.addEventListener('click', this.toggleMenu.bind(this));
    }

    toggleMenu() {
      this.menu.classList.toggle('menu--open');
      this.button.classList.toggle('menu-button--active');
      this.overlay.hidden = !this.overlay.hidden;

      if (this.isMenuOpen()) {
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    }

    closeMenu() {
      this.menu.classList.remove('header__nav--active');
      this.button.classList.remove('header__menu-button--active');
      this.overlay.hidden = true;

      this.enableScroll();
    }

    isMenuOpen() {
      return this.menu.classList.contains('menu--open');
    }

    disableScroll() {
      // Get the current page scroll position;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      // if any scroll is attempted, set this to the previous value;
      window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop);
      };
    }

    enableScroll() {
      window.onscroll = function () { };
    }
  }

  const menu = document.querySelector('.menu');
  const menuButton = document.querySelector('.menu-button');

  if (menu && menuButton) {
    new Menu(menu, menuButton);
  }

  const header = document.querySelector('header');

  // if (xl.matches) {
  //   document.removeEventListener('scroll', scrollHeader);
  // } else {
  //   document.addEventListener('scroll', scrollHeader);
  // }

  // xl.addEventListener('change', () => {
  //   if (header) {
  //     header.classList.remove('out');
  //   }
  //   if (xl.matches) {
  //     document.removeEventListener('scroll', scrollHeader);
  //   } else {
  //     document.addEventListener('scroll', scrollHeader);
  //   }
  // });

  function disableScroll() {
    // Get the current page scroll position;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    document.documentElement.style.setProperty('scroll-behavior', 'auto');

    // if any scroll is attempted, set this to the previous value;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    document.documentElement.style.setProperty('scroll-behavior', null);
    window.onscroll = function () { };
  }

  var prevScrollpos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  function scrollHeader() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollPos < 0) {
      currentScrollPos = 0;
      prevScrollpos = 0;
    };
    if (prevScrollpos < 0) {
      prevScrollpos = 0;
      currentScrollPos = 0;
    };

    if (prevScrollpos >= currentScrollPos) {
      header.classList.remove('out');
    } else if (prevScrollpos < currentScrollPos && currentScrollPos > 100) {
      header.classList.add('out');
    };
    prevScrollpos = currentScrollPos;
  };

  const inputs = document.querySelectorAll('input,textarea');
  if (inputs.length) {
    inputs.forEach(el => {
      el.value ? el.classList.add('havetext') : el.classList.remove('havetext');
      el.addEventListener('input', function () {
        this.value ? this.classList.add('havetext') : this.classList.remove('havetext');
      });
      el.addEventListener('focus', function () {
        this.parentElement.classList.remove('error');
      })
    });
  }

  const swiper1slides = document.querySelectorAll('.reviews-swiper .swiper-slide');
  const swiper = new Swiper('.teachers-swiper', {
    loop: swiper1slides.length > 2,
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 500,
    grabCursor: true,
    navigation: {
      nextEl: '.teachers .next',
      prevEl: '.teachers .prev',
    },
  })

  const swiper2slides = document.querySelectorAll('.reviews-swiper .swiper-slide');
  const swiper2 = new Swiper('.reviews-swiper', {
    loop: swiper2slides.length > 2,
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 500,
    grabCursor: true,
    navigation: {
      nextEl: '.reviews .next',
      prevEl: '.reviews .prev',
    },
  })

  const swiper3 = new Swiper('.partners-swiper', {
    loop: false,
    slidesPerView: 2.7,
    spaceBetween: 16,
    speed: 500,
    grabCursor: true,
    navigation: {
      nextEl: '.partners-wrapper .next',
      prevEl: '.partners-wrapper .prev',
    },
    breakpoints: {
      // when window width is >= 320px
      501: {
        slidesPerView: 4,
        spaceBetween: 40
      },
    }
  })

  const mobileSwipers = document.querySelectorAll('.news-swiper');
  if (mobileSwipers.length) {
    mobileSwipers.forEach(el => {
      let swiper4 = null;
      if (xl.matches && swiper4 === null) {
        swiper4 = new Swiper(el, {
          loop: true,
          slidesPerView: 'auto',
          spaceBetween: 0,

        });
      }
      xl.addEventListener('change', () => {
        if (xl.matches) {
          swiper4 = new Swiper(el, {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 0,
          });
        } else {
          swiper4.destroy(true, true);
        }
      })
    });
  }


  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl, sel;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        sel = this.parentNode.previousSibling.classList.add('select-selected--active')
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);


  const accordionButton = document.querySelectorAll('.accordion-button');

  if (accordionButton.length) {
    accordionButton.forEach(el => {
      el.addEventListener('click', function () {
        this.parentElement.classList.toggle('--active');
      })
    })
  }



  const maininfoButtons = document.querySelectorAll('.maininfo-list .maininfo-button');
  const maininfoContent = document.querySelector('.maininfo-content');
  if (maininfoButtons.length && maininfoContent) {
    maininfoButtons.forEach(el => {
      el.addEventListener('click', function () {
        if (xl.matches) {
          const activeMainInfo = document.querySelector('.maininfo-list .--active');
          if (activeMainInfo) {
            if (activeMainInfo === this) {
              maininfoButtons.forEach(button => button.classList.remove('--active'));
            } else {
              maininfoButtons.forEach(button => button.classList.remove('--active'));
              this.classList.add('--active');
            }
          } else {
            this.classList.add('--active');
          }
          maininfoContent.innerHTML = this.nextElementSibling.innerHTML;
        } else {
          maininfoButtons.forEach(button => button.classList.remove('--active'));
          this.classList.add('--active');
          maininfoContent.innerHTML = this.nextElementSibling.innerHTML;
        }


        if (xl.matches) {
          const header = document.querySelector('header');
          const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
          let headerH = null;
          if (header) {
            headerH = header.getBoundingClientRect().height;
          }
          const yOffset = headerH ? -headerH : -200;
          const y = this.getBoundingClientRect().top + currentScrollPos + yOffset - 15;

          window.scrollTo({ top: y, behavior: 'auto' });
        }
      })
    })
  }

  const activeMainInfo = document.querySelector('.maininfo-list .--active');
  if (activeMainInfo) {
    if (!xl.matches) {
      activeMainInfo.click();
    }
  } else if (maininfoButtons.length) {
    maininfoButtons[0].click();
  }


  const btn = document.querySelector('.to-top-button');

  if (btn) {
    document.addEventListener('scroll', btnHandler);

    btn.addEventListener('click', function () {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })

  }

  function btnHandler() {
    var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScrollPos < 0) {
      currentScrollPos = 0;
      prevScrollpos = 0;
    };
    if (prevScrollpos < 0) {
      prevScrollpos = 0;
      currentScrollPos = 0;
    };



    if (currentScrollPos >= 300) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    };
    prevScrollpos = currentScrollPos;
  }

  const yearNow = document.getElementById('nowYear');

  if (yearNow) {
    const year = new Date().getFullYear();

    if (year) {
      yearNow.innerHTML = year;
    }
  }

  function modalHandler() {
    const modal = document.querySelector(`${this.dataset?.modal}`) || this
    if (modal.classList.contains('regModal') && modal.hidden) {
      disableScroll();
    } else {
      enableScroll();
    }
    if (modal) {
      if (modal.hidden) {
        modal.hidden = !modal.hidden
        modal.style.setProperty('pointer-events', 'auto');
        setTimeout(() => {
          modal.style.opacity = 1
        }, 10);
      } else {
        modal.style.opacity = 0
        modal.style.setProperty('pointer-events', null);
        const numb = Number(getComputedStyle(modal).transitionDuration.match(/(\d+\.\d+)|(\d+)/g)[0]);
        if (numb > 0) {
          modal.addEventListener('transitionend', hideaftertransition);
        } else {
          modal.hidden = true
        }
      }
    }
  }

  const regModal = document.querySelectorAll('.regModal');

  if (regModal) {
    regModal.forEach(el => {
      el.addEventListener('click', function () {
        if (event.target.classList.contains('regModal')) {
          modalHandler.apply(this);
        }
      });
      const closeButton = el.querySelectorAll('.close-button');
      if (closeButton.length) {
        closeButton.forEach(button => {
          button.addEventListener('click', () => {
            modalHandler.apply(el);
          });
        })
      }
    });
  }


  function hideaftertransition() {
    this.hidden = true
    this.removeEventListener('transitionend', hideaftertransition);
  }

  document.addEventListener('click', () => {
    const dataModal = event.target.closest('[data-modal]');
    if (dataModal) {
      modalHandler.apply(dataModal);
      return;
    }

    const err = event.target.closest('.error');

    if (err) {
      const errors = document.querySelectorAll('.error');
      if (errors.length)
        errors.forEach(el => el.classList.remove('error'));
    }
  })

});











