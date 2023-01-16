const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parse18 } = require("./helper");

describe("Cero Token", function () {

  beforeEach(async function () {
    let accounts = await ethers.getSigners()
    this.owner = accounts[0];
    this.odko = accounts[1];

    let CeroTokenContract = await ethers.getContractFactory("CeroToken");
    this.token = await CeroTokenContract.deploy();
    await this.token.deployed();
  });

  it("Test Ownership", async function() {
    expect(await this.token.owner(),this.owner.address);
  })

  it("Test Transfer Blacklist", async function() {
    await this.token.mint(this.odko.address,parse18(10));
    await this.token.mint(this.owner.address,parse18(9));

    expect(await this.token.balanceOf(this.odko.address),parse18(10));
    expect(await this.token.balanceOf(this.owner.address),parse18(10));

    await this.token.transfer(this.odko.address,parse18(5));
    expect(await this.token.balanceOf(this.odko.address),parse18(15));

    await this.token.connect(this.odko).transfer(this.owner.address,parse18(5));
    expect(await this.token.balanceOf(this.odko.address),parse18(10));

    await this.token.transferBlackListUpdate(this.odko.address,true);
    expect(await this.token.transferBlacklist(this.odko.address),true);

    await expect(this.token.transfer(this.odko.address,parse18(0.5))).to.be.revertedWith("TO ADDRESS BLACKLISTED");
    await expect(this.token.connect(this.odko).transfer(this.owner.address,parse18(0.5))).to.be.revertedWith("FROM ADDRESS BLACKLISTED");
  })

})
