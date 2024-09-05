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
    moneyInLastSecondMain=0
    moneyInLastSecondAuto=0
    deltaArrayMain=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    deltaArrayAuto=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    maxClickDmg=0
    mpsMain=0
    mpsAuto=0
    STATS = new statsObj()
    connectedCallback(){
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.innerHTML = shadowDOM;
    }
  }

  Game.prototype.onEnemyClick = function (args = {}) {
    let dmg = this.STATS.baseDmg;
    args.isCrit = false
    if (Math.random()<this.STATS.baseCritChance/Math.pow(2,this.STATS.lvlCritEvolve)) {
      dmg *=(1 + (this.STATS.baseCritAdder))*Math.pow(2,this.STATS.lvlCritEvolve);
      args.isCrit = true;
    }
    if (args.type=="main" && this.STATS.lvlFlatDmg && !args.isCrit) {
      dmg += (this.STATS.lvlFlatDmg*5+5)*(this.mpsAuto)/100;
    }
    this.STATS.money += dmg;
    args.enemy.HP -= dmg;
    if (args.type=="main") {
      this.STATS.totalClick += 1;
      this.moneyInLastSecondMain += dmg;
    }
    if (args.type=="auto") {
      this.moneyInLastSecondAuto += dmg;
    }
    if (dmg>this.maxClickDmg) {
      this.maxClickDmg = dmg;
      this.STATS.linkNode.setAttribute('maxclk', this.maxClickDmg);
    }
  }

  setInterval(()=>{
    for (let i = 0; i < document.querySelector("game-main").STATS.lvlAutoClk; i++) {
      document.querySelector("game-main").onEnemyClick({type:"auto", enemy:document.querySelector("game-main").shadow.querySelector("game-enemy")});
    }
    document.querySelector("game-main").deltaArrayMain = document.querySelector("game-main").deltaArrayMain.slice(1).concat([document.querySelector("game-main").moneyInLastSecondMain]);
    document.querySelector("game-main").mpsMain = (document.querySelector("game-main").deltaArrayMain.reduce((a,item)=>{return a+item},0))/20;
    document.querySelector("game-main").STATS.linkNode.setAttribute("mpsmain", document.querySelector("game-main").mpsMain);
    document.querySelector("game-main").moneyInLastSecondMain = 0;
    document.querySelector("game-main").deltaArrayAuto = document.querySelector("game-main").deltaArrayAuto.slice(1).concat([document.querySelector("game-main").moneyInLastSecondAuto]);
    document.querySelector("game-main").mpsAuto = document.querySelector("game-main").deltaArrayAuto.reduce((a,item)=>{return a+item},0)/20;
    document.querySelector("game-main").STATS.linkNode.setAttribute("mpsauto", document.querySelector("game-main").mpsAuto);
    document.querySelector("game-main").moneyInLastSecondAuto = 0;
  }, 1000)
  return Game;
})()

customElements.define('game-main', game);