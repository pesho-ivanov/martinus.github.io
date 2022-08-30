var tabledata = [
    {id:1, hm:"absl::flat_hash_map", urlHm:"#absl__flat_hash_map", h:"absl::Hash", mem:167, cpy:1922, ihi:226, it:1114, rd2:242, rie:148, rf200:163, rf2k:160, rf500k:107, ries:118, rfs:110, rfs1m:206, avgn:141, avgs:151, avg:230},
    {id:2, hm:"absl::flat_hash_map", urlHm:"#absl__flat_hash_map", h:"ankerl::unordered_dense::hash", mem:167, cpy:1909, ihi:228, it:1116, rd2:244, rie:141, rf200:155, rf2k:153, rf500k:105, ries:119, rfs:113, rfs1m:206, avgn:135, avgs:152, avg:227},
    {id:3, hm:"absl::flat_hash_map", urlHm:"#absl__flat_hash_map", h:"boost::hash", mem:"-", cpy:1847, ihi:"-", it:1121, rd2:"-", rie:"-", rf200:1600, rf2k:"-", rf500k:"-", ries:294, rfs:497, rfs1m:225, avgn:"-", avgs:334, avg:"-"},
    {id:4, hm:"absl::flat_hash_map", urlHm:"#absl__flat_hash_map", h:"mumx", mem:167, cpy:1920, ihi:227, it:1121, rd2:242, rie:140, rf200:156, rf2k:154, rf500k:105, ries:125, rfs:128, rfs1m:136, avgn:136, avgs:132, avg:223},
    {id:5, hm:"absl::flat_hash_map", urlHm:"#absl__flat_hash_map", h:"robin_hood::hash", mem:167, cpy:1941, ihi:226, it:1166, rd2:243, rie:154, rf200:167, rf2k:164, rf500k:111, ries:122, rfs:118, rfs1m:127, avgn:145, avgs:123, avg:226},
    {id:6, hm:"absl::flat_hash_map", urlHm:"#absl__flat_hash_map", h:"std::hash", mem:"-", cpy:1859, ihi:"-", it:1112, rd2:"-", rie:"-", rf200:1598, rf2k:"-", rf500k:"-", ries:125, rfs:128, rfs1m:136, avgn:"-", avgs:132, avg:"-"},
    {id:7, hm:"absl::node_hash_map", urlHm:"#absl__node_hash_map", h:"absl::Hash", mem:435, cpy:4274, ihi:575, it:1163, rd2:715, rie:224, rf200:158, rf2k:154, rf500k:113, ries:131, rfs:109, rfs1m:178, avgn:140, avgs:139, avg:325},
    {id:8, hm:"absl::node_hash_map", urlHm:"#absl__node_hash_map", h:"ankerl::unordered_dense::hash", mem:435, cpy:4228, ihi:572, it:1200, rd2:710, rie:219, rf200:162, rf2k:158, rf500k:113, ries:130, rfs:114, rfs1m:176, avgn:142, avgs:141, avg:327},
    {id:9, hm:"absl::node_hash_map", urlHm:"#absl__node_hash_map", h:"boost::hash", mem:"-", cpy:4098, ihi:"-", it:1224, rd2:"-", rie:"-", rf200:1514, rf2k:"-", rf500k:"-", ries:308, rfs:498, rfs1m:199, avgn:"-", avgs:315, avg:"-"},
    {id:10, hm:"absl::node_hash_map", urlHm:"#absl__node_hash_map", h:"mumx", mem:435, cpy:4169, ihi:575, it:1188, rd2:714, rie:215, rf200:150, rf2k:147, rf500k:110, ries:137, rfs:127, rfs1m:126, avgn:134, avgs:127, avg:317},
    {id:11, hm:"absl::node_hash_map", urlHm:"#absl__node_hash_map", h:"robin_hood::hash", mem:435, cpy:4238, ihi:578, it:1197, rd2:716, rie:244, rf200:164, rf2k:163, rf500k:118, ries:134, rfs:116, rfs1m:115, avgn:147, avgs:115, avg:322},
    {id:12, hm:"absl::node_hash_map", urlHm:"#absl__node_hash_map", h:"std::hash", mem:"-", cpy:4143, ihi:"-", it:1185, rd2:"-", rie:"-", rf200:1501, rf2k:"-", rf500k:"-", ries:137, rfs:127, rfs1m:123, avgn:"-", avgs:125, avg:"-"},
    {id:13, hm:"ankerl::unordered_dense::map", h:"absl::Hash", mem:199, cpy:100, ihi:140, it:100, rd2:261, rie:170, rf200:154, rf2k:149, rf500k:120, ries:108, rfs:104, rfs1m:141, avgn:140, avgs:121, avg:139},
    {id:14, hm:"ankerl::unordered_dense::map", h:"ankerl::unordered_dense::hash", mem:199, cpy:100, ihi:134, it:101, rd2:278, rie:148, rf200:147, rf2k:139, rf500k:107, ries:105, rfs:100, rfs1m:138, avgn:130, avgs:117, avg:134},
    {id:15, hm:"ankerl::unordered_dense::map", h:"boost::hash", mem:198, cpy:100, ihi:136, it:100, rd2:279, rie:146, rf200:142, rf2k:134, rf500k:108, ries:322, rfs:496, rfs1m:174, avgn:127, avgs:294, avg:171},
    {id:16, hm:"ankerl::unordered_dense::map", h:"mumx", mem:199, cpy:100, ihi:139, it:100, rd2:260, rie:157, rf200:147, rf2k:142, rf500k:111, ries:120, rfs:121, rfs1m:109, avgn:132, avgs:115, avg:136},
    {id:17, hm:"ankerl::unordered_dense::map", h:"robin_hood::hash", mem:199, cpy:100, ihi:140, it:100, rd2:259, rie:172, rf200:163, rf2k:156, rf500k:119, ries:115, rfs:115, rfs1m:104, avgn:145, avgs:110, avg:139},
    {id:18, hm:"ankerl::unordered_dense::map", h:"std::hash", mem:199, cpy:100, ihi:133, it:100, rd2:280, rie:145, rf200:142, rf2k:134, rf500k:108, ries:120, rfs:121, rfs1m:110, avgn:127, avgs:115, avg:135},
    {id:19, hm:"boost::multi_index::hashed_unique", h:"absl::Hash", mem:370, cpy:10105, ihi:505, it:5430, rd2:675, rie:316, rf200:181, rf2k:217, rf500k:232, ries:180, rfs:169, rfs1m:295, avgn:209, avgs:223, avg:487},
    {id:20, hm:"boost::multi_index::hashed_unique", h:"ankerl::unordered_dense::hash", mem:370, cpy:9012, ihi:507, it:5418, rd2:671, rie:312, rf200:181, rf2k:216, rf500k:232, ries:180, rfs:175, rfs1m:283, avgn:209, avgs:223, avg:481},
    {id:21, hm:"boost::multi_index::hashed_unique", h:"boost::hash", mem:370, cpy:10036, ihi:500, it:5438, rd2:547, rie:336, rf200:162, rf2k:190, rf500k:216, ries:322, rfs:562, rfs1m:320, avgn:188, avgs:424, avg:547},
    {id:22, hm:"boost::multi_index::hashed_unique", h:"mumx", mem:370, cpy:9492, ihi:505, it:5423, rd2:674, rie:311, rf200:159, rf2k:190, rf500k:220, ries:188, rfs:192, rfs1m:210, avgn:188, avgs:201, avg:465},
    {id:23, hm:"boost::multi_index::hashed_unique", h:"robin_hood::hash", mem:370, cpy:10001, ihi:504, it:5421, rd2:669, rie:314, rf200:185, rf2k:223, rf500k:233, ries:184, rfs:191, rfs1m:207, avgn:213, avgs:199, avg:480},
    {id:24, hm:"boost::multi_index::hashed_unique", h:"std::hash", mem:370, cpy:9401, ihi:500, it:5428, rd2:548, rie:326, rf200:152, rf2k:188, rf500k:210, ries:188, rfs:192, rfs1m:211, avgn:182, avgs:201, avg:454},
    {id:25, hm:"boost::unordered_map 1_80", h:"absl::Hash", mem:374, cpy:2514, ihi:527, it:1712, rd2:746, rie:227, rf200:187, rf2k:356, rf500k:191, ries:155, rfs:154, rfs1m:282, avgn:233, avgs:209, avg:390},
    {id:26, hm:"boost::unordered_map 1_80", h:"ankerl::unordered_dense::hash", mem:374, cpy:2497, ihi:526, it:1717, rd2:744, rie:232, rf200:148, rf2k:169, rf500k:187, ries:158, rfs:172, rfs1m:280, avgn:167, avgs:220, avg:363},
    {id:27, hm:"boost::unordered_map 1_80", h:"boost::hash", mem:374, cpy:2513, ihi:521, it:1724, rd2:705, rie:876, rf200:130, rf2k:154, rf500k:177, ries:297, rfs:555, rfs1m:311, avgn:152, avgs:415, avg:462},
    {id:28, hm:"boost::unordered_map 1_80", h:"mumx", mem:374, cpy:2530, ihi:525, it:1725, rd2:742, rie:227, rf200:160, rf2k:184, rf500k:190, ries:158, rfs:185, rfs1m:197, avgn:177, avgs:191, avg:359},
    {id:29, hm:"boost::unordered_map 1_80", h:"robin_hood::hash", mem:374, cpy:2542, ihi:527, it:1696, rd2:745, rie:233, rf200:152, rf2k:183, rf500k:202, ries:155, rfs:182, rfs1m:198, avgn:178, avgs:190, avg:359},
    {id:30, hm:"boost::unordered_map 1_80", h:"std::hash", mem:374, cpy:2500, ihi:524, it:1724, rd2:707, rie:827, rf200:130, rf2k:154, rf500k:180, ries:158, rfs:188, rfs1m:201, avgn:154, avgs:194, avg:385},
    {id:31, hm:"boost::unordered_map PoolAllocator 1_80", h:"absl::Hash", mem:226, cpy:1279, ihi:330, it:1692, rd2:437, rie:187, rf200:166, rf2k:345, rf500k:180, ries:156, rfs:160, rfs1m:267, avgn:218, avgs:207, avg:314},
    {id:32, hm:"boost::unordered_map PoolAllocator 1_80", h:"ankerl::unordered_dense::hash", mem:226, cpy:1250, ihi:330, it:1724, rd2:436, rie:183, rf200:137, rf2k:165, rf500k:177, ries:156, rfs:182, rfs1m:268, avgn:159, avgs:221, avg:292},
    {id:33, hm:"boost::unordered_map PoolAllocator 1_80", h:"boost::hash", mem:226, cpy:1235, ihi:329, it:1719, rd2:395, rie:757, rf200:157, rf2k:337, rf500k:177, ries:299, rfs:565, rfs1m:295, avgn:211, avgs:408, avg:409},
    {id:34, hm:"boost::unordered_map PoolAllocator 1_80", h:"mumx", mem:226, cpy:1271, ihi:330, it:1705, rd2:434, rie:186, rf200:141, rf2k:177, rf500k:181, ries:159, rfs:195, rfs1m:189, avgn:165, avgs:192, avg:289},
    {id:35, hm:"boost::unordered_map PoolAllocator 1_80", h:"robin_hood::hash", mem:226, cpy:1278, ihi:335, it:1694, rd2:442, rie:188, rf200:148, rf2k:168, rf500k:185, ries:155, rfs:189, rfs1m:183, avgn:166, avgs:186, avg:289},
    {id:36, hm:"boost::unordered_map PoolAllocator 1_80", h:"std::hash", mem:226, cpy:1239, ihi:329, it:1689, rd2:395, rie:771, rf200:130, rf2k:151, rf500k:168, ries:159, rfs:196, rfs1m:190, avgn:149, avgs:193, avg:314},
    {id:37, hm:"boost::unordered_map unsynchronized_pool_resource 1_80", h:"absl::Hash", mem:235, cpy:2242, ihi:363, it:1684, rd2:506, rie:206, rf200:149, rf2k:180, rf500k:191, ries:162, rfs:167, rfs1m:292, avgn:173, avgs:221, avg:325},
    {id:38, hm:"boost::unordered_map unsynchronized_pool_resource 1_80", h:"ankerl::unordered_dense::hash", mem:235, cpy:2234, ihi:359, it:1692, rd2:510, rie:207, rf200:138, rf2k:168, rf500k:187, ries:162, rfs:192, rfs1m:293, avgn:163, avgs:237, avg:324},
    {id:39, hm:"boost::unordered_map unsynchronized_pool_resource 1_80", h:"boost::hash", mem:235, cpy:2243, ihi:360, it:1697, rd2:479, rie:854, rf200:156, rf2k:338, rf500k:187, ries:305, rfs:574, rfs1m:320, avgn:214, avgs:429, avg:452},
    {id:40, hm:"boost::unordered_map unsynchronized_pool_resource 1_80", h:"mumx", mem:235, cpy:2243, ihi:362, it:1773, rd2:505, rie:205, rf200:148, rf2k:176, rf500k:192, ries:166, rfs:202, rfs1m:202, avgn:171, avgs:202, avg:321},
    {id:41, hm:"boost::unordered_map unsynchronized_pool_resource 1_80", h:"robin_hood::hash", mem:235, cpy:2259, ihi:357, it:1749, rd2:508, rie:209, rf200:148, rf2k:172, rf500k:194, ries:161, rfs:198, rfs1m:198, avgn:170, avgs:198, avg:319},
    {id:42, hm:"boost::unordered_map unsynchronized_pool_resource 1_80", h:"std::hash", mem:235, cpy:2248, ihi:361, it:1774, rd2:468, rie:819, rf200:130, rf2k:153, rf500k:179, ries:165, rfs:206, rfs1m:204, avgn:153, avgs:205, avg:348},
    {id:43, hm:"emhash7::HashMap", h:"absl::Hash", mem:226, cpy:583, ihi:106, it:310, rd2:129, rie:108, rf200:153, rf2k:149, rf500k:139, ries:126, rfs:143, rfs1m:233, avgn:147, avgs:182, avg:175},
    {id:44, hm:"emhash7::HashMap", h:"ankerl::unordered_dense::hash", mem:226, cpy:583, ihi:104, it:307, rd2:125, rie:107, rf200:121, rf2k:121, rf500k:129, ries:125, rfs:161, rfs1m:233, avgn:123, avgs:194, avg:168},
    {id:45, hm:"emhash7::HashMap", h:"boost::hash", mem:226, cpy:583, ihi:101, it:312, rd2:101, rie:"-", rf200:2589, rf2k:"-", rf500k:"-", ries:324, rfs:545, rfs1m:263, avgn:"-", avgs:378, avg:"-"},
    {id:46, hm:"emhash7::HashMap", h:"mumx", mem:226, cpy:582, ihi:102, it:313, rd2:124, rie:107, rf200:123, rf2k:124, rf500k:131, ries:136, rfs:175, rfs1m:159, avgn:126, avgs:167, avg:166},
    {id:47, hm:"emhash7::HashMap", h:"robin_hood::hash", mem:226, cpy:582, ihi:108, it:312, rd2:130, rie:124, rf200:136, rf2k:135, rf500k:137, ries:133, rfs:169, rfs1m:163, avgn:136, avgs:166, avg:172},
    {id:48, hm:"emhash7::HashMap", h:"std::hash", mem:226, cpy:582, ihi:100, it:310, rd2:100, rie:"-", rf200:2617, rf2k:"-", rf500k:"-", ries:135, rfs:173, rfs1m:159, avgn:"-", avgs:166, avg:"-"},
    {id:49, hm:"emhash8::HashMap", h:"absl::Hash", mem:172, cpy:231, ihi:150, it:111, rd2:289, rie:145, rf200:137, rf2k:130, rf500k:118, ries:130, rfs:100, rfs1m:133, avgn:128, avgs:115, avg:147},
    {id:50, hm:"emhash8::HashMap", h:"ankerl::unordered_dense::hash", mem:172, cpy:231, ihi:150, it:111, rd2:288, rie:136, rf200:139, rf2k:130, rf500k:112, ries:127, rfs:103, rfs1m:134, avgn:126, avgs:118, avg:146},
    {id:51, hm:"emhash8::HashMap", h:"boost::hash", mem:172, cpy:231, ihi:144, it:118, rd2:289, rie:"-", rf200:2219, rf2k:"-", rf500k:"-", ries:372, rfs:493, rfs1m:164, avgn:"-", avgs:285, avg:"-"},
    {id:52, hm:"emhash8::HashMap", h:"mumx", mem:172, cpy:231, ihi:150, it:114, rd2:289, rie:139, rf200:128, rf2k:120, rf500k:111, ries:145, rfs:120, rfs1m:100, avgn:119, avgs:109, avg:144},
    {id:53, hm:"emhash8::HashMap", h:"robin_hood::hash", mem:172, cpy:231, ihi:154, it:111, rd2:291, rie:152, rf200:163, rf2k:158, rf500k:129, ries:141, rfs:120, rfs1m:102, avgn:149, avgs:111, avg:154},
    {id:54, hm:"emhash8::HashMap", h:"std::hash", mem:172, cpy:231, ihi:142, it:111, rd2:285, rie:"-", rf200:2200, rf2k:"-", rf500k:"-", ries:145, rfs:120, rfs1m:103, avgn:"-", avgs:111, avg:"-"},
    {id:55, hm:"folly::F14NodeMap", h:"absl::Hash", mem:419, cpy:2216, ihi:441, it:1529, rd2:568, rie:224, rf200:175, rf2k:166, rf500k:114, ries:115, rfs:101, rfs1m:170, avgn:149, avgs:131, avg:299},
    {id:56, hm:"folly::F14NodeMap", h:"ankerl::unordered_dense::hash", mem:419, cpy:2157, ihi:446, it:1470, rd2:572, rie:223, rf200:168, rf2k:164, rf500k:113, ries:117, rfs:115, rfs1m:172, avgn:146, avgs:141, avg:301},
    {id:57, hm:"folly::F14NodeMap", h:"boost::hash", mem:416, cpy:2119, ihi:444, it:1549, rd2:570, rie:215, rf200:151, rf2k:147, rf500k:107, ries:258, rfs:496, rfs1m:187, avgn:134, avgs:305, avg:357},
    {id:58, hm:"folly::F14NodeMap", h:"mumx", mem:418, cpy:2161, ihi:440, it:1479, rd2:568, rie:224, rf200:167, rf2k:160, rf500k:112, ries:122, rfs:125, rfs1m:114, avgn:144, avgs:119, avg:292},
    {id:59, hm:"folly::F14NodeMap", h:"robin_hood::hash", mem:416, cpy:2181, ihi:443, it:1547, rd2:569, rie:225, rf200:189, rf2k:181, rf500k:121, ries:118, rfs:111, rfs1m:103, avgn:161, avgs:107, avg:296},
    {id:60, hm:"folly::F14NodeMap", h:"std::hash", mem:416, cpy:2133, ihi:437, it:1549, rd2:570, rie:214, rf200:152, rf2k:147, rf500k:108, ries:118, rfs:120, rfs1m:110, avgn:134, avgs:115, avg:284},
    {id:61, hm:"folly::F14ValueMap", h:"absl::Hash", mem:149, cpy:668, ihi:210, it:1462, rd2:234, rie:171, rf200:179, rf2k:171, rf500k:122, ries:117, rfs:111, rfs1m:243, avgn:155, avgs:164, avg:222},
    {id:62, hm:"folly::F14ValueMap", h:"ankerl::unordered_dense::hash", mem:149, cpy:668, ihi:210, it:1463, rd2:233, rie:171, rf200:167, rf2k:163, rf500k:119, ries:119, rfs:130, rfs1m:241, avgn:148, avgs:177, avg:222},
    {id:63, hm:"folly::F14ValueMap", h:"boost::hash", mem:149, cpy:668, ihi:209, it:1456, rd2:232, rie:167, rf200:144, rf2k:142, rf500k:111, ries:255, rfs:511, rfs1m:257, avgn:131, avgs:363, avg:258},
    {id:64, hm:"folly::F14ValueMap", h:"mumx", mem:149, cpy:665, ihi:209, it:1451, rd2:233, rie:174, rf200:168, rf2k:161, rf500k:117, ries:120, rfs:140, rfs1m:153, avgn:147, avgs:146, avg:215},
    {id:65, hm:"folly::F14ValueMap", h:"robin_hood::hash", mem:149, cpy:664, ihi:211, it:1451, rd2:235, rie:173, rf200:187, rf2k:179, rf500k:125, ries:117, rfs:125, rfs1m:142, avgn:161, avgs:133, avg:217},
    {id:66, hm:"folly::F14ValueMap", h:"std::hash", mem:149, cpy:664, ihi:217, it:1448, rd2:231, rie:164, rf200:146, rf2k:152, rf500k:112, ries:118, rfs:135, rfs1m:148, avgn:135, avgs:142, avg:209},
    {id:67, hm:"fph::DynamicFphMap", h:"absl::Hash", mem:978, cpy:3247, ihi:4556, it:3876, rd2:5963, rie:1388, rf200:127, rf2k:130, rf500k:134, ries:604, rfs:162, rfs1m:355, avgn:130, avgs:240, avg:757},
    {id:68, hm:"fph::DynamicFphMap", h:"ankerl::unordered_dense::hash", mem:978, cpy:3257, ihi:4596, it:3857, rd2:6440, rie:1357, rf200:117, rf2k:117, rf500k:124, ries:590, rfs:208, rfs1m:349, avgn:119, avgs:269, avg:758},
    {id:69, hm:"fph::DynamicFphMap", h:"boost::hash", mem:978, cpy:3101, ihi:4291, it:3906, rd2:4832, rie:1361, rf200:105, rf2k:115, rf500k:119, ries:1055, rfs:606, rfs1m:384, avgn:113, avgs:482, avg:837},
    {id:70, hm:"fph::DynamicFphMap", h:"mumx", mem:978, cpy:3175, ihi:4514, it:3860, rd2:6120, rie:1395, rf200:124, rf2k:127, rf500k:126, ries:621, rfs:227, rfs1m:243, avgn:125, avgs:235, avg:749},
    {id:71, hm:"fph::DynamicFphMap", h:"robin_hood::hash", mem:978, cpy:3228, ihi:4419, it:3896, rd2:5973, rie:1388, rf200:128, rf2k:140, rf500k:133, ries:615, rfs:204, rfs1m:224, avgn:134, avgs:214, avg:747},
    {id:72, hm:"fph::DynamicFphMap", h:"std::hash", mem:"-", cpy:3016, ihi:4774, it:3882, rd2:5560, rie:1227, rf200:103, rf2k:100, rf500k:119, ries:622, rfs:227, rfs1m:231, avgn:107, avgs:229, avg:"-"},
    {id:73, hm:"gtl::btree_map", h:"ankerl::unordered_dense::hash", mem:100, cpy:755, ihi:704, it:581, rd2:699, rie:626, rf200:464, rf2k:1229, rf500k:967, ries:783, rfs:1273, rfs1m:1437, avgn:820, avgs:1353, avg:685},
    {id:74, hm:"gtl::btree_map", h:"boost::hash", mem:100, cpy:760, ihi:704, it:583, rd2:699, rie:627, rf200:464, rf2k:1228, rf500k:967, ries:787, rfs:1270, rfs1m:1417, avgn:820, avgs:1342, avg:685},
    {id:75, hm:"gtl::btree_map", h:"std::hash", mem:100, cpy:756, ihi:701, it:622, rd2:692, rie:623, rf200:463, rf2k:1226, rf500k:967, ries:779, rfs:1272, rfs1m:1445, avgn:819, avgs:1355, avg:688},
    {id:76, hm:"gtl::flat_hash_map", h:"absl::Hash", mem:167, cpy:1354, ihi:236, it:1036, rd2:240, rie:132, rf200:170, rf2k:176, rf500k:110, ries:113, rfs:110, rfs1m:208, avgn:149, avgs:151, avg:223},
    {id:77, hm:"gtl::flat_hash_map", h:"ankerl::unordered_dense::hash", mem:167, cpy:1277, ihi:234, it:1063, rd2:241, rie:145, rf200:177, rf2k:179, rf500k:107, ries:112, rfs:115, rfs1m:204, avgn:150, avgs:153, avg:224},
    {id:78, hm:"gtl::flat_hash_map", h:"boost::hash", mem:167, cpy:1249, ihi:232, it:1015, rd2:238, rie:123, rf200:156, rf2k:154, rf500k:100, ries:286, rfs:495, rfs1m:223, avgn:134, avgs:333, avg:263},
    {id:79, hm:"gtl::flat_hash_map", h:"mumx", mem:167, cpy:1277, ihi:234, it:1048, rd2:240, rie:143, rf200:162, rf2k:159, rf500k:103, ries:118, rfs:126, rfs1m:136, avgn:138, avgs:131, avg:215},
    {id:80, hm:"gtl::flat_hash_map", h:"robin_hood::hash", mem:167, cpy:1383, ihi:235, it:1048, rd2:241, rie:139, rf200:180, rf2k:175, rf500k:112, ries:116, rfs:125, rfs1m:139, avgn:152, avgs:132, avg:221},
    {id:81, hm:"gtl::flat_hash_map", h:"std::hash", mem:167, cpy:1261, ihi:229, it:1087, rd2:236, rie:123, rf200:157, rf2k:155, rf500k:100, ries:117, rfs:126, rfs1m:135, avgn:134, avgs:130, avg:210},
    {id:82, hm:"gtl::node_hash_map", h:"absl::Hash", mem:435, cpy:2700, ihi:564, it:1064, rd2:706, rie:209, rf200:168, rf2k:167, rf500k:119, ries:124, rfs:110, rfs1m:178, avgn:149, avgs:140, avg:312},
    {id:83, hm:"gtl::node_hash_map", h:"ankerl::unordered_dense::hash", mem:435, cpy:2672, ihi:556, it:1141, rd2:700, rie:210, rf200:172, rf2k:170, rf500k:118, ries:123, rfs:115, rfs1m:174, avgn:151, avgs:141, avg:314},
    {id:84, hm:"gtl::node_hash_map", h:"boost::hash", mem:433, cpy:2643, ihi:551, it:1087, rd2:696, rie:195, rf200:151, rf2k:148, rf500k:106, ries:298, rfs:495, rfs1m:193, avgn:133, avgs:309, avg:369},
    {id:85, hm:"gtl::node_hash_map", h:"mumx", mem:431, cpy:2687, ihi:563, it:1045, rd2:705, rie:208, rf200:172, rf2k:166, rf500k:118, ries:129, rfs:126, rfs1m:122, avgn:150, avgs:124, avg:306},
    {id:86, hm:"gtl::node_hash_map", h:"robin_hood::hash", mem:426, cpy:2716, ihi:566, it:1087, rd2:706, rie:212, rf200:185, rf2k:183, rf500k:124, ries:127, rfs:123, rfs1m:123, avgn:161, avgs:123, avg:313},
    {id:87, hm:"gtl::node_hash_map", h:"std::hash", mem:433, cpy:2642, ihi:556, it:1099, rd2:700, rie:191, rf200:150, rf2k:147, rf500k:106, ries:129, rfs:126, rfs1m:122, avgn:132, avgs:124, avg:295},
    {id:88, hm:"gtl::parallel_flat_hash_map", h:"absl::Hash", mem:130, cpy:1066, ihi:219, it:1151, rd2:233, rie:147, rf200:248, rf2k:234, rf500k:136, ries:118, rfs:119, rfs1m:223, avgn:199, avgs:163, avg:236},
    {id:89, hm:"gtl::parallel_flat_hash_map", h:"ankerl::unordered_dense::hash", mem:123, cpy:980, ihi:218, it:1059, rd2:231, rie:154, rf200:243, rf2k:237, rf500k:138, ries:118, rfs:124, rfs1m:214, avgn:199, avgs:163, avg:232},
    {id:90, hm:"gtl::parallel_flat_hash_map", h:"boost::hash", mem:117, cpy:957, ihi:216, it:1137, rd2:232, rie:137, rf200:202, rf2k:198, rf500k:122, ries:290, rfs:506, rfs1m:233, avgn:170, avgs:343, avg:269},
    {id:91, hm:"gtl::parallel_flat_hash_map", h:"mumx", mem:123, cpy:979, ihi:218, it:1099, rd2:232, rie:150, rf200:242, rf2k:238, rf500k:138, ries:126, rfs:135, rfs1m:144, avgn:199, avgs:139, avg:228},
    {id:92, hm:"gtl::parallel_flat_hash_map", h:"robin_hood::hash", mem:123, cpy:1082, ihi:218, it:1104, rd2:234, rie:150, rf200:251, rf2k:236, rf500k:135, ries:120, rfs:135, rfs1m:155, avgn:200, avgs:144, avg:231},
    {id:93, hm:"gtl::parallel_flat_hash_map", h:"std::hash", mem:117, cpy:954, ihi:217, it:1068, rd2:231, rie:137, rf200:200, rf2k:194, rf500k:122, ries:126, rfs:135, rfs1m:143, avgn:168, avgs:139, avg:214},
    {id:94, hm:"gtl::parallel_node_hash_map", h:"absl::Hash", mem:412, cpy:2711, ihi:588, it:1139, rd2:784, rie:222, rf200:244, rf2k:234, rf500k:149, ries:133, rfs:119, rfs1m:191, avgn:204, avgs:151, avg:350},
    {id:95, hm:"gtl::parallel_node_hash_map", h:"ankerl::unordered_dense::hash", mem:411, cpy:2666, ihi:583, it:1140, rd2:767, rie:220, rf200:226, rf2k:217, rf500k:140, ries:134, rfs:124, rfs1m:183, avgn:190, avgs:151, avg:342},
    {id:96, hm:"gtl::parallel_node_hash_map", h:"boost::hash", mem:411, cpy:2634, ihi:577, it:1090, rd2:726, rie:213, rf200:201, rf2k:195, rf500k:132, ries:308, rfs:506, rfs1m:204, avgn:173, avgs:321, avg:401},
    {id:97, hm:"gtl::parallel_node_hash_map", h:"mumx", mem:409, cpy:2655, ihi:582, it:1115, rd2:798, rie:222, rf200:225, rf2k:217, rf500k:140, ries:143, rfs:138, rfs1m:131, avgn:189, avgs:135, avg:338},
    {id:98, hm:"gtl::parallel_node_hash_map", h:"robin_hood::hash", mem:409, cpy:2701, ihi:589, it:1136, rd2:787, rie:227, rf200:251, rf2k:244, rf500k:148, ries:137, rfs:135, rfs1m:133, avgn:208, avgs:134, avg:346},
    {id:99, hm:"gtl::parallel_node_hash_map", h:"std::hash", mem:411, cpy:2641, ihi:584, it:1136, rd2:726, rie:212, rf200:199, rf2k:201, rf500k:133, ries:142, rfs:138, rfs1m:130, avgn:175, avgs:134, avg:327},
    {id:100, hm:"jg::dense_hash_map", h:"absl::Hash", mem:299, cpy:265, ihi:185, it:127, rd2:323, rie:158, rf200:113, rf2k:115, rf500k:147, ries:148, rfs:148, rfs1m:255, avgn:124, avgs:194, avg:178},
    {id:101, hm:"jg::dense_hash_map", h:"ankerl::unordered_dense::hash", mem:299, cpy:266, ihi:184, it:130, rd2:323, rie:157, rf200:100, rf2k:100, rf500k:143, ries:148, rfs:167, rfs1m:256, avgn:113, avgs:207, avg:176},
    {id:102, hm:"jg::dense_hash_map", h:"boost::hash", mem:299, cpy:266, ihi:183, it:129, rd2:293, rie:"-", rf200:2538, rf2k:"-", rf500k:"-", ries:360, rfs:549, rfs1m:283, avgn:"-", avgs:394, avg:"-"},
    {id:103, hm:"jg::dense_hash_map", h:"mumx", mem:299, cpy:265, ihi:184, it:127, rd2:322, rie:156, rf200:109, rf2k:106, rf500k:149, ries:156, rfs:182, rfs1m:181, avgn:119, avgs:182, avg:175},
    {id:104, hm:"jg::dense_hash_map", h:"robin_hood::hash", mem:299, cpy:265, ihi:183, it:127, rd2:323, rie:172, rf200:126, rf2k:126, rf500k:155, ries:157, rfs:168, rfs1m:165, avgn:135, avgs:166, avg:179},
    {id:105, hm:"jg::dense_hash_map", h:"std::hash", mem:299, cpy:265, ihi:182, it:127, rd2:295, rie:"-", rf200:2513, rf2k:"-", rf500k:"-", ries:158, rfs:180, rfs1m:180, avgn:"-", avgs:180, avg:"-"},
    {id:106, hm:"robin_hood::unordered_flat_map", h:"absl::Hash", mem:167, cpy:413, ihi:115, it:826, rd2:152, rie:121, rf200:179, rf2k:174, rf500k:132, ries:100, rfs:101, rfs1m:187, avgn:160, avgs:138, avg:177},
    {id:107, hm:"robin_hood::unordered_flat_map", h:"ankerl::unordered_dense::hash", mem:167, cpy:413, ihi:114, it:839, rd2:151, rie:117, rf200:162, rf2k:158, rf500k:127, ries:101, rfs:107, rfs1m:189, avgn:148, avgs:142, avg:174},
    {id:108, hm:"robin_hood::unordered_flat_map", h:"boost::hash", mem:167, cpy:413, ihi:118, it:827, rd2:150, rie:191, rf200:172, rf2k:183, rf500k:124, ries:237, rfs:488, rfs1m:209, avgn:157, avgs:319, avg:226},
    {id:109, hm:"robin_hood::unordered_flat_map", h:"mumx", mem:167, cpy:413, ihi:114, it:844, rd2:152, rie:118, rf200:162, rf2k:157, rf500k:128, ries:106, rfs:119, rfs1m:129, avgn:148, avgs:124, avg:171},
    {id:110, hm:"robin_hood::unordered_flat_map", h:"robin_hood::hash", mem:167, cpy:413, ihi:117, it:826, rd2:154, rie:120, rf200:201, rf2k:209, rf500k:137, ries:107, rfs:111, rfs1m:124, avgn:179, avgs:118, avg:178},
    {id:111, hm:"robin_hood::unordered_flat_map", h:"std::hash", mem:167, cpy:412, ihi:109, it:847, rd2:146, rie:191, rf200:171, rf2k:165, rf500k:126, ries:107, rfs:118, rfs1m:131, avgn:153, avgs:124, avg:178},
    {id:112, hm:"robin_hood::unordered_node_map", h:"absl::Hash", mem:223, cpy:744, ihi:277, it:862, rd2:349, rie:156, rf200:177, rf2k:171, rf500k:132, ries:106, rfs:102, rfs1m:152, avgn:159, avgs:124, avg:222},
    {id:113, hm:"robin_hood::unordered_node_map", h:"ankerl::unordered_dense::hash", mem:223, cpy:715, ihi:273, it:851, rd2:336, rie:152, rf200:166, rf2k:161, rf500k:128, ries:106, rfs:105, rfs1m:152, avgn:151, avgs:126, avg:217},
    {id:114, hm:"robin_hood::unordered_node_map", h:"boost::hash", mem:223, cpy:731, ihi:272, it:849, rd2:339, rie:243, rf200:161, rf2k:172, rf500k:125, ries:248, rfs:486, rfs1m:172, avgn:151, avgs:289, avg:279},
    {id:115, hm:"robin_hood::unordered_node_map", h:"mumx", mem:223, cpy:712, ihi:274, it:858, rd2:338, rie:155, rf200:170, rf2k:165, rf500k:130, ries:112, rfs:119, rfs1m:114, avgn:154, avgs:116, avg:217},
    {id:116, hm:"robin_hood::unordered_node_map", h:"robin_hood::hash", mem:223, cpy:728, ihi:275, it:854, rd2:338, rie:155, rf200:201, rf2k:194, rf500k:149, ries:113, rfs:113, rfs1m:108, avgn:180, avgs:110, avg:224},
    {id:117, hm:"robin_hood::unordered_node_map", h:"std::hash", mem:223, cpy:711, ihi:272, it:852, rd2:337, rie:242, rf200:159, rf2k:172, rf500k:125, ries:111, rfs:119, rfs1m:112, avgn:151, avgs:116, avg:223},
    {id:118, hm:"ska::bytell_hash_map", h:"absl::Hash", mem:167, cpy:1879, ihi:129, it:2169, rd2:169, rie:146, rf200:181, rf2k:186, rf500k:152, ries:126, rfs:157, rfs1m:255, avgn:172, avgs:200, avg:249},
    {id:119, hm:"ska::bytell_hash_map", h:"ankerl::unordered_dense::hash", mem:167, cpy:1937, ihi:125, it:2201, rd2:168, rie:136, rf200:171, rf2k:178, rf500k:146, ries:125, rfs:166, rfs1m:254, avgn:164, avgs:205, avg:245},
    {id:120, hm:"ska::bytell_hash_map", h:"boost::hash", mem:167, cpy:1840, ihi:125, it:2217, rd2:139, rie:136, rf200:166, rf2k:171, rf500k:139, ries:281, rfs:551, rfs1m:283, avgn:158, avgs:395, avg:284},
    {id:121, hm:"ska::bytell_hash_map", h:"mumx", mem:167, cpy:1909, ihi:128, it:2034, rd2:168, rie:141, rf200:176, rf2k:180, rf500k:148, ries:132, rfs:179, rfs1m:178, avgn:167, avgs:179, avg:241},
    {id:122, hm:"ska::bytell_hash_map", h:"robin_hood::hash", mem:167, cpy:1875, ihi:130, it:2065, rd2:168, rie:143, rf200:183, rf2k:187, rf500k:154, ries:128, rfs:177, rfs1m:176, avgn:174, avgs:176, avg:243},
    {id:123, hm:"ska::bytell_hash_map", h:"std::hash", mem:167, cpy:1967, ihi:121, it:2056, rd2:140, rie:136, rf200:166, rf2k:170, rf500k:139, ries:132, rfs:179, rfs1m:179, avgn:158, avgs:179, avg:233},
    {id:124, hm:"ska::flat_hash_map", h:"absl::Hash", mem:450, cpy:1787, ihi:104, it:2679, rd2:228, rie:115, rf200:121, rf2k:115, rf500k:156, ries:117, rfs:154, rfs1m:279, avgn:129, avgs:207, avg:251},
    {id:125, hm:"ska::flat_hash_map", h:"ankerl::unordered_dense::hash", mem:450, cpy:1761, ihi:103, it:2551, rd2:207, rie:111, rf200:113, rf2k:112, rf500k:148, ries:118, rfs:172, rfs1m:279, avgn:123, avgs:219, avg:247},
    {id:126, hm:"ska::flat_hash_map", h:"boost::hash", mem:450, cpy:1723, ihi:101, it:2559, rd2:209, rie:103, rf200:109, rf2k:106, rf500k:141, ries:257, rfs:557, rfs1m:305, avgn:118, avgs:412, avg:287},
    {id:127, hm:"ska::flat_hash_map", h:"mumx", mem:450, cpy:1787, ihi:104, it:2587, rd2:227, rie:111, rf200:120, rf2k:119, rf500k:153, ries:120, rfs:189, rfs1m:180, avgn:130, avgs:184, avg:246},
    {id:128, hm:"ska::flat_hash_map", h:"robin_hood::hash", mem:450, cpy:1768, ihi:105, it:2552, rd2:228, rie:113, rf200:120, rf2k:119, rf500k:153, ries:118, rfs:171, rfs1m:166, avgn:130, avgs:168, avg:242},
    {id:129, hm:"ska::flat_hash_map", h:"std::hash", mem:450, cpy:1709, ihi:100, it:2826, rd2:211, rie:101, rf200:117, rf2k:114, rf500k:142, ries:121, rfs:188, rfs1m:178, avgn:124, avgs:183, avg:240},
    {id:130, hm:"spp::sparse_hash_map", h:"absl::Hash", mem:119, cpy:1300, ihi:397, it:433, rd2:411, rie:366, rf200:198, rf2k:207, rf500k:168, ries:208, rfs:173, rfs1m:244, avgn:190, avgs:205, avg:281},
    {id:131, hm:"spp::sparse_hash_map", h:"ankerl::unordered_dense::hash", mem:119, cpy:1288, ihi:398, it:430, rd2:407, rie:362, rf200:210, rf2k:213, rf500k:166, ries:205, rfs:174, rfs1m:244, avgn:195, avgs:206, avg:282},
    {id:132, hm:"spp::sparse_hash_map", h:"boost::hash", mem:119, cpy:1232, ihi:393, it:429, rd2:356, rie:"-", rf200:"-", rf2k:"-", rf500k:"-", ries:361, rfs:563, rfs1m:276, avgn:"-", avgs:394, avg:"-"},
    {id:133, hm:"spp::sparse_hash_map", h:"mumx", mem:119, cpy:1269, ihi:397, it:433, rd2:409, rie:366, rf200:215, rf2k:226, rf500k:168, ries:214, rfs:191, rfs1m:183, avgn:201, avgs:187, avg:280},
    {id:134, hm:"spp::sparse_hash_map", h:"robin_hood::hash", mem:119, cpy:1314, ihi:398, it:436, rd2:416, rie:388, rf200:200, rf2k:194, rf500k:170, ries:215, rfs:186, rfs1m:175, avgn:187, avgs:180, avg:277},
    {id:135, hm:"spp::sparse_hash_map", h:"std::hash", mem:119, cpy:1248, ihi:393, it:435, rd2:362, rie:"-", rf200:2893, rf2k:"-", rf500k:"-", ries:215, rfs:191, rfs1m:182, avgn:"-", avgs:186, avg:"-"},
    {id:136, hm:"std::unordered_map", h:"absl::Hash", mem:370, cpy:1952, ihi:573, it:2500, rd2:779, rie:477, rf200:510, rf2k:498, rf500k:441, ries:237, rfs:220, rfs1m:448, avgn:482, avgs:314, avg:563},
    {id:137, hm:"std::unordered_map", h:"ankerl::unordered_dense::hash", mem:370, cpy:1959, ihi:561, it:2263, rd2:767, rie:461, rf200:501, rf2k:476, rf500k:391, ries:260, rfs:266, rfs1m:465, avgn:454, avgs:352, avg:561},
    {id:138, hm:"std::unordered_map", h:"boost::hash", mem:370, cpy:1968, ihi:567, it:2495, rd2:642, rie:491, rf200:362, rf2k:359, rf500k:376, ries:382, rfs:613, rfs1m:480, avgn:366, avgs:542, avg:590},
    {id:139, hm:"std::unordered_map", h:"mumx", mem:370, cpy:1986, ihi:573, it:2500, rd2:777, rie:478, rf200:509, rf2k:480, rf500k:434, ries:241, rfs:243, rfs1m:333, avgn:473, avgs:285, avg:553},
    {id:140, hm:"std::unordered_map", h:"robin_hood::hash", mem:370, cpy:1918, ihi:574, it:2233, rd2:772, rie:457, rf200:518, rf2k:493, rf500k:402, ries:273, rfs:292, rfs1m:366, avgn:469, avgs:327, avg:561},
    {id:141, hm:"std::unordered_map", h:"std::hash", mem:370, cpy:1930, ihi:559, it:2223, rd2:631, rie:464, rf200:361, rf2k:349, rf500k:328, ries:242, rfs:244, rfs1m:334, avgn:345, avgs:286, avg:494},
    {id:142, hm:"std::unordered_map PoolAllocator", h:"absl::Hash", mem:296, cpy:1110, ihi:458, it:2258, rd2:656, rie:406, rf200:507, rf2k:470, rf500k:390, ries:223, rfs:194, rfs1m:431, avgn:453, avgs:289, avg:482},
    {id:143, hm:"std::unordered_map PoolAllocator", h:"ankerl::unordered_dense::hash", mem:221, cpy:1122, ihi:436, it:2019, rd2:626, rie:400, rf200:510, rf2k:479, rf500k:363, ries:261, rfs:270, rfs1m:439, avgn:446, avgs:344, avg:480},
    {id:144, hm:"std::unordered_map PoolAllocator", h:"boost::hash", mem:295, cpy:1113, ihi:458, it:2260, rd2:538, rie:414, rf200:355, rf2k:343, rf500k:328, ries:368, rfs:585, rfs1m:461, avgn:342, avgs:519, avg:509},
    {id:145, hm:"std::unordered_map PoolAllocator", h:"mumx", mem:296, cpy:1096, ihi:461, it:2258, rd2:661, rie:404, rf200:515, rf2k:480, rf500k:392, ries:229, rfs:217, rfs1m:318, avgn:459, avgs:263, avg:477},
    {id:146, hm:"std::unordered_map PoolAllocator", h:"robin_hood::hash", mem:221, cpy:1112, ihi:437, it:2021, rd2:626, rie:399, rf200:501, rf2k:454, rf500k:365, ries:275, rfs:293, rfs1m:344, avgn:436, avgs:317, avg:473},
    {id:147, hm:"std::unordered_map PoolAllocator", h:"std::hash", mem:221, cpy:1072, ihi:434, it:2011, rd2:514, rie:379, rf200:354, rf2k:361, rf500k:302, ries:230, rfs:217, rfs1m:320, avgn:338, avgs:264, avg:413},
    {id:148, hm:"std::unordered_map unsynchronized_pool_resource", h:"absl::Hash", mem:222, cpy:2095, ihi:2128, it:2017, rd2:626, rie:740, rf200:363, rf2k:361, rf500k:307, ries:270, rfs:220, rfs1m:324, avgn:343, avgs:267, avg:547},
    {id:149, hm:"std::unordered_map unsynchronized_pool_resource", h:"ankerl::unordered_dense::hash", mem:222, cpy:2104, ihi:2129, it:2026, rd2:629, rie:741, rf200:361, rf2k:361, rf500k:309, ries:272, rfs:221, rfs1m:323, avgn:343, avgs:267, avg:548},
    {id:150, hm:"std::unordered_map unsynchronized_pool_resource", h:"boost::hash", mem:222, cpy:2108, ihi:2127, it:2010, rd2:628, rie:742, rf200:358, rf2k:368, rf500k:309, ries:271, rfs:220, rfs1m:322, avgn:344, avgs:266, avg:548},
    {id:151, hm:"std::unordered_map unsynchronized_pool_resource", h:"mumx", mem:222, cpy:2109, ihi:2129, it:2015, rd2:627, rie:742, rf200:358, rf2k:356, rf500k:308, ries:271, rfs:221, rfs1m:322, avgn:340, avgs:267, avg:546},
    {id:152, hm:"std::unordered_map unsynchronized_pool_resource", h:"robin_hood::hash", mem:222, cpy:2107, ihi:2129, it:2016, rd2:628, rie:741, rf200:358, rf2k:356, rf500k:308, ries:271, rfs:221, rfs1m:322, avgn:340, avgs:267, avg:546},
    {id:153, hm:"std::unordered_map unsynchronized_pool_resource", h:"std::hash", mem:222, cpy:2107, ihi:2129, it:2015, rd2:627, rie:741, rf200:358, rf2k:356, rf500k:308, ries:271, rfs:221, rfs1m:324, avgn:340, avgs:268, avg:547},
    {id:154, hm:"tsl::hopscotch_map", h:"absl::Hash", mem:299, cpy:983, ihi:141, it:1723, rd2:172, rie:148, rf200:199, rf2k:253, rf500k:196, ries:137, rfs:166, rfs1m:270, avgn:215, avgs:212, avg:263},
    {id:155, hm:"tsl::hopscotch_map", h:"ankerl::unordered_dense::hash", mem:299, cpy:1010, ihi:132, it:1843, rd2:156, rie:145, rf200:182, rf2k:243, rf500k:190, ries:138, rfs:170, rfs1m:270, avgn:203, avgs:215, avg:258},
    {id:156, hm:"tsl::hopscotch_map", h:"boost::hash", mem:299, cpy:980, ihi:132, it:1922, rd2:132, rie:"-", rf200:1563, rf2k:"-", rf500k:"-", ries:314, rfs:555, rfs1m:293, avgn:"-", avgs:403, avg:"-"},
    {id:157, hm:"tsl::hopscotch_map", h:"mumx", mem:299, cpy:978, ihi:132, it:1871, rd2:158, rie:144, rf200:193, rf2k:288, rf500k:191, ries:145, rfs:185, rfs1m:185, avgn:220, avgs:185, avg:258},
    {id:158, hm:"tsl::hopscotch_map", h:"robin_hood::hash", mem:299, cpy:1000, ihi:139, it:2052, rd2:184, rie:169, rf200:189, rf2k:272, rf500k:194, ries:144, rfs:174, rfs1m:175, avgn:215, avgs:174, avg:264},
    {id:159, hm:"tsl::hopscotch_map", h:"std::hash", mem:299, cpy:998, ihi:132, it:1907, rd2:133, rie:"-", rf200:1564, rf2k:"-", rf500k:"-", ries:144, rfs:183, rfs1m:183, avgn:"-", avgs:183, avg:"-"},
    {id:160, hm:"tsl::robin_map", h:"absl::Hash", mem:450, cpy:1281, ihi:111, it:2626, rd2:171, rie:104, rf200:110, rf2k:112, rf500k:150, ries:118, rfs:148, rfs1m:276, avgn:123, avgs:202, avg:234},
    {id:161, hm:"tsl::robin_map", h:"ankerl::unordered_dense::hash", mem:450, cpy:1244, ihi:111, it:2736, rd2:172, rie:100, rf200:117, rf2k:113, rf500k:143, ries:120, rfs:169, rfs1m:277, avgn:124, avgs:216, avg:237},
    {id:162, hm:"tsl::robin_map", h:"boost::hash", mem:450, cpy:1220, ihi:110, it:2746, rd2:149, rie:"-", rf200:1333, rf2k:"-", rf500k:"-", ries:260, rfs:555, rfs1m:308, avgn:"-", avgs:413, avg:"-"},
    {id:163, hm:"tsl::robin_map", h:"mumx", mem:450, cpy:1283, ihi:112, it:2722, rd2:169, rie:101, rf200:106, rf2k:103, rf500k:138, ries:123, rfs:186, rfs1m:179, avgn:114, avgs:183, avg:227},
    {id:164, hm:"tsl::robin_map", h:"robin_hood::hash", mem:450, cpy:1289, ihi:115, it:2802, rd2:176, rie:120, rf200:111, rf2k:110, rf500k:146, ries:123, rfs:169, rfs1m:164, avgn:121, avgs:166, avg:232},
    {id:165, hm:"tsl::robin_map", h:"std::hash", mem:450, cpy:1251, ihi:109, it:2751, rd2:145, rie:"-", rf200:2396, rf2k:"-", rf500k:"-", ries:123, rfs:187, rfs1m:182, avgn:"-", avgs:184, avg:"-"},
    {id:166, hm:"tsl::sparse_map", h:"absl::Hash", mem:108, cpy:177, ihi:299, it:327, rd2:336, rie:259, rf200:192, rf2k:204, rf500k:147, ries:215, rfs:157, rfs1m:232, avgn:179, avgs:191, avg:210},
    {id:167, hm:"tsl::sparse_map", h:"ankerl::unordered_dense::hash", mem:108, cpy:198, ihi:299, it:326, rd2:337, rie:255, rf200:211, rf2k:220, rf500k:153, ries:219, rfs:161, rfs1m:230, avgn:192, avgs:193, avg:216},
    {id:168, hm:"tsl::sparse_map", h:"boost::hash", mem:108, cpy:178, ihi:298, it:345, rd2:286, rie:"-", rf200:2142, rf2k:"-", rf500k:"-", ries:359, rfs:547, rfs1m:259, avgn:"-", avgs:377, avg:"-"},
    {id:169, hm:"tsl::sparse_map", h:"mumx", mem:108, cpy:178, ihi:299, it:331, rd2:337, rie:260, rf200:218, rf2k:225, rf500k:156, ries:223, rfs:176, rfs1m:166, avgn:197, avgs:171, avg:212},
    {id:170, hm:"tsl::sparse_map", h:"robin_hood::hash", mem:108, cpy:183, ihi:303, it:352, rd2:333, rie:280, rf200:190, rf2k:205, rf500k:156, ries:223, rfs:170, rfs1m:160, avgn:182, avgs:165, avg:210},
    {id:171, hm:"tsl::sparse_map", h:"std::hash", mem:108, cpy:177, ihi:296, it:346, rd2:286, rie:"-", rf200:2133, rf2k:"-", rf500k:"-", ries:221, rfs:176, rfs1m:166, avgn:"-", avgs:171, avg:"-"},
    ];
    function updateCell(cell, greenIfLower, yellowIfLower) {
        var value = cell.getValue();
        if (value < greenIfLower) {
            cell.getElement().style.backgroundColor = "#a5d6a7"; // green
        } else if (value < yellowIfLower) {
            cell.getElement().style.backgroundColor = "#fff59d"; // yellow
        } else {
            cell.getElement().style.backgroundColor = "#ef9a9a"; // red
        }
        return {precision:false};
    }
    function updateCellCpy(cell) { return updateCell(cell, 583.2689602193303, 2499.927911123426); }
    function updateCellIhi(cell) { return updateCell(cell, 133.06562778119917, 564.1244771936398); }
    function updateCellIt(cell) { return updateCell(cell, 435.16695188663414, 2200.9347327674527); }
    function updateCellMem(cell) { return updateCell(cell, 166.66307069914845, 417.8368559128649); }
    function updateCellRd2(cell) { return updateCell(cell, 227.5698903852466, 699.7112846331305); }
    function updateCellRfs(cell) { return updateCell(cell, 120.03085035859785, 244.116012794961); }
    function updateCellRfs1m(cell) { return updateCell(cell, 141.93450163136936, 283.3236735149379); }
    function updateCellRf200(cell) { return updateCell(cell, 142.01309659250745, 358.23988049536223); }
    function updateCellRf2k(cell) { return updateCell(cell, 147.0282670950827, 356.11127369153456); }
    function updateCellRf500k(cell) { return updateCell(cell, 118.70158518722513, 307.76441241970406); }
    function updateCellRie(cell) { return updateCell(cell, 143.51750435926215, 741.0835663981939); }
    function updateCellRies(cell) { return updateCell(cell, 119.67448005206766, 270.92784356391405); }
    function updateCellAvgn(cell) { return updateCell(cell, 134.25985700674372, 342.0371760472319); }
    function updateCellAvgs(cell) { return updateCell(cell, 132.9389310800892, 289.138886910084); }
    function updateCellAvg(cell) { return updateCell(cell, 217.1590612197652, 546.8372657620267); }
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
                    {title:"map", field:"hm", formatter:"link", headerFilter:true, headerHozAlign:"center", formatterParams:{urlField:"urlHm"}},
                    {title:"hash", field:"h", headerFilter:true, headerHozAlign:"center"},
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
                            {title:"Copy", field:"cpy", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellCpy, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}},
                            {title:"InsertHugeInt", field:"ihi", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellIhi, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}},
                            {title:"RandomDistinct2", field:"rd2", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellRd2, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}},
                            {title:"RandomInsertErase", field:"rie", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellRie, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}},
                        ]
                    },
                    {
                        title: "access & find",
                        headerHozAlign:"center",
                        columns: [
                            {title:"Iterate", field:"it", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellIt, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}},
                            {title:"RandomFind_200", field:"rf200", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellRf200, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}},
                            {title:"RandomFind_2000", field:"rf2k", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellRf2k, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}},
                            {title:"RandomFind_500000", field:"rf500k", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellRf500k, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}},
                        ],
                    },
                ],
            },
            {
                title:"string",
                headerHozAlign:"center",
                columns:[
                    {
                        //title: "modify",
                        //headerHozAlign:"center",
                        columns: [
                            {title:"RandomInsertEraseStrings", field:"ries", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellRies, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}}
                        ],
                    },
                    {
                        title: "find",
                        headerHozAlign:"center",
                        columns: [
                            {title:"RandomFindString", field:"rfs", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellRfs, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}},
                            {title:"RandomFindString_1000000", field:"rfs1m", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellRfs1m, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}},
                        ]
                    },
                ],
            },
            {title:"Memory Usage", field:"mem", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellMem, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}},
            {
                title:"average",
                headerHozAlign:"center",
                columns:[
                    {title:"geometric mean number find", field:"avgn", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellAvgn, sorter:"number", sorterParams:{alignEmptyValues:"bottom"},  formatterParams:updateCellAvgn, cssClass:"martinus_highlight", headerTooltip:"geometric mean of all number find benchmarks: RandomFind_200, RandomFind_2000, RandomFind_500000"},
                    {title:"geometric mean string find", field:"avgs", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", formatterParams:updateCellAvgs, sorter:"number", sorterParams:{alignEmptyValues:"bottom"}, formatterParams:updateCellAvgs, cssClass:"martinus_highlight", headerTooltip:"geometric mean the string find benchmarks RandomFindString and RandomFindString_1000000"},
                    {title:"geometric mean all", field:"avg", hozAlign:"right", sorter:"number", headerVertical:true, width:55, formatter:"money", sorter:"number", sorterParams:{alignEmptyValues:"bottom"}, formatterParams:updateCellAvg, headerTooltip: "geometric mean of all the benchmarks. If you want an overall good hashmap, choose one of the top contenders here.", cssClass:"martinus_highlight"},
                ],
            },        
        ],
    });
