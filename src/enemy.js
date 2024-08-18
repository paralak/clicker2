const enemy = (function(){
  const shadowDOM = /*html*/
  `
    <style>
      div {
        width: 100px;
        height: 100px;
        background: #000;
      }
    </style>
    <div id="a"></div>
  `;
  
  class Enemy extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({mode: 'open'});
      shadow.innerHTML = shadowDOM;
      shadow.addEventListener('click', ()=>{this.onclick()});
    }
    onclick() {
      this.getRootNode().host.onEnemyClick(this);
    }
  }

  return Enemy;
})()

customElements.define('game-enemy', enemy);