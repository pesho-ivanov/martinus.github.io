---
author: martin.ankerl@gmail.com
comments: true
date: 2009-12-09 19:09:17+00:00
layout: post
slug: how-to-create-random-colors-programmatically
title: How to Generate Random Colors Programmatically
wordpress_id: 254
categories:
- programming
---

Creating random colors is actually more difficult than it seems. The randomness itself is easy, but aesthetically pleasing randomness is more difficult. For a little project at work I needed to automatically generate multiple background colors with the following properties:

* Text over the colored background should be easily readable
* Colors should be very distinct
* The number of required colors is not initially known

## Naïve Approach

The first and simplest approach is to create random colors by simply using a random number between `[0, 256[` for the R, G, B values. I have created a little Ruby script to generate sample HTML code:

```ruby
# generates HTML code for 26 background colors given R, G, B values.
def gen_html
  ('A'..'Z').each do |c|
    r, g, b = yield
    printf "<span style=\"background-color:#%02x%02x%02x; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;\">#{c}</span> ", r, g, b
  end
end
```

## naive approach: generate purely random colors

```ruby
gen_html { [rand(256), rand(256), rand(256)] }
```

The generated output looks like this:

<p style="text-align:center;"><span style="background-color:#a69dd8; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">A</span> <span style="background-color:#0c35b0; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">B</span> <span style="background-color:#f82750; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">C</span> <span style="background-color:#0ebd31; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">D</span> <span style="background-color:#5fab4f; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">E</span> <span style="background-color:#c538cf; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">F</span> <span style="background-color:#014a59; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">G</span> <span style="background-color:#e14af8; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">H</span> <span style="background-color:#9fb730; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">I</span> <span style="background-color:#4bec60; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">J</span> <span style="background-color:#ef9345; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">K</span> <span style="background-color:#d2ece0; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">L</span> <span style="background-color:#9cda80; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">M</span> <span style="background-color:#dbc07c; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">N</span> <span style="background-color:#7328dd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">O</span> <span style="background-color:#1e9942; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">P</span> <span style="background-color:#621b7b; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Q</span> <span style="background-color:#c830b2; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">R</span> <span style="background-color:#362332; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">S</span> <span style="background-color:#e8c55d; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">T</span> <span style="background-color:#bd8787; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">U</span> <span style="background-color:#66c6a4; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">V</span> <span style="background-color:#21ec4b; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">W</span> <span style="background-color:#782364; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">X</span> <span style="background-color:#c3bf15; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Y</span> <span style="background-color:#3db35a; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Z</span>
</p>

As you can see this is quite suboptimal. Some letters are hard to read because the background is too dark (B, Q, S), other colors look very similar (F, R).

## Using HSV Color Space

Let's fix the too dark / too bright problem first. A convenient way to do this is to not use the RGB color space, but [HSV](http://en.wikipedia.org/wiki/HSL_and_HSV) (Hue, Saturation, Value). Here you get equally bright and colorful colors by using a fixed value for saturation and value, and just modifying the hue:

<center>![HSV Cylinder](/img/2009/12/HSV_cylinder_small.png)</center>

Based on the description provided by the wikipedia article on [conversion from HSV to RGB](http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB) I have implemented a converter:

```ruby
# HSV values in [0..1[
# returns [r, g, b] values from 0 to 255
def hsv_to_rgb(h, s, v)
  h_i = (h*6).to_i
  f = h*6 - h_i
  p = v * (1 - s)
  q = v * (1 - f*s)
  t = v * (1 - (1 - f) * s)
  r, g, b = v, t, p if h_i==0
  r, g, b = q, v, p if h_i==1
  r, g, b = p, v, t if h_i==2
  r, g, b = p, q, v if h_i==3
  r, g, b = t, p, v if h_i==4
  r, g, b = v, p, q if h_i==5
  [(r*256).to_i, (g*256).to_i, (b*256).to_i]
end
```

Using the generator and fixed values for saturation and value: 

```ruby
# using HSV with variable hue
gen_html { hsv_to_rgb(rand, 0.5, 0.95) }
```

returns something like this:

<center><span style="background-color:#f379ad; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">A</span> <span style="background-color:#7979f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">B</span> <span style="background-color:#9079f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">C</span> <span style="background-color:#79e5f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">D</span> <span style="background-color:#8979f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">E</span> <span style="background-color:#79f396; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">F</span> <span style="background-color:#79cff3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">G</span> <span style="background-color:#79b1f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">H</span> <span style="background-color:#7979f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">I</span> <span style="background-color:#799ef3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">J</span> <span style="background-color:#ecf379; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">K</span> <span style="background-color:#80f379; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">L</span> <span style="background-color:#797cf3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">M</span> <span style="background-color:#79f3f0; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">N</span> <span style="background-color:#9af379; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">O</span> <span style="background-color:#79f37a; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">P</span> <span style="background-color:#f3ad79; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Q</span> <span style="background-color:#f3e179; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">R</span> <span style="background-color:#79b9f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">S</span> <span style="background-color:#e8f379; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">T</span> <span style="background-color:#f3b379; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">U</span> <span style="background-color:#f379c9; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">V</span> <span style="background-color:#79b8f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">W</span> <span style="background-color:#f379dc; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">X</span> <span style="background-color:#79f37b; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Y</span> <span style="background-color:#8e79f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Z</span>
</center>

Much better. The text is easily readable, and all colors have a similar brightness. Unfortunately, since we have limited us to less colors now, the difference between the randomly generated colors is even less than in the first approach.


## Golden Ratio

Using just `rand()` to choose different values for hue does not lead to a good use of the whole color spectrum, it simply is too random.

Here I have generated 2, 4, 8, 16, and 32 random values and printed them all on a scale. Its easy to see that some values are very tightly packed together, which we do not want.

<center>![random distribution](/img/2009/12/distribution-random.png)</center>

Lo and behold, some mathematician has discovered the [Golden Ratio](http://en.wikipedia.org/wiki/Golden_ratio) more than 2400 years ago. It has lots of interesting properties, but for us only one is interesting:

> [...] Furthermore, it is a property of the golden ratio, <em>&Phi;</em>, that each subsequent hash value divides the interval into which it falls according to the golden ratio!
>
> -- [Bruno R. Preiss, P.Eng.](http://brpreiss.com/books/opus4/html/page214.html)

Using the golden ratio as the spacing, the generated values look like this:

<center>![golden ratio distribution](/img/2009/12/distribution-goldenratio.png)</center>

Much better! The values are very evenly distributed, regardless how many values are used. Also, the algorithm for this is extremely simple. Just add 1/&Phi; and modulo 1 for each subsequent color.

```ruby
# use golden ratio
golden_ratio_conjugate = 0.618033988749895
h = rand # use random start value
gen_html {
  h += golden_ratio_conjugate
  h %= 1
  hsv_to_rgb(h, 0.5, 0.95)
}
```

The final result:

<center><span style="background-color:#f37e79; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">A</span> <span style="background-color:#7998f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">B</span> <span style="background-color:#bbf379; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">C</span> <span style="background-color:#f379df; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">D</span> <span style="background-color:#79f3e3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">E</span> <span style="background-color:#f3bf79; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">F</span> <span style="background-color:#9c79f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">G</span> <span style="background-color:#7af379; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">H</span> <span style="background-color:#f3799d; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">I</span> <span style="background-color:#79c1f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">J</span> <span style="background-color:#e4f379; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">K</span> <span style="background-color:#de79f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">L</span> <span style="background-color:#79f3ba; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">M</span> <span style="background-color:#f39779; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">N</span> <span style="background-color:#797ff3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">O</span> <span style="background-color:#a2f379; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">P</span> <span style="background-color:#f379c6; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Q</span> <span style="background-color:#79e9f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">R</span> <span style="background-color:#f3d979; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">S</span> <span style="background-color:#b579f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">T</span> <span style="background-color:#79f392; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">U</span> <span style="background-color:#f37984; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">V</span> <span style="background-color:#79a8f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">W</span> <span style="background-color:#cbf379; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">X</span> <span style="background-color:#f379ee; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Y</span> <span style="background-color:#79f3d3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Z</span></center>

You can see that the first few values are very different, and the difference decreases as more colors are added (Z and E are already quite similar). Anyways, this is good enough for me.

And because it is so beautiful, here are some more colors :smiley:

### s=0.99, v=0.99

<center><span style="background-color:#024bfd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">A</span> <span style="background-color:#94fd02; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">B</span> <span style="background-color:#fd02de; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">C</span> <span style="background-color:#02fdd3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">D</span> <span style="background-color:#fd8a02; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">E</span> <span style="background-color:#4102fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">F</span> <span style="background-color:#0dfd02; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">G</span> <span style="background-color:#fd0256; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">H</span> <span style="background-color:#029ffd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">I</span> <span style="background-color:#e8fd02; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">J</span> <span style="background-color:#c802fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">K</span> <span style="background-color:#02fd7f; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">L</span> <span style="background-color:#fd3602; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">M</span> <span style="background-color:#0217fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">N</span> <span style="background-color:#61fd02; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">O</span> <span style="background-color:#fd02aa; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">P</span> <span style="background-color:#02f3fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Q</span> <span style="background-color:#fdbe02; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">R</span> <span style="background-color:#7402fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">S</span> <span style="background-color:#02fd2b; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">T</span> <span style="background-color:#fd0222; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">U</span> <span style="background-color:#026bfd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">V</span> <span style="background-color:#b5fd02; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">W</span> <span style="background-color:#fc02fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">X</span> <span style="background-color:#02fdb3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Y</span> <span style="background-color:#fd6a02; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Z</span>
</center>


### s=0.25, h=0.8

<center><span style="background-color:#99a8cc; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">A</span> <span style="background-color:#b7cc99; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">B</span> <span style="background-color:#cc99c6; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">C</span> <span style="background-color:#99ccc4; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">D</span> <span style="background-color:#ccb599; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">E</span> <span style="background-color:#a699cc; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">F</span> <span style="background-color:#9bcc99; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">G</span> <span style="background-color:#cc99aa; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">H</span> <span style="background-color:#99b9cc; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">I</span> <span style="background-color:#c8cc99; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">J</span> <span style="background-color:#c299cc; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">K</span> <span style="background-color:#99ccb3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">L</span> <span style="background-color:#cca499; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">M</span> <span style="background-color:#999dcc; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">N</span> <span style="background-color:#accc99; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">O</span> <span style="background-color:#cc99bb; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">P</span> <span style="background-color:#99cacc; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Q</span> <span style="background-color:#ccbf99; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">R</span> <span style="background-color:#b099cc; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">S</span> <span style="background-color:#99cca2; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">T</span> <span style="background-color:#cc99a0; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">U</span> <span style="background-color:#99afcc; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">V</span> <span style="background-color:#becc99; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">W</span> <span style="background-color:#cc99cc; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">X</span> <span style="background-color:#99ccbd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Y</span> <span style="background-color:#ccae99; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Z</span></center>


### s=0.3, v=0.99

<center><span style="background-color:#b1c7fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">A</span> <span style="background-color:#ddfdb1; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">B</span> <span style="background-color:#fdb1f3; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">C</span> <span style="background-color:#b1fdf0; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">D</span> <span style="background-color:#fddab1; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">E</span> <span style="background-color:#c4b1fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">F</span> <span style="background-color:#b4fdb1; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">G</span> <span style="background-color:#fdb1ca; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">H</span> <span style="background-color:#b1e1fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">I</span> <span style="background-color:#f7fdb1; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">J</span> <span style="background-color:#edb1fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">K</span> <span style="background-color:#b1fdd7; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">L</span> <span style="background-color:#fdc1b1; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">M</span> <span style="background-color:#b1b7fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">N</span> <span style="background-color:#cefdb1; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">O</span> <span style="background-color:#fdb1e4; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">P</span> <span style="background-color:#b1fafd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Q</span> <span style="background-color:#fdeab1; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">R</span> <span style="background-color:#d4b1fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">S</span> <span style="background-color:#b1fdbd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">T</span> <span style="background-color:#fdb1bb; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">U</span> <span style="background-color:#b1d1fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">V</span> <span style="background-color:#e7fdb1; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">W</span> <span style="background-color:#fdb1fd; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">X</span> <span style="background-color:#b1fde7; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Y</span> <span style="background-color:#fdd0b1; padding:5px; -moz-border-radius:3px; -webkit-border-radius:3px;">Z</span></center>

Have fun!
Martin
