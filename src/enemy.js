const enemy = (function(){
  const shadowDOM = /*html*/
  `
    <style>
      .enemy {
        width: 250px;
        height: 250px;
        background: #aaa;
        text-align: center;
        user-select: none;
      }
    </style>
    <div id="a" class="enemy">
      <span class="hp">10</span>/<span class="maxhp">10</span>
    </div>
  `;
  
  class Enemy extends HTMLElement {
    maxHP=10
    #HP=10
    id=0
    connectedCallback() {
      this.shadow = this.attachShadow({mode: 'open'});
      this.shadow.innerHTML = shadowDOM;
      this.shadow.addEventListener('click', ()=>{this.onclick()});
    }
    onclick() {
      this.getRootNode().host.onEnemyClick({enemy:this, type:"main"});
    }
    /**
     * @param {number} v
     */
    set HP(v) {
      if (v<=0) {
        this.death();
      } else {
        this.shadow.querySelector(".hp").innerText = v;
        return this.#HP = v;
      }
    }
    get HP() {
      return this.#HP;
    }
    death() {
      document.querySelector("game-main").STATS.money += this.maxHP * document.querySelector("game-main").STATS.enemyReward;
      document.querySelector("game-main").STATS.orb += 1;
      this.id++;
      this.maxHP = 10 + this.id**2 * 10;
      this.shadow.querySelector(".maxhp").innerText = this.maxHP;
      this.HP = this.maxHP;
    }
  }

  return Enemy;
})()

customElements.define('game-enemy', enemy);