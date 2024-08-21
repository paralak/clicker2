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
    if (Math.random()<this.STATS.baseCritChance/Math.pow(2,this.STATS.lvlCritEvolve)) {
      dmg *=(1 + (this.STATS.baseCritAdder))*Math.pow(2,this.STATS.lvlCritEvolve);
      args.type = "crit";
    }
    if (args.type=="main" && this.STATS.lvlFlatDmg) {
      dmg += (this.STATS.lvlFlatDmg*5+5)*(this.mpsAuto)/100;
    }
    this.STATS.money += dmg;
    if (args.type=="main" || args.type=="crit") {
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
    document.querySelector("game-main").mpsMain = (document.querySelector("game-main").deltaArrayMain[0] + 
    document.querySelector("game-main").deltaArrayMain[1] + 
    document.querySelector("game-main").deltaArrayMain[2] + 
    document.querySelector("game-main").deltaArrayMain[3] + 
    document.querySelector("game-main").deltaArrayMain[4] + 
    document.querySelector("game-main").deltaArrayMain[5] + 
    document.querySelector("game-main").deltaArrayMain[6] + 
    document.querySelector("game-main").deltaArrayMain[7] + 
    document.querySelector("game-main").deltaArrayMain[8] + 
    document.querySelector("game-main").deltaArrayMain[9] +
    document.querySelector("game-main").deltaArrayMain[10] +
    document.querySelector("game-main").deltaArrayMain[11] + 
    document.querySelector("game-main").deltaArrayMain[12] + 
    document.querySelector("game-main").deltaArrayMain[13] + 
    document.querySelector("game-main").deltaArrayMain[14] + 
    document.querySelector("game-main").deltaArrayMain[15] + 
    document.querySelector("game-main").deltaArrayMain[16] + 
    document.querySelector("game-main").deltaArrayMain[17] + 
    document.querySelector("game-main").deltaArrayMain[18] + 
    document.querySelector("game-main").deltaArrayMain[19] )/20;
    document.querySelector("game-main").STATS.linkNode.setAttribute("mpsmain", document.querySelector("game-main").mpsMain);
    document.querySelector("game-main").moneyInLastSecondMain = 0;
    document.querySelector("game-main").deltaArrayAuto = document.querySelector("game-main").deltaArrayAuto.slice(1).concat([document.querySelector("game-main").moneyInLastSecondAuto]);
    document.querySelector("game-main").mpsAuto = (document.querySelector("game-main").deltaArrayAuto[0] + 
    document.querySelector("game-main").deltaArrayAuto[1] + 
    document.querySelector("game-main").deltaArrayAuto[2] + 
    document.querySelector("game-main").deltaArrayAuto[3] + 
    document.querySelector("game-main").deltaArrayAuto[4] + 
    document.querySelector("game-main").deltaArrayAuto[5] + 
    document.querySelector("game-main").deltaArrayAuto[6] + 
    document.querySelector("game-main").deltaArrayAuto[7] + 
    document.querySelector("game-main").deltaArrayAuto[8] + 
    document.querySelector("game-main").deltaArrayAuto[9] +
    document.querySelector("game-main").deltaArrayAuto[10] +
    document.querySelector("game-main").deltaArrayAuto[11] + 
    document.querySelector("game-main").deltaArrayAuto[12] + 
    document.querySelector("game-main").deltaArrayAuto[13] + 
    document.querySelector("game-main").deltaArrayAuto[14] + 
    document.querySelector("game-main").deltaArrayAuto[15] + 
    document.querySelector("game-main").deltaArrayAuto[16] + 
    document.querySelector("game-main").deltaArrayAuto[17] + 
    document.querySelector("game-main").deltaArrayAuto[18] + 
    document.querySelector("game-main").deltaArrayAuto[19] )/20;
    document.querySelector("game-main").STATS.linkNode.setAttribute("mpsauto", document.querySelector("game-main").mpsAuto);
    document.querySelector("game-main").moneyInLastSecondAuto = 0;
  }, 1000)
  return Game;
})()

customElements.define('game-main', game);