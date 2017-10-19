let doParallax = {

  start : () => {
    
    this.targets = document.body.querySelectorAll('.parallax');

    this.targets.forEach(target => {
      this.family = Array.from(target.children);
      this.family.forEach( child => {
        this.staticDecay = parseInt(window.getComputedStyle(child).getPropertyValue('top').replace('px', ''));
      });
    });

    window.addEventListener('scroll', this.doParallax.handleScroll)

    return [this.targets, this.staticDecay];
  },

  handleScroll : e => {

    this.targets.forEach(target => {
      const decay = window.scrollY - target.offsetTop,
            family = Array.from(target.children);

      // action Parent
      this.doParallax.actionParent(target, decay);

      // action enfant
      this.doParallax.actionChildren(family, decay);
    });
    
  },

  actionParent : (element, decay) => {
    let relativeDecayBg = 50 - (decay * 0.8);
    element.style.cssText = `background-position: 50% ${relativeDecayBg}%;`
  },

  actionChildren : (family, decay) => {
    family.forEach(child => {
      let relativeDecay = (this.staticDecay + decay / 1.2);
      child.style.cssText = `top: ${relativeDecay}px;`;
    });
  }
};

export { doParallax }