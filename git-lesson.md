---
layout: page
title: Git Lesson
permalink: /git-lesson/
---

<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
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

## Anatomy of a Commit

**In the following instructions, replace my *commit ID*s with your own.**

{% assign second-tree = site.data.git-lesson.git-trees.second %}

Let's look at the *second-commit* via
<pre>
<code>git cat-file -p <span class="second-commit-short goi">{{ second-commit-short }}</span></code>
</pre>
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
<pre><code>git cat-file -p <span class="first-commit-short goi">{{ first-commit-short }}</span></code></pre>

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
<pre><code>git cat-file -p <span class="second-tree-short goi">{{ second-tree-short }}</span></code></pre>
<pre>
<code>040000 tree <span class="folder-A-tree goi">{{ git-tree-folder-A }}</span>	folder-A
100644 blob 2a8621f3fe966d677330a471450bd54a539162a2	story.txt</code>
</pre>

Indeed, our *second-tree* has a tree (`folder-A`) and a blob (`story.txt`).

Chase that nested *tree* further down by:
<pre><code>git cat-file -p <span class="folder-A-tree-short goi">{{ git-tree-folder-A-short }}</span></code></pre>
<pre>
<code>100644 blob 0e82526a4ea4a0031220e1e872d2c6abab945ccb	file-A.txt
040000 tree <span class="folder-B-tree goi">{{ git-tree-folder-B }}</span>	folder-B</code>
</pre>

And further down by:
<pre><code>git cat-file -p <span class="folder-B-tree-short goi">{{ git-tree-folder-B-short }}</span></code></pre>
<pre>
<code>100644 blob <span class="file-B-blob goi">{{ git-tree-file-B }}</span>	file-B.txt
100644 blob 8458d5e043e7546ff08a0292699a75536f87bcaa	file-C.txt</code>
</pre>

And finally, a peek into a **Blob** Git object by:
<pre><code>git cat-file -p <span class="file-B-blob-short goi">{{ git-tree-file-B-short }}</span></code></pre>
{% highlight text %}
This is file-B.
{% endhighlight %}

{% assign git-tree-file-B = site.data.git-lesson.git-trees.file-B %}
{% assign git-tree-file-B-short = git-tree-file-B | slice: 0, 7 %}

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

This is actually a *reference* to our *second-commit*, as seen by `git log --decorate --oneline master`:
<pre>
<code><span class="git-yellow"><span class="second-commit-short goi">{{ second-commit-short }}</span> (<span class="git-blue">HEAD -></span> <span class="git-green">master</span>)</span> Adds nested folder structure
<span class="git-yellow"><span class="first-commit-short goi">{{ first-commit-short }}</span></span> Adds first work on the story</code>
</pre>

Confirm this by doing `cat .git/refs/heads/master` and also `git branch -v`. Note that the *Git object ID* is the same in both places:
<pre><code><span class="second-commit goi">{{ second-commit }}</span>
* <span class="git-green">master</span> <span class="second-commit-short goi">{{ second-commit-short }}</span> Adds nested folder structure</code>
</pre>

## Human-Friendlier Git Object IDs

In the spirit of Git *reference*s, let's make *Git Object ID*s more human-friendly too.

<div class="tip" markdown="1">
*Git Object ID*s is still *not* the right way to work in Git. Git *reference*s is the right way!
</div>

We set a parameter for `git log` like this: `git config log.abbrevCommit true`.

A subsequent `git log --decorate --graph` shows 7-character *commit ID*s:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
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
<pre><code><span class="git-yellow"><span class="first-commit goi">{{ first-commit-short }}</span></span> Adds first work on the story</code></pre>

There is no way to swim *downstream*. Git *commit*s do not have a property that is a counterpart to `parent`.

# Branches

Currently, the only branch we have is the "*master*" branch, shown by `git branch`.

<div class="tip" markdown="1">
The branch name "*master*" is the convention for the *main branch* of a Git repo.
</div>

Our "*master*" branch is pointing to our second commit, as shown by `git log --decorate --graph`:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

Let's create a new *branch* named "*temp*" at our *first-commit* by doing `git branch temp master~1`. A `git log --decorate --graph master` shows:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit branch="temp" class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

The fact that branches are really just Git *references* tells us that branches are simply pointers. We confirm this by comparing `cat .git/refs/heads/temp` with `git branch -v`:
<pre>
<code>* <span class="git-green">master</span> <span class="second-commit goi">{{ second-commit-short }}</span> Adds nested folder structure
  temp   <span class="first-commit goi">{{ first-commit-short }}</span> Adds first work on the story</code>
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

We will continue writing our story in `story.txt` from branch "*master*", and create a new branch "*git-obj-study*" that points to our prior study of Git objects:
{% highlight shell %}
git branch git-obj-study master     # git-obj-study points to second-commit
git branch -d temp     # Don't need branch 'temp' anymore
git reset --hard master~1     # Move branch 'master' upstream to first-commit
{% endhighlight %}

Our story will continue properly from the *first-commit*. The *second-commit* was really a digression to understand Git objects. `git log --decorate git-obj-study` shows:
<pre>
<code>{% include git-log/ch.html commit-id=second-commit class="second-commit" branch="git-obj-study" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" head=true attached="master" %}
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
{% assign third-commit-short = third-commit | slice: 0, 7 %}
{% assign third-commit-date = site.data.git-lesson.git-commits.third.date %}
{% assign third-commit-timestamp = site.data.git-lesson.git-commits.third.timestamp %}

A `git log --decorate --graph git-obj-study master` shows:
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
<span class="git-red">|</span>
<span class="git-red">|</span>      Just testing. We want to see Git Objects.
<span class="git-red">|</span>      We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
  Author: Author A <a@c.com>
  Date:   {{ first-commit-date }}

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

In the above `git log`, we can see that there are 2 branches --- <span class="git-green">master</span> whose *head* is at the *third-commit*, and <span class="git-green">git-obj-study</span> whose *head* is at the *second-commit*.

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

This change will be intentionally lost.
{% endhighlight %}

Edit `{{ commit-msg-file }}` to be:
{% highlight text %}
Adds a commit we intend to lose
{% endhighlight %}

Do `git add story.txt` and then `git commit -F {{ commit-msg-file }}`.

{% assign to-lose-commit = site.data.git-lesson.git-commits.to-lose.id %}
{% assign to-lose-commit-short = to-lose-commit | slice: 0, 7 %}
{% assign to-lose-commit-date = site.data.git-lesson.git-commits.to-lose.date %}
{% assign to-lose-commit-timestamp = site.data.git-lesson.git-commits.to-lose.timestamp %}

A `git log --decorate --graph master` shows our *to-lose-commit* (<span class="git-yellow">{{ to-lose-commit-short }}</span> for my case):
<pre>
<code>{% include git-log/ch.html commit-id=to-lose-commit class="to-lose-commit" head=true attached="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ to-lose-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds a commit we intend to lose
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

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

We now retreat (move *upstream*) our branch <span class="git-green">master</span> by doing `git reset --hard master~1`. A `git log --decorate --graph master` shows:
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

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then details and descriptions follow.</code>
</pre>

We confirm that our *to-lose-commit* still exists by doing:
<pre><code>git cat-file -p <span class="to-lose-commit-short goi">{{ to-lose-commit-short }}</span></code></pre>
<pre>
<code>tree 2913ba48160d3b6b713135243c06d7e15034bbcc
parent <span class="third-commit goi">{{ third-commit }}</span>
author Author A <a@c.com> {{ to-lose-commit-timestamp }} +0800
committer Author A <a@c.com> {{ to-lose-commit-timestamp }} +0800

Adds a commit we intend to lose</code>
</pre>

### Unreachable Commits

We can see that our *to-lose-commit* is now **unreachable** by doing `git fsck --no-reflogs`:
<pre><code>dangling commit <span class="to-lose-commit goi">{{ to-lose-commit }}</span></code></pre>

<div class="forward" markdown="1">
We will learn about Git *reflog* later on.
</div>

Contrast that with our *first-commit* via:
<pre><code>git for-each-ref --contains <span class="first-commit-short goi">{{ first-commit-short }}</span></code></pre>
<pre>
<code><span class="second-commit goi">{{ second-commit }}</span> commit	refs/heads/git-obj-study
<span class="third-commit goi">{{ third-commit }}</span> commit	refs/heads/master</code>
</pre>

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

### Reflog --- Safety Net

Git's **reflog** still stores a reference to our *to-lose-commit*. A `git reflog master` reveals our *to-lose-commit* is still referenced at `master@{1}`:
<pre>
<code><span class="git-yellow"><span class="third-commit-short goi">{{ third-commit-short }}</span></span> master@{0}: reset: moving to master~1
<span class="git-yellow"><span class="to-lose-commit-short goi">{{ to-lose-commit-short }}</span></span> master@{1}: commit: Adds a commit we intend to lose
<span class="git-yellow"><span class="third-commit-short goi">{{ third-commit-short }}</span></span> master@{2}: commit: Unicorn encounters a rainbow
<span class="git-yellow"><span class="first-commit-short goi">{{ first-commit-short }}</span></span> master@{3}: reset: moving to HEAD~1
<span class="git-yellow"><span class="second-commit-short goi">{{ second-commit-short }}</span></span> master@{4}: commit: Adds nested folder structure
<span class="git-yellow"><span class="first-commit-short goi">{{ first-commit-short }}</span></span> master@{5}: commit (initial): Adds first work on the story</code>
</pre>

<div class="forward" markdown="1">
The Git **reflog** is like an "*undo history*" --- a history of past actions we can undo. We will learn more about Git *reflog* later on.
</div>

Now, Git's default parameters for its *garbage collector* means that Git only deletes *unreferenced commits* that are older than 14 days. To impede our current experiment more, Git still retains references to our *to-lose-commit* in its *reflog*, because *reflog references to unreachable commits* are only deleted if older than 30 days. Our experiment can only work if we wait 30 days from now!

<div class="forward" markdown="1">
Git does not immediately delete, through *garbage collection*, *commit*s that are not referenced. Later on, we will learn how to perform *undo* operations in Git.
</div>

A simple test proves it. We do `git gc` and see that our *to-lose-commit* is still in existence:
<pre><code>git cat-file -p <span class="to-lose-commit-short goi">{{ to-lose-commit-short }}</span></code></pre>
<pre>
<code>tree 2913ba48160d3b6b713135243c06d7e15034bbcc
parent <span class="third-commit goi">{{ third-commit }}</span>
author Author A <a@c.com> {{ to-lose-commit-timestamp }} +0800
committer Author A <a@c.com> {{ to-lose-commit-timestamp }} +0800

Adds a commit we intend to lose</code>
</pre>

We give immediacy to the *garbage collector* by passing in these parameters:
{% highlight shell %}
git config gc.pruneExpire now
git config gc.reflogExpireUnreachable now
{% endhighlight %}

Now, `git gc` will delete our *to-lose-commit*, as can be seen by:
<pre><code>git cat-file -p <span class="to-lose-commit-short goit">{{ to-lose-commit-short }}</span></code></pre>
<pre><code>fatal: Not a valid object name <span class="to-lose-commit-short goi">{{ to-lose-commit-short }}</span></code></pre>

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
<span class="git-red">|</span>
<span class="git-red">|</span>      Just testing. We want to see Git Objects.
<span class="git-red">|</span>      We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
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
<code>{% include git-log/ch.html commit-id=third-commit class="third-commit" branch="master" %}
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   {{ third-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>     Unicorn encounters a rainbow
<span class="git-red">|</span>
<span class="git-red">|</span> {% include git-log/ch.html commit-id=second-commit class="second-commit" attached="git-obj-study" head=true %}
<span class="git-red">|/</span> Author: Author A <a@c.com>
<span class="git-red">|</span>  Date:   {{ second-commit-date }}
<span class="git-red">|</span>
<span class="git-red">|</span>      Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>      Just testing. We want to see Git Objects.
<span class="git-red">|</span>      We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
{% include git-log/ch.html commit-id=first-commit class="first-commit" %}
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
{% assign detached-commit-short = detached-commit | slice: 0, 7 %}
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

Note your *commit ID*s, including the new one we created while detached. Map yours to mine:
{% highlight text %}
first-commit: {{ first-commit-short }}
second-commit: {{ second-commit-short }}
third-commit: {{ third-commit-short }}
to-lose-commit: {{ to-lose-commit-short }}
detached-commit: {{ detached-commit-short }}
{% endhighlight %}

Our *detached-commit* is **unreachable**, as can be seen via `git fsck --no-reflogs`:
{% highlight text %}
dangling commit {{ detached-commit }}
{% endhighlight %}

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

Let's jump to an earlier time in *branch* <span class="git-green">git-obj-study</span>. Suppose we want to reminisce about how we started off when we created this *branch*.

A `git checkout git-obj-study~1` puts us 1 *commit* upstream:
{% highlight text %}
Note: checking out 'git-obj-study~1'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:

  git checkout -b <new-branch-name>

HEAD is now at {{ first-commit | slice: 0, 7 }}... Adds first work on the story
{% endhighlight %}

And `git log --decorate` shows:
<pre>
<code>{% include git-log/ch.html commit-id=first-commit head=true lone=true %}
Author: Author A <a@c.com>
Date:   {{ first-commit-date }}

    Adds first work on the story

    I'd think up more descriptive information here if I could.
    That first line above should be a short summary, with no ending period.
    Then comes a blank line, and then details and descriptions follow.</code>
</pre>

Let's take a look-see. A `ls -a` shows:
<pre>
<code>./                  <span class="git-blue">.git</span>/               story.txt
../                 rough_thoughts.txt</code>
</pre>

And `cat story.txt` shows:
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn looked around.
{% endhighlight %}

Aw, how sweet. That was how we started, with just 3 lines in `story.txt`.

Alright, enough nostalgia. We need progress. We're done with learning about *detached* `HEAD`.

# Git Reflog

Git **reflog** is like an "*Undo history*" for Git *references*.

*Reflog*s only exist for *branch*es and for the `HEAD`.

It is meaningless to have *reflog*s for *tag*s, since *tag*s do not (and are not meant to) move like *branch*es and the `HEAD` do.

## *Reflog* for `HEAD`

`git reflog` or `git reflog HEAD` shows the *reflog* for the `HEAD`.

<div class="tip" markdown="1">
A Git **reflog** for the `HEAD` shows the **recent changes** to the `HEAD`. Changes include:
* **Advancement** (upon a new *commit*) --- denoted by **commit**
* **Checkout** --- denoted by **checkout**
* **Forced Movement** (via `git reset --hard`) --- denoted by **reset: moving**
</div>

A `git reflog` shows:
<pre>
<code><span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> HEAD@{0}: checkout: moving from git-obj-study to git-obj-study~1
<span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> HEAD@{1}: checkout: moving from {{ detached-commit }} to git-obj-study
<span class="git-yellow">{{ detached-commit | slice: 0, 7 }}</span> HEAD@{2}: commit: Adds a commit while detached
<span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> HEAD@{3}: checkout: moving from git-obj-study to our-tag
<span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> HEAD@{4}: checkout: moving from master to git-obj-study
<span class="git-yellow">{{ third-commit | slice: 0, 7 }}</span> HEAD@{5}: commit: Unicorn encounters a rainbow
<span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> HEAD@{6}: reset: moving to HEAD~1
<span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> HEAD@{7}: commit: Adds nested folder structure
<span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> HEAD@{8}: commit (initial): Adds first work on the story</code>
</pre>

Assuming you followed this Git lesson closely, your `HEAD`'s *reflog* should look exactly like the above.

Let's recall our past actions and match them with the *reflog* above, from the earliest (`HEAD@{8}`) to the latest (`HEAD@{0}`).

### In the Beginning

When we created our Git repo (`git init`), Git created a *branch* <span class="git-green">master</span>. That *branch* is where our `HEAD` starts, where our `HEAD` is *attached*.

How did we arrive at `HEAD@{8}`?

<pre><code><span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> HEAD@{8}: commit (initial): Adds first work on the story</code></pre>

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

You will see that `HEAD@{8}` corresponds with your *first-commit*.

### Explored Git Objects

How did we arrive at `HEAD@{7}`?

<pre><code><span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> HEAD@{7}: commit: Adds nested folder structure</code></pre>

Our next action was a `git commit` that commited some nested folders and files in order to explore [Git Objects](#git-objects--commits-trees-blobs). This corresponds with your *second-commit*.

### Continued Our Story

How did we arrive at `HEAD@{6}` and `HEAD@{5}`?

<pre>
<code><span class="git-yellow">{{ third-commit | slice: 0, 7 }}</span> HEAD@{5}: commit: Unicorn encounters a rainbow
<span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> HEAD@{6}: reset: moving to HEAD~1</code>
</pre>

At [section Branch Head](#branch-head), we wanted to continue our story properly from the *first-commit*, since the *second-commit* was really just a digression for us to explore *Git Objects*.

We first created branch <span class="git-green">git-obj-study</span> at our *second-commit* (pointed to by <span class="git-green">master</span> at the time). We did this via `git branch git-obj-study master`. That is why `git reflog git-obj-study` now shows:
<pre><code><span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> git-obj-study@{0}: branch: Created from master</code></pre>

We then **force moved** *branch* <span class="git-green">master</span> to 1 *commit* upstream via `git reset --hard master~1`.

Unfortunately for the *reflog* of *branch* <span class="git-green">master</span>, a subsequent `git gc` removed some *reflog* entries deemed redundant, and the trimmed *reflog* is seen via `git reflog master`:
<pre>
<code><span class="git-yellow">{{ third-commit | slice: 0, 7 }}</span> master@{0}: commit: Unicorn encounters a rainbow
<span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> master@{1}: commit (initial): Adds first work on the story</code>
</pre>

The *reflog* for `HEAD` retains information about that move:
<pre><code><span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> HEAD@{6}: reset: moving to HEAD~1</code></pre>

And this brings us to the next important lesson:

<div class="tip" markdown="1">
In general, prefer to use *reflog* for `HEAD`. *Reflog* for *branch*es may be trimmed by `git gc`, or deleted altogether by yourself!
</div>

<div class="forward" markdown="1">
We will later explore what happens to a *reflog* when we delete a *branch*. For now, let's focus on reading the *reflog* for `HEAD`.
</div>

Our next action was a `git commit` that created our *third-commit*. You will see that `HEAD@{5}` corresponds with your *third-commit*.

### Lost a Commit

Was there something between `HEAD@{5}` and `HEAD@{4}`?

<pre>
<code><span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> HEAD@{4}: checkout: moving from master to git-obj-study
<span class="git-yellow">{{ third-commit | slice: 0, 7 }}</span> HEAD@{5}: commit: Unicorn encounters a rainbow</code>
</pre>

Yes, there was. In [section Branches and Garbage Collection](#branches-and-garbage-collection), we had committed our *to-lose-commit* while still on *branch* <span class="git-green">master</span>. We then *force moved* *branch* <span class="git-green">master</span> upstream by 1 *commit*, leaving our *to-lose-commit* **unreachable**. We subsequently gave Git's *garbage collector* immediacy so that it deletes **unreachable** *commits* right away. Finally, we ran `git gc`, which did these:
* Deletes from *reflog*s all entries that refer to **unreachable** *commit*s.
* Deletes **unreferenced** *commit*s.

That first step from `git gc` removed entries between `HEAD@{5}` and `HEAD@{4}`.

With default parameters, Git's *garbage collector* only deletes entries from *reflog*s if they are more than 30 days old, which is a nice *grace period* for you to perform any needed *undo*.

Remember: Don't mess with the defaut parameters of the *garbage collector*!

### Attached the `HEAD`

How did we arrive at `HEAD@{4}`?

<pre><code><span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> HEAD@{4}: checkout: moving from master to git-obj-study</code></pre>

In [section `HEAD` With Branch](#head-with-branch), we wanted to see how the `HEAD` moves from being *attached to* *branch* <span class="git-green">master</span> to being *attached to* *branch* <span class="git-green">git-obj-study</span>. That is why we did `git checkout git-obj-study`.

### Detached the `HEAD`

How did we arrive at `HEAD@{3}` and `HEAD@{2}`?

<pre>
<code><span class="git-yellow">{{ detached-commit | slice: 0, 7 }}</span> HEAD@{2}: commit: Adds a commit while detached
<span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> HEAD@{3}: checkout: moving from git-obj-study to our-tag</code>
</pre>

In [section Quick Word on Tags](#quick-word-on-tags), we created a *tag* <span class="git-yellow">our-tag</span> at the *second-commit*.

In [section Detached `HEAD`](#detached-head), we wanted to show how checking out a *tag* results in a *detached* `HEAD`. So, we did `git checkout our-tag`. We then created a new *commit* which we termed *detached-commit* (<span class="git-yellow">{{ detached-commit-short }}</span> in my case).

Your *detached-commit* should correspond with that at `HEAD@{2}`.

### Left a *Commit*

How did we arrive at `HEAD@{1}` and `HEAD@{0}`?

<pre>
<code><span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> HEAD@{0}: checkout: moving from git-obj-study to git-obj-study~1
<span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> HEAD@{1}: checkout: moving from {{ detached-commit }} to git-obj-study</code>
</pre>

In [section Leaving Commits Behind](*leaving-commits-behind), we wanted to demonstrate how a *detached* `HEAD` can leave a *commit* behind. So we did `git checkout git-obj-study`, and had the `HEAD` leave our *detached-commit* behind.

The target of `HEAD@{1}` should correspond with your *second-commit* and the source should correspond with your *detached-commit*.

And finally in [section Jumping Through Timelines](#jumping-through-timelines), there was another exploration with *detached* `HEAD` as we took a look-see at our *first-commit* via `git checkout git-obj-study~1`. The target of `HEAD@{0}` should correspond with your *first-commit*.

## Undo

The *reflog* for the `HEAD` gives us the ability to undo actions we recently performed, *if* the actions involve the *movement* of the `HEAD`.

<div class="tip" markdown="1">
*Commit*s are never deleted during normal use, but during *garbage collection*.
</div>

So how are *commit*s actually lost?
* Left behind by a *detached* `HEAD`.
* Left behind by a *deleted* *branch*.
* Left behind by a *deleted* *tag*.

You can easily guess which of the above 3 cases we can undo --- only the first case, as it involves the *movement* of the `HEAD`.

### Not for *Tag*s

Let's check if we can undo the deletion of a *tag*.

Put a *tag* <span class="git-yellow">tag-detached</span> on your *detached-commit* via `git tag {{ detached-commit-short }}`. Now, *detached-commit* is *reachable*, as `git for-each-ref --contains {{ detached-commit-short }}` shows:
{% highlight text %}
{{ detached-commit }} commit	refs/tags/tag-detached
{% endhighlight %}

`git reflog tag-detached` is meaningless (no output). We already know that *reflog*s don't exist for *tag*s.

Deleting that tag with `git tag -d tag-detached` makes your *detached-commit* **unreachable**, as can be seen by `git fsck --no-reflogs`:
{% highlight text %}
dangling commit {{ detached-commit }}
{% endhighlight %}

And a subsequent `git reflog tag-detached` reports the lack of that *tag* we just deleted:
{% highlight text %}
fatal: ambiguous argument 'tag-detached': unknown revision or path not in the working tree.
{% endhighlight %}

<div class="tip" markdown="1">
Never use *tag*s to hold on to *commit*s you potentially want to keep. *Tag*s should only be used to mark *commit*s within a *branch* (*commit*s that are already *reachable*).
</div>

We already know that the `HEAD` kept in its *reflog* a history entry referencing your *detached-commit*, because the `HEAD` was **advanced** to *detached-commit* when it was created. Recall the definition and behavior of the `HEAD` upon the creation of any *commit*.

But what if that history entry was more than 30 days old and was deleted by the *garbage collector*?

<div class="forward" markdown="1">
Hold that thought. Let's move on to look at *undo*ing for *branch*es.
</div>

### Better for *Branch*es

Let's check if we can undo the deletion of a *branch*.

Create branch <span class="git-green">temp</span> at your *detached-commit* via `git branch temp {{ detached-commit-short }}`. Now, *detached-commit* is *reachable*, as evidenced by `git for-each-ref --contains {{ detached-commit-short }}`:
{% highlight text %}
{{ detached-commit }} commit	refs/heads/temp
{% endhighlight %}

`git reflog temp` shows:
<pre><code><span class="git-yellow">{{ detached-commit | slice: 0, 7 }}</span> temp@{0}: branch: Created from 795ba</code></pre>

Now, delete branch <span class="git-green">temp</span> by `git branchd -d temp`, to which Git says something to the effect of "*no can do, because that entire branch will be unreachable*":
{% highlight text %}
error: The branch 'temp' is not fully merged.
If you are sure you want to delete it, run 'git branch -D temp'.
{% endhighlight %}

<div class="figure" markdown="1">
![commits-joined](../assets/unmerged-branch.svg)
</div>

In the above figure, *branch* <span class="git-green">master</span> is at C3 (*third-commit*), which renders C2 and C1 *reachable*. If *branch* <span class="git-green">temp</span> was at C-d2, deleting <span class="git-green">temp</span> will render C-d2 and C-d1 (and entire branch) **unreachable**. (Your *branch* <span class="git-green">temp</span> currently references a *branch* of 1 *commit* --- *detached-commit*.)

<div class="tip" markdown="1">
Always note that *commit*(s) will be lost if you *force delete* a *branch* despite Git's warning about *branch*es that "*are not fully merged*".
</div>

Let's move *branch* <span class="git-green">temp</span> elsewhere by `git branch -f temp master`. That renders your *detached-commit* **unreachable**, as evidenced by `git fsck --no-reflogs`:
{% highlight text %}
dangling commit {{ detached-commit }}
{% endhighlight %}

But a `git reflog temp` shows an entry that still references your *detached-commit*:
<pre>
<code><span class="git-yellow">{{ third-commit | slice: 0, 7 }}</span> temp@{0}: branch: Reset to master
<span class="git-yellow">{{ detached-commit | slice: 0, 7 }}</span> temp@{1}: branch: Created from 795ba</code>
</pre>

Undoing in this case is simply moving *branch* <span class="git-green">temp</span> back to a previous state --- `temp@{1}`. We do `git branch -f temp@{1}`, to which a subsequent `git reflog temp` shows *branch* <span class="git-green">temp</span> back at *detached-commit*:
<pre>
<code><span class="git-yellow">{{ detached-commit | slice: 0, 7 }}</span> temp@{0}: branch: Reset to temp@{1}
<span class="git-yellow">{{ third-commit | slice: 0, 7 }}</span> temp@{1}: branch: Reset to master
<span class="git-yellow">{{ detached-commit | slice: 0, 7 }}</span> temp@{2}: branch: Created from 795ba</code>
</pre>

<div class="tip" markdown="1">
Undoing changes to a *branch* is done by simply moving the *branch* to a previous state, like this: `git branch -f <branch> <branch>@{n}`. Eg, to bring *branch* <span class="git-green">temp</span> 5 steps back, do `git branch -f temp temp@{5}`.
</div>

Still, relying on the *reflog* of *branch*es to perform undo can be unreliable.

Let's pretend we accidentally delete *branch* <span class="git-green">temp</span> anyway via `git branch -D temp`. Now, *detached-commit* is *unreachable* again, as evidenced by `git fsck --no-reflogs`:
{% highlight text %}
dangling commit {{ detached-commit }}
{% endhighlight %}

Also, `git reflog temp` says:
{% highlight text %}
fatal: ambiguous argument 'temp': unknown revision or path not in the working tree.
{% endhighlight %}

### Bullet-Proof with `HEAD`

The `HEAD` is not a *branch*, so you can't do `git branch -d HEAD`.

<div class="tip" markdown="1">
You can never delete the `HEAD`, nor the *reflog* of the `HEAD`. Rely on that fact for your undo.
</div>

Whatever *commit* you land on will store an entry in the *reflog* of the `HEAD`.

Simply performing a `git checkout <branch>|<tag>|<commit>` will ensure you can always retain a *reference* to the *commit* in question (for 30 days, at least).

Also, performing a `git commit` will invariably keep a *reference* to the newly created *commit*. That is what happened when we created *detached-commit*.

In [section Leaving Commits Behind](*leaving-commits-behind), we left behind *detached-commit*. In `git reflog`, we see that we can return `HEAD` to *detached-commit* by moving `HEAD` 2 steps back into the past:
<pre>
<code><span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> HEAD@{0}: checkout: moving from git-obj-study to git-obj-study~1
<span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> HEAD@{1}: checkout: moving from {{ detached-commit }} to git-obj-study
<span class="git-yellow">{{ detached-commit | slice: 0, 7 }}</span> HEAD@{2}: commit: Adds a commit while detached</code>
</pre>

There are a few ways to reclaim that *commit* we left behind. One way is to add a *branch* there, like `git branch temp {{ detached-commit-short }}`, but we already established that this method isn't bullet-proof (susceptible to `git branch -D temp`).

The best way is to rely on the *reflog* of the `HEAD` for this undo.

First, move the `HEAD` back in time by 2 steps: `git reset --hard HEAD@{2}`. That creates a new entry in *reflog*:
<pre>
<code><span class="git-yellow">{{ detached-commit- | slice: 0, 7 }}</span> HEAD@{0}: reset: moving to HEAD@{2}
<span class="git-yellow">{{ first-commit | slice: 0, 7 }}</span> HEAD@{1}: checkout: moving from git-obj-study to git-obj-study~1
<span class="git-yellow">{{ second-commit | slice: 0, 7 }}</span> HEAD@{2}: checkout: moving from {{ detached-commit }} to git-obj-study
<span class="git-yellow">{{ detached-commit | slice: 0, 7 }}</span> HEAD@{3}: commit: Adds a commit while detached</code>
</pre>

That new entry will give us another reference to *detached-commit* that lasts 30 days from that point, which is a good insurance against `HEAD@{3}` expiring due to age.

<div class="tip" markdown="1">
Undoing changes to the `HEAD` is done by simply moving the `HEAD` to a previous state, like this: `git reset --hard HEAD@{n}`. Eg, to bring the `HEAD` 3 steps back, do `git reset --hard HEAD@{3}`.
</div>

Next, we create a *branch* where `HEAD` is: `git branch temp`. And `git log --decorate --graph temp` shows:
<pre>
<code>{% include git-log/ch.html commit-id=detached-commit head=true branch="temp" %}
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

Now, even if you delete *branch* <span class="git-green">temp</span>, `HEAD@{0}` still retains a *reference* to *detached-commit*.

<div class="tip" markdown="1">
Rely on *reflog* of the `HEAD` for your undo. In the normal course of your work with Git, the `HEAD` will touch on many *commit*s, especially *commit*s that matter to you.
</div>

## *Reflog* for Branches

`git reflog <branch>` shows the *reflog* for said *branch*.

<div class="tip" markdown="1">
A Git **reflog** for a *branch* shows the **recent changes** to said *branch*. Changes include:
* Creation (of *branch*) --- denoted by **branch: Created**
* Advancement (of *branch* upon a new *commit*) --- denoted by **commit**
* Forced re-creation (via `git branch -f`) --- denoted by **branch: Reset** (effectively a *force move*)
* Forced movement (via `git reset --hard`) --- denoted by **reset: moving**
</div>

Nothing further will be mentioned about *reflog* for *branch*es. They just aren't as useful as the *reflog* for the `HEAD`.

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
