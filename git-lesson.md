---
layout: page
title: Git Lesson
permalink: /git-lesson/
---

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="../assets/toc.js"></script>

* TOC
{:toc}

<div id="menu" markdown="1" draggable="true">
</div>

# Overview

This Git lesson brings you through a typical workflow with Git, consisting 3 areas.

* Local clone
* Remote operations
* Collaboration techniques

All 3 areas will be dealt with at the same time because typical Git workflows involve all 3, usually all at once. Git is primarily a *collaboration tool*.

You will be running through use cases, from starting a Git repository to collaborating with other people.

Even if you only use Git on your own, bear in mind that version control is necessary for you to "*collaborate with yourself*". We typically go through a decent length project often asking questions like "*why did I do that last month?*", "*what was I thinking when I made this decision?*", "***what if** I take a new fangled approach I just learned?*", and so on.

This Git lesson is written to be as trim as possible. You can safely ignore side notes like this:

<div class="side-note">
Serious about programming? Get the cheapest Mac there is. It is difficult to find cheap Linux laptops in Singapore, possibly due to the IT culture (or lack thereof) in Singapore.
</div>

But you should especially note important tips like this:

<div class="tip" markdown="1">
<p>Grasp concepts first, lookup technical details later. Learning before working, looking before leaping!</p>
<p>Go through this Git lesson quickly and sequentially, and don't think too hard. Important concepts will be explained along with relevant demonstrations.</p>
<p>Important tips are places where you should pause and grasp the concepts just demonstrated.</p>
<p>Shoot me an email if any part of this lesson bogs you down and impedes you from progressing rapidly.</p>
</div>

However, you should look out for fast-forward suggestions like this:

<div class="forward" markdown="1">
This lesson is about Git, and this *Overview* section is now over. Nothing more to see here. Onward!
</div>

# Prerequistites

This Git lesson is taught using a *nix platform (eg Linux, MacOS), in particular Bash.

If you're on Linux or MacOS, you're a productive and efficient coder, and you should expect to blaze through this Git lesson in less than an hour.

If you're on Windows, you can install [Git for Windows](https://git-for-windows.github.io), and use *Git Bash*. Meantime, keep bugging [Jon](https://bitbucket.org/{{ site.bitbucket_username }}) to complete his "*Crash Course for Productivity on Linux/MacOS*".

# Starting a Local Git Repository

A Git repo (short for repository) contains:

* A copy of the **files** that you're working on (aka *working copy*)
* The **history** of your work on said files.

You start a local Git repo like this:
{% highlight shell %}
cd ~/Documents     # Keep all your work in your own folder.
mkdir my-new-project     # This folder will contain the files for your new project.
cd my-new-project     # Enter the folder you created above.
git init     # Start the Git repo in this folder.
{% endhighlight %}

A Git repo tracks a *folder* of files, so the said **files** are really the files in that *folder*.

<div class="tip">
<p markdown="1">A Git repo resides in a *folder*, and can potentially (and usually does) track all files in that *folder*.</p>
<p markdown="1">That means you really shouldn't `git init` in a *top-level folder* like `~/Documents` or `/usr/local`! You want to track the progress of your projects, not every single file in your computer.</p>
</div>

## The `.git` Folder

`ls -la` will show you the `.git` folder that was created when you started a new Git repo. This [hidden folder](https://en.wikipedia.org/wiki/Hidden_file_and_hidden_directory) contains Git data --- data regarding the **history** of your work, data about your credential, and other stuff we want to ignore for now.

<div class="tip"><p markdown="1">The `.git` folder is what defines your Git repo.</p></div>

We're now interested in `.git/config`, where your credential is stored. The content of that file (do `cat .git/config`) should currently be (with some omissions):
{% highlight conf %}
[core]
	filemode = true   # false if you're on Windows
	bare = false
    ...
{% endhighlight %}

Let's input a credential for you now, using fictitious, but important, values. Follow along, please!
{% assign git-name = site.data.git-lesson.git-credential.name %}
{% assign git-email = site.data.git-lesson.git-credential.email %}
{% highlight shell %}
git config user.name "{{ git-name }}"
git config user.email {{ git-email }}
{% endhighlight %}

Now, these new lines will have been inserted into `.git/config`:
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

## Working Copy of Project Files

Create file `story.txt`, and enter into it these 3 lines:
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

# Git Status --- Change Summary

`git status` will show this:
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



# Staging Area

When telling Git to commit your new work, Git only commits what you place in the **staging area**.

`git add story.txt` will put `story.txt` into the *staging area*, and a subsequent `git status` will show:
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

To demonstrate the purpose of having a *staging area*, create a new file `rough_thoughts.txt` and enter this line:
{% highlight text %}
Random disorganized thoughts. Don't want to git-track this.
{% endhighlight %}

`git status` will now show:
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

# Committing Your Work

{% assign commit-msg-file = site.data.git-lesson.commit-msg-file %}

You can use any text editor to edit file `{{ commit-msg-file }}`. Enter into it these 5 lines:
{% highlight text %}
Adds first work on the story

I'd think up more descriptive information here if I could.
That first line above should be a short summary, with no ending period.
Then comes a blank line, and then details and descriptions follow.
{% endhighlight %}

You then commit your work by doing `git commit -F {{ commit-msg-file }}`.

<div class="side-note">
<p markdown="1">If you want to use Emacs as a *commit message editor*, you can configure Git to use Emacs. Do the configuration with `git config --global core.editor emacs`. The default editor is [vi][vi]. You can then verify your editor configuration in `~/.gitconfig`. That file can also be edited by hand.</p>
<p markdown="1">You can then do just `git commit -v` and see your chosen text editor pop up, enter your commit message, save like you're saving a file (you're actually saving `{{ commit-msg-file }}`), and finally exit the text editor. That sequence of actions will commit your changes.</p>
</div>

[vi]: https://www.cs.colostate.edu/helpdocs/vi.html

<div class="tip">
<p markdown="1">It is usually better to collect your thoughts in a file when you construct your commit message. The `-F` option lets you specify a file that contains your commit message.</p>
</div>


# Git Log --- A Timeline

{% assign first-commit = site.data.git-lesson.git-commits.first.id %}
{% assign first-commit-date = site.data.git-lesson.git-commits.first.date %}
{% assign first-commit-timestamp = site.data.git-lesson.git-commits.first.timestamp %}

`git log --decorate --graph` will show your first commit. Later on when you have more commits, `git log` will show a connected graph (timeline) of all your commits. Right now, you only have 1 commit:
<pre>
<code>{% include git-log/ch.html commit-id=first-commit full-id=true head=true attached="master" %}
  Author: {{ git-name }} <{{ git-email }}>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then whatever descriptive things I wanna say.</code>
</pre>

Especially note the credential attached to that commit. Recall from [a previous section](#the-git-folder) where you configured your credential for this Git repo. This credential is what gets attached to every commit you make in this Git repo.

<div class="forward" markdown="1">
The `git log` option `--decorate` shows *git branches/tags*, concepts that will be explained later. The option `--graph` shows a visual representation (with connecting lines) of how *commits*  connect and form, well, a graph. How *commits* connect to one another will also be explained later.
</div>

<div class="tip" markdown="1">
`git log` lets you see *what was done before* to decide *what to do next*. You'll also often look at previous *commit messages* to guide you in creating new *commit messages*.
</div>

## Navigating the Git Log

`git log` shows the log in a `less` window ([navigation tips here](http://www.thegeekstuff.com/2010/02/unix-less-command-10-tips-for-effective-navigation)), which coincidentally is navigated similarly to a [`vi` window][vi].

<div class="side-note" markdown="1">
Turns out many *nix productivity tools are inter-related! Learn one, learn all! You'll see `vi`-like navigation in `less`, and `emacs`-like navigation in `bash`.
</div>

Shorten the height of your `bash` terminal such that `git log --decorate --graph` output exceeds that height. The log will be displayed in a `less` window, and you can practice navigating in that window.

# Git Objects --- Commits, Trees, Blobs

A Git **Commit** is collection of (like a manifest listing) *folders and files* contained in that *commit*. In short, Git is really a tracker for a *filesystem*.

<div class="tip" markdown="1">
A Git **Commit** is a **snapshot** of all your project files at a particular time (the time you created that *commit*). And your *project files* are represented by a collection of *folders and files*, potentially involving nested *folders*.
</div>

That's almost all you need to know about a Git **Commit**. Besides being a **snapshot** of all your project files, a Git **Commit** also has relations to other Git **Commit**s.

Technically, under the hood, Git represents *folders* with *trees* and *files* with *blobs*.

Now, we shall see how a Git **Commit** is a **snapshot** and how it relates to other Git **Commit**s.

Create a subfolder `folder-A` and a file `file-A.txt` inside:
{% highlight shell %}
mkdir folder-A
echo "This is file-A." > folder-A/file-A.txt
{% endhighlight %}

Create a subfolder `folder-B` inside `folder-A`, and files `file-B.txt` and `file-C.txt` inside:
{% highlight shell %}
mkdir folder-A/folder-B
echo "This is file-B." > folder-A/folder-B/file-B.txt
echo "This is file-C." > folder-A/folder-B/file-C.txt
{% endhighlight %}

Stage our new changes with `git add folder-A`.

<div class="side-note" markdown="1">
The `git add` command accepts *folders* and *files* as inputs, the former being handled recursively.
</div>

Check our *staging area* with `git status`:
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

We construct our *commit message* by editing `{{ commit-msg-file }}`:
{% highlight text %}
Adds nested folder structure

Just testing. We want to see Git Objects.
We should be seeing Commits, Trees and Blobs.
{% endhighlight %}

And now, we commit with `git commit -F {{ commit-msg-file }}`.

{% assign second-commit = site.data.git-lesson.git-commits.second.id %}
{% assign second-commit-date = site.data.git-lesson.git-commits.second.date %}
{% assign second-commit-timestamp = site.data.git-lesson.git-commits.second.timestamp %}

## Git Object Identifier

A look at Git Log via `git log --decorate --graph` shows:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit full-id=true head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit full-id=true %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

{% assign first-commit-short = first-commit | slice: 0, 5 %}
{% assign second-commit-short = second-commit | slice: 0, 5 %}

Now, take note of your two **commit ID**s, just the first 5 characters will do. Mine are <span class="git-yellow">{{ first-commit-short }}</span> and <span class="git-yellow">{{ second-commit-short }}</span>. Write yours down somewhere quick and easy, like I do:
{% highlight text %}
first-commit: {{ first-commit-short }}
second-commit: {{ second-commit-short }}
{% endhighlight %}

<div class="tip" markdown="1">
Think of these **ID**s as unique identifiers, each uniquely representing a Git object (*commit*, *tree* or *blob*).
</div>

<div class="side-note" markdown="1">
These **ID**s are actually [SHA-1](https://en.wikipedia.org/wiki/SHA-1) *message digest*s.
</div>

## Anatomy of a Commit

**In the following instructions, replace my *commit ID*s with your own.**

{% assign second-tree = site.data.git-lesson.git-trees.second %}

Let's look at the *second-commit* via `git cat-file -p {{ second-commit-short }}`:
{% highlight text linenos %}
tree {{ second-tree }}
parent {{ first-commit }}
author Author A <a@c.com> {{ second-commit-timestamp }} +0800
committer Author A <a@c.com> {{ second-commit-timestamp }} +0800

Adds nested folder structure

Just testing. We want to see Git Objects.
We should be seeing Commits, Trees and Blobs.
{% endhighlight %}

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

And to confirm that our *second-commit* really links to our *first-commit*, we take a peek at the *first-commit* by doing `git cat-file -p {{ first-commit-short }}`:
{% highlight text linenos %}
tree {{ first-tree }}
author Author A <a@c.com> {{ first-commit-timestamp }} +0800
committer Author A <a@c.com> {{ first-commit-timestamp }} +0800

Adds first work on the story

I'd think up more descriptive information here if I could.
That first line above should be a short summary, with no ending period.
Then comes a blank line, and then details and descriptions follow.
{% endhighlight %}

{% assign first-tree-short = first-tree | slice: 0, 5 %}
{% assign second-tree-short = second-tree | slice: 0, 5 %}

Note the 2 different *tree* objects pointed to by the 2 commits. Write yours down somewhere quick and easy, like I do:
{% highlight text %}
first-commit: {{ first-commit-short }}
second-commit: {{ second-commit-short }}
first-tree: {{ first-tree-short }}
second-tree: {{ second-tree-short }}
{% endhighlight %}

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
{% assign git-tree-folder-A-short = git-tree-folder-A | slice: 0, 5 %}
{% assign git-tree-folder-B = site.data.git-lesson.git-trees.folder-B %}
{% assign git-tree-folder-B-short = git-tree-folder-B | slice: 0, 5 %}
{% assign git-tree-file-B = site.data.git-lesson.git-trees.file-B %}
{% assign git-tree-file-B-short = git-tree-file-B | slice: 0, 5 %}

Let's confirm that our *second-tree* does indeed contain the hierarchy we conjectured above. `git cat-file -p {{ first-tree-short }}` shows:
{% highlight text %}
040000 tree {{ git-tree-folder-A }}	folder-A
100644 blob 2a8621f3fe966d677330a471450bd54a539162a2	story.txt
{% endhighlight %}

Indeed, our *second-tree* has a tree (`folder-A`) and a blob (`story.txt`).

Chase that nested *tree* further down by `git cat-file -p {{ git-tree-folder-A-short }}`:
{% highlight text %}
100644 blob 0e82526a4ea4a0031220e1e872d2c6abab945ccb	file-A.txt
040000 tree {{ git-tree-folder-B }}	folder-B
{% endhighlight %}

And further down by `git cat-file -p {{ git-tree-folder-B-short }}`:
{% highlight text %}
100644 blob {{ git-tree-file-B }}	file-B.txt
100644 blob 8458d5e043e7546ff08a0292699a75536f87bcaa	file-C.txt
{% endhighlight %}

And finally, a peek into a **Blob** Git object by `git cat-file -p {{ git-tree-file-B-short }}`:
{% highlight text %}
This is file-B.
{% endhighlight %}

{% assign git-tree-file-B = site.data.git-lesson.git-trees.file-B %}
{% assign git-tree-file-B-short = git-tree-file-B | slice: 0, 5 %}

To fully take stock of all the Git objects we currently have, `find .git/objects -type f` shows:
{% highlight text %}
.git/objects/{{ first-commit | slice: 0, 2 }}/{{ first-commit | slice: 2, 100 }}
.git/objects/{{ second-commit | slice: 0, 2 }}/{{ second-commit | slice: 2, 100 }}
... and so on ...
{% endhighlight %}

You can find your recorded *commit IDs* among the above output.

<div class="side-note" markdown="1">
Note that the Git objects are likely organized into a [hashtable](https://en.wikipedia.org/wiki/Hash_table), where the 1st 2 digits of the *object ID* is the *bucket ID*.
</div>

<div class="side-note">
<p markdown="1">To check their types (**Commit**, **Tree**, **Blob**), you can do `find .git/objects -type f | cut -d'/' -f3,4 | sed 's/\///' | xargs -I %ID -t git cat-file -t %ID`.</p>
<p markdown="1">Or simply do them 1 by 1: `git cat-file -t <1st-5-digits-of-ID>`.</p>
</div>

<div class="tip" markdown="1">
A Git **Commit** has 3 components:
* Snapshot --- of the project folders/files (Git **Tree** object)
* Parent(s) --- 0 or more links to immediate parent(s) (Git **Commit** object)
* Commit Message --- the *commit message* for itself (plain text)
</div>

# Git References

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

This is actually a *reference* to our *second-commit* (<span class="git-yellow">{{ second-commit-short }}</span> in my case), as seen by `git log --decorate --oneline master`:
<pre>
<code><span class="git-yellow">118a9ac (<span class="git-blue">HEAD -></span> <span class="git-green">master</span>)</span> Adds nested folder structure
<span class="git-yellow">2b55199</span> Adds first work on the story</code>
</pre>

Confirm this by doing `cat .git/refs/heads/master` and also `git branch -v`. Note that the *Git object ID* is the same in both places:
<pre><code>{{ second-commit }}
* <span class="git-green">master</span> 118a9ac Adds nested folder structure</code>
</pre>

## Human-Friendlier Git Object IDs

In the spirit of Git *reference*s, let's make *Git Object ID*s more human-friendly too.

<div class="tip" markdown="1">
*Git Object ID*s is still *not* the right way to work in Git. Git *reference*s is the right way!
</div>

We set a parameter for `git log` like this: `git config log.abbrevCommit true`.

A subsequent `git log --decorate --graph` shows 7-character *commit ID*s:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

## Swimming Upstream

<div class="tip" markdown="1">
The `~` operator takes in a number that tells Git how many commits you want to swim upstream. The result is the *commit* Git lands on after performing that operation.
</div>

`git log --decorate --oneline master~1` shows us our *first-commit*, which is 1 step upstream of our *second-commit*:
<pre><code><span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> Adds first work on the story</code></pre>

There is no way to swim *downstream*. Git *commit*s do not have a property that is a counterpart to `parent`.

# Branches

Currently, the only branch we have is the "*master*" branch, shown by `git branch`.

<div class="tip" markdown="1">
The branch name "*master*" is the convention for the *main branch* of a Git repo.
</div>

Our "*master*" branch is pointing to our second commit, as shown by `git log --decorate --graph`:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

Let's create a new *branch* named "*temp*" at our *first-commit* by doing `git branch temp master~1`. A `git log --decorate --graph master` shows:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit branch="temp" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

The fact that branches are really just Git *references* tells us that branches are simply pointers. We confirm this by comparing `cat .git/refs/heads/temp` with `git branch -v`:
<pre>
<code>* <span class="git-green">master</span> {{ second-commit | slice: 0, 7 }} Adds nested folder structure
  temp   {{ first-commit | slice: 0, 7 }} Adds first work on the story</code>
</pre>

{% highlight text %}
{{ first-commit }}
{% endhighlight %}

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

We will continue writing our story in `story.txt` from branch "*master*", and create a new branch "*git-obj-study*" that points to our prior study of Git objects:
{% highlight shell %}
git branch git-obj-study master     # git-obj-study points to second-commit
git branch -d temp     # Don't need branch 'temp' anymore
git reset --hard master~1     # Move branch 'master' upstream to first-commit
{% endhighlight %}

Our story will continue properly from the *first-commit*. The *second-commit* was really a digression to understand Git objects. `git log --decorate git-obj-study` shows:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit branch="git-obj-study" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit head=true attached="master" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

Edit file `story.txt` to contain (new lines 3-6):
{% highlight text linenos %}
Once upon a time, there was a unicorn.

The unicorn saw a rainbow.

The unicorn felt nothing about it.

The unicorn looked around.
{% endhighlight %}

Add our new work to the *staging area* by doing `git add story`.

Edit file `.git/COMMIT_EDIT_MSG` to contain:
{% highlight text %}
Unicorn encounters a rainbow
{% endhighlight %}

Commit our new work by doing `git commit -F .git/COMMIT_EDITMSG`.

{% assign third-commit = site.data.git-lesson.git-commits.third.id %}
{% assign third-commit-short = third-commit | slice: 0, 5 %}
{% assign third-commit-date = site.data.git-lesson.git-commits.third.date %}
{% assign third-commit-timestamp = site.data.git-lesson.git-commits.third.timestamp %}

A `git log --decorate --graph git-obj-study master` shows:
<pre>
<code>{% include git-log/ch.html commit-id=third-commit attached="master" head=true %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ third-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
<span class="git-red">|</span> {% include git-log/ch.html commit-id=second-commit branch="git-obj-study" %}
<span class="git-red">|/</span> Author: Author A <a@c.com>
<span class="git-red">|</span>  Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>      Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>      Just testing. We want to see Git Objects.
<span class="git-red">|</span>      We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

Note your *commit ID*s, including the new (third) one. Mine are:
{% highlight text %}
first-commit: {{ first-commit-short }}
second-commit: {{ second-commit-short }}
third-commit: {{ third-commit-short }}
{% endhighlight %}

In the above `git log`, we can see that there are 2 branches --- <span class="git-green">master</span> whose *head* is at the *third-commit* (<span class="git-yellow">{{ third-commit-short }}</span> in my case), and <span class="git-green">git-obj-study</span> whose *head* is at the *second-commit* (<span class="git-yellow">{{ second-commit-short }}</span> in my case).

<div class="tip" markdown="1">
The **head**, aka *tip*, of a **branch** is the latest *commit* (furthest *downstream*) on the *branch*.
</div>

The fork for these 2 *branch*es is at our *first-commit*, just FYI.

## Branches and Garbage Collection

*Branch*es are important because they provide the only (normal) way for you to access *commit*s.

<div class="tip" markdown="1">
In terms of normal Git use, the only way to access *commit*s is via *branch*es.
</div>

That is, it is generally infeasible to refer to *commit*s via their [Git Object Identifiers](#git-object-identifier).

<div class="tip" markdown="1">
Unreferenced *commit*s can be deleted --- at some later time, not immediately --- by Git's *garbage collector*.
</div>

Even if you strive hard to remember an unreferenced *commit*'s *Git object ID*, you won't be able to retrieve that *commit* after Git's *garbage collector* has deleted it.

We will demonstrate how the *garbage collector* deletes an *unreferenced commit*. We first create a commit we intend to lose.

In `story.txt`, add 2 lines at the end:
{% highlight text linenos %}
Once upon a time, there was a unicorn.

The unicorn saw a rainbow.

The unicorn felt nothing about it.

The unicorn looked around.

This change will intentionally be lost.
{% endhighlight %}

Edit `{{ commit-msg-file }}` to be:
{% highlight text %}
Adds a commit we intend to lose
{% endhighlight %}

Do `git add story.txt` and then `git commit -F {{ commit-msg-file }}`.

{% assign to-lose-commit = site.data.git-lesson.git-commits.to-lose.id %}
{% assign to-lose-commit-short = to-lose-commit | slice: 0, 5 %}
{% assign to-lose-commit-date = site.data.git-lesson.git-commits.to-lose.date %}
{% assign to-lose-commit-timestamp = site.data.git-lesson.git-commits.to-lose.timestamp %}

A `git log --decorate --graph master` shows our *to-lose-commit* (<span class="git-yellow">{{ to-lose-commit-short }}</span> for my case):
<pre>
<code>{% include git-log/ch.html commit-id=to-lose-commit head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ to-lose-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds a commit we intend to lose
{% include git-log/ch.html commit-id=third-commit %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ third-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

Note your *commit ID*s, including the new one we intend to lose. Mine are:
{% highlight text %}
first-commit: {{ first-commit-short }}
second-commit: {{ second-commit-short }}
third-commit: {{ third-commit-short }}
to-lose-commit: {{ to-lose-commit-short }}
{% endhighlight %}

We now retreat (move *upstream*) our branch <span class="git-green">master</span> by doing `git reset --hard master~1`. A `git log --decorate --graph master` shows:
<pre>
<code>{% include git-log/ch.html commit-id=third-commit head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ third-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

We confirm that our *to-lose-commit* still exists by doing `git cat-file -p {{ to-lose-commit-short }}`:
{% highlight text %}
tree 2913ba48160d3b6b713135243c06d7e15034bbcc
parent 9ad88e52d7820c8754ca35ff125cb391ae810bc0
author Author A <a@c.com> {{ to-lose-commit-timestamp }} +0800
committer Author A <a@c.com> {{ to-lose-commit-timestamp }} +0800

Adds a commit we intend to lose
{% endhighlight %}

### Unreachable Commits

Let us see if our *to-lose-commit* is now **unreachable**. We can see that our *to-lose-commit* is now *unreachable* by doing `git for-each-ref --contains {{ to-lose-commit-short }}` (no output). Contrast that with output for our *first-commit* via `git for-each-ref --contains {{ first-commit-short }}`:
{% highlight text %}
{{ second-commit }} commit	refs/heads/git-obj-study
{{ third-commit }} commit	refs/heads/master
{% endhighlight %}

<div class="tip" markdown="1">
**Unreachable commits** are those that aren't referenced by any:
* Git **references**
  * *branch* (local or remote)
  * *tag*
* **commit** (via commit property "*parent*").
</div>

Note that Git does not consider the `HEAD` as a "*Git reference that determines commit reachability*".

<div class="forward" markdown="1">
**Tag**s and the **`HEAD`** will be explained later, as well as the reason why the `HEAD` does not determine *commit reachability*.
</div>

It is now clear that our *to-lose-commit* is **unreachable**. But it is *not* **unreferenced**! Let's see.

<div class="forward" markdown="1">
The proper way to check for dangling (unreachable) *commit*s is to do `git fsck --no-reflog`. But we will only learn about Git *reflog* later on.
</div>

### Reflog --- Safety Net

Git's **reflog** still stores a reference to our *to-lose-commit*. A `git reflog master` reveals our *to-lose-commit* is still referenced at `master@{1}`:
<pre>
<code><span class="git-yellow">{{ third-commit | slice: 0, 7 }}</span> master@{0}: reset: moving to master~1
<span class="git-yellow">{{ to-lose-commit | slice: 0, 7 }}</span> master@{1}: commit: Adds a commit we intend to lose
<span class="git-yellow">{{ third-commit | slice: 0, 7 }}</span> master@{2}: commit: Unicorn encounters a rainbow
<span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> master@{3}: reset: moving to HEAD~1
<span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> master@{4}: commit: Adds nested folder structure
<span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> master@{5}: commit (initial): Adds first work on the story</code>
</pre>

<div class="forward" markdown="1">
The Git **reflog** is like an "*undo history*" --- a history of past actions we can undo. We will learn more about Git *reflog* later on.
</div>

Now, Git's default parameters for its *garbage collector* means that Git only deletes *unreferenced commits* that are older than 14 days. To impede our current experiment more, Git still retains references to our *to-lose-commit* in its *reflog*, because *reflog references to unreachable commits* are only deleted if older than 30 days. Our experiment can only work if we wait 30 days from now!

<div class="forward" markdown="1">
Git does not immediately delete, through *garbage collection*, *commit*s that are not referenced. Later on, we will learn how to perform *undo* operations in Git.
</div>

A simple test proves it: `git gc` and then `git cat-file -p {{ to-lose-commit-short }}`. And we see that our *to-lose-commit* is still in existence.

We give immediacy to the *garbage collector* by passing in these parameters:
{% highlight shell %}
git config gc.pruneExpire now
git config gc.reflogExpireUnreachable now
{% endhighlight %}

Now, `git gc` and then `git cat-file -p {{ to-lose-commit-short }}` shows that our *to-lose-commit* was deleted by Git's *garbage collector*:
{% highlight text %}
fatal: Not a valid object name {{ to-lose-commit-short }}
{% endhighlight %}

Now remove that immediacy we just mandated! We don't want Git immediately deleting our commits. We like the 30-day *grace period* for us to perform any *undo* required!

Reset the *garbage collector* to default parameters by doing `git config --remove-section gc`! Do that now!

<div class="tip" markdown="1">
Never change default parameters for the *garbage collector* under normal circumstances.
</div>

# The `HEAD`

<div class="tip" markdown="1">
The `HEAD` is a special Git reference that refers to the **current commit** you're on. Your *next new commit* will have this *current commit* as its *parent*.
</div>

That is the definition, so to speak, of the `HEAD`. That definition implies many things, such as the functionality and semantics of Git *branch*, the definition of *commit reachability*, and more.

<div class="forward" markdown="1">
Those implications are better studied through clear demonstrations, coming up next.
</div>

## `HEAD` With Branch

When we perform a `git checkout <branch>`, the `HEAD` is attached to the *branch* we checkout.

<div class="tip" markdown="1">
**Checking out** (switching to) a *branch* (`git checkout <branch>`) **attaches** the `HEAD` to the branch. Thus, the `HEAD` moves around to different *branch*es as we checkout various *branch*es.
</div>

Currently, we're on *branch* <span class="git-green">master</span>, as shown by `git log --decorate --graph master git-obj-study`:
<pre>
<code>{% include git-log/ch.html commit-id=third-commit attached="master" head=true %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ third-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
<span class="git-red">|</span> {% include git-log/ch.html commit-id=second-commit branch="git-obj-study" %}
<span class="git-red">|/</span> Author: Author A <a@c.com>
<span class="git-red">|</span>  Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>      Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>      Just testing. We want to see Git Objects.
<span class="git-red">|</span>      We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

<div class="tip" markdown="1">
An **attached** `HEAD` is shown with an arrow pointing to the *branch* it is attached to. Like this: <code><span class="git-blue">HEAD -></span> <span class="git-green">branch-name</span></code>
</div>

We do `git checkout git-obj-study`, and then `git log --decorate --graph master git-obj-study` shows:
<pre>
<code>{% include git-log/ch.html commit-id=third-commit branch="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ third-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
<span class="git-red">|</span> {% include git-log/ch.html commit-id=second-commit attached="git-obj-study" head=true %}
<span class="git-red">|/</span> Author: Author A <a@c.com>
<span class="git-red">|</span>  Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>      Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>      Just testing. We want to see Git Objects.
<span class="git-red">|</span>      We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

The `HEAD` has moved from being *attached to* <span class="git-green">master</span> to being *attached to* <span class="git-green">git-obj-study</span>.

### To Work on a Branch

What does it mean to *work on a branch*? How is a *branch* **advanced**?

<div class="tip" markdown="1">
When creating a new *commit* off of (downstream of) the `HEAD`:
* The `HEAD` is moved to refer to the new *commit*.
* **If attached** to a *branch*, that *branch* is advanced (downstream) to point to the new *commit*.

Hence, a `HEAD` attached to some *branch* allows us to in effect **work on the branch, commit to the branch, and advance the branch**.
</div>

This was seen when we committed our *first-commit* and *second-commit* while on *branch* <span class="git-green">master</span>. We did not have to manually advance the *branch* with every new *commit*.

We shall soon see that this *automatic advancing of a branch* does not occur if the `HEAD` is not attached to any branch.

## Quick Word on Tags

<div class="tip" markdown="1">
*Tag*s are mere pointers, like *branch*es are. However, *tag*s do not have the same functionality (such as advancement with new *commit*s) nor semantics as *branch*es do. **Tags are mere pointers, and nothing more.**
</div>

As we will soon see, checking out a tag will result in a detached `HEAD`.

Create a tag at the *second-commit* by doing `git tag our-tag git-obj-study`. Then `git log --decorate --graph git-obj-study` shows:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit attached="git-obj-study" head=true tag="our-tag" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>    Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>    Just testing. We want to see Git Objects.
<span class="git-red">|</span>    We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

## Detached `HEAD`

Checkout tag <span class="git-yellow">our-tag</span> by doing `git checkout our-tag`:
{% highlight text %}
Note: checking out 'our-tag'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b <new-branch-name>

HEAD is now at {{ second-commit | slice: 0, 7 }} ... Adds nested folder structure
{% endhighlight %}

<div class="tip" markdown="1">
Checking out a **tag** will result in a **detached** `HEAD`. The same **detachment** will happen if you checked out the **commit** itself (`git checkout {{ second-commit-short }}`), or any *commit* for that matter.
</div>

A `git log --decorate --graph HEAD` shows that the `HEAD` is on its own:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit branch="git-obj-study" head=true tag="our-tag" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

### Committing While Detached

We will now show what happens when a new *commit* is made on a *detached* `HEAD`.

Add 2 lines at the end of `story.txt`:
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn looked around.

This change will be committed while detached.
{% endhighlight %}

Edit `{{ commit-msg-file }}` to be:
{% highlight text %}
Adds a commit while detached
{% endhighlight %}

Commit that new change with `git commit -F {{ commit-msg-file }}`.

{% assign detached-commit = site.data.git-lesson.git-commits.detached.id %}
{% assign detached-commit-short = detached-commit | slice: 0, 5 %}
{% assign detached-commit-date = site.data.git-lesson.git-commits.detached.date %}
{% assign detached-commit-timestamp = site.data.git-lesson.git-commits.detached.timestamp %}

Then `git log --decorate --graph HEAD` shows:
<pre>
<code>{% include git-log/ch.html commit-id=detached-commit head=true %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ detached-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds a commit while detached
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=second-commit branch="git-obj-study" tag="our-tag" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

Note your *commit ID*s, including the new one we created while detached. Mine are:
{% highlight text %}
first-commit: {{ first-commit-short }}
second-commit: {{ second-commit-short }}
third-commit: {{ third-commit-short }}
to-lose-commit: {{ to-lose-commit-short }}
detached-commit: {{ detached-commit-short }}
{% endhighlight %}

Our *detached-commit* is **unreachable**, as can be seen via `git for-each-ref --contains {{ detached-commit-short }}` (no output).

Git considers the `HEAD` as transient and *not really a Git reference*, even though the `HEAD` is technically a *special kind of Git reference*.

<div class="tip" markdown="1">
Recall: *Branch*es are important, being the only normal way to access *commit*s.
</div>

Let's put a new *branch* to our *detached-commit* via `git branch temp`. Now, our *detached-commit* is no longer **unreachable**, as evidenced by `git for-each-ref --contains {{ detached-commit-short }}`:
{% highlight text %}
{{ detached-commit }} commit	refs/heads/temp
{% endhighlight %}

### Leaving Commits Behind

Let's complete our demonstration of how a commit created while detached can be lost.

Delete the branch <span class="git-green">temp</span> via `git branch -d temp`.

Checkout branch <span class="git-green">git-obj-study</span> via `git checkout git-obj-study`, and we see Git telling us:
{% highlight text %}
Warning: you are leaving 1 commit behind, not connected to
any of your branches:

  {{ detached-commit | slice: 0, 7 }} Adds a commit while detached

If you want to keep it by creating a new branch, this may be a good time
to do so with:

 git branch <new-branch-name> {{ detached-commit | slice: 0, 7 }}

Switched to branch 'git-obj-study'
{% endhighlight %}

In fact, despite Git's polite warning, that is about the only time you may *keep that unreachable commit*. You likely won't remember the *commit ID* of our *detached-commit* after this warning disappears. Moreover, Git's *garbage collector* may delete that *unreachable commit* some time later (30 days) before you decide to retrieve it.

That brings us to an important tip:

<div class="tip" markdown="1">
Creating branches (temporarily or otherwise) is a good way to hang on to any *commit*s you would potentially want to keep. In fact, it's a good "*put a bookmark on here before I mess things up*" technique. (Just don't delete the *branch* in question!)
</div>

To repeat for reinforcement, *branch*es are the only normal way to access (reach) *commit*s.

The `HEAD` changes depending on which *branch* you checkout, and can potentially leave *commit*s behind.

A `git log --decorate --graph {{ detached-commit-short }}` shows that the `HEAD` has moved to <span class="git-green">git-obj-study</span>, and has left our *detached-commit* behind:
<pre>
<code>{% include git-log/ch.html commit-id=detached-commit %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ detached-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds a commit while detached
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=second-commit head=true attached="git-obj-study" tag="our-tag" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

### Jumping Through Timelines

A *detached* `HEAD` does have its uses. You can move the `HEAD` to any *commit* (snapshot) in any timeline to take a look-see.

Just remember that you need to attach the `HEAD` to a *branch* before you start work.

# Git Reflog

"*Undo history*" for Git references.

There's a *reflog* for each Git reference. The most useful *reflog* is that for the `HEAD`.

Picture a scenario where a *branch* is deleted. Its *reflog* will also be deleted, preventing undo.

The `HEAD` can never be deleted.

# Starting a Bare Git Repository

A bare Git repo contains the **history** of your work on your files, but does not keep a *working copy* of your files.

Make room for the bare Git repo by doing:
{% highlight shell %}
cd ..
mv my-new-project clone-A     # Our local repo is now in folder 'clone-A'
mkdir -p my-new-project/remote     # Create the folder for the bare repo
mv clone-A my-new-project     # 'my-new-project' shall neatly contain our repos
cd my-new-project
{% endhighlight %}

Create the bare repo, which we shall call *remote repo*, by doing:
{% highlight shell %}
mkdir remote     # Create new folder for bare repo
cd remote
git init --bare     # Create the bare repo
cd ..
{% endhighlight %}

<div class="forward" markdown="1">
The above bare repo resides on your local harddisk, but is for all our intents and purposes akin to a *remote repo*. You shall see the concept *remote repo* demonstrated soon.
</div>

## *Clone* vs *Remote*

<div class="tip" markdown="1">
**Clone**s are non-bare local repos we work on. Your *clone* is your local copy of the Git repo you work on (see "*remote*" soon after this).
</div>

In our case here, we have a *clone* in folder '*clone-A*'.

<div class="tip" markdown="1">
**Remote**s are bare repos we push to, and collaborate on. Consider a *remote* as a "*certified true copy*" of sorts, which is also clearly implied by the contrasting term "*clone*". They also act like "*cloud backups*" (if you're using [GitHub](github.com) or [BitBucket](bitbucket.org)), in case your *clones* get damaged.
</div>

Our *remote* in this case resides in folder '*remote*'.

<div class="forward" markdown="1">
We will look at situating our *remote* on GitHub and BitBucket later on.
</div>

<div class="tip" markdown="1">
The *remote* name "*origin*" is the convention for representing the "*certified true copy*" repo for the project.
</div>

Point our *clone* to the *remote*:
{% highlight shell %}
cd clone-A
git remote -v     # Should display nothing; no remotes linked to yet.
git remote add orign ../remote     # Our remote is named "origin"
{% endhighlight %}

Checking for our added remote with `git remote -v`:
{% highlight text %}
orign	../remote (fetch)
orign	../remote (push)
{% endhighlight %}

<div class="side-note" markdown="1">
Although it is possible to pull (fetch) from one remote repo and push to another remote repo, we shall stick with the most common use case --- our remote pulls from and pushes to the same location.
</div>

## Pushing Work To Remote

We now push our current branch (`master`) up to `origin` by doing `git push origin master`:
{% highlight text %}
Counting objects: 10, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6/6), done.
Writing objects: 100% (10/10), 926 bytes | 0 bytes/s, done.
Total 10 (delta 0), reused 0 (delta 0)
To ../remote
 * [new branch]      master -> master
{% endhighlight %}

<div class="side-note" markdown="1">
Git *branches* will be explained later on.
</div>

<div class="side-note" markdown="1">
Typically, your first push to a remote should include the `-u` (set-upstream) option like this `git push -u origin master`. The above is a simplified scenario.
</div>

Everything you saw in your `.git` folder inside your *clone* will be inside the *remote* (the bare Git repo).
Both these commands should show you the same files:
{% highlight shell %}
find .git/objects -type f
find ../remote/objects -type f
{% endhighlight %}

You can see that the bare repo does not reserve any space for *working copies of project files*; all Git data is stored at the top-level folder (`../remote`).

<div class="tip" markdown="1">
We never work on *remotes*, but instead work on *clones* and push our work up to *remotes*.
</div>

A look at Git Log via `git log --decorate --graph` tells us our remote now has branch 'master' too (*origin/master*):
<pre>
<code>{% include git-log/ch.html commit-id=second-commit head=true attached="master" remote="origin/master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   Wed May 10 10:45:25 2017 +0800
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit %}
  Author: Author A <a@c.com>
  Date:   Tue May 9 18:26:31 2017 +0800

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>







# Remote Branches

# Work-In-Progress Branches

## Correct Small Typos

Introduce `git commit --amend`.

Only meant for correcting blatant and small typos we can spot quickly.

Not meant for perfecting any particular commits. Show danger of repeatedly *amending* a commit; loss of history, potential loss of important changes.

## Force Push

Demonstrate typo correction with `git push -f`. Show why a **force push** should never be done on `master` branch.

<div class="forward" markdown="1">
Notice that branch <span class="git-red">origin/master</span> and <span class="git-green">master</span> are on different *commit*s. Later on, we will learn why it is generally not a good idea to *move* *branch*es (`git reset --hard` or `git branch -f`) **after** they have already been *push*ed to a *remote*. We will also learn about Git **remote**s. For now, we continue our story properly.
</div>

## Branch-Merge Loops --- Leapfroging

Small and rapid commits on these branches. When changes are refined to usable level, merge them back onto main work-in-progress branch.

Acts as scope containment for better focus.

Show `--no-ff` merges and resultant closed loops.



# Pull Requests (for Peer Review)
