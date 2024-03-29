---
title: Why (and how) I've switched to vim
date: 2015/02/08
category: programming
tags: programming, IDE, editor, programmer, code editor, vim, sublime, sublime text, atom, brackets, emacs, oldschool
active: 2
---

# Why (and how) I've switched to vim

Story about good & bad cop.

For the last couple years I was developing web apps using [Sublime Text](http://www.sublimetext.com/) exclusively. During that time I was also constantly monitoring code editors market and tried some of its newcomers (e.g. github's [atom](http://atom.io) or adobe's [brackets](http://brackets.io)), but in the long run I was always coming back to Sublime.

# Cool kids from the block

Besides old habits and laziness about learning new tool that should help me write code I was always curious about those oldschool, antique at the first look, console editors like [emacs](https://www.gnu.org/software/emacs) or [vim](http://vim.org). There is something magical about these apps - all those badass hackers and world-class conference speakers are using it. Why?

# Back to the roots

Emacs and vim exist on the code editors scene for some time now. That means they are hardened in the (code development) battle. You can find plugins for them for almost any purpose. Their UI's simplicity and harshness means that they can launch in milliseconds. You can also pimp Your editor like a true gangsta and gain some respect in the neighbourhood. Their advanced keymapping options will make Your fingers dance on the keyboard like John Travolta and Karen Lynn Gorner without getting saturday night fever.

# Coders just wanna have fun

In the earliest days of my carreer I had pleasure to work with awesome programmers who used vim as their main tool for code. At that day I was mainly focused to learn programming itself, rather than text editor usage - I think it would be a huge waste of time (especially that I was a beginner programmer).

In my current job some programmers switched from their advanced IDEs to emacs. Their first days of work with new tool were quite funny - they make code many times slower than before, and have problems with handling basic text editor operations :) However, after some time I've noticed significant improvement in their workflow - they're now coding as fast as in the days when they used their IDEs.
Now they have tools that  are easier to re-setup on every new machine they have to work on, and it uses much less their computer resources. These pros convinced me to give a shot and try something new.

![img](/static/hobbit_adventure.gif)
*Gif found at giphy.com - author unknown*

# First days of summer

I don't want to start next Text Editors (flame) War, so I'll tell why I've chosen vim over emacs: just because I could :) I've seen how coders are working on both of then and vim's workflow is just more intuitive for me(I think it's very personal taste/preference).

At the moment of writing this sentence I have configured my vim on pretty advanced level - it works (almost) completely like I want it to work (only couple shortcuts are missing but before publishing this post I think my `.vimrc` file will be complete).

If You are curious where to start I can recommend [vimtutor](http://linuxcommand.org/man_pages/vimtutor1.html). It is an interactive, ~30minutes-long lesson which will learn You most of the vim fundamentals. It was my only source of information about vim, before I decided to switch (so You should probably try it right now).

I've configured my vim basing on my current needs - when I've found something really annoying or difficult I just googled how to customize/modify/remove it using `.vimrc` file & its plugins.

# Ladies and gentleman..

Here's my complete `.vimrc` file (at the day 08/02/2015):

```
set nocompatible
filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#rc()


"vim plugin list


" plugin that shows functions/classes/etc. in right sidebar
Bundle 'majutsushi/tagbar'
" required to use Vundle
Plugin 'gmarik/Vundle.vim'
" plugin that provides smart auto-tabs
Plugin 'godlygeek/tabular'
" javascript syntax support for vim
Plugin 'jelera/vim-javascript-syntax'
" plugin that provides autocompletion support
Plugin 'ervandew/supertab'
" CSS syntax support for vim
Plugin 'vim-scripts/Better-CSS-Syntax-for-Vim'
" markdown syntax support for vim
Plugin 'plasticboy/vim-markdown'
" plugin that provides support for transparency colors (theme-related) in vim
Plugin 'godlygeek/csapprox'
" plugin that provides quick closing HTML tags
Plugin 'docunext/closetag.vim'
" NERDtree plugin for filesystem left sidebar
Plugin 'scrooloose/nerdtree'
" plugin that provides fancy infobar at the bottom of the vim
Plugin 'vim-airline/vim-airline'
" tender color scheme for vim
Plugin 'jacoborus/tender'
" plugin that provides better scrolling experience in vim
Plugin 'yonchu/accelerated-smooth-scroll'
" plugin for closing buffers and not switching to NERDTree
Plugin 'rbgrouleff/bclose.vim'
" plugin for js autocompletion
Plugin 'Valloric/YouCompleteMe'
" after installing YouCompleteMe plugin You need to compile the main core:
"   cd ~/.vim/bundle/YouCompleteMe
"   ./install.py --all
" Vue.js syntax highlighting
Plugin 'posva/vim-vue'
" emmet plugin for fast development
Plugin 'mattn/emmet-vim'

"vim's plugins additional config


" fix for airline transparent characters ("^^^^")
set fillchars+=stl:\ ,stlnc:\ "
" launch NERDtree plugin on vim start
autocmd vimenter * NERDTree
" ignore given filetypes in NERDTree
let NERDTreeIgnore = ['\.pyc$']
" set tab sizing
set tabstop=2
set shiftwidth=2
set softtabstop=2
set expandtab
" display line numbers
set number
" use auto indentation
set autoindent
" highlight search results
set hlsearch
" set search case to insensitive
set ignorecase
" set encoding
set encoding=utf-8
" enable status line in vim airline
set laststatus=2
" extra way to exit insert mode
set esckeys
" remove the delay of switching modes after hit Esc key
set timeoutlen=1000 ttimeoutlen=0
" buffer-related fix for saved/not saved files
set hidden
" enable syntax highlight
syntax enable
" set vim color mode to 256 - it solves couple problems with vim color schemes
set t_Co=256
" use tender colorscheme command
colorscheme tender
" this keeps cursor almost always in the middle of the vim screen
set scrolloff=20
" fix for slow scroll in large files
set ttyfast
" add current line highlight (may cause scroll lag)
set cursorline
" set temp directory
set directory=~/.vim/tmp
" set backup off
" set nobackup
" line below solves webpack hot reloading issues
set backupcopy=yes
" set swap off
set noswapfile
" fix for slow redraw
set lazyredraw
" set python path for YouCompleteMe plugin
let g:ycm_server_python_interpreter = '/usr/bin/python'
" YouCompleteMe autoclosing
let g:ycm_autoclose_preview_window_after_completion=1
" airline bottom information bar additional configuration
let g:airline#extensions#tagbar#enabled = 1
let g:airline#extensions#tagbar#flags = 'f'
let g:airline#extensions#tabline#enabled = 1
" set paste for pasting without extra tabs
" set noai
" set paste
" set clipboard=unnamed


" vim custom keymap


" erase tab
map ,, <<
" add tab
map .. >>
" remove tab for all lines in brackets
map ,/ <%
" add tab for all lines in brackets
map ./ >%
" toggle NERDtree on double tap "T"
map tt :NERDTreeToggle<CR>
" jump 10 lines below
map <C-j> 10j
" jump 10 lines top
map <C-k> 10k
" tap space to enter insert mode
nmap <Space> i
" toggle right tagbar plugin
map [] :TagbarToggle<CR>
" double tap CTRL + Up to jump 10 lines up
nnoremap <C-Up><C-Up> 10k
" double tap CTRL + Down to jump 10 lines below
nnoremap <C-Down><C-Down> 10j
" go to next buffer/file/tab
nnoremap ]] :bn<CR><Esc>
" go to prev buffer/file/tab
nnoremap [[ :bp<CR><Esc>
" enter next vim sub-window
nnoremap <C-[><C-]> <C-w><C-w>
" hit Del button to delete character and enter insert mode
nnoremap <Delete> <Delete>i
" hit Enter key to clear search results highlights
nnoremap <CR> :noh<CR><CR>
" close currend buffer but stay in current tab and open previous/existing buffer
nnoremap qq :Bclose<CR>
" jump to the end of the file
nnoremap ff G
" expand emmet shortcut on tab key
let g:user_emmet_expandabbr_key='<Tab>'
imap <expr> <tab> emmet#expandAbbrIntelligent("\<tab>")
```

# But it's a nightmare! How to handle it?!


I've tried to start working with vim 3 times in total. Previous 2 times was a huge disappointments due to lack of real understanding how to use it.

At first, You have to realise, that there's no point in copy-paste'ing other's people *absolute perfect vimrc configuration* - this is YOUR code editor and it should be configured absolutelly just-any-only by YOURSELF. I've read many vim haters blog posts and most of them were using someone's vimrc configs - I had to try code with vim two times before I've realise that.

Secondly - before jumping deep into vim adventure try couple courses - personally (as I've mentioned earlier in this post) [vimtutor](http://linuxcommand.org/man_pages/vimtutor1.html) explained me well all vim basics.

![img](/static/try_vim_racoon.jpg)
*Raccoons know what's best for you*

And finally - don't use vim because someone told You so. To be honest - I've tried vim because I was bored with my previous (~5 years old)  workflow - I knew that I have to change something to have fun again from making code - and I've found vim to be the solution.

If my story inspired You to use some of the oldschool editors (not necessarily vim) - make me happy and [let me know](http://twitter.com/ofcapl) about it.

-- ł.
