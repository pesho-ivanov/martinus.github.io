---
layout: post
title: Visualizing Bitcoin's Unspent Transaction Output
subtitle: UTXO in all it's glory
bigimg: /img/2018/09/utxo_542160_small.jpg
---

About 5 years ago I've created a nice graph of all the bitcoin addresses. I got this graph: 

[![Bitcoin Balances 2014](/img/2018/09/balances_2014.png)](/img/2018/09/balances_2014.png)

A year later I've tried to recreate it, but couldn't because my PC at that time did not have enough RAM for [znort987's parser](https://github.com/znort987/blockparser) that I had used.

Fast forward to September 2018, bitcoin now has an a fantastic simple [REST interface](https://github.com/bitcoin/bitcoin/blob/master/doc/REST-interface.md)! So I've tried again to create an updated graph of all unspent bitcoin transactions. Unfortunately, my previously used [gnuplot script](https://gist.github.com/martinus/03c63c539aea0e1c1e49) didn't cut it any more. Too much RAM useage even for my now 32GB machine. Fortunately, I wrote my own renderer and it turns out that the result looks fantastic.

Without further ado, I give you a graph of all unspent transaction outputs as of [block 542160](https://blockchair.com/bitcoin/block/542160) on September 2018:


[![Unspent Transaction Outputs September 2018](/img/2018/09/utxo_542160.png)](/img/2018/09/utxo_542160_small.jpg)

