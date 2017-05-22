---
layout: page
title: Git Lesson
permalink: /git-lesson/
---

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<!--<script src="../assets/jquery-3.2.1.min.js"></script>-->
<script src="../assets/toc.js"></script>
<script src="../assets/git-obj-id.js"></script>

* TOC
{:toc}

<div id="menu" markdown="1" draggable="true">
</div>

<!-- Forms to edit commit IDs -->
<div id="error-msg"></div>
<div id="info-msg"></div>

<div id="first-commit-edit" class="goi-edit" markdown="1">
Enter your own *first-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="second-commit-edit" class="goi-edit" markdown="1">
Enter your own *second-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="third-commit-edit" class="goi-edit" markdown="1">
Enter your own *third-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="to-lose-commit-edit" class="goi-edit" markdown="1">
Enter your own *to-lose-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="detached-commit-edit" class="goi-edit" markdown="1">
Enter your own *detached-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="amended-commit-edit" class="goi-edit" markdown="1">
Enter your own *amended-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="first-tree-edit" class="goi-edit" markdown="1">
Enter your own *first-tree* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="second-tree-edit" class="goi-edit" markdown="1">
Enter your own *second-tree* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="folder-A-tree-edit" class="goi-edit" markdown="1">
Enter your own *folder-A-tree* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="folder-B-tree-edit" class="goi-edit" markdown="1">
Enter your own *folder-B-tree* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="file-B-blob-edit" class="goi-edit" markdown="1">
Enter your own *file-B-blob* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="leapfrog-one-commit-edit" class="goi-edit" markdown="1">
Enter your own *leapfrog-one-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="leapfrog-two-commit-edit" class="goi-edit" markdown="1">
Enter your own *leapfrog-two-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="merge-commit-edit" class="goi-edit" markdown="1">
Enter your own *merge-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="work-A-commit-edit" class="goi-edit" markdown="1">
Enter your own *work-A-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="work-A-merge-commit-edit" class="goi-edit" markdown="1">
Enter your own *work-A-merge-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>
<div id="work-B-commit-edit" class="goi-edit" markdown="1">
Enter your own *work-B-commit* ID: <input type="text"><br>
(Enter to submit; Escape to cancel)
</div>

# Overview

This Git lesson brings you through a typical workflow with Git, consisting 3 areas.

* Local clone
* Remote operations
* Collaboration techniques (more to come later)

Git is primarily a *collaboration tool*.

Even if you only use Git on your own, bear in mind that version control is necessary for you to "*collaborate with yourself*". We typically go through a decent length project often asking questions like "*why did I do that last month?*", "*what was I thinking when I made this decision?*", "***what if** I take a new fangled approach I just learned?*", and so on.

This Git lesson is written to be as trim as possible. You can safely ignore side notes like this:

<div class="side-note">
Serious about programming? Get the cheapest Mac there is. It is difficult to find cheap Linux laptops in Singapore, possibly due to the IT culture (or lack thereof) in Singapore.
</div>

But you should especially note important tips like this:

<div class="tip" markdown="1">
<p>Grasp concepts first, lookup technical details later. Learning before working, looking before leaping!</p>
<p>Important tips are places where you should pause and grasp the concepts just demonstrated.</p>
<p>Shoot me an email if any part of this lesson bogs you down and impedes you from progressing rapidly.</p>
</div>

However, you should look out for fast-forward suggestions like this:

<div class="forward" markdown="1">
The last paragraph of this section mentions "*how to create Git branch*". Gloss over that quickly; Git *branch*es will be explored in detail later.
</div>

Lastly, you must execute shell (Bash) commands presented like this: <span class="perform">`ls -la`</span> (inline). And like this:
<div class="perform">{% highlight shell %}
cd ~/Document     # This is a comment you don't type in
ls -la     # Comments do nothing, even if you type them in
{% endhighlight %}</div>

In short, read and understand the concepts explained. The explanation is mostly demonstrated rather than described abstractly. Follow the demonstrations by executing commands that are styled as mentioned above.

There will be no in-depth treatment of "*how*" to do stuff; you can google "*how to create Git branch*" and easily find `git branch <name> <ref>`. The focus of this Git lesson is on concepts (*what*) and rationale (*why*).

# Prerequisites

This Git lesson is taught using a *nix platform (eg Linux, MacOS), in particular Bash.

If you're on Linux or MacOS, you're a productive and efficient coder, and you should expect to blaze through this Git lesson in less than an hour.

If you're on Windows, you can install [Git for Windows](https://git-for-windows.github.io), and use *Git Bash*. Meantime, keep bugging [Jon](https://bitbucket.org/{{ site.bitbucket_username }}) to complete his "*Crash Course for Productivity on Linux/MacOS*".

# First Steps

We will start by creating our first Git *commit*. There will be a few first steps to do before we achieve that.

## Local Git Repository

A Git repo (short for repository) contains:

* A copy of the **files** that you're working on (aka *working copy*)
* The **history** of your work on said files.

You start a local Git repo like this:
<div class="perform">{% highlight shell %}
cd ~/Documents     # Keep all your work in your own folder.
mkdir my-new-project     # This folder will contain the files for your new project.
cd my-new-project     # Enter the folder you created above.
git init     # Start the Git repo in this folder.
{% endhighlight %}</div>

A Git repo tracks a *folder* of files, so the said **files** are really the files in that *folder*.

<div class="tip">
<p markdown="1">A Git repo resides in a *folder*, and can potentially (and usually does) track all files in that *folder*.</p>
<p markdown="1">That means you really shouldn't `git init` in a *top-level folder* like `~/Documents` or `/usr/local`! You want to track the progress of your projects, not every single file in your computer.</p>
</div>

### The `.git` Folder

`ls -la` will show you the `.git` folder that was created when you started a new Git repo. This [hidden folder](https://en.wikipedia.org/wiki/Hidden_file_and_hidden_directory) contains Git data --- data regarding the **history** of your work, data about your credential, and other stuff we want to ignore for now.

<div class="tip"><p markdown="1">The `.git` folder is what defines your Git repo.</p></div>

We're now interested in `.git/config`, where your credential is stored. The content of that file (do <span class="perform">`cat .git/config`</span>) should currently be (with some omissions):
{% highlight conf %}
[core]
	filemode = true   # false if you're on Windows
	bare = false
    ...
{% endhighlight %}

Let's input a credential for you now, using fictitious, but important, values. Follow along, please!
{% assign git-name = site.data.git-lesson.git-credential.name %}
{% assign git-email = site.data.git-lesson.git-credential.email %}
<div class="perform">{% highlight shell %}
git config user.name "{{ git-name }}"
git config user.email {{ git-email }}
{% endhighlight %}</div>

Now, these new lines will have been inserted into `.git/config`. Doing <span class="perform">`cat .git/config`</span> shows:
{% highlight conf %}
[user]
	name = {{ git-name }}
	email = {{ git-email }}
{% endhighlight %}

<div class="side-note">
<p markdown="1">As you would intuitively perceive, you can have different credentials for different projects. A typical use case would be having one credential for work (eg, user\_id@sutd.edu.sg) and another for personal projects (eg, user\_id@gmail.com).</p>
</div>

*Manually editing* that config file is possible and equivalent to performing `git config`.

<div class="side-note">
<p markdown="1">If there is a credential you almost always use, you can put it in the global Git config at `~/.gitconfig` via a command like `git config --global user.name "{{ git-name }}"`.</p>
<p>Local Git config parameters override global ones.</p>
</div>

### Working Copy

Create file `story.txt` (eg. <span class="perform">emacs story.txt</span>), and enter into it these 3 lines:
{% assign linenos = "1 2 3" | split: " " %}
{% include linenos.html numbers=linenos %}
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn looked around.
{% endhighlight %}

<div class="side-note" markdown="1">
Your text editor may insert a 4th line --- a blank line --- at the end of `story.txt`. The historical reasons for that stem from [C Standards for non-empty files](http://c0x.coding-guidelines.com/5.1.1.2.html#123), from [Posix's definition of *Line*](http://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap03.html#tag_03_206), and various other sources related to *software's ability to process instructions in text files*. In this Git lesson, we don't care about any of that; our `story.txt` is a story, not computer instructions. Just be consistent in the way you write your files, ending new-line or no.
</div>

<div class="tip">
<p markdown="1">Everything outside of the `.git` folder is a **working copy** of the files you are working on for the project.</p>
</div>

<div class="forward" markdown="1">
That is, with the exception of **untracked files** and **ignored files**, which we will explore later on.
</div>

## Git Status --- Change Summary

<div class="tip" markdown="1">
`git status` shows a summary of the changes you've made since the last commit.
</div>

<div class="forward" markdown="1">
There is no *last commit* as of right now. But the phrase "*since the last commit*" will become clearer later on.
</div>

<span class="perform">`git status`</span> will show this:
<pre>
<code>On branch master

Initial commit

Untracked files:
  (use "git add &lt;file&gt;..." to include in what will be committed)

    <span class="git-red">story.txt</span>

nothing added to commit but untracked files present (use "git add" to track)</code>
</pre>

You have added a new file to your Git repo. New files --- files not yet tracked by your Git repo --- are called **untracked files**.

<div class="side-note">
Untracked files are shown in red.
</div>

Ignore all other information in that output for now.

We'll follow Git's advice and *work towards* adding our new file to the Git repo.

<div class="tip" markdown="1">
<p markdown="1">`git status` is a command you will use very often:
</p>
- Before you start work on a new set of changes (initial check)
- In the process of staging files (progress check)
- Before you commit changes (final check)
- Whenever in doubt, and so on.
</div>

## Staging Area

When telling Git to commit your new work, Git only commits what you place in the **staging area**.

<span class="perform">`git add story.txt`</span> will put `story.txt` into the *staging area*, and a subsequent <span class="perform">`git status`</span> will show:
<pre>
<code>On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached &lt;file&gt;..." to unstage)

    <span class="git-green">story.txt</span></code>
</pre>

<div class="side-note">
Staged work (new files or updates to existing files) are shown in green.
</div>

You can unstage work using `git rm --cached <file>`. Feel free to practice unstaging the staged work and re-staging that work.

<div class="tip">
<p markdown="1">The *staging area* allows you to work on multiple ideas rapidly --- as and when they come to mind --- but yet still be able to organize your changes into *coherent* and *integral* units.</p>
</div>

To demonstrate the purpose of having a *staging area*, create a new file `rough_thoughts.txt` (eg. <span class="perform">`emacs rough_thoughts.txt`</span>) and enter this line:
{% highlight text %}
Random disorganized thoughts. Don't want to git-track this.
{% endhighlight %}

<span class="perform">`git status`</span> will now show:
<pre>
<code>On branch master

Initial commit

Changes to be committed:
  (use "git rm --cached &lt;file&gt;..." to unstage)

    <span class="git-green">story.txt</span>

Untracked files:
  (use "git add &lt;file&gt;..." to include in what will be committed)

    <span class="git-red">rough_thoughts.txt</span></code>
</pre>

In the above demonstration, you might have some new ideas you want to quickly write down in `rough_thoughts.txt` before you forget those ideas. Yet, you might not want those underdeveloped new ideas to be committed in your next set of changes.

## Committing Your Work

{% assign commit-msg-file = site.data.git-lesson.commit-msg-file %}

You can use any text editor to create file `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span>). Enter into it these 5 lines:
{% highlight text %}
Adds first work on the story

I'd think up more descriptive information here if I could.
That first line above should be a short summary, with no ending period.
Then comes a blank line, and then details and descriptions follow.
{% endhighlight %}

<div class="tip" markdown="1">
The file `{{ commit-msg-file }}` is the only file you will ever create in folder `.git`. Git actually creates that file itself under certain circumstances.
</div>

You then commit your work by doing <span class="perform">`git commit -F {{ commit-msg-file }}`</span>.

<div class="side-note">
<p markdown="1">If you want to use Emacs as a *commit message editor*, you can configure Git to use Emacs. Do the configuration with `git config --global core.editor emacs`. The default editor is [vi][vi]. You can then verify your editor configuration in `~/.gitconfig`. That file can also be edited by hand.</p>
<p markdown="1">You can then do just `git commit -v` and see your chosen text editor pop up, enter your commit message, save like you're saving a file (you're actually saving `{{ commit-msg-file }}`), and finally exit the text editor. That sequence of actions will commit your changes.</p>
</div>

[vi]: https://www.cs.colostate.edu/helpdocs/vi.html

<div class="tip">
<p markdown="1">It is usually better to collect your thoughts in a file when you construct your commit message. The `-F` option lets you specify a file that contains your commit message.</p>
</div>


## Git Log --- A Timeline

{% assign first-commit = site.data.git-lesson.git-commits.first.id %}
{% assign first-commit-date = site.data.git-lesson.git-commits.first.date %}
{% assign first-commit-timestamp = site.data.git-lesson.git-commits.first.timestamp %}

<span class="perform">`git log --decorate --graph`</span> will show your first commit. Later on when you have more commits, `git log` will show a connected graph (timeline) of all your commits. Right now, you only have 1 commit:
<pre>
<code>{% include git-log/ch.html commit-id=first-commit class="first-commit" full-id=true head=true attached="master" %}
  Author: {{ git-name }} <{{ git-email }}>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then whatever descriptive things I wanna say.</code>
</pre>

<div class="tip" markdown="1">
Click on the *commit ID* above to enter your own value. The rest of this lesson will follow suit. You can click on any *commit ID* anywhere and do the same edit.
</div>

Especially note the credential attached to that commit. Recall from [a previous section](#the-git-folder) where you configured your credential for this Git repo. This credential is what gets attached to every commit you make in this Git repo.

<div class="forward" markdown="1">
The `git log` option `--decorate` shows *git branches/tags*, concepts that will be explained later. The option `--graph` shows a visual representation (with connecting lines) of how *commits*  connect and form, well, a graph. How *commits* connect to one another will also be explained later.
</div>

<div class="tip" markdown="1">
`git log` lets you see *what was done before* to decide *what to do next*. You'll also often look at previous *commit messages* to guide you in creating new *commit messages*.
</div>

### Navigating the Git Log

`git log` shows the log in a `less` window ([navigation tips here](http://www.thegeekstuff.com/2010/02/unix-less-command-10-tips-for-effective-navigation)), which coincidentally is navigated similarly to a [`vi` window][vi].

<div class="side-note" markdown="1">
Turns out many *nix productivity tools are inter-related! Learn one, learn all! You'll see `vi`-like navigation in `less`, and `emacs`-like navigation in `bash`.
</div>

Shorten the height of your `bash` terminal such that `git log --decorate --graph` output exceeds that height. The log will be displayed in a `less` window, and you can practice navigating in that window.

<div class="tip" markdown="1">
Some basic navigation tips:
* `j` --- move down one line
* `k` --- move up one line
* `Ctrl-f` --- move down one screen
* `Ctrl-b` --- move up one screen
* `q` --- quit `less` view
</div>

# Some Internals

We start with Git objects, so that we can understand how Git *commit*s are built and hence grasp *what* Git *commit*s essentially are --- snapshots of your project (all its folders and files).

Soon after that, we get a handle on some internals that are actually crucial to normal use of Git --- some of Git's vocabulary (or terminology).

## Git Objects

A Git **Commit** is collection of *folders and files* contained in that *commit*. In short, Git is really a tracker for a *filesystem*.

<div class="tip" markdown="1">
A Git **Commit** is a **snapshot** of all your project files at a particular time (the time you created that *commit*). And your *project files* are represented by a collection of *folders and files*, potentially involving nested *folders*.
</div>

That's almost all you need to know about a Git **Commit**. Besides being a **snapshot** of all your project files, a Git **Commit** also has relations to other Git **Commit**s.

Technically, under the hood, Git represents *folders* with *trees* and *files* with *blobs*.

Now, we shall see how a Git **Commit** is a **snapshot** and how it relates to other Git **Commit**s.

Create a subfolder `folder-A` and a file `file-A.txt` inside:
<div class="perform">{% highlight shell %}
mkdir folder-A
echo "This is file-A." > folder-A/file-A.txt
{% endhighlight %}</div>

Create a subfolder `folder-B` inside `folder-A`, and files `file-B.txt` and `file-C.txt` inside:
<div class="perform">{% highlight shell %}
mkdir folder-A/folder-B
echo "This is file-B." > folder-A/folder-B/file-B.txt
echo "This is file-C." > folder-A/folder-B/file-C.txt
{% endhighlight %}</div>

Stage our new changes with <span class="perform">`git add folder-A`</span>.

<div class="side-note" markdown="1">
The `git add` command accepts *folders* and *files* as inputs, the former being handled recursively.
</div>

Check our *staging area* with <span class="perform">`git status`</span>:
<pre>
<code>On branch master
Changes to be committed:
  (use "git reset HEAD &lt;file&gt;..." to unstage)

	<span class="git-green">new file:   folder-A/file-A.txt</span>
	<span class="git-green">new file:   folder-A/folder-B/file-B.txt</span>
	<span class="git-green">new file:   folder-A/folder-B/file-C.txt</span>

Untracked files:
  (use "git add &lt;file&gt;..." to include in what will be committed)

	<span class="git-red">rough_thoughts.txt</span></code>
</pre>

<div class="forward" markdown="1">
Assuming we don't ever want to commit `rough_thoughts.txt`, it can be annoying to see Git constantly telling us that is an *untracked file*. Later on, we will learn how to tell Git to ignore certain folders and/or files.
</div>

We construct our *commit message* by editing `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span>):
{% highlight text %}
Adds nested folder structure

Just testing. We want to see Git Objects.
We should be seeing Commits, Trees and Blobs.
{% endhighlight %}

And now, we commit with <span class="perform">`git commit -F {{ commit-msg-file }}`</span>.

{% assign second-commit = site.data.git-lesson.git-commits.second.id %}
{% assign second-commit-date = site.data.git-lesson.git-commits.second.date %}
{% assign second-commit-timestamp = site.data.git-lesson.git-commits.second.timestamp %}

### Git Object Identifier

A look at Git Log via <span class="perform">`git log --decorate --graph`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" full-id=true head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" full-id=true %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

<div class="tip" markdown="1">
Click on the *Git Object ID*s above to enter your own value. The rest of this lesson will follow suit. You can click on any *Git Object ID*s anywhere and do the same edit.
</div>

{% assign first-commit-short = first-commit | slice: 0, 7 %}
{% assign second-commit-short = second-commit | slice: 0, 7 %}

<div class="tip" markdown="1">
Think of these **ID**s as unique identifiers, each uniquely representing a Git object (*commit*, *tree* or *blob*).
</div>

<div class="side-note" markdown="1">
These **ID**s are actually [SHA-1](https://en.wikipedia.org/wiki/SHA-1) *message digest*s.
</div>

### Anatomy of a Commit

**In the following instructions, replace my *commit ID*s with your own.**

{% assign second-tree = site.data.git-lesson.git-trees.second %}

Let's look at the *second-commit* via
<div class="perform"><pre>
<code>git cat-file -p <span class="second-commit-short goi">{{ second-commit-short }}</span></code>
</pre></div>
{% assign linenos = "1 2 3 4 5 6 7 8 9" | split: " " %}
{% include linenos.html numbers=linenos %}
<pre>
<code>tree <span class="second-tree goi">{{ second-tree }}</span>
parent <span class="first-commit goi">{{ first-commit }}</span>
author Author A <a@c.com> {{ second-commit-timestamp }} +0800
committer Author A <a@c.com> {{ second-commit-timestamp }} +0800

Adds nested folder structure

Just testing. We want to see Git Objects.
We should be seeing Commits, Trees and Blobs.</code>
</pre>

<div class="tip" markdown="1">
Click on the *Git Object ID*s above, even the *tree ID*, to enter your own value. The rest of this lesson will follow suit. You can click on any *Git Object ID*s anywhere and do the same edit.
</div>

From the third line of that output, we see the *commit message* for our *second-commit*.

The second line indicates that our *second-commit* is linked to our *first-commit* (via the property `parent`).
<div class="figure" markdown="1">
![commits-joined](../assets/commit-parent.svg)
</div>

<div class="tip" markdown="1">
New *commit*s are added **downstream**. Swimming **upstream** brings you to earlier commits. The above example has *commit C1* upsteam of *commit C2*.
</div>

<div class="forward" markdown="1">
We will learn later that *commits* are connected as [Singly Linked Lists](https://en.wikibooks.org/wiki/Data_Structures/Singly_Linked_Lists), but in reverse order; later commits link to earlier commits, and not vice versa. We will also learn that *commits* can have multiple *parents*, which is the mechanism by which we *merge branches (timelines)*.
</div>

{% assign first-tree = site.data.git-lesson.git-trees.first %}

And to confirm that our *second-commit* really links to our *first-commit*, we take a peek at the *first-commit* by doing:
<div class="perform">
<pre><code>git cat-file -p <span class="first-commit-short goi">{{ first-commit-short }}</span></code></pre>
</div>
{% assign linenos = "1 2 3 4 5 6 7 8 9" | split: " " %}
{% include linenos.html numbers=linenos %}
<pre>
<code>tree <span class="first-tree goi">{{ first-tree }}</span>
author Author A <a@c.com> {{ first-commit-timestamp }} +0800
committer Author A <a@c.com> {{ first-commit-timestamp }} +0800

Adds first work on the story

I'd think up more descriptive information here if I could.
That first line above should be a short summary, with no ending period.
Then comes a blank line, and then details and descriptions follow.</code>
</pre>

{% assign first-tree-short = first-tree | slice: 0, 7 %}
{% assign second-tree-short = second-tree | slice: 0, 7 %}

<div class="forward" markdown="1">
Git objects **tree** and **blob** are only useful here for the concept exploration of **commit**. You won't be bothering with *tree* or *blob* once we have taken apart the anatomy of a *commit*.
</div>

The *first-tree* and *second-tree* are 2 different *snapshots*, the first being taken by our *first-commit* and the second by our *second-commit*. Based on the folders and files we created so far, we know both trees look like:
{% highlight text %}
first-tree
  |
  |-- story.txt

second-tree
  |
  |-- story.txt
  |-- folder-A
          |
          |-- file-A.txt
          |-- folder-B
                  |
                  |-- file-B.txt
                  |-- file-C.txt
{% endhighlight %}

Just a little more down the rabbit hole...

{% assign git-tree-folder-A = site.data.git-lesson.git-trees.folder-A %}
{% assign git-tree-folder-A-short = git-tree-folder-A | slice: 0, 7 %}
{% assign git-tree-folder-B = site.data.git-lesson.git-trees.folder-B %}
{% assign git-tree-folder-B-short = git-tree-folder-B | slice: 0, 7 %}
{% assign git-tree-file-B = site.data.git-lesson.git-trees.file-B %}
{% assign git-tree-file-B-short = git-tree-file-B | slice: 0, 7 %}

Let's confirm that our *second-tree* does indeed contain the hierarchy we conjectured above.
<div class="perform"><pre><code>git cat-file -p <span class="second-tree-short goi">{{ second-tree-short }}</span></code></pre></div>
<pre>
<code>040000 tree <span class="folder-A-tree goi">{{ git-tree-folder-A }}</span>	folder-A
100644 blob 2a8621f3fe966d677330a471450bd54a539162a2	story.txt</code>
</pre>

Indeed, our *second-tree* has a tree (`folder-A`) and a blob (`story.txt`).

Chase that nested *tree* further down by:
<div class="perform"><pre><code>git cat-file -p <span class="folder-A-tree-short goi">{{ git-tree-folder-A-short }}</span></code></pre></div>
<pre>
<code>100644 blob 0e82526a4ea4a0031220e1e872d2c6abab945ccb	file-A.txt
040000 tree <span class="folder-B-tree goi">{{ git-tree-folder-B }}</span>	folder-B</code>
</pre>

And further down by:
<div class="perform"><pre><code>git cat-file -p <span class="folder-B-tree-short goi">{{ git-tree-folder-B-short }}</span></code></pre></div>
<pre>
<code>100644 blob <span class="file-B-blob goi">{{ git-tree-file-B }}</span>	file-B.txt
100644 blob 8458d5e043e7546ff08a0292699a75536f87bcaa	file-C.txt</code>
</pre>

And finally, a peek into a **Blob** Git object by:
<div class="perform"><pre><code>git cat-file -p <span class="file-B-blob-short goi">{{ git-tree-file-B-short }}</span></code></pre></div>
{% highlight text %}
This is file-B.
{% endhighlight %}

{% assign git-tree-file-B = site.data.git-lesson.git-trees.file-B %}
{% assign git-tree-file-B-short = git-tree-file-B | slice: 0, 7 %}

To fully take stock of all the Git objects we currently have, <span class="perform">`find .git/objects -type f`</span> shows:
{% highlight text %}
.git/objects/{{ first-tree | slice: 0, 2 }}/{{ first-tree | slice: 2, 100 }}
.git/objects/{{ second-tree | slice: 0, 2 }}/{{ second-tree | slice: 2, 100 }}
... and so on ...
{% endhighlight %}

You can find your recorded *commit IDs* among the above output.

<div class="side-note" markdown="1">
Note that the Git objects are likely organized into a [hashtable](https://en.wikipedia.org/wiki/Hash_table), where the 1st 2 digits of the *object ID* is the *bucket ID*.
</div>

<div class="side-note">
<p markdown="1">To check their types (**Commit**, **Tree**, **Blob**), you can do `find .git/objects -type f | cut -d'/' -f3,4 | sed 's/\///' | xargs -I %ID -t git cat-file -t %ID`.</p>
<p markdown="1">Or simply do them 1 by 1: `git cat-file -t <1st-7-digits-of-ID>`.</p>
</div>

<div class="tip" markdown="1">
A Git **Commit** has 3 components:
* Snapshot --- of the project folders/files (Git **Tree** object)
* Parent(s) --- 0 or more links to immediate parent(s) (Git **Commit** object)
* Commit Message --- the *commit message* for itself (plain text)
</div>

<div class="forward" markdown="1">
You will notice that the Git Object ID for *tree*s and *blob*s remain the same (same for yours and mine), but that for *commit*s are different. We'll look into *commit* IDs later on, when we explore *commit amends*.
</div>

<div class="tip" markdown="1">
A ***Commit* ID** takes into account the **timestamp** (time that the *commit* was created) of its *commit*. Hence, all *commit* IDs are different, even if the *snapshot* and *commit message* (*author*, *committer*  and *message*) remain the same.
</div>

## Git References

<div class="tip" markdown="1">
Git **references** allow us to refer to Git objects using *label*s (more human-friendly) rather than the *Git object ID*s.
</div>

The types of Git *references* are:
* *Branch* (local and remote)
* *Tag*
* `HEAD` (special kind of reference, special semantics)

<div class="forward" markdown="1">
**Branch**es, **Tag**s and the `HEAD` will be explained in more detail later.
</div>

We currently have 1 branch --- "*master*". (`git branch` shows all branches)

This is actually a *reference* to our *second-commit*, as seen by <span class="perform">`git log --decorate --oneline master`</span>:
<pre>
<code><span class="git-yellow"><span class="second-commit-short goi">{{ second-commit-short }}</span> (<span class="git-blue">HEAD -></span> <span class="git-green">master</span>)</span> Adds nested folder structure
<span class="git-yellow"><span class="first-commit-short goi">{{ first-commit-short }}</span></span> Adds first work on the story</code>
</pre>

Confirm this by doing <span class="perform">`cat .git/refs/heads/master`</span> and also <span class="perform">`git branch -v`</span>. Note that the *Git object ID* is the same in both places:
<pre><code><span class="second-commit goi">{{ second-commit }}</span>
* <span class="git-green">master</span> <span class="second-commit-short goi">{{ second-commit-short }}</span> Adds nested folder structure</code>
</pre>

### Human-Friendlier GOIs

In the spirit of Git *reference*s, let's make *Git Object ID*s more human-friendly too.

<div class="tip" markdown="1">
*Git Object ID*s is still *not* the right way to work in Git. Git *reference*s is the right way!
</div>

We set a parameter for `git log` like this: <span class="perform">`git config log.abbrevCommit true`</span>.

A subsequent <span class="perform">`git log --decorate --graph`</span> shows 7-character *commit ID*s:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

<div class="tip" markdown="1">
If you ever need to see the full 40-character *Git Object ID* for your *commit*s, just add option `--no-abbrev` like so: `git log --decorate --graph --no-abbrev`. That option goes nearly everywhere, such as `git reflog --no-abbrev` (*reflog* is explained later).
</div>

### Swimming Upstream

<div class="tip" markdown="1">
The `~` operator takes in a number that tells Git how many commits you want to swim upstream **relative to a Git reference**. The result is the *commit* Git lands on after performing that operation.
</div>

<span class="perform">`git log --decorate --oneline master~1`</span> shows us our *first-commit*, which is 1 step upstream of our *second-commit*:
<pre><code><span class="git-yellow"><span class="first-commit-short goi">{{ first-commit-short }}</span></span> Adds first work on the story</code></pre>

There is no way to swim *downstream*. Git *commit*s do not have a property that is a counterpart to `parent`.

## The `HEAD`

<div class="tip" markdown="1">
The `HEAD` is a special Git reference that refers to the **current commit** you're on.

Your *next new commit* will have this *current commit* as its *parent*, and that *new commit* becomes the new **current commit**.
</div>

That is the definition, so to speak, of the `HEAD`. It concisely describes everything that the `HEAD` does (its function), besides what the `HEAD` is (a Git *reference*).

We will next look at how to **manually move** the `HEAD`.

### Moving the `HEAD`

<div class="tip" markdown="1">
The `HEAD` is **manually moved** via a `git checkout <ref | id>` command, where `ref` can be any Git *reference* (*branch* or *tag*) and `id` is a *Git object ID*.
</div>

<div class="tip" markdown="1">
Quick tip on **command specification format**. Angle brackets (`< >`) denote required parameters, square brackets (`[ ]`) denote optional parameters. The vertical bar (`|`) denotes "*or*". Therefore, the above spec means "*you must include a ref (Git reference) or an id (Git object ID)*".
</div>

There are other ways of moving the `HEAD`, the most commonly seen of which is the **advancement** via a `git commit`. As per the definition of the `HEAD`, the `HEAD` is *advanced* to the newly created *commit* upon a `git commit`. This method of moving the `HEAD` is referred to as **creating a commit**, and is not a manual movement of the `HEAD`. We've seen this happen when we created our *first-commit* and *second-commit*.

<div class="forward" markdown="1">
We will explore other ways of moving the `HEAD` later. For now, we stick with the `git checkout <ref | id>` method, in particular `git checkout <branch>`.
</div>

The `HEAD` can have 3 states --- *attached*, *detached* and *initial*.

### Initial `HEAD`

When we created our Git repo via `git init`, these happened:
* The default *branch* <span class="git-green">master</span> is *readied* (not yet created)
* The `HEAD` is *attached* to <span class="git-green">master</span>.
* The `HEAD` refers to no *commit* (none exist yet) --- an initial state.

This is the only time when the `HEAD` exists in that initial state.

<div class="tip" markdown="1">
A Git **branch** is conceptually a **string of connected *commit*s**, and is technically just a Git **reference** (pointer). That's all we need to know about *branch*es for now.
</div>

<div class="forward" markdown="1">
The concept of **branch** will be explored in more detail later on.
</div>

We need to know nothing more of this *initial* state. We don't work with this *initial* state.

As can be seen, the usual state of the `HEAD` is *attached* (to *branch* <span class="git-green">master</span> by default). This is true even when the `HEAD` is in its *initial* state.

The usual state of the `HEAD`, during your normal use of Git, is that of being **attached** to a *branch*. We will explore this usual state next.

### `HEAD` With Branch

This is the usual state of the `HEAD`, that of being **attached** to a *branch*.

When we created our first *commit*, the `HEAD` was **advanced** to our newly created *first-commit*. And similarly for *second-commit*.

Note that the *branch* to which the `HEAD` is *attached* is *advanced similarly*.

We can see that the `HEAD` is currently *attached* to *branch* <span class="git-green">master</span> via <span class="perform">`git log --decorate --graph`</span>:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...</code>
</pre>

<div class="tip" markdown="1">
An **attached** `HEAD` is shown with an arrow pointing to the *branch* it is attached to. Like this: <code><span class="git-blue">HEAD -></span> <span class="git-green">branch-name</span></code>
</div>

### Detached `HEAD`

A *detached* `HEAD` is used to take a look-see at any *commit*, especially *commit*s that are not at any *branch head*.

<div class="forward" markdown="1">
We will discuss **branch head** in detail later on.
</div>

<div class="tip" markdown="1">
Performing a **checkout** with a Git *branch* plus a [`~` operator](#swimming-upstream) will lead to a *detached* `HEAD`.

In fact, performing a **checkout** with *just the branch reference* itself is the only way to *attach* `HEAD`.
</div>

To see a *detached* `HEAD`, we do a checkout via <span class="perform">`git checkout master~0`</span>, to which Git issues this warning:
<pre>
<code>Note: checking out 'master~0'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b &lt;new-branch-name&gt;

HEAD is now at <span class="second-commit-short goi">{{ second-commit-short }}</span>... Adds first work on the story</code>
</pre>

<div class="forward" markdown="1">
We will discuss **detached** `HEAD` in more detail later, along with its typical use case and its common pitfalls. We will leave the above warning alone for now.
</div>

The subsequent <span class="perform">`git log --decorate`</span> shows that the `HEAD` is not *attached* to any *branch*:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" head=true branch="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...</code>
</pre>

Even though we're still on the same *commit* that *branch* <span class="git-green">master</span> is on, the `HEAD` is detached.

<div class="tip" markdown="1">
**Checking out** (switching to) a *branch* (`git checkout <branch>`) **attaches** the `HEAD` to the *branch*.
</div>

We re-attach the `HEAD` to *branch* <span class="git-green">master</span> with <span class="perform">`git checkout master`</span>. Then, a <span class="perform">`git log --decorate --graph`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...</code>
</pre>

## Reflog

Git **reflog** is like an "*Undo history*" (recent history) for Git *references*. For example, the *reflog* for the `HEAD` shows the recent changes to the `HEAD`.

*Reflog*s only exist for *branch*es and for the `HEAD`.

It is meaningless to have *reflog*s for *tag*s, since *tag*s do not (and are not meant to) move like *branch*es and the `HEAD` do.

`git reflog <branch>` shows the *reflog* for *branch* <span class="git-green">&lt;branch&gt;</span>

`git reflog` or `git reflog HEAD` shows the *reflog* for the `HEAD`

<div class="tip" markdown="1">
Omitting the Git *reference* in Git commands often means we mean to use `HEAD` for the *reference* parameter. Eg `git log` is equivalent to `git log HEAD`.
</div>

We will almost always be using *reflog* for the `HEAD`

### *Reflog* for `HEAD`

`git reflog` or `git reflog HEAD` shows the *reflog* for the `HEAD`.

<div class="tip" markdown="1">
A Git **reflog** for the `HEAD` shows the **recent changes** to the `HEAD`.
* **Advancement** (upon a new *commit*) --- denoted by **commit**
* **Checkout** --- denoted by **checkout**
* **Forced Movement** (via `git reset --hard`) --- denoted by **reset: moving**
</div>

<div class="forward" markdown="1">
We will look at `git reset` later on.
</div>

So far, we have witnessed 2 types of `HEAD` *change*: **commit** and **checkout**. Let's also witness them in the *reflog* for the `HEAD`.

A <span class="perform">`git reflog`</span> shows us these recent changes to the `HEAD`:
<pre>
<code><span class="git-yellow"><span class="second-commit-short goi">{{ second-commit-short }}</span></span> HEAD@{0}: checkout: moving from <span class="second-commit goi">{{ second-commit }}</span> to master
<span class="git-yellow"><span class="second-commit-short goi">{{ second-commit-short }}</span></span> HEAD@{1}: checkout: moving from master to master~0
<span class="git-yellow"><span class="second-commit-short goi">{{ second-commit-short }}</span></span> HEAD@{2}: commit: Adds nested folder structure
<span class="git-yellow"><span class="first-commit-short goi">{{ first-commit-short }}</span></span> HEAD@{3}: commit (initial): Adds first work on the story</code>
</pre>

Assuming you followed this Git lesson closely, your `HEAD`'s *reflog* should look exactly like the above.

Let's recall our past actions and match them with the *reflog* above, from the earliest (`HEAD@{3}`) to the latest (`HEAD@{0}`).

#### In the Beginning

When we created our Git repo (`git init`), Git created a *branch* <span class="git-green">master</span>. That *branch* is where the `HEAD` starts, where the `HEAD` is *attached*.

How did we arrive at `HEAD@{3}`?

<pre><code><span class="git-yellow"><span class="first-commit-short goi">{{ first-commit-short }}</span></span> HEAD@{3}: commit (initial): Adds first work on the story</code></pre>

Our first actions were to:
* Create a new file `story.txt` and enter some lines of text into it.
* Stage our work on `story.txt` (`git add`)
* Commit our work (`git commit`)

Yet, only the `git commit` action was recorded on the *reflog*. This gives us an important lesson:

<div class="tip" markdown="1">
Make *commit*s often. Git is only responsible for tracking your work when you **commit**.
</div>

<div class="side-note" markdown="1">
One of Agile's [first key paradigms](https://en.wikipedia.org/wiki/Agile_software_development#Iterative.2C_incremental_and_evolutionary) is *iterative and incremental* --- that is, commit your work often and in small pieces. What is work? Mistakes are work because they efficiently prune solution spaces. Eurekas are work because they are solutions themselves.
</div>

You will see that `HEAD@{3}` corresponds with your *first-commit*.

#### Explored Git Objects

How did we arrive at `HEAD@{2}`?

<pre><code><span class="git-yellow"><span class="second-commit-short goi">{{ second-commit-short }}</span></span> HEAD@{2}: commit: Adds nested folder structure</code></pre>

Our next action was a `git commit` that commited some nested folders and files in order to explore [Git Objects](#git-objects--commits-trees-blobs). This corresponds with your *second-commit*.

#### Detached the `HEAD`

How did we arrive at `HEAD@{1}`?

<pre><code><span class="git-yellow"><span class="second-commit-short goi">{{ second-commit-short }}</span></span> HEAD@{1}: checkout: moving from master to master~0</code></pre>

We performed a checkout via `git checkout master~0` to *detach* the `HEAD`. Since [`~0`](#swimming-upstream) means "*zero steps upstream of* <span class="git-green">master</span>", the `HEAD` points to the same *commit* that <span class="git-green">master</span> points to. This corresponds with our *second-commit*.

#### Attached the `HEAD`

How did we arrive at `HEAD@{0}`?

<pre><code><span class="git-yellow"><span class="second-commit-short goi">{{ second-commit-short }}</span></span> HEAD@{0}: checkout: moving from <span class="second-commit goi">{{ second-commit }}</span> to master</code></pre>

We performed a checkout via `git checkout master` to *attach* the `HEAD` to *branch* <span class="git-green">master</span>.

### *Reflog* for Branches

`git reflog <branch>` shows the *reflog* for said *branch*.

*Reflog*s for *branch*es work about the same way as *reflog* for the `HEAD`.

Since *branch*es can be deleted, thereby erasing all traces of their movements, there is less use for *reflog*s for *branch*es.

The `HEAD` can never be deleted, nor can its *reflog*.

<div class="side-note" markdown="1">
Please don't try `git reflog delete` for now. That deletes individual *reflog* entries; there's really no reason to mess with the individual entries in the *undo history*.
</div>

# Branches

<div class="tip" markdown="1">
A Git **branch** is conceptually a **string of connected *commit*s**, and is technically just a Git **reference** (pointer). That's all we need to know about *branch*es for now.
</div>

We will first demonstrate that a Git *branch* is simply a Git *reference* (pointer).

Currently, the only branch we have is the "*master*" branch, shown by <span class="perform">`git branch`</span>.

<div class="tip" markdown="1">
The branch name "*master*" is the convention for the *main branch* of a Git repo.
</div>

Our "*master*" branch is pointing to our second commit, as shown by <span class="perform">`git log --decorate --graph`</span>:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

Let's create a new *branch* named "*temp*" at our *first-commit* by doing <span class="perform">`git branch temp master~1`</span>. A <span class="perform">`git log --decorate --graph`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit branch="temp" class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

The fact that branches are really just Git *references* tells us that branches are simply pointers. We confirm this by comparing <span class="perform">`cat .git/refs/heads/temp`</span> with <span class="perform">`git branch -v`</span>:
<pre>
<code>* <span class="git-green">master</span> <span class="second-commit goi">{{ second-commit-short }}</span> Adds nested folder structure
  temp   <span class="first-commit-short goi">{{ first-commit-short }}</span> Adds first work on the story</code>
</pre>

<pre><code><span class="first-commit goi">{{ first-commit }}</span></code></pre>

<div class="tip" markdown="1">
Git **branch**es are simply pointers (or formally, Git *references*) pointing to **commit**s.
</div>

## Branch Head

Although **branch**es are technically merely pointers, Git still wants to use the term "*branch*" to actually denote a *branch* --- a line of connected **commit**s. That would be like a *branch* of timeline --- yes, we'll be using time travel as a fitting analog --- aka *an alternate history*.

Still with the time travel analog, 2 connected *branch*es would split (or stem) from a fork *upstream*. Relax, fork isn't a Git term, so we can forget that term.

<div class="forward" markdown="1">
It is possible for 2 *branch*es to connect *downstream*, as effected by a *merge*, besides forking apart *upstream*. The Git merge will be explained later.
</div>

<div class="side-note" markdown="1">
Git *commit*s join together to form a [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph). To imagine them as *timeline*s and an analog to *time travel*, dispense with *topological ordering*.
</div>

We will continue writing our story in `story.txt` from *branch* <span class="git-green">master</span>, and create a new *branch* <span class="git-green">git-obj-study</span> that points to our prior study of Git objects:
<div class="perform">{% highlight shell %}
git branch git-obj-study master     # git-obj-study points to second-commit
git branch -d temp     # Don't need branch 'temp' anymore
git reset --hard master~1     # Move branch 'master' upstream to first-commit
{% endhighlight %}</div>

<div class="tip" markdown="1">
`git reset --hard` **manually moves** (forced move) the `HEAD` to a specified *commit*. If the `HEAD` is *attached* at that time, the related *branch* is moved as well.
</div>

We can now witness our first `git reset` in the *reflog* via <span class="perform">`git reflog`</span>:
<pre><code><span class="git-yellow"><span class="first-commit-short goi">{{ first-commit-short }}</span></span> HEAD@{0}: reset: moving to master~1</code></pre>

Our story will continue properly from the *first-commit*. The *second-commit* was really a digression to understand Git objects. <span class="perform">`git log --decorate git-obj-study`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" branch="git-obj-study" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit class="first-commit" head=true attached="master" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

Edit file `story.txt` (eg. <span class="perform">`emacs story.txt`</span>) to contain (new lines 3-6):
{% assign linenos = "1 2 3 4 5 6 7" | split: " " %}
{% include linenos.html numbers=linenos %}
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn saw a rainbow.

The unicorn felt nothing about it.

The unicorn looked around.
{% endhighlight %}

Add our new work to the *staging area* by doing <span class="perform">`git add story.txt`</span>.

Edit file `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span>) to contain:
{% highlight text %}
Unicorn encounters a rainbow
{% endhighlight %}

Commit our new work by doing <span class="perform">`git commit -F {{ commit-msg-file }}`</span>.

{% assign third-commit = site.data.git-lesson.git-commits.third.id %}
{% assign third-commit-short = third-commit | slice: 0, 7 %}
{% assign third-commit-date = site.data.git-lesson.git-commits.third.date %}
{% assign third-commit-timestamp = site.data.git-lesson.git-commits.third.timestamp %}

A <span class="perform">`git log --decorate --graph git-obj-study master`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=third-commit class="third-commit" attached="master" head=true %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ third-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
<span class="git-red">|</span> {% include git-log/ch.html commit-id=second-commit class="second-commit" branch="git-obj-study" %}
<span class="git-red">|/</span> Author: Author A <a@c.com>
<span class="git-red">|</span>  Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>      Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

In the above `git log`, we can see that there are 2 branches --- <span class="git-green">master</span> whose *head* is at the *third-commit*, and <span class="git-green">git-obj-study</span> whose *head* is at the *second-commit*.

<div class="tip" markdown="1">
The **head**, aka *tip*, of a **branch** is the latest *commit* (furthest *downstream*) on the *branch*.
</div>

The fork for these 2 *branch*es is at our *first-commit*, just FYI.

## Garbage Collection

*Branch*es are important because they provide the only (normal) way for you to access *commit*s.

<div class="tip" markdown="1">
In terms of normal Git use, the only way to access *commit*s is via *branch*es.
</div>

That is, it is generally infeasible to refer to *commit*s via their [Git Object Identifiers](#git-object-identifier).

<div class="tip" markdown="1">
Unreferenced *commit*s can be deleted --- at some later time, not immediately --- by Git's *garbage collector*.
</div>

Even if you strive hard to remember an unreferenced *commit*'s *Git object ID*, you won't be able to retrieve that *commit* after Git's *garbage collector* has deleted it.

<div class="forward" markdown="1">
We will soon see that *branch*es are important for keeping *commit*s (keeping them *referenced*).
</div>

We will demonstrate how the *garbage collector* deletes an *unreferenced commit*. We first create a commit we intend to lose.

Edit `story.txt` (<span class="perform">`emacs story.txt`</span>) to add lines 8-9 at the end:
{% assign linenos = "1 2 3 4 5 6 7 8 9" | split: " " %}
{% include linenos.html numbers=linenos %}
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn saw a rainbow.

The unicorn felt nothing about it.

The unicorn looked around.

This change will be intentionally lost.
{% endhighlight %}

Edit `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span>) to be:
{% highlight text %}
Adds a commit we intend to lose
{% endhighlight %}

Do <span class="perform">`git add story.txt`</span> and then <span class="perform">`git commit -F {{ commit-msg-file }}`</span>.

{% assign to-lose-commit = site.data.git-lesson.git-commits.to-lose.id %}
{% assign to-lose-commit-short = to-lose-commit | slice: 0, 7 %}
{% assign to-lose-commit-date = site.data.git-lesson.git-commits.to-lose.date %}
{% assign to-lose-commit-timestamp = site.data.git-lesson.git-commits.to-lose.timestamp %}

A <span class="perform">`git log --decorate --graph`</span> shows our *to-lose-commit*:
<pre>
<code>{% include git-log/ch.html commit-id=to-lose-commit class="to-lose-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ to-lose-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds a commit we intend to lose
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=third-commit class="third-commit" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ third-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

We now retreat (move *upstream*) our branch <span class="git-green">master</span> by doing <span class="perform">`git reset --hard HEAD~1`</span>. A <span class="perform">`git log --decorate --graph`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=third-commit class="third-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ third-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

We confirm that our *to-lose-commit* still exists by doing:
<div class="perform"><pre><code>git cat-file -p <span class="to-lose-commit-short goi">{{ to-lose-commit-short }}</span></code></pre></div>
<pre>
<code>tree 2913ba48160d3b6b713135243c06d7e15034bbcc
parent <span class="third-commit goi">{{ third-commit }}</span>
author Author A <a@c.com> {{ to-lose-commit-timestamp }} +0800
committer Author A <a@c.com> {{ to-lose-commit-timestamp }} +0800

Adds a commit we intend to lose</code>
</pre>

### Unreachable Commits

We can see that our *to-lose-commit* is now **unreachable** by doing <span class="perform">`git fsck --no-reflogs`</span>:
<pre><code>dangling commit <span class="to-lose-commit goi">{{ to-lose-commit }}</span></code></pre>

<div class="side-note" markdown="1">
`git fsck` checks for **unreferenced** *commit*s. But *commit*s referenced only by the *reflog*s are unreachable. `git fsck --no-reflogs` checks for **unreachable** *commit*s. An *commit* that is *unreferenced* is, of course, also *unreachable*.
</div>

<div class="forward" markdown="1">
We will be looking at **unreferenced** *commit*s right afther this section.
</div>

<div class="tip" markdown="1">
**Reachable commits** are *commit*s that are referenced by any Git *references*.

**Reachable commits** render their **parent**(s) **reachable**.

After accounting for all **reachable commits**, all other *commit*s are **unreachable**.
</div>

It is now clear that our *to-lose-commit* is **unreachable**. But it is *not* **unreferenced**! Let's see.

### Reflog --- Safety Net

Git's **reflog** still stores a reference to our *to-lose-commit*. A <span class="perform">`git reflog`</span> reveals our *to-lose-commit* is still referenced at `HEAD@{1}`:
<pre>
<code><span class="git-yellow"><span class="third-commit-short goi">{{ third-commit-short }}</span></span> HEAD@{0}: reset: moving to HEAD~1
<span class="git-yellow"><span class="to-lose-commit-short goi">{{ to-lose-commit-short }}</span></span> HEAD@{1}: commit: Adds a commit we intend to lose
<span class="git-yellow"><span class="third-commit-short goi">{{ third-commit-short }}</span></span> HEAD@{2}: commit: Unicorn encounters a rainbow
<span class="git-yellow"><span class="first-commit-short goi">{{ first-commit-short }}</span></span> HEAD@{3}: reset: moving to master~1</code>
</pre>

Now, Git's default parameters for its *garbage collector* means that Git only deletes *unreferenced commits* that are older than 14 days. To impede our current experiment more, Git still retains references to our *to-lose-commit* in its *reflog*, because *reflog references to unreachable commits* are only deleted if older than 30 days. Our experiment can only work if we wait 30 days from now!

<div class="forward" markdown="1">
Git does not immediately delete, through *garbage collection*, *commit*s that are not referenced. Later on, we will learn how to perform *undo* operations in Git.
</div>

A simple test proves it. We do <span class="perform">`git gc`</span> and see that our *to-lose-commit* is still in existence:
<div class="perform"><pre><code>git cat-file -p <span class="to-lose-commit-short goi">{{ to-lose-commit-short }}</span></code></pre></div>
<pre>
<code>tree 2913ba48160d3b6b713135243c06d7e15034bbcc
parent <span class="third-commit goi">{{ third-commit }}</span>
author Author A <a@c.com> {{ to-lose-commit-timestamp }} +0800
committer Author A <a@c.com> {{ to-lose-commit-timestamp }} +0800

Adds a commit we intend to lose</code>
</pre>

We give immediacy to the *garbage collector* by passing in 2 parameters via these commands:
<div class="perform">{% highlight shell %}
git config gc.pruneExpire now
git config gc.reflogExpireUnreachable now
{% endhighlight %}</div>

Now, <span class="perform">`git gc`</span> will delete our *to-lose-commit*, as can be seen by:
<div class="perform"><pre><code>git cat-file -p <span class="to-lose-commit-short goit">{{ to-lose-commit-short }}</span></code></pre></div>
<pre><code>fatal: Not a valid object name <span class="to-lose-commit-short goi">{{ to-lose-commit-short }}</span></code></pre>

As expected, <span class="perform">`git reflog`</span> shows that our top 2 entries were deleted:
<pre>
<code><span class="git-yellow"><span class="third-commit-short goi">{{ third-commit-short }}</span></span> HEAD@{0}: commit: Unicorn encounters a rainbow
<span class="git-yellow"><span class="first-commit-short goi">{{ first-commit-short }}</span></span> HEAD@{1}: reset: moving to master~1</code>
</pre>

The removal of those 2 entries rendered our *to-lose-commit* **unreferenced**, not just **unreachable**. That is why the *garbage collector* was able to delete our *to-lose-commit*.

Now remove that immediacy we just mandated! We don't want Git immediately deleting our commits. We like the 30-day *grace period* for us to perform any *undo* required!

Reset the *garbage collector* to default parameters by doing <span class="perform">`git config --remove-section gc`</span>! **<u>Do that now!</u>**

<div class="tip" markdown="1">
Never change default parameters for the *garbage collector* under normal circumstances.
</div>

## To Work on a Branch

What does it mean to *work on a branch*? How is a *branch* **advanced**?

<div class="tip" markdown="1">
When creating a new *commit* off of (downstream of) the `HEAD`:
* The `HEAD` is moved to refer to the new *commit*.
* **If attached** to a *branch*, that *branch* is advanced (downstream) to point to the new *commit*.

Hence, a `HEAD` attached to some *branch* allows us to in effect **work on the branch, commit to the branch, and advance the branch**.
</div>

This was seen when we committed our *first-commit* and *second-commit* while on *branch* <span class="git-green">master</span>. We did not have to manually advance the *branch* with every new *commit*.

We shall soon see that this *automatic advancing of a branch* does not occur if the `HEAD` is not attached to any branch.

### Quick Word on Tags

<div class="tip" markdown="1">
*Tag*s are mere pointers, like *branch*es are. However, *tag*s do not have the same functionality (such as advancement with new *commit*s) nor semantics as *branch*es do. **Tags are mere pointers, and nothing more.**
</div>

As we will soon see, checking out a tag will result in a detached `HEAD`.

Create a tag at the *second-commit* by doing <span class="perform">`git checkout git-obj-study`</span> and then <span class="perform">`git tag our-tag`</span>. Then <span class="perform">`git log --decorate --graph`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit attached="git-obj-study" head=true tag="our-tag" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>    Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

### Working a Detached `HEAD`

Checkout tag <span class="git-yellow">our-tag</span> by doing <span class="perform">`git checkout our-tag`</span>. Git issues a warning:
<pre>
<code>Note: checking out 'our-tag'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b &lt;new-branch-name&gt;

HEAD is now at <span class="second-commit-short goi">{{ second-commit-short }}</span> ... Adds nested folder structure</code>
</pre>

<div class="tip" markdown="1">
Checking out a **tag** will result in a **detached** `HEAD`.

Recall: performing a **checkout** with *just the branch reference* itself is the only way to *attach* the `HEAD`.
</div>

A <span class="perform">`git log --decorate --graph`</span> shows that the `HEAD` is on its own:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" branch="git-obj-study" head=true tag="our-tag" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

#### Committing While Detached

We will now show what happens when a new *commit* is made on a *detached* `HEAD`.

Add 2 lines (4-5) at the end of `story.txt` (eg. <span class="perform">`emacs story.txt`</span>):
{% assign linenos = "1 2 3 4 5" | split: " " %}
{% include linenos.html numbers=linenos %}
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn looked around.

This change will be committed while detached.
{% endhighlight %}

Edit `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span>) to be:
{% highlight text %}
Adds a commit while detached
{% endhighlight %}

Commit that new change with <span class="perform">`git add story.txt`</span> and then <span class="perform">`git commit -F {{ commit-msg-file }}`</span>.

{% assign detached-commit = site.data.git-lesson.git-commits.detached.id %}
{% assign detached-commit-short = detached-commit | slice: 0, 7 %}
{% assign detached-commit-date = site.data.git-lesson.git-commits.detached.date %}
{% assign detached-commit-timestamp = site.data.git-lesson.git-commits.detached.timestamp %}

Then <span class="perform">`git log --decorate --graph`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=detached-commit class="detached-commit" head=true %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ detached-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds a commit while detached
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=second-commit class="second-commit" branch="git-obj-study" tag="our-tag" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

<div class="tip" markdown="1">
A commit action on **detached** `HEAD` does not **advance** any *branch*. In effect, working with a **detached** `HEAD` is working *outside* of any *branch*.
</div>

#### Leaving Commits Behind

Let's complete our demonstration of how a commit created while detached can be lost.

Checkout branch <span class="git-green">git-obj-study</span> via <span class="perform">`git checkout git-obj-study`</span>, and we see Git telling us:
<pre>
<code>Warning: you are leaving 1 commit behind, not connected to
any of your branches:

  <span class="detached-commit-short goi">{{ detached-commit-short }}</span> Adds a commit while detached

If you want to keep it by creating a new branch, this may be a good time
to do so with:

 git branch &lt;new-branch-name&gt; <span class="detached-commit-short goi">{{ detached-commit-short }}</span>

Switched to branch 'git-obj-study'</code>
</pre>

In fact, despite Git's polite warning, that is about the only time you may *keep that unreachable commit*. You likely won't remember the *commit ID* of our *detached-commit* after this warning disappears. Moreover, Git's *garbage collector* may delete that *unreachable commit* some time later (30 days) before you decide to retrieve it.

That brings us to an important tip:

<div class="tip" markdown="1">
Creating branches (temporarily or otherwise) is a good way to hang on to any *commit*s you would potentially want to keep. In fact, it's a good "*put a bookmark on here before I mess things up*" technique. (Just don't delete the *branch* in question!)
</div>

To repeat for reinforcement, *branch*es are the only normal way to access (reach) *commit*s. In Git, we work with *branch*es, not *tag*s. You create multiple/alternate timelines (approaches, "*what-if's*"), which involve *branch*es.

Worse than *tag*s, the `HEAD` is not at all intended to *keep commits*. The`HEAD` changes depending on which *branch* you checkout, and can potentially leave *commit*s behind.

To see that the `HEAD` has moved to *branch* <span class="git-green">git-obj-study</span>, and has left our *detached-commit* behind:
<div class="perform"><pre><code>git log --decorate --graph <span class="detached-commit-short goi">{{ detached-commit-short }}</span></code></pre></div>
<pre>
<code>{% include git-log/ch.html commit-id=detached-commit class="detached-commit" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ detached-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds a commit while detached
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=second-commit class="second-commit" head=true attached="git-obj-study" tag="our-tag" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

#### Jumping Through Timelines

A *detached* `HEAD` does have its uses. You can move the `HEAD` to any *commit* (snapshot) in any timeline to take a look-see.

Just remember that you need to attach the `HEAD` to a *branch* before you start work.

Let's jump to an earlier time in *branch* <span class="git-green">git-obj-study</span>. Suppose we want to reminisce about how we started off when we created this *branch*.

A <span class="perform">`git checkout git-obj-study~1`</span> puts us 1 *commit* upstream:
<pre>
<code>Note: checking out 'git-obj-study~1'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b &lt;new-branch-name&gt;

HEAD is now at <span class="first-commit-short goi">{{ first-commit-short }}</span>... Adds first work on the story</code>
</pre>

And <span class="perform">`git log --decorate`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=first-commit class="first-commit" head=true lone=true %}
Author: Author A <a@c.com>
Date:   {{ first-commit-date }}

    Adds first work on the story

    I'd think up more descriptive information here if I could.
    That first line above should be a short summary, with no ending period.
    Then comes a blank line, and then details and descriptions follow.</code>
</pre>

Let's take a look-see. A <span class="perform">`ls -a`</span> shows:
<pre>
<code>./                  <span class="git-blue">.git</span>/               story.txt
../                 rough_thoughts.txt</code>
</pre>

And <span class="perform">`cat story.txt`</span> shows:
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn looked around.
{% endhighlight %}

Aw, how sweet. That was how we started, with just 3 lines in `story.txt`.

Alright, enough nostalgia. We need progress. We're done with learning about *detached* `HEAD`.

# Undo

The *reflog* for the `HEAD` gives us the ability to undo actions we recently performed, *if* the actions involve the *movement* of the `HEAD`.

<div class="tip" markdown="1">
Land the `HEAD` on *commit*s (`git checkout <commit>`), so that the *reflog* for the `HEAD` keeps track of them (for 30 days, at least).
</div>

There are a few ways to perform an undo, and all of them are based on the idea that the *reflog* contains a list of *commit*s the `HEAD` touched on. Some of those *commit*s may have become *left behind* (aka lost).

## Use Branch, Make Reachable

To retrieve a "*left behind*" *commit*, you can simply place a *branch* on it: `git branch <branch-name> <commit>`.

Our <span class="perform">`git reflog`</span> should currently look like (omitted top 2 entries):
<pre>
<code><span class="git-yellow"><span class="detached-commit-short goi">{{ detached-commit-short }}</span></span> HEAD@{2}: commit: Adds a commit while detached
<span class="git-yellow"><span class="second-commit-short goi">{{ second-commit-short }}</span></span> HEAD@{3}: checkout: moving from git-obj-study to our-tag
<span class="git-yellow"><span class="second-commit-short goi">{{ second-commit-short }}</span></span> HEAD@{4}: checkout: moving from master to git-obj-study
<span class="git-yellow"><span class="third-commit-short goi">{{ third-commit-short }}</span></span> HEAD@{5}: commit: Unicorn encounters a rainbow</code>
</pre>

Our *detached-commit* is still **unreachable**, as seen by <span class="perform">`git fsck --no-reflogs`</span>:
<pre><code>dangling commit <span class="detached-commit goi">{{ detached-commit }}</span></code></pre>

Creating a new *branch* on <span class="detached-commit-short goi">{{ detached-commit-short }}</span> will make it *reachable*:
<div class="perform"><pre><code>git branch reclaim-detached <span class="detached-commit-short goi">{{ detached-commit-short }}</span></code></pre></div>

And now, <span class="perform">`git fsck --no-reflogs`</span> should show that all *commit*s are *reachable*.

<div class="tip" markdown="1">
*Branch*es make *commit*s **reachable**.
</div>

## Backtrack `HEAD`

If you're not yet sure you want to create a new *branch* to reclaim a "*left behind*" *commit* --- perhaps when you're swamped with tons of flippantly created *branch*es --- you can choose to simply backtrack the `HEAD`.

*Force move* the `HEAD` back in time. In this case, the *reflog* "*time*" entry we want to go back to is `HEAD@{2}` (2 steps back into the past).

<pre>
<code><span class="git-yellow"><span class="detached-commit-short goi">{{ detached-commit-short }}</span></span> HEAD@{2}: commit: Adds a commit while detached</code>
</pre>

We're currently still on the *first-commit*, as seen by <span class="perform">`git log --decorate`</span>:
<pre>
<code>{% include git-log/ch.html commit-id=first-commit class="first-commit" head=true lone=true %}
Author: Author A <a@c.com>
Date:   {{ first-commit-date }}

    Adds first work on the story
...</code>
</pre>

Move the `HEAD` back into the past by 2 steps: <span class="perform">`git reset --hard HEAD@{2}`</span>

Now, <span class="perform">`git log --decorate --graph`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=detached-commit class="detached-commit" head=true branch="reclaim-detached" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ detached-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds a commit while detached
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=second-commit class="second-commit" branch="git-obj-study" tag="our-tag" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

Notice that *branch* <span class="git-green">reclaim-detached</span> still exists. We merely *force moved* the `HEAD` to a different *commit* (our *detached-commit*); we didn't actually "*turn back time*" to when we haven't created *branch* <span class="git-green">reclaim-detached</span>.

<div class="tip" markdown="1">
We "*go back in time*" by moving to an older *commit*.

Recall that each *commit* is a **snapshot** of the entire project at some point in time.
</div>

Think of it this way. We created a *snapshot* (our *detached-commit*) right after that at *second-commit*. Then we moved the `HEAD` somewhere else and gave up on *detached-commit*; it was *unreachable* by any *branch* since we *committed* while detached. After that, we changed our mind about losing *detached-commit*. So we backtracked the `HEAD` to the point where it landed again on *detached-commit*.

A <span class="perform">`git reflog`</span> shows that we backtracked the `HEAD`:
<pre>
<code><span class="git-yellow"><span class="detached-commit-short goi">{{ detached-commit-short }}</span></span> HEAD@{0}: reset: moving to HEAD@{2}</code>
</pre>

## Same for Branches

The "undo history" (*reflog*s) for *branch*es work the same way as the *reflog* for the `HEAD`.

In case you accidentally shift a *branch* via `git branch -f <branch> <wrong-commit>`, you can check its *reflog* to see which "*correct commit*" it was on before that accident.

<div class="tip" markdown="1">
Be absolutely sure before you run `git branch -D <branch>`, which *force deletes* the specified *branch*, and totally nukes the *reflog* (undo history) for said *branch*. **Force-deleting a *branch* can potentially lead to lost *commit*s.**
</div>

## Amending Last Commit

<div class="tip" markdown="1">
Amending a *commit* creates a new alternate *commit*. The original *commit* is *left behind*.
</div>

Edit `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span>) to be:
{% highlight text %}
Adds a commit while detached

We decided to include more details in the commit message.
This is an amended commit.
{% endhighlight %}

Then <span class="perform">`git commit --amend -F {{ commit-msg-file }}`</span> to amend our last *commit*.

{% assign amended-commit = site.data.git-lesson.git-commits.amended.id %}
{% assign amended-commit-short = amended-commit | slice: 0, 7 %}
{% assign amended-commit-date = site.data.git-lesson.git-commits.amended.date %}
{% assign amended-commit-timestamp = site.data.git-lesson.git-commits.amended.timestamp %}

We can see that a new *commit* --- our *amended-commit* --- has been created. A <span class="perform">`git log --decorate --graph reclaim-detached HEAD`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=amended-commit class="amended-commit" head=true %}
<span class="git-red">|</span> Author: Jon Wong <jhannwong@gmail.com>
<span class="git-red">|</span> Date:   Mon May 15 20:54:09 2017 +0800
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds a commit while detached
<span class="git-red">|</span>
<span class="git-red">|</span>     We decided to include more details in the commit message.
<span class="git-red">|</span>     This is an amended commit.
<span class="git-red">|</span>
<span class="git-red">|</span> {% include git-log/ch.html commit-id=detached-commit class="detached-commit" branch="reclaim-detached" %}
<span class="git-red">|/</span> Author: Author A <a@c.com>
<span class="git-red">|</span>  Date:   {{ detached-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>      Adds a commit while detached
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=second-commit class="second-commit" branch="git-obj-study" tag="our-tag" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

In this case, it just so happens that we have *branch* <span class="git-green">reclaim-detached</span> at our original *commit*; normally, the original commit would have been *left behind* and become *unreachable*. The `HEAD` was *detached* when we created the new *commit*, so the `HEAD` did not bring any *branch* along with it.

## Amending Earlier Commits

Since it is generally not a good practice to *go back* and perfect past commits over and over, we won't be doing this section.

<div class="forward" markdown="1">
If your boss needs you to do "*post-production edits*" of your Git history, let me know and I'll fill up this section.

This requires learning about Git *rebase*.
</div>

# Merging

To explore merging, we first have to do some branching. We already learned about *branch*es earlier, and now we will practice *working on a branch*.

Recall: To *work on a branch*, simply `git checkout <branch>`.

We move back to *branch* <span class="git-green">master</span> via <span class="perform">`git checkout master`</span> to continue our story. (You'll get a warning that you will be leaving behind our *amended-commit*; let that go, we don't need that anymore.)

Let's do some branching right now.

## Leapfrog Loop

Recall that Agile's [first key paradigms](https://en.wikipedia.org/wiki/Agile_software_development#Iterative.2C_incremental_and_evolutionary) is *iterative and incremental*.

We perform a short unit of work via a *leapfrog* loop (my terminology, not formal Git). But why don't we perfectly do that short unit of work within 1 *commit*?

Consider that even a short unit of work can involve multiple *commit*s --- you should commit often (good practice), because Git tracks your work only when you commit. Additionally, consider that multiple *commit*s may be required due to your making mistakes while working fast (and you *should* work fast). That is why a typical short unit of work ("*leapfrog*") can involve more than 1 *commit*.

Let's start a leapfrog.

<div class="tip" markdown="1">
A leapfrog loop starts with creating and checking out a new *branch*.
</div>

Create a new branch and checkout that branch in one command: <span class="perform">`git checkout -b author-A/daydream`</span>. A <span class="perform">`git log --decorate --graph`</span> should show:
<pre>
<code>{% include git-log/ch.html commit-id=third-commit class="third-commit" head=true attached="author-A/daydream" branch="master"%}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   Tue May 16 18:23:02 2017 +0800
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   Tue May 16 17:48:34 2017 +0800

      Adds first work on the story
...</code>
</pre>

We will now make 2 commits on *branch* <span class="git-green">author-A/daydream</span>.

### Quick First Commit

Edit `story.txt` (eg. <span class="perform">`emacs story.txt`</span>) to add lines 8-9 at the end:
{% assign linenos = "1 2 3 4 5 6 7 8 9" | split: " " %}
{% include linenos.html numbers=linenos %}
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn saw a rainbow.

The unicorn felt nothing about it.

The unicorn looked around.

The unicorn thought about cotton candy.
{% endhighlight %}

Edit `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span> to contain:
{% highlight text %}
Adds cotton candy thought
{% endhighlight %}

Add your work via <span class="perform">`git add story.txt`</span>, and commit via <span class="perform">`git commit -F {{ commit-msg-file }}`</span>.

### Insert Afterthought

Edit `story.txt` (eg. <span class="perform">`emacs story.txt`</span>) to add lines 9-10:
{% assign linenos = "1 2 3 4 5 6 7 8 9 10 11" | split: " " %}
{% include linenos.html numbers=linenos %}
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn saw a rainbow.

The unicorn felt nothing about it.

The unicorn looked around.

The unicorn dreamed of clouds.

The unicorn thought about cotton candy.
{% endhighlight %}

Edit `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span> to contain:
{% highlight text %}
Adds cloud thought
{% endhighlight %}

Add your work via <span class="perform">`git add story.txt`</span>, and commit via <span class="perform">`git commit -F {{ commit-msg-file }}`</span>.

## Closing the Loop

{% assign leapfrog-one-commit = site.data.git-lesson.git-commits.leapfrog-one.id %}
{% assign leapfrog-one-commit-short = leapfrog-one-commit | slice: 0, 7 %}
{% assign leapfrog-one-commit-date = site.data.git-lesson.git-commits.leapfrog-one.date %}
{% assign leapfrog-one-commit-timestamp = site.data.git-lesson.git-commits.leapfrog-one.timestamp %}

{% assign leapfrog-two-commit = site.data.git-lesson.git-commits.leapfrog-two.id %}
{% assign leapfrog-two-commit-short = leapfrog-two-commit | slice: 0, 7 %}
{% assign leapfrog-two-commit-date = site.data.git-lesson.git-commits.leapfrog-two.date %}
{% assign leapfrog-two-commit-timestamp = site.data.git-lesson.git-commits.leapfrog-two.timestamp %}

We return to *branch* <span class="git-green">master</span> with a <span class="perform">`git checkout master`</span>. A <span class="perform">`git log --decorate --graph author-A/daydream`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=leapfrog-two-commit class="leapfrog-two-commit" branch="author-A/daydream" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ leapfrog-two-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds cloud thought
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=leapfrog-one-commit class="leapfrog-one-commit" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ leapfrog-one-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds cotton candy thought
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=third-commit class="third-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   Tue May 16 18:23:02 2017 +0800
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   Tue May 16 17:48:34 2017 +0800

      Adds first work on the story
...</code>
</pre>

Edit `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span> to contain:
{% highlight text %}
Merge branch 'author-A/daydream'

The unicorn daydreams.
{% endhighlight %}

Add your work via <span class="perform">`git add story.txt`</span>.

We perform a merge with <span class="perform">`git merge --no-ff --no-commit author-A/daydream`<span>.

<div class="side-note" markdown="1">
You can always abort the merge with `git merge --abort` if anything goes wrong. And then retry the merge again.
</div>

Finally, we commit the merge with <span class="perform">`git commit -F {{ commit-msg-file }}`</span>.

<div class="tip" markdown="1">
A leapfrog loop is closed by a merge with `--no-ff`. First, checkout the *branch* you want to merge *onto*. Then perform the merge.
</div>

<div class="side-note" markdown="1">
If you're able to use an editor (vi or emacs) to write your *commit messages* within your Bash shell, you can just do `git merge --no-ff author-A/daydream` to perform the merge in 1 step, rather than 2.
</div>

{% assign merge-commit = site.data.git-lesson.git-commits.merge.id %}
{% assign merge-commit-short = merge-commit | slice: 0, 7 %}
{% assign merge-commit-date = site.data.git-lesson.git-commits.merge.date %}
{% assign merge-commit-timestamp = site.data.git-lesson.git-commits.merge.timestamp %}

And here is the loop with <span class="perform">`git log --decorate --graph`</span>:
<pre>
<code>{% include git-log/ch.html commit-id=merge-commit class="merge-commit" head=true attached="master" %}
<span class="git-red">|</span><span class="git-green">\</span>  Merge: <span class="third-commit-short goi">{{ third-commit-short }}</span> <span class="leapfrog-two-commit-short goi">{{ leapfrog-two-commit-short }}</span>
<span class="git-red">|</span> <span class="git-green">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> <span class="git-green">|</span> Date:   {{ merge-commit-date }}
<span class="git-red">|</span> <span class="git-green">|</span>
<span class="git-red">|</span> <span class="git-green">|</span>     Merge branch 'author-A/daydream'
<span class="git-red">|</span> <span class="git-green">|</span>
<span class="git-red">|</span> <span class="git-green">|</span>     The unicorn daydreams.
<span class="git-red">|</span> <span class="git-green">|</span>
<span class="git-red">|</span> {% include git-log/ch.html commit-id=leapfrog-two-commit class="leapfrog-two-commit" branch="author-A/daydream" %}
<span class="git-red">|</span> <span class="git-green">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> <span class="git-green">|</span> Date:   {{ leapfrog-two-commit-date }}
<span class="git-red">|</span> <span class="git-green">|</span>
<span class="git-red">|</span> <span class="git-green">|</span>     Adds cloud thought
<span class="git-red">|</span> <span class="git-green">|</span>
<span class="git-red">|</span> {% include git-log/ch.html commit-id=leapfrog-one-commit class="leapfrog-one-commit" %}
<span class="git-red">|/</span>  Author: Author A <a@c.com>
<span class="git-red">|</span>   Date:   {{ leapfrog-one-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>       Adds cotton candy thought
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=third-commit class="third-commit" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   Tue May 16 18:23:02 2017 +0800
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   Tue May 16 17:48:34 2017 +0800

      Adds first work on the story
...</code>
</pre>

### Hiding Leapfrog Details

<div class="tip" markdown="1">
Adding the `--first-parent` option to `git log` will hide leapfrog details.
</div>

A <span class="perform">`git log --decorate --graph --first-parent`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=merge-commit class="merge-commit" head=true attached="master" %}
<span class="git-red">|</span>  Merge: <span class="third-commit-short goi">{{ third-commit-short }}</span> <span class="leapfrog-two-commit-short goi">{{ leapfrog-two-commit-short }}</span>
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Merge branch 'author-A/daydream'
<span class="git-red">|</span>
<span class="git-red">|</span>     The unicorn daydreams.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=third-commit class="third-commit" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   Tue May 16 18:23:02 2017 +0800
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   Tue May 16 17:48:34 2017 +0800

      Adds first work on the story
...</code>
</pre>

Whatever mistakes and mishaps we had in our leapfrog is hidden from view like this.

And that is also why we employ *leapfrog loop*s --- to hide away the messy details of our work from the main *branch*. In this case, our messy details are in *branch* <span class="git-green">author-A/daydream</span>, and our main *branch* is *branch* <span class="git-green">master</span>.

# Remote (Bare) Git Repository

A bare Git repo contains the **history** of your work on your files, but does not keep a *working copy* of your files.

Make room for the bare Git repo by doing:
<div class="perform">{% highlight shell %}
cd ..
mv my-new-project clone-A     # Our local repo is now in folder 'clone-A'
mkdir -p my-new-project/remote     # Create the folder for the bare repo
mv clone-A my-new-project     # 'my-new-project' shall neatly contain our repos
cd my-new-project
{% endhighlight %}</div>

Create the bare repo, which we shall call *remote repo*, by doing:
<div class="perform">{% highlight shell %}
cd remote
git init --bare     # Create the bare repo
ls -la     # Show the contents of the bare repo
cd ..
{% endhighlight %}</div>

Notice that the contents of folder `remote` looks exactly like the contents in folder `clone-A/.git`.

<div class="forward" markdown="1">
The above bare repo resides on your local harddisk, but is for all our intents and purposes akin to a *remote repo*. You shall see the concept *remote repo* demonstrated soon.
</div>

## *Clone* vs *Remote*

<div class="tip" markdown="1">
**Clone**s are non-bare local repos we work on. Your *clone* is your local copy of the Git repo you work on (see "*remote*" soon after this).
</div>

In our case here, we have a *clone* in folder `clone-A`.

<div class="tip" markdown="1">
**Remote**s are bare repos we push to, and collaborate on. Consider a *remote* as a "*certified true copy*" of sorts, which is also clearly implied by the contrasting term "*clone*". They also act like "*cloud backups*" (if you're using [GitHub](github.com) or [BitBucket](bitbucket.org)), in case your *clones* get damaged.
</div>

Our *remote* in this case resides in folder `remote`.

<div class="forward" markdown="1">
We will look at situating our *remote* on GitHub and BitBucket later on.
</div>

Point our *clone* to the *remote*:
<div class="perform">{% highlight shell %}
cd clone-A
git remote -v     # Should display nothing; no remotes linked to yet.
git remote add origin ../remote     # Our remote is named "origin"
{% endhighlight %}</div>

<div class="tip" markdown="1">
The *remote* name "*origin*" is the convention for representing the "*certified true copy*" repo for the project.
</div>

Checking for our added remote with <span class="perform">`git remote -v`</span>:
{% highlight text %}
orign	../remote (fetch)
orign	../remote (push)
{% endhighlight %}

<div class="side-note" markdown="1">
Although it is possible to pull (fetch) from one remote repo and push to another remote repo, we shall stick with the most common use case --- our remote pulls from and pushes to the same location.
</div>

## Pushing Work To Remote

We now push our current *branch* <span class="git-green">master</span> up to `origin` by doing <span class="perform">`git push -u origin master`</span>:
{% highlight text %}
Counting objects: 13, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (9/9), done.
Writing objects: 100% (13/13), 1.31 KiB | 0 bytes/s, done.
Total 13 (delta 2), reused 0 (delta 0)
To ../remote
 * [new branch]      master -> master
{% endhighlight %}

<div class="side-note" markdown="1">
Typically, your *first* push to a remote should include the `-u` (set-upstream) option like this `git push -u origin master`. That associates *branch* <span class="git-green">master</span> with *branch* <span class="git-red">origin/master</span>. That way, the next time you're on *branch* <span class="git-green">master</span>, you can simply do `git push` and Git knows you mean `git push origin master` (and similarly for `git pull`).
</div>

<div class="tip" markdown="1">
The "*upstream*" in the context of *remote branch*es is different from the *time travel branch*es we spoke of. In the context of *remote branch*es, **upstream** is the "*certified true copy*" that *clone*s (**downstream**s) pull from and push to. The key idea for the `-u` option is to specify the "*certified true copy*" for your project's *branch*es.
</div>

<div class="forward" markdown="1">
It is possible to have different *branch*es pull from (and push to) separate *remote*s. An example use case is when I need to use a BitBucket private repo to track/store my project, and I use [GitHub Pages](https://pages.github.com) to publish my project's documentation. In such a case, I would have 2 **remote**s --- <span class="git-red">origin</span> would point to a BitBucket repo while <span class="git-red">doc</span> (arbitrary name) would point to GitHub repo.

Shoot me an email if you want me to rush out a tutorial for the above use case (very common for staff in SUTD).
</div>

Everything you saw in your `.git` folder inside your *clone* will be inside the *remote* (the bare Git repo).
Both these commands should show you the same files (`../remote/objects` has less files):
<div class="perform">{% highlight shell %}
find .git/objects -type f
find ../remote/objects -type f
{% endhighlight %}</div>

(The *remote* shows only the *commit*s from *branch* <span class="git-green">master</span> because we only pushed that *branch* up.)

You can see that the bare repo does not reserve any space for *working copies of project files*; all Git data is stored at the top-level folder (`../remote`).

<div class="tip" markdown="1">
We never work on *remotes*, but instead work on *clones* and push our work up to *remotes*.
</div>

A look at Git log via <span class="perform">`git log --decorate --graph --first-parent`</span> tells us our *remote* now has *branch* <span class="git-green">master</span> too (<span class="git-red">origin/master</span>):
<pre>
<code>{% include git-log/ch.html commit-id=merge-commit class="merge-commit" head=true attached="master" remote="origin/master" %}
<span class="git-red">|</span>  Merge: {{ third-commit-short }} {{ leapfrog-two-commit-short }}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Merge branch 'author-A/daydream'
<span class="git-red">|</span>
<span class="git-red">|</span>     The unicorn daydreams.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=third-commit class="third-commit" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   Tue May 16 18:23:02 2017 +0800
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   Tue May 16 17:48:34 2017 +0800

      Adds first work on the story
...</code>
</pre>

<div class="tip" markdown="1">
Remote *branch*es are shown in red, and prefixed by the name of the remote plus '/'. Eg. 'origin/master'.
</div>

## Push to Publish

*Branch*es (and consequently the *commit*s rendered *reachable* only by them) are not visible to the rest of your team if you don't push them to the *remote*.

We will demonstrate this fact. We first clone the repo into folder `clone-B`:
<div class="perform">{% highlight shell %}
cd ..     # Go to parent folder, 1 up from clone-A
git clone remote clone-B     # Clone repo at 'remote' into 'clone-B'
cd clone-B     # Enter clone-B
{% endhighlight %}</div>

<div class="tip" markdown="1">
We *clone* a *remote* by doing `git clone <remote> <folder>`, where `<remote>` is the location of the *remote* and `<folder>` is the folder to create that will hold the *clone*.
</div>

We then set our credential and some parameters:
<div class="perform">{% highlight shell %}
git config user.name "Author B"
git config user.email b@d.com
git config log.abbrevCommit true
{% endhighlight %}</div>

A <span class="perform">`git log --decorate --graph --first-parent`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=merge-commit class="merge-commit" head=true attached="master" remote="origin/master" remote2="origin/HEAD" %}
<span class="git-red">|</span>  Merge: {{ third-commit-short }} {{ leapfrog-two-commit-short }}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Merge branch 'author-A/daydream'
<span class="git-red">|</span>
<span class="git-red">|</span>     The unicorn daydreams.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=third-commit class="third-commit" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   Tue May 16 18:23:02 2017 +0800
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
...</code>
</pre>

<div class="tip" markdown="1">
The remote *branch* <span class="git-red">origin/HEAD</span> simply points to the *branch* that is pulled down upon a `git clone`. We don't need a reference to it in the *clone*s. It serves the *remote*, not the *clone*s.
</div>

We delete *branch* <span class="git-red">origin/HEAD</span> in our `clone-B` via <span class="perform">`git branch -r -d origin/HEAD`</span>.

The above Git log tells us our `clone-B` has access to *branch* <span class="git-green">master</span>. But what about *branch* <span class="git-green">git-obj-study</span>? Let's see with <span class="perform">`git log --decorate --graph git-obj-study`</span>:
{% highlight text %}
fatal: ambiguous argument 'git-obj-study': unknown revision or path not in the working tree.
{% endhighlight %}

Even <span class="perform">`git branch`</span> tells us that `clone-B`'s only *branch* is <span class="git-green">master</span>.

Let's go back into `clone-A` to publish *branch* <span class="git-green">git-obj-study</span>:
<div class="perform">{% highlight shell %}
cd ../clone-A     # Enter clone-A folder
git push -u origin git-obj-study     # Push branch 'git-obj-study'
{% endhighlight %}</div>

<div class="tip" markdown="1">
`git push -u <remote> <branch>` to publish *branch* <span class="git-green">&lt;branch&gt;</span> to *remote* <span class="git-red">&lt;remote&gt;</span>.
</div>

And we get `clone-B` to pull in the newly pushed *branch*:
<div class="perform">{% highlight shell %}
cd ../clone-B     # Enter clone-B folder
git pull     # Pull updates from remote
git checkout git-obj-study     # Checkout branch 'git-obj-study'
{% endhighlight %}</div>

<div class="tip" markdown="1">
`git pull` to pull down any new updates from *remote*(s).
</div>

Now, <span class="perform">`git log --decorate --graph`</span> shows that `clone-B` can see *branch* <span class="git-green">git-obj-study</span>:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" head=true attached="git-obj-study" remote="origin/git-obj-study" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
...
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

## Remote Branch

We will contrast **remote branch** versus **branch on remote**.

<div class="tip" markdown="1">
A **remote branch** is merely a *tracking branch*, which *tracks* (corresponds with) a **branch on the remote**.

A **remote branch** is like a pointer that resides in the *clone*. A **branch on the remote** resides in the *remote*.
</div>

To see that concept demonstrated, we will create a *remote branch*, delete it, and then see that the *remote repo* still has the corresponding *branch*.

We create *branch* <span class="git-green">temp</span> at our *first-commit* via <span class="perform">`git branch temp HEAD~1`</span>. We then push that *branch* up via <span class="perform">`git push -u origin temp`</span>. Finally, <span class="perform">`git log --decorate temp`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=first-commit class="first-commit" branch="temp" remote="origin/temp" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

We confirm that the *remote repo* actually has *branch* <span class="git-green">temp</span>. We enter the *remote repo* with <span class="perform">`cd ../remote`</span>. We then check the log via <span class="perform">`git log --decorate temp`</span>:
<pre>
<code>{% include git-log/ch.html commit-id=first-commit class="first-commit" full-id=true branch="temp" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

A <span class="perform">`git branch -v`</span> also shows:
<pre><code>  temp             <span class="first-commit goi">{{ first-commit-short }}</span> Adds first work on the story</code></pre>

We now return to `clone-B` and delete the *remote branch* <span class="git-red">origin/temp</span> and also local *branch* <span class="git-green">temp</span>:
<div class="perform">{% highlight shell %}
cd ../clone-B
git branch -rd origin/temp
git branch -d temp
{% endhighlight %}</div>

Our *first-commit* no longer holds *remote branch* <span class="git-red">origin/temp</span> nor local *branch* <span class="git-green">temp</span>. A <span class="perform">`git log temp`</span> and a <span class="perform">`git log origin/temp`</span> both show:
{% highlight text %}
fatal: ambiguous argument 'temp': unknown revision or path not in the working tree.
{% endhighlight %}

We will see that the *remote repo* still has *branch* <span class="git-green">temp</span>:
<div class="perform">{% highlight shell %}
cd ../remote
git log --decorate temp
{% endhighlight %}</div>
<pre>
<code>{% include git-log/ch.html commit-id=first-commit class="first-commit" full-id=true branch="temp" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story
...</code>
</pre>

As can be seen, a **remote branch** is merely a *tracking branch* that tracks (corresponds with) a **branch on a remote**.

We now return to `clone-B` to delete the *branch on the remote*  (we normally don't have direct access to a *remote repo*):
<div class="perform">{% highlight shell %}
cd ../clone-B
git push origin --delete temp
{% endhighlight %}</div>

Now, the *remote repo* truly has *branch* <span class="git-green">temp</span> deleted:
<div class="perform">{% highlight shell %}
cd ../remote
git log --decorate temp
{% endhighlight %}</div>
{% highlight text %}
fatal: ambiguous argument 'temp': unknown revision or path not in the working tree.
{% endhighlight %}

# Collaboration

A typical collaboration technique is the "*peer review*".

To demonstrate such collaboration, we will be getting "*Author A*" to commit some changes on a *branch* and then to notify someone else to do a review of those changes. Finally, after the review, the work will be merged back into *branch* <span class="git-green">master</span>.

## The Work

We enter `clone-A` now with <span class="perform">`cd ../clone-A`</span>. We then create a new *branch* and checkout the *branch* (recall [section Leapfrog Loop](#leapfrog-loop)) via <span class="perform">`git checkout -b author-A/rainbow`</span>.

Our *branch* <span class="git-green">author-A/rainbow</span> should be at our *merge-commit*, as seen via <span class="perform">`git log --decorate --graph --first-parent`</span>:
<pre>
<code>{% include git-log/ch.html commit-id=merge-commit class="merge-commit" head=true branch="master" attached="author-A/rainbow" remote="origin/master" %}
<span class="git-red">|</span> Merge: <span class="third-commit-short goi">{{ third-commit-short }}</span> <span class="leapfrog-two-commit-short goi">{{ leapfrog-two-commit-short }}</span>
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Merge branch 'author-A/daydream'
<span class="git-red">|</span>
<span class="git-red">|</span>     The unicorn daydreams.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=third-commit class="third-commit" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   Tue May 16 18:23:02 2017 +0800
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
...</code>
</pre>

Edit `story.txt` (eg. <span class="perform">`emacs story.txt`</span>) to change line 5:
{% assign linenos = "1 2 3 4 5 6 7 8 9 10 11" | split: " " %}
{% include linenos.html numbers=linenos %}
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn saw a rainbow.

The unicorn found it unremarkable.

The unicorn looked around.

The unicorn dreamed of clouds.

The unicorn thought about cotton candy.
{% endhighlight %}

Edit `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span> to contain:
{% highlight text %}
Unicorn finds rainbow unremarkable
{% endhighlight %}

{% assign work-A-commit = site.data.git-lesson.git-commits.work-A.id %}
{% assign work-A-commit-short = work-A-commit | slice: 0, 7 %}
{% assign work-A-commit-date = site.data.git-lesson.git-commits.work-A.date %}
{% assign work-A-commit-timestamp = site.data.git-lesson.git-commits.work-A.timestamp %}

Add your work via <span class="perform">`git add story.txt`</span>, and then commit it via <span class="perform">`git commit -F {{ commit-msg-file }}`</span>. Then <span class="perform">`git log --decorate --graph --first-parent`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=work-A-commit class="work-A-commit" head=true attached="author-A/rainbow" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ work-A-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn finds rainbow unremarkable
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=merge-commit class="merge-commit" branch="master" remote="origin/master" %}
<span class="git-red">|</span> Merge: <span class="third-commit-short goi">{{ third-commit-short }}</span> <span class="leapfrog-two-commit-short goi">{{ leapfrog-two-commit-short }}</span>
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Merge branch 'author-A/daydream'
<span class="git-red">|</span>
<span class="git-red">|</span>     The unicorn daydreams.
...</code>
</pre>

## Publishing for Review

"*Author A*" will now publish the work, so that someone else can review it.

Do <span class="perform">`git push -u origin author-A/rainbow`</span> to publish the work. A <span class="perform">`git log --decorate --graph --first-parent`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=work-A-commit class="work-A-commit" head=true attached="author-A/rainbow" remote="origin/author-A/rainbow" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ work-A-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn finds rainbow unremarkable
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=merge-commit class="merge-commit" branch="master" remote="origin/master" %}
<span class="git-red">|</span> Merge: <span class="third-commit-short goi">{{ third-commit-short }}</span> <span class="leapfrog-two-commit-short goi">{{ leapfrog-two-commit-short }}</span>
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Merge branch 'author-A/daydream'
<span class="git-red">|</span>
<span class="git-red">|</span>     The unicorn daydreams.
...</code>
</pre>

### Pull Request

There is a concept called "*Pull Request*" (PR). A PR is a piece of communication going from the *work/change publisher* ("*Author A*", in our case) to the *reviewer* ("*Author C*", which we will soon create).

PRs are not a part of Git. GitHub, BitBucket and GitLab (terms it as "*Merge Request*") had to implement this feature themselves.

For now, we only need to know that a PR is merely a message of this structure:
{% highlight yaml %}
From Branch: origin/author-A/rainbow
To Branch: origin/master
Description: Makes rainbow more integal to the story.
{% endhighlight %}

That is all a PR essentially is --- a request to merge (from) a *work branch* onto a *main branch*. That request is sent to a reviewer.

Suppose "*Author A*" sends the above PR to "*Author C*".

## The Review

We now simulate an "*Author C*". Create a clone `clone-C` by doing:
<div class="perform">{% highlight shell %}
cd ..
git clone remote clone-C
cd clone-C
git branch -rd origin/HEAD
{% endhighlight %}</div>

We then set the credential for "*Author C*", as well as some parameters:
<div class="perform">{% highlight shell %}
git config user.name "Author C"
git config user.email c@e.com
git config log.abbrevCommit true
{% endhighlight %}</div>

Next, we pull updates from the *remote*, and then checkout the work we need to review:
<div class="perform">{% highlight shell %}
git pull
git checkout author-A/rainbow
{% endhighlight %}</div>

### Installing `diff-highlight`

Git has a related program called `diff-highlight` that makes `git diff` more visually informative.

Install the `diff-highlight` program:
<div class="perform">{% highlight shell %}
mkdir ~/bin
curl https://raw.githubusercontent.com/git/git/master/contrib/diff-highlight/diff-highlight > ~/bin/diff-highlight
chmod +x ~/bin/diff-highlight
{% endhighlight %}</div>

#### Executable Path

Check if the `diff-highlight` program is on your *executable path*: Doing <span class="perform">`which diff-highlight`</span> should show:
{% highlight text %}
/Users/<username>/bin/diff-highlight
{% endhighlight %}

**If there was no output** from the above command, you will have to add `~/bin` to your *executable path*:
<div class="perform">{% highlight shell %}
echo "PATH=~/bin:\$PATH" >> ~/.bashrc
{% endhighlight %}
</div>

**If you're using MacOS**, you must also ensure that your `~/.bash_profile` has this line:
{% highlight text %}
[[ -s ~/.bashrc ]] && source ~/.bashrc
{% endhighlight %}

Usually, a MacOS's `~/.bash_profile` should contain only that 1 line.

After adding `~/bin` to your *executable path*, you must restart your Bash terminal.

<div class="side-note" markdown="1">
If you're on Linux, you can try to do `source /etc/environment && source ~/.bashrc` without having to restart your Bash terminal.

If you're on MacOS, you can try to do `source /etc/profile` instead. Yes, MacOS is a little non-standard in the way it handles shell configuration.
</div>

#### Using `diff-highlight`

Now, tell Git to always use `diff-highlight`:
<div class="perform">{% highlight shell %}
git config --global pager.log "diff-highlight | less"
git config --global pager.show "diff-highlight | less"
git config --global pager.diff "diff-highlight | less"
{% endhighlight %}</div>

### Diff

The *reviewer* looks at the *work* (or *changes*).

<div class="tip" markdown="1">
To view the *work/changes*, do `git diff <ours> <theirs>`, where `<ours>` is the *commit* on which we will be applying changes (via `git merge`) from `<theirs>`.
</div>

In this case, *branch* <span class="git-green">author-A/rainbow</span> contains the new changes to be applied onto *branch* <span class="git-green">master</span>. Therefore, we do <span class="perform">`git diff master author-A/rainbow`</span>:
<pre>
<code><span class="bold">diff --git a/story.txt b/story.txt
index 700b75e..6806d4f 100644
--- a/story.txt
+++ b/story.txt</span>
<span class="git-blue">@@ -2,7 +2,7 @@</span> Once upon a time, there was a unicorn.

 The unicorn saw a rainbow.

<span class="git-red">-The unicorn f<span class="diff">elt nothing about it</span>.</span>
<span class="git-green">+The unicorn f<span class="diff">ound it unremarkable</span>.</span>

 The unicorn looked around.</code>
</pre>

It is very obvious that "*Author A*" replaced "*elt nothing about it*" with "*ound it unremarkable*".

### Discussion

In this case, the changes are simple and easy to understand.

But to learn about how discussions are typically conducted, let's assume the reviewer still has concerns, and chooses to hold a discussion with "*Author A*". For example, the reviewer may question the purpose of the "*rainbow*" in the story, since the unicorn had no response to the "*rainbow*" at all. In response, "*Author A*" may justify the existence of the "*rainbow*" by claiming that the "*rainbow*" will have a purpose only later on in the story, via a "*surprise plot twist*" perhaps. Moreover, "*Author A*" can claim that deeming the "*rainbow*" "*unremarkable*" is a non-trivial response.

Let's assume that the reviewer accepts the justification given by "*Author A*", and therefore accepts the change put forward by "*Author A*".

### Merge

The reviewer will now *merge* the work into *branch* <span class="git-green">master</span>.

Create `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span>) to contain:
{% highlight text %}
Merge branch 'author-A/rainbow'
{% endhighlight %}

Perform the merge, commit it, and then push it:
<div class="perform">{% highlight shell %}
git checkout master     # Recall: always checkout the 'onto' branch
git merge --no-ff --no-commit author-A/rainbow     # Do the merge
git commit -F {{ commit-msg-file }}     # Commit the merge
git push     # Push the merge
{% endhighlight %}</div>

When working on a GitHub, BitBucket or GitLab platform, a PR is merged on the *remote repo*, not from a *clone* like what was seen in the above merge process. Don't worry, such a platform-facilitated merge is a lot more convenient than the above manual merge process.

{% assign work-A-merge-commit = site.data.git-lesson.git-commits.work-A-merge.id %}
{% assign work-A-merge-commit-short = work-A-merge-commit | slice: 0, 7 %}
{% assign work-A-merge-commit-date = site.data.git-lesson.git-commits.work-A-merge.date %}
{% assign work-A-merge-commit-timestamp = site.data.git-lesson.git-commits.work-A-merge.timestamp %}

A <span class="perform">`git log --decorate --graph --first-parent`</span> now should show:
<pre>
<code>{% include git-log/ch.html commit-id=work-A-merge-commit class="work-A-merge-commit" head=true attached="master" remote="origin/master" %}
<span class="git-red">|</span> Merge: <span class="merge-commit-short goi">{{ merge-commit-short }}</span> <span class="work-A-commit-short goi">{{ work-A-commit-short }}</span>
<span class="git-red">|</span> Author: Author C <c@e.com>
<span class="git-red">|</span> Date:   {{ work-A-merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Merge branch 'author-A/rainbow'
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=merge-commit class="merge-commit" %}
<span class="git-red">|</span> Merge: <span class="third-commit-short goi">{{ third-commit-short }}</span> <span class="leapfrog-two-commit-short goi">{{ leapfrog-two-commit-short }}</span>
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Merge branch 'author-A/daydream'
<span class="git-red">|</span>
<span class="git-red">|</span>     The unicorn daydreams.
...</code>
</pre>

<div class="forward" markdown="1">
We will next see "merge conflict" enter this merge stage, making this stage a lot more involved.
</div>

## Conflict

<div class="tip" markdown="1">
A **merge conflict** occurs when 2 separate *branch*es change the same line in the same file.
</div>

To demonstrate a **merge conflict**, we get "*Author B*" to create work that changes the same lines affected by the work of "*Author A*".

The workflow is about the same as the case without *merge conflict*, but with conflict discussion and resolution added:
* Work is done.
* PR is created, and conflict is discovered.
* Conflict is discussed among relevant parties.
* Conflict is resolved.
* PR is sent to reviewer.
* Work is reviewed, and then merged.

Note that the "*PR creation*" step will now be fleshed out properly. It is more involved than previously described.

### Work Done

"*Author B*" will now create a *branch* <span class="git-green">author-B/rainbow</span>:
<div class="perform">{% highlight shell %}
cd ../clone-B     # Go to clone-B
git checkout master     # Always leapfrog from 'master'
git checkout -b author-B/rainbow     # Create the work branch
{% endhighlight %}</div>

A <span class="perform">`git log --decorate --graph --first-parent`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=merge-commit class="merge-commit" head=true branch="master" attached="author-B/rainbow" remote="origin/master" %}
<span class="git-red">|</span> Merge: <span class="third-commit-short goi">{{ third-commit-short }}</span> <span class="leapfrog-two-commit-short goi">{{ leapfrog-two-commit-short }}</span>
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Merge branch 'author-A/daydream'
<span class="git-red">|</span>
<span class="git-red">|</span>     The unicorn daydreams.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=third-commit class="third-commit" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   Tue May 16 18:23:02 2017 +0800
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
...</code>
</pre>

Notice that we're starting our work from an older tip of *branch* <span class="git-green">master</span> --- there is no sign of work from "*Author A*". This is intentional in this demonstration. It is a typical scenario.

<div class="tip" markdown="1">
The hallmark of Git is *rapid*, *asynchronous* work. Nobody waits on anybody to start work.
</div>

In this case, we're assuming that "*Author B*" started work on *branch* <span class="git-green">author-B/rainbow</span> *before* "*Author A*" even finished work on *branch* <span class="git-green">author-A/rainbow</span>.

We now do some work.

Edit `story.txt` (eg. <span class="perform">`emacs story.txt`</span>) to change line 5 and add lines 9-10:
{% assign linenos = "1 2 3 4 5 6 7 8 9 10 11 12 13" | split: " " %}
{% include linenos.html numbers=linenos %}
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn saw a rainbow.

The unicorn found it exciting.

The unicorn looked around.

The unicorn moved towards the rainbow.

The unicorn dreamed of clouds.

The unicorn thought about cotton candy.
{% endhighlight %}

A <span class="perform">`git diff story.txt`</span> shows:
<pre>
<code><span class="bold">diff --git a/story.txt b/story.txt
index 700b75e..b669429 100644
--- a/story.txt
+++ b/story.txt</span>
<span class="git-blue">@@ -2,7 +2,7 @@</span> Once upon a time, there was a unicorn.

 The unicorn saw a rainbow.

<span class="git-red">-The unicorn f<span class="diff">elt nothing about it</span>.</span>
<span class="git-green">+The unicorn f<span class="diff">ound it exciting</span>.</span>

 The unicorn looked around.

<span class="git-green">+The unicorn moved towards the rainbow.
+</span>
 The unicorn dreamed of clouds.

 The unicorn thought about cotton candy.
</code>
</pre>

<div class="tip" markdown="1">
It is good practice to review your unstaged changes via `git diff <file>` before staging your changes.
</div>

Create `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span>) to contain:
{% highlight text %}
Unicorn finds rainbow exciting
{% endhighlight %}

{% assign work-B-commit = site.data.git-lesson.git-commits.work-B.id %}
{% assign work-B-commit-short = work-B-commit | slice: 0, 7 %}
{% assign work-B-commit-date = site.data.git-lesson.git-commits.work-B.date %}
{% assign work-B-commit-timestamp = site.data.git-lesson.git-commits.work-B.timestamp %}

Add your work via <span class="perform">`git add story.txt`</span>, and then commit it via <span class="perform">`git commit -F {{ commit-msg-file }}`</span>. Finally, we push the work via <span class="perform">`git push -u origin author-B/rainbow`</span>. Then <span class="perform">`git log --decorate --graph --first-parent`</span> shows:
<pre>
<code>{% include git-log/ch.html commit-id=work-B-commit class="work-B-commit" head=true attached="author-B/rainbow" remote="origin/author-B/rainbow" %}
<span class="git-red">|</span> Author: Author B <b@d.com>
<span class="git-red">|</span> Date:   {{ work-B-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn finds rainbow exciting
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=merge-commit class="merge-commit" branch="master" remote="origin/master" %}
<span class="git-red">|</span> Merge: <span class="third-commit-short goi">{{ third-commit-short }}</span> <span class="leapfrog-two-commit-short goi">{{ leapfrog-two-commit-short }}</span>
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Merge branch 'author-A/daydream'
<span class="git-red">|</span>
<span class="git-red">|</span>     The unicorn daydreams.
...</code>
</pre>

### PR Created

We next have "*Author B*" create the following PR:
{% highlight yaml %}
From Branch: origin/author-B/rainbow
To Branch: origin/master
Description: Unicorn responds to the rainbow
{% endhighlight %}

"*Author B*" now has the responbility to perform a "*test merge*" of the work onto *branch* <span class="git-green">master</span>.

<div class="tip" markdown="1">
It is never the reviewer's responsibility to discover and resolve *merge conflicts*. The *work/change publisher* should be responsible instead.
</div>

<div class="tip" markdown="1">
Platforms that feature PR mechanism will perform this "*test merge*" automatically, discover *merge conflicts*, and inform you immediately about them.

For learning purposes, we continue to perform the "*test merge*" ourselves.
</div>

"*Author B*" performs the "*test merge*" via:
<div class="perform">{% highlight shell %}
git pull     # Pull in updates from remote
git checkout master     # Checkout branch 'master'
git merge --no-ff --no-commit author-B/rainbow
{% endhighlight %}</div>

Git tells us there's a *merge conflict*:
{% highlight text %}
Auto-merging story.txt
CONFLICT (content): Merge conflict in story.txt
Automatic merge failed; fix conflicts and then commit the result.
{% endhighlight %}

<div class="tip" markdown="1">
**Merge conflict**s are described inside the files where *conflict*s occur.
</div>

Editing `story.txt` (eg. <span class="perform">`emacs story.txt`</span>) shows:
{% assign linenos = "3 4 5 6 7 8 9 10 11 12 13 14 15" | split: " " %}
{% include linenos.html numbers=linenos %}
<pre class="conflict">
<code>The unicorn saw a rainbow.

<span class="bound"><<<<<<< HEAD</span>
<span class="old">The unicorn found it <span class="diff">unremarkable</span>.</span>
<span class="bound">||||||| merged common ancestors</span>
<span class="common">The unicorn felt nothing about it.</span>
<span class="bound">=======</span>
<span class="new">The unicorn found it <span class="diff">exciting</span>.</span>
<span class="bound">>>>>>>> author-B/rainbow</span>

The unicorn looked around.

The unicorn moved towards the rainbow.</code>
</pre>

The above colorful highlighting is provided by `emacs`. Even if your text editor doesn't show those colors, you should be able to compare the text easily.

Recall: To view the *work/changes*, do `git diff <ours> <theirs>`, where `<ours>` is the *commit* on which we will be applying changes (via `git merge`) from `<theirs>`. In our case now, `<ours>` would be *branch* <span class="git-green">master</span> and `<theirs>` would be *branch* <span class="git-green">author-B/rainbow</span>.

The <span class="conflict-old">red section</span> shows the "*old*" value, the value already on *branch* <span class="git-green">master</span>.

The <span class="conflict-new">green section</span> shows the "*new*" value, the value on *branch* <span class="git-green">author-B/rainbow</span>.

The <span class="conflict-common">yellow section</span> shows the "*common value*" from which both the "*new*" and "*old*" values stemmed (forked).

Let's see where that "*fork*" is, via <span class="perform">`git log --decorate --graph --first-parent master author-B/rainbow`</span>:
<pre>
<code>{% include git-log/ch.html commit-id=work-B-commit class="work-B-commit" head=true attached="author-B/rainbow" remote="origin/author-B/rainbow" %}
<span class="git-red">|</span> Author: Author B <b@d.com>
<span class="git-red">|</span> Date:   {{ work-B-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn finds rainbow exciting
<span class="git-red">|</span>
<span class="git-red">|</span> {% include git-log/ch.html commit-id=work-A-merge-commit class="work-A-merge-commit" head=true attached="master" remote="origin/master" %}
<span class="git-red">|/</span>  Author: Author C <c@e.com>
<span class="git-red">|</span>   Date:   {{ work-A-merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>       Merge branch 'author-A/rainbow'
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=merge-commit class="merge-commit" %}
<span class="git-red">|</span> Merge: <span class="third-commit-short goi">{{ third-commit-short }}</span> <span class="leapfrog-two-commit-short goi">{{ leapfrog-two-commit-short }}</span>
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ merge-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Merge branch 'author-A/daydream'
<span class="git-red">|</span>
<span class="git-red">|</span>     The unicorn daydreams.
...</code>
</pre>

The fork is obviously at our *merge-commit*, where we merged in the unicorn's thoughts about "*clouds and cotton candy*", and where the unicorn still "*felt nothing about*" the rainbow.

We now abort the "*test merge*" via <span class="perform">`git merge --abort`</span>. We don't have the right to merge our work into *branch* <span class="git-green">master</span> now, because our work is not yet reviewed.

### Conflict Discussion

At this point of the workflow, "*Author B*" should discuss the conflict with "*Author A*".

A typical start of such a discussion would be these question from "*Author B*" to "*Author A*":
* "*Did you intend to have the unicorn find the rainbow unremarkable?*"
* "*Will I break anything if I now decide that the unicorn finds the rainbow exciting?*"

In our case, let's simplify the scenario and have "*Author A*" tell "*Author B*" to "*go ahead with your changes because I now agree that the unicorn should not find the rainbow unremarkable*". In short, "*Author A*" agrees to have her own changes overwritten by changes from "*Author B*".

<div class="side-note" markdown="1">
In more complex scenarios, both authors may incorporate parts of each other's work.
</div>

### Conflict Resolution

"*Author B*" goes back to *branch* <span class="git-green">author-B/rainbow</span> and attempts to incorporate the "*latest updates*" on *branch* <span class="git-green">master</span> onto the *work branch* (*branch* <span class="git-green">author-B/rainbow</span>):
<div class="perform">{% highlight shell %}
git checkout author-B/rainbow
git merge --no-ff --no-commit master
{% endhighlight %}</div>

Edit `story.txt` (eg. <span class="perform">`emacs story.txt`</span> to see the *merge conflict*:
{% assign linenos = "3 4 5 6 7 8 9 10 11 12 13 14 15" | split: " " %}
{% include linenos.html numbers=linenos %}
<pre class="conflict">
<code>The unicorn saw a rainbow.

<span class="bound"><<<<<<< HEAD</span>
<span class="old">The unicorn found it <span class="diff">exciting</span>.</span>
<span class="bound">||||||| merged common ancestors</span>
<span class="common">The unicorn felt nothing about it.</span>
<span class="bound">=======</span>
<span class="new">The unicorn found it <span class="diff">unremarkable</span>.</span>
<span class="bound">>>>>>>> author-B/rainbow</span>

The unicorn looked around.

The unicorn moved towards the rainbow.</code>
</pre>

<div class="tip" markdown="1">
Non-conflicting changes are merged in without conflict alerts.

The above line 15 is an example. It is a new line added.
</div>

"*Author B*" easily sees that our intended changes now involves removing lines 7-11 and line 5. We want to keep *our* changes (on *branch* <span class="git-green">author-B/rainbow</span>), and discard *their* changes (on *branch* <span class="git-green">master</span>). The final contents of `story.txt` should be:
{% assign linenos = "1 2 3 4 5 6 7 8 9 10 11 12 13" | split: " " %}
{% include linenos.html numbers=linenos %}
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn saw a rainbow.

The unicorn found it exciting.

The unicorn looked around.

The unicorn moved towards the rainbow.

The unicorn dreamed of clouds.

The unicorn thought about cotton candy.
{% endhighlight %}

Edit `{{ commit-msg-file }}` (eg. <span class="perform">`emacs {{ commit-msg-file }}`</span> to contain:
{% highlight text %}
Pulls in updates from 'master'
{% endhighlight %}

Commit the merge via <span class="perform">`git commit -F {{ commit-msg-file }}`</span>.

Finally, the PR is sent to the reviewer, and the review proceeds. And that concludes our demonstration of **merge conflicts**.

<div class="side-note" markdown="1">
For a cleaner Git history, *merge conflict*s can be resolved via *rebasing*. Let me know if your project manager needs me to teach *rebasing*.
</div>

## Work on Own Branches

Do not work on *branch*es belonging to other team members.

Notice in [section Leapfrog Loop](#leapfrog-loop) that we created for "*Author A*" a *branch* named <span class="git-green">author-A/daydream</span>.

<div class="tip" markdown="1">
Create your own *branch*es by prefixing `your-name/` to the new *branch* names. Eg. <span class="git-green">author-A/daydream</span>.

Work (create *commit*s) only on your own *branch*es.
</div>

In future, if I do write about *force push* (`git push -f`), I can explain why we only ever work on our own *branch*es.

As for *branch* <span class="git-green">master</span>, usually only the project manager should have the authority to "*work*" on that --- the project manager merges *branch*es (leapfrog loops) into *branch* <span class="git-green">master</span>.

# Go Forth!

We're done with the Git lesson! Feel free to create *commit*s with both "*Author A*" and "*Author B*", and get a feel for how collaboration can work on Git repositories via *remote* and *clone*s.

As a final tidbit, here's a clue about how to **ignore** the `rough_thoughts.txt` file we created. Create a `.gitignore` file in folder `clone-A`. And `clone-B` too, if you want to continue pretending to be both "*Author A*" and "*Author B*".

<div class="tip" markdown="1">
`.gitignore` entries permit wildcards that work in Bash. Eg `*.bak` ignores all files whose name end with `.bak`.

Specifying paths are a little more involved:
* A leading `/` targets only the folder where `gitignore` resides.
    * Eg. `/config.cfg` ignores `/config.cfg` but not `/subfolder/config.cfg`.
* No leading `/` targets all folders, including subfolders, recursively.
    * Eg. `config.cfg` ignores all `config.cfg` files, even in subfolders.
</div>

# GitHub and BitBucket

BitBucket allows your academic email address to get an unlimited account --- you can have any number of private repositories.

GitHub is probably where you want to publish your proudest achievements.

For security, **you should use SSH keys to login** to your Bitbucket and GitHub accounts. Feel free to contact me to ask for a write-up on this. Or you can contact BitBucket and GitHub to ask their support staff for help.

<div class="tip" markdown="1">
General rule of thumb for passwords:
* Long and complex for account login.
* Short and easy for private passphrase locking/unlocking your SSH keys.

Each SSH key has 2 parts --- private and public. The private key never leaves your harddisk, never travels onto any network. You can read briefly into [Public-key Cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography) to get an idea of how SSH keys work.
</div>
