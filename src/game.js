const game = (function(){
  const shadowDOM = /*html*/
  `
    <style>

    </style>
    <game-enemy></game-enemy>
    <game-stats></game-stats>
    <game-upgrades></game-upgrades>
  `;
  class Game extends HTMLElement {
    STATS = new statsObj()
    connectedCallback(){
      const shadow = this.attachShadow({mode: 'open'});
      shadow.innerHTML = shadowDOM;
    }
  }

  Game.prototype.onEnemyClick = function (enemy) {
    this.STATS.money += this.STATS.baseDmg*(1 + (Math.random()<this.STATS.baseCritChance/Math.pow(2,this.STATS.lvlCritEvolve))*(this.STATS.baseCritAdder*Math.pow(2,this.STATS.lvlCritEvolve)+this.STATS.lvlCritEvolve));
  }

  setInterval(()=>{
    for (let i = 0; i < document.querySelector("game-main").STATS.lvlAutoClk; i++) {
      document.querySelector("game-main").onEnemyClick();
    }
  }, 1000)

  return Game;
})()

customElements.define('game-main', game);