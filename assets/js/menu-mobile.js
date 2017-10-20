let doMenuMobile = {
  init : () => {
    const body = document.querySelector('body');
    this.menuOpener = document.getElementById('menu-hamburger-open')
    this.menuCloser = document.getElementById('menu-hamburger-close')
    this.bodyClasses = body.classList.value.split(' ')
    this.nav = body.querySelector('nav')
    this.ul = this.nav.querySelector('ul')

    this.menuOpener.addEventListener('click', this.doMenuMobile.openMenu)
    this.menuCloser.addEventListener('click', this.doMenuMobile.closeMenu)
    this.nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', this.doMenuMobile.closeMenu)
    })

    this.doMenuMobile.handleMenuMobile()
    window.addEventListener('resize', this.doMenuMobile.handleMenuMobile)
  },

  handleMenuMobile : () => {
    
    if (window.innerWidth < 376) {
      if (this.bodyClasses.includes('menu-mobile-closed')) {
        this.menuOpener.classList.add('displayed')
      }
    } else {
      if (this.bodyClasses.includes('menu-mobile-closed')) {
        this.menuOpener.classList.remove('displayed')
      }
    }

  },

  openMenu : () => {
    this.ul.classList.add('displayed')
    this.menuOpener.classList.remove('displayed')
    this.menuCloser.classList.add('displayed')
  },

  closeMenu : () => {
    this.ul.classList.remove('displayed')
    this.menuOpener.classList.add('displayed')
    this.menuCloser.classList.remove('displayed')
  }
};

export { doMenuMobile }