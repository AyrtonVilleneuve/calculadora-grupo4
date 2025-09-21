// src/calc.js
function soma(a, b) { return Number(a) + Number(b); }
function sub(a, b)  { return Number(a) - Number(b); }
function mul(a, b)  { return Number(a) * Number(b); }
function div(a, b)  { return Number(a) / Number(b); }

// exporta para o Node (Jest)
module.exports = { soma, sub, mul, div };
