---
author: martin.ankerl@gmail.com
comments: true
date: 2016-11-04 08:54:56+00:00
layout: post
slug: linux-bash-prompt
title: Linux Bash Prompt
wordpress_id: 1699
categories:
- linux
---

Here is my bash prompt, with the following features:



 	
  * Red ✘ if the previous command has failed, otherwise a green ✔.

 	
  * Shows running time of the previous command

 	
  * Separate line for path and command




# Example


[![screenshot_2016-11-07_06-24-23](http://martin.ankerl.com/wp-content/uploads/2016/11/Screenshot_2016-11-07_06-24-23.png)](http://martin.ankerl.com/wp-content/uploads/2016/11/Screenshot_2016-11-07_06-24-23.png)



# Installation




Add this to your .bashrc:
 

    
    function timer_start {
      timer=${timer:-`date +%s.%3N`}
    }
     
    function timer_stop {
      local ELAPSED=$(bc <<< "`date +%s.%3N` - $timer")
    
      local T=${ELAPSED%.*} 
      local AFTER_COMMA=${ELAPSED##*.}
      local D=$((T/60/60/24))
      local H=$((T/60/60%24))
      local M=$((T/60%60))
      local S=$((T%60))
    
      timer_show=
      [[ $D > 0 ]] && timer_show=${timer_show}$(printf '%dd ' $D)
      [[ $H > 0 ]] && timer_show=${timer_show}$(printf '%dh ' $H)
      [[ $M > 0 ]] && timer_show=${timer_show}$(printf '%dm ' $M)
      timer_show=${timer_show}$(printf "%d.${AFTER_COMMA}s" $S)
      
      unset timer
    }
     
    trap 'timer_start' DEBUG
    PROMPT_COMMAND=timer_stop
     
    PS1="\e[0m\n\[\`if [[ \$? = "0" ]]; then echo '\e[1;32m✔'; else echo '\e[1;31m✘' ; fi\` \e[1;32m\h\e[0m \e[1;94m\w\e[0m \e[93m\${timer_show}\e[0m\n\$ "
    



 


# Updates






  * 2017-04-28: Now prints days, hours, minutes, seconds. Much better readable for long running tasks.

  * 2016-11-04: Initial version




# Sources





 	
  * [How can the last command's wall time be put in the Bash prompt?](http://stackoverflow.com/a/1862762/48181)

 	
  * [How to pass results of bc to a variable](http://askubuntu.com/a/229451/14585)

 	
  * [What is your favorite Bash prompt? [closed]](http://stackoverflow.com/a/103874/48181)

 	
  * [Customize your Bash prompt](https://makandracards.com/makandra/1090-customize-your-bash-prompt)

        
  * [Convert seconds to hours, minutes, seconds](http://stackoverflow.com/a/32164707/48181)


