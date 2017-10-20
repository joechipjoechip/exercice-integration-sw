let doSticky = {

  init : () => {

    this.menuBottom = document.body.querySelector('nav').offsetHeight;
    this.myStickies = []

    document.body.querySelectorAll('.sticky-element').forEach(element => {
      this.myStickies.push(element);
    });

    if (this.myStickies.length > 0) {
       // import lazyload de jquery
      import('jquery').then(jQuery => {

        window.jQuery = jQuery;
        window.$ = jQuery;

        // import lazyload de sticky-kit
        import('sticky-kit/dist/sticky-kit.js').then(() => {

          this.myStickies.forEach(element => {
            $(element).stick_in_parent({
              offset_top: this.menuBottom + 20
            });
          });

        });
      });  
    }
  }
};

export { doSticky }