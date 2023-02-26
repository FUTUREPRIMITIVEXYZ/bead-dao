import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import fs from "fs";

const chipData = JSON.parse(fs.readFileSync("./public/lizards.json", "utf-8"));

const chips = Object.keys(chipData).map((key) => [chipData[key].address]);

const tree = StandardMerkleTree.of(chips, ["address"]);

console.log("Merkle Root:", tree.root);

fs.writeFileSync("./public/lizardTree.json", JSON.stringify(tree.dump()));
