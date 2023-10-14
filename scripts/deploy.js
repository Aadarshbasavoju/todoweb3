const hre = require("hardhat");

async function main() {


  const ToDolist = await hre.ethers.getContractFactory("ToDolist");
  const toDolist = await ToDolist.deploy();

  await toDolist.deployed();

  console.log("ToDolist with 1 ETH deployed to:", toDolist.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});