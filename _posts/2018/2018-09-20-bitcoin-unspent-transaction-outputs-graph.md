---
layout: post
title: Visualizing Bitcoin's Unspent Transaction Output
subtitle: UTXO in all it's glory
bigimg: /img/2018/09/utxo_header.jpg
---

About 5 years ago I've created a nice graph of all the bitcoin addresses. I got this graph: 

[![Bitcoin Balances 2014](/img/2018/09/balances_2014.png)](/img/2018/09/balances_2014.png)

A year later I've tried to recreate it, but couldn't because my PC at that time did not have enough RAM for [znort987's parser](https://github.com/znort987/blockparser) that I had used.

Fast forward to September 2018, bitcoin now has an a fantastic simple [REST interface](https://github.com/bitcoin/bitcoin/blob/master/doc/REST-interface.md)! So I've tried again to create an updated graph of all unspent bitcoin transactions. Unfortunately, my previously used [gnuplot script](https://gist.github.com/martinus/03c63c539aea0e1c1e49) didn't cut it any more. Too much RAM useage even for my now 32GB machine. Fortunately, I wrote my own renderer and it turns out that the result looks fantastic.

Without further ado, I give you a graph of all unspent transaction outputs as of [block 542160](https://blockchair.com/bitcoin/block/542160) on September 2018:

Click on the image to see a pixel perfect 4K resolution of the UTXO:

[![Unspent Transaction Outputs September 2018](/img/2018/09/utxo_542160_small.jpg)](/img/2018/09/utxo_542160.png)

I guess it's time for some explanation of the graph.

* x-axis is time. It shows the block height at which an unspent transaction output has been created.
* y-axis is amount. Bottom is 1 satoshi, top is 100 000 Bitcoin. This axis is logarithmic scaled.
* The color of a pixel shows how many unspent transaction outputs are at this blockheight and this amount.

Here is an example. Let's take a [random transaction](https://blockchair.com/bitcoin/transaction/511cf6d3af204205051d8591bcc0cbc12f582bb70fe0289e676eb4bd235a545b). It has created two outputs: 0.66878266 BTC and 0.39275335 BTC at block 242160. These two outputs will be put as 2 pixels on the image, at the same y axis, which will make the color a bit brighter.

I believe this visualization is very interesting as it reveales quite a lot about the history of Bitcoin. E.g. The strong line to the left is at 50 BTC, these have probably been mined by Satoshi Nakamoto and might be lost forever. To the lower left there are a bunch of lines, I believe these are leftovers from the bitcoin fountains which are now mostly extinct. In the middle of the graph you can see periodic vertical lines, these happen about every 8 days or so. Could these be payouts from mining pools? What patterns can you see here?

