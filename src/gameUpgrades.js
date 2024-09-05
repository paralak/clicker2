const gameUpgrades = (function(){
  const shadowDOM = /*html*/
  `
    <style>

    </style>
    <div class="wrapper">
      <game-upgardes-attack></game-upgardes-attack>
      <game-upgardes-crit></game-upgardes-crit>
      <game-upgardes-crit-evolve></game-upgardes-crit-evolve>
      <game-upgardes-autoclk></game-upgardes-autoclk>
      <game-upgardes-flat-dmg></game-upgardes-flat-dmg>
    </div>
  `;

  class GameUpgrades extends HTMLElement {
    connectedCallback() {
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.innerHTML = shadowDOM;
    }
  }

  return GameUpgrades;
})()

customElements.define('game-upgrades', gameUpgrades);

const gameUpgradesAttack = (function(){
  const shadowDOM = /*html*/
  `
    <style>
      div {
        box-sizing: border-box;
        background: #aaa;
        border: 1px solid #555;
        border-radius: 5px;
        height: 25px;
        width: 350px;
        padding: 2px;
        user-select: none;
      }
    </style>
    <div>
      Attack <span id="lvl">1</span> cost: <span id="cost">10</span>r click count > <span id="clkc">10</span>
    </div>
  `;

  class Attack extends HTMLElement {
    connectedCallback() {
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.innerHTML = shadowDOM;
      this.shadow.querySelector("div").addEventListener("click", ()=>{this.tryUpgrade()});
    }
  }

  Attack.prototype.tryUpgrade = function () {
    if (
      this.costByLvl(document.querySelector("game-main").STATS.lvlBaseDmg) <= document.querySelector("game-main").STATS.money &&
      document.querySelector("game-main").STATS.lvlBaseDmg*10 <= document.querySelector("game-main").STATS.totalClick
    ) {
      document.querySelector("game-main").STATS.money -= this.costByLvl(document.querySelector("game-main").STATS.lvlBaseDmg);
      document.querySelector("game-main").STATS.baseDmg += 1+Math.pow(Math.floor(Math.log2(document.querySelector("game-main").STATS.lvlBaseDmg/10+1)),1);
      document.querySelector("game-main").STATS.lvlBaseDmg += 1;
      this.shadow.querySelector("#cost").innerText = new Intl.NumberFormat("ru-RU").format(this.costByLvl(document.querySelector("game-main").STATS.lvlBaseDmg));
      this.shadow.querySelector("#lvl").innerText = document.querySelector("game-main").STATS.lvlBaseDmg;
      this.shadow.querySelector("#clkc").innerText = document.querySelector("game-main").STATS.lvlBaseDmg*10;
    }
  }

  Attack.prototype.costByLvl = function (lvl) {
    return lvl*lvl*10;
  }



  return Attack;
})()

customElements.define('game-upgardes-attack', gameUpgradesAttack);

const gameUpgradesCrit = (function(){
  const shadowDOM = /*html*/
  `
    <style>
      div {
        box-sizing: border-box;
        background: #aaa;
        border: 1px solid #555;
        border-radius: 5px;
        height: 25px;
        width: 350px;
        padding: 2px;
        user-select: none;
      }
    </style>
    <div>
      Crit <span id="lvl">0</span> cost: <span id="cost">100</span>r
    </div>
  `;

  class Crit extends HTMLElement {
    connectedCallback() {
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.innerHTML = shadowDOM;
      this.shadow.querySelector("div").addEventListener("click", ()=>{this.tryUpgrade()});
    }
  }

  Crit.prototype.tryUpgrade = function () {
    if (this.costByLvl(document.querySelector("game-main").STATS.lvlBaseCrit) <= document.querySelector("game-main").STATS.money) {
      document.querySelector("game-main").STATS.money -= this.costByLvl(document.querySelector("game-main").STATS.lvlBaseCrit);
      document.querySelector("game-main").STATS.lvlBaseCrit += 1;
      if (document.querySelector("game-main").STATS.lvlBaseCrit == 1) {
        document.querySelector("game-main").STATS.baseCritAdder += 0.5;
        document.querySelector("game-main").STATS.baseCritChance += 0.05;
      } else {
        document.querySelector("game-main").STATS.baseCritAdder += 0.1;
        document.querySelector("game-main").STATS.baseCritChance += 0.02;
      }
      this.shadow.querySelector("#cost").innerText = new Intl.NumberFormat("ru-RU").format(this.costByLvl(document.querySelector("game-main").STATS.lvlBaseCrit));
      this.shadow.querySelector("#lvl").innerText = document.querySelector("game-main").STATS.lvlBaseCrit;
    }
  }

  Crit.prototype.costByLvl = function (lvl) {
    return (lvl+1)*(lvl+1)*(lvl+1)*100;
  }



  return Crit;
})()

customElements.define('game-upgardes-crit', gameUpgradesCrit);

const gameUpgradesCritEvolve = (function(){
  const shadowDOM = /*html*/
  `
    <style>
      div {
        box-sizing: border-box;
        background: #aaa;
        border: 1px solid #555;
        border-radius: 5px;
        height: 25px;
        width: 350px;
        padding: 2px;
        user-select: none;
      }
    </style>
    <div>
      Crit evolve <span id="lvl">0</span> cost: <span id="cost">20 000</span>r
    </div>
  `;

  class CritEv extends HTMLElement {
    connectedCallback() {
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.innerHTML = shadowDOM;
      this.shadow.querySelector("div").addEventListener("click", ()=>{this.tryUpgrade()});
    }
  }

  CritEv.prototype.tryUpgrade = function () {
    if (this.costByLvl(document.querySelector("game-main").STATS.lvlCritEvolve) <= document.querySelector("game-main").STATS.money) {
      document.querySelector("game-main").STATS.money -= this.costByLvl(document.querySelector("game-main").STATS.lvlCritEvolve);
      document.querySelector("game-main").STATS.lvlCritEvolve += 1;
      this.shadow.querySelector("#cost").innerText = new Intl.NumberFormat("ru-RU").format(this.costByLvl(document.querySelector("game-main").STATS.lvlCritEvolve));
      this.shadow.querySelector("#lvl").innerText = document.querySelector("game-main").STATS.lvlCritEvolve;
    }
  }

  CritEv.prototype.costByLvl = function (lvl) {
    return [20000, 2000000, 200000000, 20000000000, Number.POSITIVE_INFINITY][lvl];
  }



  return CritEv;
})()

customElements.define('game-upgardes-crit-evolve', gameUpgradesCritEvolve);

const gameUpgradesAutoClk = (function(){
  const shadowDOM = /*html*/
  `
    <style>
      div {
        box-sizing: border-box;
        background: #aaa;
        border: 1px solid #555;
        border-radius: 5px;
        height: 25px;
        width: 350px;
        padding: 2px;
        user-select: none;
      }
    </style>
    <div>
      Auto clk <span id="lvl">0</span> cost: <span id="cost">5</span>r
    </div>
  `;

  class Auto extends HTMLElement {
    connectedCallback() {
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.innerHTML = shadowDOM;
      this.shadow.querySelector("div").addEventListener("click", ()=>{this.tryUpgrade()});
    }
  }

  Auto.prototype.tryUpgrade = function () {
    if (this.costByLvl(document.querySelector("game-main").STATS.lvlAutoClk) <= document.querySelector("game-main").STATS.money) {
      document.querySelector("game-main").STATS.money -= this.costByLvl(document.querySelector("game-main").STATS.lvlAutoClk);
      document.querySelector("game-main").STATS.lvlAutoClk += 1;
      this.shadow.querySelector("#cost").innerText = new Intl.NumberFormat("ru-RU").format(this.costByLvl(document.querySelector("game-main").STATS.lvlAutoClk));
      this.shadow.querySelector("#lvl").innerText = document.querySelector("game-main").STATS.lvlAutoClk;
    }
  }

  Auto.prototype.costByLvl = function (lvl) {
    return [5, 50, 500, 5000, 50000, 500000, 5000000, 50000000, 500000000, 5000000000, Number.POSITIVE_INFINITY][lvl];
  }



  return Auto;
})()

customElements.define('game-upgardes-autoclk', gameUpgradesAutoClk);

const gameUpgradesFlatDmg = (function(){
  const shadowDOM = /*html*/
  `
    <style>
      div {
        box-sizing: border-box;
        background: #aaa;
        border: 1px solid #555;
        border-radius: 5px;
        height: 25px;
        width: 350px;
        padding: 2px;
        user-select: none;
      }
    </style>
    <div>
      Flat Dmg <span id="lvl">0</span> cost: <span id="cost">100 000</span>r
    </div>
  `;

  class Flat extends HTMLElement {
    connectedCallback() {
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.innerHTML = shadowDOM;
      this.shadow.querySelector("div").addEventListener("click", ()=>{this.tryUpgrade()});
    }
  }

  Flat.prototype.tryUpgrade = function () {
    if (this.costByLvl(document.querySelector("game-main").STATS.lvlFlatDmg) <= document.querySelector("game-main").STATS.money) {
      document.querySelector("game-main").STATS.money -= this.costByLvl(document.querySelector("game-main").STATS.lvlFlatDmg);
      document.querySelector("game-main").STATS.lvlFlatDmg += 1;
      this.shadow.querySelector("#cost").innerText = new Intl.NumberFormat("ru-RU").format(this.costByLvl(document.querySelector("game-main").STATS.lvlFlatDmg));
      this.shadow.querySelector("#lvl").innerText = document.querySelector("game-main").STATS.lvlFlatDmg;
    }
  }

  Flat.prototype.costByLvl = function (lvl) {
    return Math.pow(5,lvl)*100000;
  }



  return Flat;
})()

customElements.define('game-upgardes-flat-dmg', gameUpgradesFlatDmg);