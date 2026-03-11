---
title: 'BeautifulSoup4 Python Guide'
description: "A beginner's guide to web scraping in Python using Bs4."
author: 'Aero Blue'
authorImage: '../../../assets/logo-blue.png'
datePublished: 'April 29 2020'
dateUpdated: 'Dec 23 2025'
heroImage: './html-soup.png'
tags: ['python', 'web-scraping', 'beautifulsoup']
draft: false
pinned: false
tableOfContents: true
---

## What is Bs4?

> Beautiful Soup is a Python library for pulling data out of HTML and XML files. It works with your favorite parser to provide idiomatic ways of navigating, searching and modifying the parse tree. It commonly saves programmers hours or days of work.
>
> -The Docs

### Useful Links

- [BeautifulSoup4 Docs](https://beautiful-soup-4.readthedocs.io/en/latest/)
- [Python (Latest Version)](https://www.python.org/downloads/latest)
- [Lengthy Guide on Web Scraping](https://learndatasci.com/tutorials/ultimate-guide-web-scraping-w-python-requests-and-beautifulsoup/)
- [Requests Docs](http://docs.python-requests.org/en/master/)

### Modules Used

```bash
pip install requests bs4
```

## Step 1: Getting the page

The first step for scraping a webpage is to make a request which will contain the HTML we need to parse. Luckily in Python this is about as simple as it gets, setting up your HTML to be parsed in just a few lines:

```python frame="terminal" title="Python REPL"
>>> page_url = "https://example.com/"
>>> response = requests.get(page_url)
>>> soup = BeautifulSoup(markup=response.text, features="html.parser")
>>> print(soup.prettify())
"<html>...</html>"
```

After this, we have the soup object that we will be using for the rest of the guide. The prettify() method is very useful for formatting the HTML into a readable form. We can now continue on to actually parsing the page since we have our soup object.

## Step 2: Parsing the page

The next order of business is to obviously scrape the information we want, but often times this isn’t as simple as one would think. You need to be creative to come up with the best way to select all of your elements (without selecting others). The first method you should look to use is find() or find_all() which search firstly by tag.

### Method 1: Using `find()` and `find_all()`

#### Finding all links on a page

Getting all the links on a webpage is extremely useful and is often how “spiders” crawl through a website in order to index it. Let's say that we have the following links:

```html title="example.html"
<html>
  <a href="example.com">Somelink</a>
  <a href="otherlink.net">Otherlink</a>
  <p>This is not the text you are looking for!</p>
</html>
```

This a pretty simple example, but that’s because almost all links are contained with an “a href” tag which makes it very easy to locate.

```python frame="terminal" title="Python REPL"
>>> links = [link.get("href") for link in soup.find_all("a")]
>>> print(links)
["example.com", "otherlink.net", ...]
```

#### Getting the text of first paragraph element

The find() method isn’t usually as good as find_all() as it only selects one object. However, this can be useful if you are in fact only looking for something like the first paragraph on a page. Find() will return the first element it finds within the specified parameters. Tip: If you ever find yourself using find_all(“p”)[0], just use find(“p”) instead!

```python frame="terminal" title="Python REPL"
>>> paragraph = soup.find("p").text
>>> print(paragraph)
"This is not the text you are looking for!"
```

### Method 2: Using `select()`

Arguably using find() and find_all() aren’t as clean or flexible as using select() which uses CSS selectors. I would recommend using select() over find() because it is often cleaner and makes more sense. I will walk you through finding elements with different types of selectors: class, tag, and id. I won’t go too much into detail on CSS selectors as they are a whole topic on their own, but it’s relatively easy to pick up.

#### Finding by class

```html title="example.html"
<p class="comment">Text to scrape</p>
<p class="comment">other comment</p>
<p class="comment">more comments</p>
```

This is a classic example of where you would want to use select() over find(). For example, you could do find(“p”, class\_=”comment”) and you would get the same result, but it doesn’t look as clean. Tip: Whenever you see common class names, it’s usually best to use selector starting with “.” indicating the class. You can also do id’s using a #.

```python frame="terminal" title="Python REPL"
>>> print(soup.select(".comment")) #make sure you are finding the right information
>>> comments = [comment.text for comment in soup.select(".comment")] #Get text for all comments on page
>>> print(comments)
["Text to scrape", "other comment", "more comments"]
```

It’s important to note that the `select()` method ALWAYS returns a list. Even if it has one item in it! Tip: Use `select_one()` if you are planning on only getting one element, as you will avoid doing `select()[0]` for a list with one item in it.

#### Finding by tag

```html title="example.html"
<p><span>Random text to find</span></p>
<p><span>another block of text</span></p>
```

You can also use selectors to find items by their appropriate tags! This is often very useful if the elements are not labeled by classes, or if they vary greatly from each other. In this example, I select the text from the span element, which is nested in the paragraph element. A common mistake that I made early on, was not realizing the importance of nesting in these situations. I could not select the span element if it wasn’t a direct child of the parent paragraph element.

```python frame="terminal" title="Python REPL"
>>> print(soup.select("p > span"))
>>> blocks = [block.text for block in soup.select("p > span")]
>>> print(blocks)
["Random text to find", "another block of text"]
```

#### Finding by id

```html title="example.html"
<p><span id="main-comment">Comments, yay!</span></p>
<p><span id="reply">comments are dumb</span></p>
<p><span id="reply-2">more comments</span></p>
```

Similar to finding elements by class, the last example I wanted to cover is selecting by an element's id. You can use the CSS selector of `#{id}` in order to select elements that have this id. I also wanted to show the alternative selector `p > #main-comment` to show that you technically could have `html > div > p > span#main-comment` although that is unnecessary. Note that unlike classes, HTML ids should be unique per page.

```python frame="terminal" title="Python REPL"
>>> soup.select_one("#main-comment").text
"Comments, yay!"
>>> soup.select_one("p > #main-comment").text  # Alternative selector
"Comments, yay!"
```

### Conclusion

Often web scraping can be overwhelming at first, there are a lot of different ways to accomplish the same task and this makes things even more confusing. My general rule of thumb that applies to selecting elements: always use the simplest selector that accomplishes the job. You want to be as vague as possible with your selector without picking up other elements that might be similar. This article took me forever to write, so if you read this far, I really appreciate you! If you need any help, feel free to drop a comment and I will try my best to resolve any issues/questions you have!
