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
    moneyInLastSecond=0
    deltaArray=[0,0,0,0,0,0,0,0,0,0]
    maxClickDmg=0
    STATS = new statsObj()
    connectedCallback(){
      const shadow = this.attachShadow({mode: 'open'});
      shadow.innerHTML = shadowDOM;
    }
  }

  Game.prototype.onEnemyClick = function (enemy) {
    let dmg = 
      this.STATS.baseDmg*(
        1 + (Math.random()<this.STATS.baseCritChance/Math.pow(2,this.STATS.lvlCritEvolve))
        *(this.STATS.baseCritAdder*Math.pow(2,this.STATS.lvlCritEvolve)
        +(Math.pow(2,this.STATS.lvlCritEvolve)-1)))
        +this.STATS.lvlFlatDmg;
    this.STATS.money += dmg;
    this.moneyInLastSecond += dmg;
    if (dmg>this.maxClickDmg) {
      this.maxClickDmg = dmg;
      this.STATS.linkNode.setAttribute('maxclk', this.maxClickDmg);
    }
  }

  setInterval(()=>{
    for (let i = 0; i < document.querySelector("game-main").STATS.lvlAutoClk; i++) {
      document.querySelector("game-main").onEnemyClick();
    }
    document.querySelector("game-main").deltaArray = document.querySelector("game-main").deltaArray.slice(1).concat([document.querySelector("game-main").moneyInLastSecond]);
    document.querySelector("game-main").STATS.linkNode.setAttribute("mps", 
      (document.querySelector("game-main").deltaArray[0] + 
      document.querySelector("game-main").deltaArray[1] + 
      document.querySelector("game-main").deltaArray[2] + 
      document.querySelector("game-main").deltaArray[3] + 
      document.querySelector("game-main").deltaArray[4] + 
      document.querySelector("game-main").deltaArray[5] + 
      document.querySelector("game-main").deltaArray[6] + 
      document.querySelector("game-main").deltaArray[7] + 
      document.querySelector("game-main").deltaArray[8] + 
      document.querySelector("game-main").deltaArray[9] )/10
    );
    document.querySelector("game-main").moneyInLastSecond = 0;
  }, 1000)
  return Game;
})()

customElements.define('game-main', game);