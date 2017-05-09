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

This Git lesson brings you through use cases, from starting a Git repository to collaborating with other people.

Even if you only use Git on your own, bear in mind that version control is necessary for you to "*collaborate with yourself*". We typically go through a decent length project often asking questions like "*why did I do that last month?*", "*what was I thinking when I made this decision?*", "***what if** I take a new fangled approach I just learned?*", and so on.

This Git lesson is written to be as trim as possible. You can safely ignore side notes like this:

<div class="side-note">
Serious about programming? Get the cheapest Mac there is. It is difficult to find cheap Linux laptops in Singapore, possibly due to the IT culture (or lack thereof) in Singapore.
</div>

# Prerequistites

This Git lesson is taught using a *nix platform (eg Linux, MacOS), in particular Bash.

If you're on Linux or MacOS, you're a productive and efficient coder, and you should expect to blaze through this Git lesson in less than an hour.

If you're on Windows, you can install [Git for Windows](https://git-for-windows.github.io), and use *Git Bash*. Meantime, keep buggin [Jon](https://bitbucket.org/{{ site.bitbucket_username }}) to complete his "*Crash Course for Productivity on Linux/MacOS*".

# Starting a Local Git Repository

A Git repo (short for repository) contains:

* A copy of the **files** that you're working on
* The **history** of your work on said files.

You start a local Git repo like this:
{% highlight shell %}
cd ~/Documents     # Keep all your work in your own folder.
mkdir my-new-project     # This folder will contain the files for your new project.
cd my-new-project     # Enter the folder you created above.
git init     # Start the Git repo in this folder.
{% endhighlight %}

A Git repo tracks a *folder* of files, so the said **files** are really the files in that *folder*.

## The `.git` Folder

{% highlight shell %}ls -la{% endhighlight %} will show you the `.git` folder that was created when you started a new Git repo. This [hidden folder](https://en.wikipedia.org/wiki/Hidden_file_and_hidden_directory) contains Git data --- data regarding the **history** of your work, data about your credential, and other stuff we want to ignore for now.

We're now interested in `.git/config`, where your credential is stored. The content of that file should currently be (with some omissions):
{% highlight conf %}
[core]
	filemode = true   # false if you're on Windows
	bare = false
    ...
{% endhighlight %}

Let's input a credential for you now, using fictitious, but important, values. Follow along, please!
{% highlight shell %}
git config user.name "Author A"
git config user.email a@c.com
{% endhighlight %}

Now, these new lines will have been inserted into `.git/config`:
{% highlight conf %}
[user]
	name = Author A
	email = a@c.com
{% endhighlight %}

As you would intuitively perceive, you can have different credentials for different projects. A typical use case would be having one credential for work (eg, user\_id@sutd.edu.sg) and another for personal projects (eg, user\_id@gmail.com).

*Manually editing* that config file is possible and equivalent to performing `git config`.

<div class="side-note">
<p markdown="1">If there is a credential you almost always use, you can put it in the global Git config at `~/.gitconfig` via a command like `git config --global user.name Author A`.</p>
<p>Local Git config parameters override global ones.</p>
</div>


# Starting a Bare Git Repository

A bare Git repo contains the **history** of your work on your files, but does not (bother to) keep a copy of your files.
