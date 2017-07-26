---
author: martin.ankerl@gmail.com
comments: true
date: 2017-07-22 13:03:00+02:00
layout: post
title: 'Free Secure Web: Jekyll & Github Pages & Cloudflare'
categories:
- programming
bigimg: /img/2017/07/github_cloudflare.png
share-img: /img/2017/07/github_cloudflare.png
---

I have just finished moving my homepage from WordPress to [jekyll](https://jekyllrb.com/) + [GitHub](https://github.com/) + [Cloudflare](https://www.cloudflare.com/). I must say this is really a fantastic setup! I have multiple reasons for that:

* [GitHub Pages](https://pages.github.com/) are free.
* Thanks to [Cloudflare](https://www.cloudflare.com/) we get free HTTPS and caching support.
* Security: WordPress is a constant hassle: my website has been hacked multiple times due to old plugins or not running a recent enough wordpress release. 
* Speed: static websites are fast and practically maintainence free
* Ease of development: jekyll & git makes development very convenient.


# From WordPress to Jekyll

Unfortunately converting this blog was quite a bit of work. I have used [exitwp](https://github.com/thomasf/exitwp) for conversion, but I had to touch up practically every generated file by hand!

There are multiple nice themes available, I have settled for [Beautiful Jekyll](http://deanattali.com/beautiful-jekyll/) which is very simple to set up and looks great.

Make sure your permalinks are the same as you have in Wordpress, so that all existing links keep working. To do that, edit your `_config.yml` and set it to e.g.

```yml
permalink: /:year/:month/:day/:title/ 
```

## Importing WordPress Comments to Disqus 

[Disqus](https://disqus.com/) is a nice way to add comments to static websites. It is quite fast, free, and filters spam quite well.

Disqus has a wordpress plugin that allows importing of all the existing wordpress comments. It takes a while, but then you have all your threads in disqus. 


## GitHub Configuration

I now describe how I have set up subdomains for my two sites [https://martin.ankerl.com](https://martin.ankerl.com) and [https://keto-calculator.ankerl.com](https://keto-calculator.ankerl.com).

### GitHub settings for martin.ankerl.com

Repository: [https://github.com/martinus/martinus.github.io](https://github.com/martinus/martinus.github.io). This is my main blog corresponding with my user name, so it should be named `martinus.github.io`.

* Repository name: `martinus.github.io`
* Custom domain: `martin.ankerl.com`
* *Enforce HTTPS* is not available through github, since I am using a custom domain. We'll do this later with Cloudflare.

### GitHub settings for keto-calculator.ankerl.com

Repository: [https://github.com/martinus/keto-calculator](https://github.com/martinus/keto-calculator). I am not using [jekyll](https://jekyllrb.com/) for these pages here, so I have to create an empty file `.nojekyll` in each directory of the repository.

* Repository name: `keto-calculator` (Make sure the repository name is the same as the subdomain!)
* Custom domain: `keto-calculator.ankerl.com`
* Again, *Enforce HTTPS* is not available through github, we'll do that with Cloudflare.

## Domain Settings

There is no need to set any `A` records. If you want to set up the apex domain (without subdomain) as well, you need an `A` record. For that, see [this github document](https://help.github.com/articles/setting-up-an-apex-domain/#configuring-a-records-with-your-dns-provider).

I have all my domains on [GoDaddy](https://godaddy.com). These are all my DNS records:

{:.table .table-responsive}
| Type | Name | Value | TTL | 
|:---:| --- | --- | --- |
| CNAME | keto-calculator | martinus.github.io | -- |
| CNAME | martin | martinus.github.io | -- |

So both subdomains are aliases for `martinus.github.io`. Now http access to the subdomains should already be working.

## HTTPS and Caching with Cloudflare

1. Import the domain `ankerl.com`, it should reveal the same entries as above. If not, add them by hand exactly as above.
1. In GoDaddy change the nameservers as explained by cloudflare. For me I had to change them to `dan.ns.cloudflare.com` and `rita.ns.cloudflare.com`.

To enable caching and force HTTPS for all sites, subdomain and apex domain, create two page rules. **Make sure they are in that order**:

1. URL is `https://*ankerl.com/*` Then the settings are: `Cache Level` `Cache Everything`
1. URL is `http://*ankerl.com/*` Then the settings are: `Always use HTTPS` Enforce HTTPS for this URL

It took a while until I could select `Always use HTTPS` for my domain, probably because the previous settings like nameserver were not active yet. So have a little patience and try after a few minutes.

Additionally, under the Caching topic I have set the browser expiration date to 1 month. 

* * * 

That's it! I'm really happy with that setup. 