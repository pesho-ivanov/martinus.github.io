---
author: martin.ankerl@gmail.com
comments: true
date: 2005-09-22 16:24:25+00:00
layout: post
link: http://martin.ankerl.com/2005/09/22/latex-tips-tricks/
slug: latex-tips-tricks
title: LaTeX Tips & Tricks
wordpress_id: 27
categories:
- programming
---

Here comes a number of tips & tricks I have found very useful when writing [LaTeX](http://www.latex-project.org/) documents:  


<!-- more -->


# Tighter space between Enumerations


	`\begin{enumerate} \itemsep 0pt
    \item bla bla
    \item Yeah yeah yeah
\end{enumerate}`



# Better Whitespace in TOC




If e.g. the TOC does not fit well onto the pages, use more whitespace:


	`\usepackage{setspace}
\begin{spacing}{1.2}
  \tableofcontents
  \listoffigures
  \listoftables
\end{spacing}`



# Floats Positioning


	

Show floats (images, tables, …) only AFTER they have been referenced for the first time:


	`\usepackage{flafter}`



# Hyphens




Disable hyphens for a whole block:


	`\usepackage{hyphenat}`
	

Usage:


	`\nohyphens{text ohne autoumbruch bla bla ...}`
	

You can specify words that should never be hyphenated like this:


	`\hyphenation{ChildAvailable}
\hyphenation{DataAbstraction}
\hyphenation{HierarchyRowFactory}
\hyphenation{LanguageRow}`

	

# Prettier references


	`\usepackage{varioref}`
	

Usage:


	`\vref{name-of-a-label}`
	

Can be used instead of every \ref, and creates beautiful entries like "on the following page", "on page 23", or just the same as \ref would create if the figure is on the same page.  




# Faster PDF Generation




About twice as fast, but much larger PDF file generation:


	`\pdfcompresslevel=0`
	

Enable draft mode for even quicker generation:


	`\documentclass[a4paper,11pt,oneside,draft]{book}`



# Glossary




To use a glossary, include the package with


	`\usepackage[refpages]{gloss}
\makegloss`
	

then you can use it with e.g.


	`\gloss{AdministrationTool}`
	

print the glossary with


	`\printgloss{mainfilename}`
	

you need an entry in the bib-file in mainfilename.bib. Every entry has to start with @gd.


	`@gd {AdministrationTool,
    word = {AdministrationTool},
    definition = {bla bla bla...}
}`
	

You do not like the header "Glossary", and want to use a label? This is how it works  (instead of using \makegloss):


	`\newgloss{default}{.gls}{The Title\label{gloss}}{glsplain}`
	

After the first  pdflatex run you have to create the extra glossary with bibtex. After each change of the bibtex file you have to do this again:


	`bibtex mainfilename.gls`




# Useful LaTeX packages




Here are some very good LaTeX packages, that I have used for my thesis:


	



  * [listings](http://www.pvv.ntnu.no/~berland/latex/docs/listings.pdf) -- A package for typesetting listings using LaTeXe


	
  * [varioref](http://www.ctex.org/documents/packages/bibref/varioref.pdf) -- LaTeX package to create cross-references with page information.


	
  * [flafter](http://www.tug.org/tex-archive/macros/latex/unpacked/flafter.sty) -- Insists that floats should always appear after their definition


	
  * [hyphenat](http://www.ctex.org/documents/packages/special/hyphenat.pdf) -- disable hyphenation throughout a document or to enable automatic hyphenation within words that include analphabetic characters
	

	
  * [setspace](http://www.ctan.org/tex-archive/macros/latex/contrib/setspace/?action=/tex-archive/macros/latex/contrib/) -- Replaces the  doublespace package. It produces double and one-and-one-half line spacing based on the point size in use


	
  * [layout](http://www.ctan.org/tex-archive/macros/latex/required/tools/layout.dtx) -- Produce a test page showing the values of the variables that control page layout, use with \layout


	
  * [pdftex](http://www.tug.org/applications/pdftex/) -- pdfTEX is an extension to TEX which allows the user to generate either DVI or PDF as the primary output format without requiring the use of DVI as an  

inter-language.

	
