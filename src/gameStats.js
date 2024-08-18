const gameStats = (function(){
  const shadowDOM = /*html*/
  `
    <style>
      * {
        user-select: none;
      }
    </style>
    <ul class="wrapper">
      <li id="money">money: <span>0</span></li>
      <li id="basedmg">base dmg: <span>1</span></li>
      <li id="critchance">crit chance: <span>0</span>%</li>
      <li id="critdmg">crit damage: <span>100</span>%</li>
    </ul>
  `;

  class GameStats extends HTMLElement {
    static observedAttributes = ['money', 'basedmg', 'critchance', 'critdmg']

    connectedCallback() {
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.innerHTML = shadowDOM;
      const moneyAttr = document.createAttribute('money');
      moneyAttr.value = 0;
      this.attributes.setNamedItem(moneyAttr);
      this.getRootNode().host.STATS.linkNode = this;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.shadow.querySelector(`#${name} span`).innerText = Math.round(newValue*10)/10;
    }
  }

  return GameStats;
})()

customElements.define('game-stats', gameStats);