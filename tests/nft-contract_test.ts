import { Clarinet, Tx, Chain, Account } from "clarinet-sdk";
import { assertEquals, assertTrue } from "testing/asserts";

Clarinet.test({
  name: "NFT minting and transfer test",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    const owner = accounts.get("deployer")!.address;
    const user1 = accounts.get("wallet_1")!.address;
    const user2 = accounts.get("wallet_2")!.address;

    // Mint NFT for user1
    let block = chain.mineBlock([
      Tx.contractCall("nft-contract", "mint", [user1, '"ipfs://QmTestHash1"'], owner),
    ]);
    assertEquals(block.receipts[0].result, "(ok u1)");

    // Owner of token 1 is user1
    block = chain.mineBlock([
      Tx.contractCall("nft-contract", "get-owner", ["u1"], user1),
    ]);
    assertEquals(block.receipts[0].result, `(ok '${user1})`);

    // Transfer token 1 from user1 to user2
    block = chain.mineBlock([
      Tx.contractCall("nft-contract", "transfer", ["u1", user1, user2], user1),
    ]);
    assertEquals(block.receipts[0].result, "(ok true)");

    // Owner of token 1 is now user2
    block = chain.mineBlock([
      Tx.contractCall("nft-contract", "get-owner", ["u1"], user2),
    ]);
    assertEquals(block.receipts[0].result, `(ok '${user2})`);
  },
});