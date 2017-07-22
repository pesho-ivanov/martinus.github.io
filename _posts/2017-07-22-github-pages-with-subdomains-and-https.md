---
author: martin.ankerl@gmail.com
comments: true
date: 2017-07-22 13:03:00+02:00
layout: post
title: 'Github Pages with Subdomains and HTTPS'
categories:
- programming
bigimg: /img/2017/07/github_cloudflare.png
---

I'm in the process of moving my homepage, namely this blog and my keto calculator, to [GitHub Pages](https://pages.github.com/). The reasons are simple:

* GitHub Pages are free
* Thanks to [Cloudflare](https://www.cloudflare.com/) HTTPS and caching is free as well
* I'm fed up with the work it requires to keep Wordpress secure. My website has been hacked multiple times due to old plugins or not running a recent enough wordpress release.
* Static websites are fast and practically maintainence free

Unfortunately converting this blog was quite a bit of work. I have used [exitwp](https://github.com/thomasf/exitwp) for conversion, but I had to touch up practically every generated file by hand. I like the result a lot, though!

## GitHub Configuration

I am porting two sites on subdomains:

* [https://martin.ankerl.com](https://martin.ankerl.com)
* [https://keto-calculator.ankerl.com](https://keto-calculator.ankerl.com)


### GitHub settings for martin.ankerl.com

* Repository: [https://github.com/martinus/martinus.github.io](https://github.com/martinus/martinus.github.io) (This is my main blog corresponding with my user name, so it should be named `martinus.github.io`)
* Repository name: `martinus.github.io`
* Custom domain: `martin.ankerl.com`
* Enforce HTTPS is not available, since I am using a custom domain.

### GitHub settings for keto-calculator.ankerl.com

* Repository: [https://github.com/martinus/keto-calculator](https://github.com/martinus/keto-calculator)
* Repository name: `keto-calculator` (Make sure the repository name is the same as the subdomain!)
* Custom domain: `keto-calculator.ankerl.com`

I am not using [jekyll](https://jekyllrb.com/) for these pages here, so I have to create an empty file `.nojekyll` in each directory of the repository.


## Domain Settings

My domains are on [godaddy](https://godaddy.com).

1. First, find out which IPs to use for the `A` records from [this github document](https://help.github.com/articles/setting-up-an-apex-domain/#configuring-a-records-with-your-dns-provider)
1. With that information, I can configure all DNS records:
   
   | Type | Name | Value | TTL | 
   |:---:| --- | --- | --- |
   | A | ankerl.com | 192.30.252.153 | 600 |
   | A | ankerl.com | 192.30.252.154 | 600 |
   | CNAME | keto-calculator | martinus.github.io | -- |
   | CNAME | martin | martinus.github.io | -- |

   So both subdomains are aliases for `martinus.github.io`.

Now http access to the subdomains should already be working.

## HTTPS and Caching with Cloudflare

1. Import the domain `ankerl.com`, it should reveal the 3 entries that as above. If not, add them by hand exactly as above.
1. In godaddy change the nameservers as explained by cloudflare. For me I had to change them to `dan.ns.cloudflare.com` and `rita.ns.cloudflare.com`.

To enable caching and force HTTPS for all sites, create two page rules. **Make sure they are in that order**:

1. URL is `https://*.ankerl.com/*` Then the settings are: `Cache Level` `Cache Everything`
1. URL is `http://*.ankerl.com/*` Then the settings are: `Always use HTTPS` Enforce HTTPS for this URL

It took a while until I could select `Always use HTTPS` for my domain, probably because the previous settings like nameserver were not active yet. So have a little patience and try after a few minutes.

Additionally, under the Caching topic I have set the browser expiration date to 1 month. 
