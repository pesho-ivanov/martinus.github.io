---
layout: post
author: martin.ankerl@gmail.com
comments: true
date: 'Fri Nov 04 2016 09:54:56 GMT+0100 (W. Europe Standard Time)'
slug: linux-bash-prompt
title: Linux Bash Prompt
subtitle: 'Elapsed time, errorcode ✘ or ✔, git & svn status, ...'
categories:
  - linux
bigimg: /img/2016/11/bash_prompt.png
published: true
---

Here is my bash prompt, with the following features:
 	
* Red ✘ and errorcode if command has failed, otherwise a green ✔.
* git status (if available)
* end time of last command
* precise elapsed time of the previous command
* red hostname for root
* Separate line for path and command
* Subversion support

## Example

![Bash Prompt Example](/img/2016/11/Screenshot_at_2018-10-26_09-17-03.png)

## Installation

Add this to your `~/.bashrc`:
 
```bash
function prompt_timer_start {
    PROMPT_TIMER=${PROMPT_TIMER:-`date +%s.%3N`}
    echo -ne "\033]0;${@}\007"
}

function prompt_svn_stats() {
    command -v svn >/dev/null
    if [ $? != 0 ]; then
        return
    fi

    local WCROOT=`svn info --show-item wc-root 2>/dev/null`
    if [ -z "$WCROOT" ]; then
        return
    fi

    local SVN_INFO=`svn info ${WCROOT} 2>/dev/null`
    local CHECKEDOUTURL=`echo "${SVN_INFO}" |sed -ne 's#^URL: ##p'`
    local REV=`echo "${SVN_INFO}" |sed -ne 's#^Revision: ##p'`
    local ROOTURL=`echo "${SVN_INFO}" |sed -ne 's#^Repository Root: ##p'`
    echo " (\e[32m${CHECKEDOUTURL/$ROOTURL\//}\e[1;30m@\e[0;100m${REV})"
}

function prompt_timer_stop {
    local EXIT="$?" # MUST come first
    local NOW=`date +%s.%3N` # should be high up, for accurate measurement
    echo -ne "\033]0;$USER@$HOSTNAME: $PWD\007"

    local ELAPSED=$(bc <<< "$NOW - $PROMPT_TIMER")
    unset PROMPT_TIMER

    local T=${ELAPSED%.*} 
    local AFTER_COMMA=${ELAPSED##*.}
    local D=$((T/60/60/24))
    local H=$((T/60/60%24))
    local M=$((T/60%60))
    local S=$((T%60))

    local TIMER_SHOW=
    [[ $D > 0 ]] && TIMER_SHOW=${TIMER_SHOW}$(printf '%dd ' $D)
    [[ $H > 0 ]] && TIMER_SHOW=${TIMER_SHOW}$(printf '%dh ' $H)
    [[ $M > 0 ]] && TIMER_SHOW=${TIMER_SHOW}$(printf '%dm ' $M)
    TIMER_SHOW=${TIMER_SHOW}$(printf "%d.${AFTER_COMMA}s" $S)  

    PS1="\e[0m\n" # begin with a newline
    if [ $EXIT != 0 ]; then
        PS1+="\e[1;41m ✘ ${EXIT}" # red x with error status
    else
        PS1+="\e[1;42m ✔" # green tick
    fi
    PS1+=" \e[0;100;93m `date +%H:%M`" # date, e.g. 17:00

    #local PSCHAR="┕▶"
    local PSCHAR="▶"
    if [ $(id -u) -eq 0 ]; then
        PS1+=" \e[1;31m\h " # root: red hostname
        PSCHAR="\e[1;31m#\e[0m"
    else
        PS1+=" \e[1;32m\h " # non-root: green hostname
    fi
    PS1+="\e[1;94m\w" # working directory

    GIT_PS1_SHOWDIRTYSTATE=true # * unstaged, + staged
    GIT_PS1_SHOWSTASHSTATE=true # $ stashed
    GIT_PS1_SHOWUNTRACKEDFILES=true # % untracked
    GIT_PS1_SHOWCOLORHINTS=true
    # < behind, > ahead, <> diverged, = same as upstream
    GIT_PS1_SHOWUPSTREAM="auto" 
    # git with 2 arguments *sets* PS1 (and uses color coding)
    __git_ps1 "${PS1}\e[0;100m" "\e[0;100m"

    # try to append svn
    PS1+=`prompt_svn_stats`

    PS1+=" \e[0;100;93m${TIMER_SHOW}" # runtime of last command
    PS1+=" \e[0m\n${PSCHAR} " # prompt in new line
    #PS1+="\e[K\e[0m\n${PSCHAR} " # prompt in new line
}

# see https://gnunn1.github.io/tilix-web/manual/vteconfig/
if [ $TILIX_ID ] || [ $VTE_VERSION ]; then
        source /etc/profile.d/vte.sh
fi

 
trap 'prompt_timer_start "$BASH_COMMAND (`date +%H:%M:%S`)"' DEBUG
PROMPT_COMMAND=prompt_timer_stop
```

## Updates

* **2016-11-04**: Initial version
* **2017-04-28**: Now prints days, hours, minutes, seconds. Much better readable for long running tasks.
* **2017-08-02**: Adds root as red, git status, error code, time.
* **2017-08-03**: Adds subversion support.
* **2017-08-06**: much faster if subversion is not installed, show running command in titlebar
* **2018-10-26**: better color coding

## Sources

  * [How can the last command's wall time be put in the Bash prompt?](http://stackoverflow.com/a/1862762/48181)
  * [How to pass results of bc to a variable](http://askubuntu.com/a/229451/14585)
  * [What is your favorite Bash prompt? [closed]](http://stackoverflow.com/a/103874/48181)
  * [Customize your Bash prompt](https://makandracards.com/makandra/1090-customize-your-bash-prompt)
  * [Convert seconds to hours, minutes, seconds](http://stackoverflow.com/a/32164707/48181)
  * [Bash Prompt with Last Exit Code](https://stackoverflow.com/a/16715681/48181)
  * [svn-prompt](https://github.com/mcandre/svn-prompt/blob/master/lib/svn-prompt.sh)
