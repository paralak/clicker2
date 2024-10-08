const gameStats = (function(){
  const shadowDOM = /*html*/
  `
    <style>
      * {
        user-select: none;
      }
    </style>
    <ul class="wrapper">
      <li id="money">money: <span>0</span>r</li>
      <li id="orb">orb: <span>0</span>o</li>
      <li id="mpsmain">dps main: <span>0</span></li>
      <li id="mpsauto">dps auto: <span>0</span></li>
      <li id="maxclk">max click damage: <span>0</span></li>
      <li id="basedmg">base dmg: <span>1</span></li>
      <li id="critchance">crit chance: <span>0</span>%</li>
      <li id="critdmg">crit damage: <span>100</span>%</li>
      <li id="flatdmg">flat damage: <span>0</span>%</li>
      <li id="totalclick">total click count: <span>0</span></li>
      </ul>
  `;

  class GameStats extends HTMLElement {
    static observedAttributes = ['money', 'basedmg', 'critchance', 'critdmg', 'flatdmg', 'mpsauto', 'mpsmain', 'maxclk', 'totalclick', 'orb']

    connectedCallback() {
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.innerHTML = shadowDOM;
      this.getRootNode().host.STATS.linkNode = this;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.shadow.querySelector(`#${name} span`).innerText = new Intl.NumberFormat("ru-RU").format(Math.round(newValue*10)/10);
    }
  }

  return GameStats;
})()

customElements.define('game-stats', gameStats);