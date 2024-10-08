class statsObj {
  /**@type {statsObj} */
  #linkObj = null
  #money = 0
  /**@type {HTMLBaseElement} */
  #linkNode = null
  #lvlBaseDmg = 1
  #baseDmg = 1
  #lvlBaseCrit = 0
  #baseCritAdder = 0
  #baseCritChance = 0
  #lvlCritEvolve = 0
  #lvlFlatDmg = 0
  #lvlAutoClk = 0
  enemyReward = 0.1
  #totalClicks = 0
  #orb = 0


  get money() {
    return this.#money;
  }
  set money(v) {
    if (this.#linkNode)
      this.#linkNode.setAttribute("money", v);
    if (this.#linkObj)
      this.#linkObj.money += v - this.#money;
    return this.#money = v;
  }
  get orb() {
    return this.#orb;
  }
  set orb(v) {
    if (this.#linkNode)
      this.#linkNode.setAttribute("orb", v);
    if (this.#linkObj)
      this.#linkObj.orb += v - this.#orb;
    return this.#orb = v;
  }
  get baseCritAdder() {
    return this.#baseCritAdder;
  }
  set baseCritAdder(v) {
    if (this.#linkNode)
      this.#linkNode.setAttribute("critdmg", (Math.pow(2,this.#lvlCritEvolve)*(v+1))*100);
    if (this.#linkObj)
      this.#linkObj.baseCritAdder += v - this.#baseCritAdder;
    return this.#baseCritAdder = v;
  }
  get baseCritChance() {
    return this.#baseCritChance;
  }
  set baseCritChance(v) {
    if (this.#linkNode)
      this.#linkNode.setAttribute("critchance", (v/Math.pow(2,this.#lvlCritEvolve))*100);
    if (this.#linkObj)
      this.#linkObj.baseCritChance += v - this.#baseCritChance;
    return this.#baseCritChance = v;
  }
  get lvlBaseCrit() {
    return this.#lvlBaseCrit;
  }
  set lvlBaseCrit(v) {
    // if (this.#linkNode)
    //   this.#linkNode.setAttribute("money", v);
    if (this.#linkObj)
      this.#linkObj.lvlBaseCrit += v - this.#lvlBaseCrit;
    return this.#lvlBaseCrit = v;
  }
  get lvlCritEvolve() {
    return this.#lvlCritEvolve;
  }
  set lvlCritEvolve(v) {
    if (this.#linkNode) {
      this.#linkNode.setAttribute("critchance", (this.#baseCritChance/Math.pow(2,v))*100);
      this.#linkNode.setAttribute("critdmg", (Math.pow(2,v)*(this.#baseCritAdder+1))*100);
    }
    if (this.#linkObj)
      this.#linkObj.lvlCritEvolve += v - this.#lvlCritEvolve;
    return this.#lvlCritEvolve = v;
  }
  get lvlBaseDmg() {
    return this.#lvlBaseDmg;
  }
  set lvlBaseDmg(v) {
    if (this.#linkNode && this.#linkNode.updateStats)
      this.#linkNode.updateStats();
    if (this.#linkObj)
      this.#linkObj.lvlBaseDmg += v - this.#lvlBaseDmg;
    return this.#lvlBaseDmg = v;
  }
  get lvlFlatDmg() {
    return this.#lvlFlatDmg;
  }
  set lvlFlatDmg(v) {
    if (this.#linkNode)
      this.#linkNode.setAttribute("flatdmg", v*5+(v>0)*5);
    if (this.#linkObj)
      this.#linkObj.lvlFlatDmg += v - this.#lvlFlatDmg;
    return this.#lvlFlatDmg = v;
  }
  get lvlAutoClk() {
    return this.#lvlAutoClk;
  }
  set lvlAutoClk(v) {
    if (this.#linkNode && this.#linkNode.updateStats)
      this.#linkNode.updateStats();
    if (this.#linkObj)
      this.#linkObj.lvlAutoClk += v - this.#lvlAutoClk;
    return this.#lvlAutoClk = v;
  }
  get baseDmg() {
    return this.#baseDmg;
  }
  set baseDmg(v) {
    if (this.#linkNode)
      this.#linkNode.setAttribute("baseDmg", v);
    if (this.#linkObj)
      this.#linkObj.baseDmg += v - this.#baseDmg;
    return this.#baseDmg = v;
  }
  get linkNode() {
    return this.#linkNode;
  }
  set linkNode(v) {
    v.linkedStatsObj = this;
    return this.#linkNode = v;
  }
  get linkObj() {
    return this.#linkObj;
  }
  /**@param {statsObj} v  */
  set linkObj(v) {
    this.deleteLinkWithObj();
    v.money += this.money;
    v.lvlBaseDmg += this.lvlBaseDmg;
    return this.#linkObj = v;
  }
  get totalClick() {
    return this.#totalClicks;
  }
  set totalClick(v) {
    if (this.#linkNode)
      this.#linkNode.setAttribute("totalclick", v);
    if (this.#linkObj)
      this.#linkObj.totalClick += v - this.#totalClicks;
    return this.#totalClicks = v;
  }
  deleteLinkWithObj() {
    if (!this.#linkObj) return -1;
    this.#linkObj.money -= this.money;
    this.#linkObj.lvlBaseDmg -= this.lvlBaseDmg;
  }
}