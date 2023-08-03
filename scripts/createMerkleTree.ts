const { StandardMerkleTree } = require('@openzeppelin/merkle-tree')
const fs = require('fs')

const chipDatav2 = JSON.parse(fs.readFileSync('./public/lizards-v2.json', 'utf-8'))
const chipDatav1 = JSON.parse(fs.readFileSync('./public/lizards.json', 'utf-8'))
const chipData = { ...chipDatav1, ...chipDatav2 }

console.log(chipData)

const chips = Object.keys(chipData).map((key: any) => [chipData[key].address])

console.log(chips.length)

const tree = StandardMerkleTree.of(chips, ['address'])

console.log('Merkle Root:', tree.root)

fs.writeFileSync('./public/lizardTree-v2.json', JSON.stringify(tree.dump()))
