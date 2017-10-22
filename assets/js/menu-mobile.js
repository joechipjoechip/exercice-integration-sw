let doMenuMobile = {
  init : () => {
    this.body = document.querySelector('body');
    this.menuOpener = document.getElementById('menu-hamburger-open')
    this.menuCloser = document.getElementById('menu-hamburger-close')
    this.bodyClasses = this.body.classList.value.split(' ')
    this.nav = this.body.querySelector('nav')
    this.ul = this.nav.querySelector('ul')

    this.menuOpener.addEventListener('click', this.doMenuMobile.toggleMenu)
    this.menuCloser.addEventListener('click', this.doMenuMobile.toggleMenu)
    this.nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', this.doMenuMobile.closeMenu)
    })

    this.doMenuMobile.handleMenuMobile()
    window.addEventListener('resize', this.doMenuMobile.handleMenuMobile)
  },

  handleMenuMobile : () => {
    
    if (window.innerWidth < 376) {
      if (this.bodyClasses.includes('menu-mobile-to-show')) {
        this.menuOpener.classList.add('displayed')
      }
    } else {
      if (this.bodyClasses.includes('menu-mobile-to-show')) {
        this.menuOpener.classList.remove('displayed')
      }
    }
  },

  toggleMenu : () => {
    this.body.classList.toggle('menu-mobile-opened')
    this.menuOpener.classList.toggle('displayed')
    this.menuCloser.classList.toggle('displayed')
  }
};

export { doMenuMobile }