---
layout: post
title: Hashmap Benchmarks 2022
subtitle: With lots of benchmarks
cover-img: /img/2022/wanderfalke_edit.jpg
---

It's been over 3 years since I've spent considerable time finding [the best C++ hashmap](/2019/04/01/hashmap-benchmarks-01-overview/). After several requests I finally gave in and redo the benchmark with state of C++ hashmaps as of August 2022. This took much more work than I initially anticipated, mostly due to the fact that benchmarks take a looong time, and writing everything up and creating a representation that is actually useful takes even more time. Thanks everyone who
annoyingly kept asking me for updates :wink:

## Table of Contents

yep.

## Table

<link href="https://unpkg.com/tabulator-tables/dist/css/tabulator_bootstrap5.min.css" rel="stylesheet">
<script type="text/javascript" src="https://unpkg.com/tabulator-tables/dist/js/tabulator.min.js"></script>
<style>
.martinus_wide_child {
  width: 90vw;
  position: relative;
  left: calc(-45vw + 50%);
}
</style>

<div id="table_map_benchmark" class="table-bordered martinus_wide_child">
<script>
var tabledata = [
    {id:1, hm:"fph::DynamicFphMap", h:"std::hash", cpy:3016, ihi:4774, it:3882, rd2:5560, rie:1227, rf200:103, rf2k:100, rf500k:119, ries:622, rfs:227, rfs1m:231, avgn:107, avgs:229, avg:1805},
    {id:2, hm:"ankerl::unordered_dense::map", h:"ankerl::unordered_dense::hash", cpy:100, ihi:134, it:101, rd2:278, rie:148, rf200:147, rf2k:139, rf500k:107, ries:105, rfs:100, rfs1m:138, avgn:131, avgs:119, avg:136},
];
var table = new Tabulator("#table_map_benchmark", {
    data:tabledata,           //load row data from array
    layout:"fitColumns",      //fit columns to width of table
    tooltips:true,            //show tool tips on cells
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    //history:true,             //allow undo and redo actions on the table
    //pagination:"local",       //paginate the data
    //paginationSize:7,         //allow 7 rows per page of data
    //paginationCounter:"rows", //display count of paginated rows in footer
    //movableColumns:true,      //allow column order to be changed
    columnHeaderVertAlign: "bottom", //align header contents to bottom of cell
    initialSort:[             //set the initial sort order of the data
        {column:"avg", dir:"asc"},
    ],
    columnHeaderVertAlign:"bottom", //align header contents to bottom of cell
    columns:[
        {
            columns: [
                {title:"hash map", field:"hm", headerVertical:true},
                {title:"hash", field:"h", headerVertical:true},
            ]
        },
        {
            //title:"",
            columns: [
                {title:"Copy", field:"cpy", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
                {title:"InsertHugeInt", field:"ihi", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
                {title:"Iterate", field:"it", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
            ]
        },
        {
            title:"number",
            headerHozAlign:"center",
            columns:[
                {
                    title: "modify",
                    headerHozAlign:"center",
                    columns: [
                        {title:"RandomDistinct2", field:"rd2", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
                        {title:"RandomInsertErase", field:"rie", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
                    ]
                },
                {
                    title: "find",
                    headerHozAlign:"center",
                    columns: [
                        {title:"RandomFind_200", field:"rf200", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
                        {title:"RandomFind_2000", field:"rf2k", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
                        {title:"RandomFind_500000", field:"rf500k", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
                    ]
                }
            ],
        },
        {
            title:"string",
            headerHozAlign:"center",
            columns:[
                {title:"RandomInsertEraseStrings", field:"ries", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
                {title:"RandomFindString", field:"rfs", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
                {title:"RandomFindString_1000000", field:"rfs1m", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
            ],
        },
        {
            title:"average",
            headerHozAlign:"center",
            columns:[
                {title:"AVG(number find)", field:"avgn", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
                {title:"AVG(string find)", field:"avgs", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
                {title:"AVG", field:"avg", hozAlign:"right", sorter:"number", headerVertical:true, width:65},
            ],
        },        
    ],
});
</script>
