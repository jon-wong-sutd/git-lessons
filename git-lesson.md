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

<div class="tip">
<p>Go through this Git lesson quickly and sequentially, and don't think too hard. Important concepts will be explained along with relevant demonstrations.</p>
<p>Important tips are places where you should pause and grasp the concepts just demonstrated.</p>
<p>Shoot me an email if any part of this lesson bogs you down and impedes you from progressing rapidly.</p>
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

Create file `story.txt`, and enter into it these 4 lines\\
(always have an empty new line at end of file):
{% highlight text %}
Once upon a time, there was a unicorn.

The unicorn looked around.
 
{% endhighlight %}

<div class="tip">
<p markdown="1">Everything outside of the `.git` folder is a **working copy** of the files you are working on for the project.</p>
</div>

<div class="side-note">
<p markdown="1">That is, with the exception of **untracked files** and **ignored files**, which we will explore later on.</p>
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

You can remove staged work using `git rm --cached <file>`. Feel free to practice removing the staged work and re-staging that work.

<div class="tip">
<p markdown="1">The *staging area* allows you to work on multiple ideas rapidly --- as and when they come to mind --- but yet still be able to organize your changes into *coherent* and *integral* units.</p>
</div>

To demonstrate the purpose of having a *staging area*, create a new file `rough_thoughts.txt` and enter into it these 2 lines:
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

You'll need to write your commit message in a file. Create the temporary file in `~/Documents/temp`:
{% highlight shell %}
mkdir ~/Documents/temp     # If you don't already have that folder
emacs {{ commit-msg-file }}     # If you're using Emacs as a text editor
{% endhighlight %}

You can use any text editor to edit file `{{ commit-msg-file }}`. Enter into it these 6 lines:
{% highlight text %}
Adds first work on the story

I'd think up more descriptive information here if I could.
That first line above should be a short summary, with no ending period.
Then comes a blank line, and then details and descriptions follow.
{% endhighlight %}

You then commit your work by doing `git commit -F {{ commit-msg-file }}`.

<div class="side-note">
<p markdown="1">If you want to use Emacs as a *commit message editor*, you can configure Git to use Emacs. Do the configuration with `git config --global core.editor emacs`. The default editor is [vi][vi]. You can then verify your editor configuration in `~/.gitconfig`. That file can also be edited by hand.</p>
<p markdown="1">You can then do just `git commit` and see your chosen text editor pop up, enter your commit message, save like you're saving a file, and finally exit the text editor. That sequence of actions will commit your changes.</p>
</div>

[vi]: https://www.cs.colostate.edu/helpdocs/vi.html

<div class="tip">
<p markdown="1">It is usually better to collect your thoughts in a file when you construct your commit message. The `-F` option lets you specify a file that contains your commit message.</p>
</div>


# Git Log --- A Timeline

{% assign first-commit = site.data.git-lesson.git-commits.first %}

`git log --decorate --graph` will show your first commit. Later on when you have more commits, `git log` will show a connected graph (timeline) of all your commits. Right now, you only have 1 commit:
<pre>
<code>* <span class="git-yellow">commit {{ first-commit }} (<span class="git-blue">HEAD -></span> <span class="git-green">master</span>)</span>
  Author: {{ git-name }} <{{ git-email }}>
  Date:   Tue May 9 14:39:18 2017 +0800

      Adds first work on the story

      I'd think up more descriptive information here if I could.
      That first line above should be a short summary, with no ending period.
      Then comes a blank line, and then whatever descriptive things I wanna say.</code>
</pre>

Especially note the credential attached to that commit. Recall from [a previous section](#the-git-folder) where you configured your credential for this Git repo. This credential is what gets attached to every commit you make in this Git repo.

<div class="side-note" markdown="1">
The `git log` option `--decorate` shows *git branches/tags*, concepts that will be explained later. The option `--graph` shows a visual representation (with connecting lines) of how *commits*  connect and form, well, a graph. How *commits* connect to one another will also be explained later.
</div>

## Navigating the Git Log

`git log` shows the log in a `less` window ([navigation tips here](http://www.thegeekstuff.com/2010/02/unix-less-command-10-tips-for-effective-navigation)), which coincidentally is navigated similarly to a [`vi` window][vi].

<div class="side-note" markdown="1">
Turns out many *nix productivity tools are inter-related! Learn one, learn all! You'll see `vi`-like navigation in `less`, and `emacs`-like navigation in `bash`.
</div>

Shorten the height of your `bash` terminal such that `git log --decorate --graph` output exceeds that height. The log will be displayed in a `less` window, and you can practice navigating in that window.

<div class="tip" markdown="1">
`git log` lets you see *what was done before* to decide *what to do next*. You'll also often look at previous *commit messages* to guide you in creating new *commit messages*.
</div>

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

<div class="side-note" markdown="1">
Assuming we don't ever want to commit `rough_thoughts.txt`, it can be annoying to see Git constantly telling us that is an *untracked file*. Later on, we will learn how to tell Git to ignore certain folders and/or files.
</div>

We construct our *commit message* by editing `{{ commit-msg-file }}`:
{% highlight text %}
Adds nested folder structure

Just testing. We want to see Git Objects.
We should be seeing Commits, Trees and Blobs.
{% endhighlight %}

And now, we commit with `git commit -F {{ commit-msg-file }}`.

{% assign second-commit = site.data.git-lesson.git-commits.second %}

A look at Git Log via `git log --decorate --graph` shows:
<pre>
<code>* <span class="git-yellow">commit {{ second-commit }} (<span class="git-blue">HEAD -></span> <span class="git-green">master</span>)</span>
<span class="git-red">|</span> Author: Author A <a@c.com>
<span class="git-red">|</span> Date:   Wed May 10 10:45:25 2017 +0800
<span class="git-red">|</span>
<span class="git-red">|</span>     Adds nested folder structure
<span class="git-red">|</span>
<span class="git-red">|</span>     Just testing. We want to see Git Objects.
<span class="git-red">|</span>     We should be seeing Commits, Trees and Blobs.
<span class="git-red">|</span>
* <span class="git-yellow">commit 2b5519936865f3b841b5f7aad46dcd0cf0e86ceb</span>
  Author: Author A <a@c.com>
  Date:   Tue May 9 18:26:31 2017 +0800

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

**In the following instructions, replace my *commit ID*s with your own.**

{% assign second-tree = site.data.git-lesson.git-trees.second %}

Let's look at the *second-commit* via `git cat-file -p {{ second-commit-short }}`:
{% highlight text linenos %}
tree {{ second-tree }}
parent {{ first-commit }}
author Author A <a@c.com> 1494384325 +0800
committer Author A <a@c.com> 1494384325 +0800

Adds nested folder structure

Just testing. We want to see Git Objects.
We should be seeing Commits, Trees and Blobs.
{% endhighlight %}

From the third line of that output, we see the *commit message* for our *second-commit*.

The second line indicates that our *second-commit* is linked to our *first-commit* (via the property `parent`).
<div class="figure" markdown="1">
![commits-joined](../assets/commit-parent.svg)
</div>

<div class="side-note" markdown="1">
We will learn later that *commits* are connected as [Singly Linked Lists](https://en.wikibooks.org/wiki/Data_Structures/Singly_Linked_Lists), but in reverse order; later commits link to earlier commits, and not vice versa. We will also learn that *commits* can have multiple *parents*, which is the mechanism by which we *merge branches (timelines)*.
</div>

{% assign first-tree = site.data.git-lesson.git-trees.first %}

And to confirm that our *second-commit* really links to our *first-commit*, we take a peek at the *first-commit* by doing `git cat-file -p {{ first-commit-short }}`:
{% highlight text linenos %}
tree {{ first-tree }}
author Author A <a@c.com> 1494325591 +0800
committer Author A <a@c.com> 1494325591 +0800

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

The *first-tree* and *second-tree* are 2 different snapshots, the first being taken by our *first-commit* and the second by our *second-commit*:
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

Just a little more down the rabbit hole. After that, we will never get into such non-user-friendly details again, promise.

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
.git/objects/{{ second-commit | slice: 0, 2 }}//{{ second-commit | slice: 2, 100 }}
... and so on ...
{% endhighlight %}

You can find your recorded *commit IDs* in the above output.

<div class="side-note" markdown="1">
Note that the Git objects are likely organized into a [hashtable](https://en.wikipedia.org/wiki/Hash_table), where the 1st 2 digits of the *commit ID* is the *bucket ID*.
</div>

<div class="side-note">
<p markdown="1">To check their types (**Commit**, **Tree**, **Blob**), you can do `find .git/objects -type f | cut -d'/' -f3,4 | sed 's/\///' | xargs -I %ID -t git cat-file -t %ID`.</p>
<p markdown="1">Or simply do them 1 by 1: `git cat-file -t <1st-5-digits-of-ID>`.</p>
</div>

<div class="tip" markdown="1">
A Git **Commit** has 3 components:
* Snapshot --- of the project folders/files (Git **Tree** object)
* Parent(s) --- a link to the **Commit**(s) just before itself (Git **Commit** object)
* Commit Message --- the *commit message* for itself (plain text)
</div>

# Starting a Bare Git Repository

A bare Git repo contains the **history** of your work on your files, but does not (bother to) keep a copy of your files.

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

<div class="side-note" markdown="1">
The above bare repo resides on your local harddisk, but is for all our intents and purposes akin to a *remote repo*. You shall see the concept *remote repo* demonstrated soon.
</div>

Point our *local repo* to the *remote repo*:
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
Although it is possible to pull (fetch) from one remote repo and push to another remote repo, we shall stick with the most common use case --- pull and push is the same for the remote.
</div>

We now attempt to push our current branch (`master`) up to `origin` by doing `git push origin master`:
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
Typically, your first push to a remote should include the `-u` (set-upstream) option like this `git push -u origin master`. The above is a simplified scenario.
</div>

Everything you saw in your `.git` folder inside your local Git repo will be inside a bare Git repo.
Both these commands should show you the same files:
{% highlight shell %}
find .git/objects -type f
find ../remote/objects -type f
{% endhighlight %}

You can see that the bare repo does not reserve any space for *working copies of project files*; all Git data is stored at the top-level folder (`../remote`).

<div class="tip" markdown="1">
*Local clones* are non-bare local repos we work on. *Remote repos* are bare repos we push to. Consider *remote repos* as a "*certified true copy*" of sorts. They also act like "*cloud backups*", in case your *local clones* get damaged.
</div>
