let doParallax = {

  init : () => {

    this.myTargets = [];
    
    this.targets = document.body.querySelectorAll('.parallax');

    this.targets.forEach((target, index) => {

      this.myTargets.push({
        "targetParent" : target,
        "targetChildren" : []
      });

      const family = Array.from(target.children);

      family.forEach( child => {
        const initDecay = parseInt(window.getComputedStyle(child).getPropertyValue('top').replace('px', ''));
        this.myTargets[index].targetChildren.push({"element" : child, initDecay});
      });

    });

    window.addEventListener('scroll', this.doParallax.handleScroll)
  },

  handleScroll : e => {

    this.myTargets.forEach(target => {

      const decay = window.scrollY - target.targetParent.offsetTop;

      this.doParallax.actionParent(target.targetParent, decay);
      this.doParallax.actionChildren(target.targetChildren, decay);

    });
  },

  actionParent : (element, decay) => {

    let relativeDecayBg = 50 - (decay * 0.8);
    element.style.cssText = `background-position: 50% ${relativeDecayBg}%;`

  },

  actionChildren : (children, decay) => {

    children.forEach(child => {

      let relativeDecay = (child.initDecay + decay / 1.5);
      child.element.style.cssText = `top: ${relativeDecay}px;`;

    });

  }
};

export { doParallax }