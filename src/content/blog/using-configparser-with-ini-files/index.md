---
title: 'Using ConfigParser With .ini Files'
description: 'Config files are boring but quite important!'
author: 'Aero Blue'
authorImage: '../../../assets/logo-blue.png'
datePublished: 'April 30 2020'
dateUpdated: 'Dec 23 2025'
heroImage: './person-working.jpg'
tags: ['python', 'config']
draft: false
pinned: false
tableOfContents: true
---

## Helpful Links

- [ConfigParser Docs](https://docs.python.org/3/library/configparser.html)
- [Python (Latest Version)](https://www.python.org/downloads/latest)
- [INI formatting guide](https://github.com/SemaiCZE/inicpp/wiki/INI-format-specification)

## The Newbie Method

A lot of the time when you are making something in Python, there is information that you want the user to be able to modify or keep separate from the program itself. Probably the simplest (and insecure) way to do this would be to just create a file called “config.py” and put all your values in there:

```python title="config.py"
credentials = {"username":"AeroBlue", "email": "example@aeroblue.dev", "password": "password123"}
settings = {"login_prompt": "No"}
```

---

```python title="main.py"
from config import settings, credentials
def main():
    print(credentials)
    print(settings)
main()
{"username":"AeroBlue", "email": "example@aeroblue.dev", "password": "password123"}
{"login_prompt": "No"}
```

Although this method works, **DO NOT DO THIS**. There is a built-in library in Python that will do all of this for you and provides many more features. The library is called ConfigParser.

## ConfigParser (An Introduction)

There are a lot of ways you can set up your configuration file, but I like using .ini’s because they are simple and easy to understand. Let’s try this example again, but this time let's use ConfigParser instead:

```ini title="config.ini"
[credentials]
username = AeroBlue
email = example@aeroblue.dev
password = password123

[settings]
login_prompt = No
```

**Note**: Never store passwords and important data in config.ini you should be using environment variables. Only store config related values in plain text.

```python title="main.py"
from configparser import ConfigParser

config = ConfigParser()
config.read_file(open("config.ini"))
```

### Retrieving Values

Each time the program is run, we will first need to create an instance of ConfigParser() and use the read_file() method to parse our .ini file. Once we executed the two lines above, we can then access the values in a “dictionary-like” fashion:

```python
username = config["credentials"]["username"]
email = config["credentials"]["email"]
password = config["credentials"]["password"]
```

However, we could do this a lot more efficiently by simultaneously unpacking all of the values in the credential section:

```python
username, email, password = config["credentials"].values()
```

Both methods have the same result:

```python frame="terminal" title="Python REPL"
>>> print(f"Username: {username}")
Username: AeroBlue
>>> print(f"Email: {email}")
Email: example@aeroblue.dev
>>> print(f"Password: {password}")
Password: password123
```

### Updating Values

Just like an actual dictionary, you can update values as well. For example, let’s say the user decides to set `login_prompt` to `yes`. We can update the credentials using the builtin input() method:

```python
if config["settings"]["login_prompt"].lower() == "yes":
    config["credentials"]["username"] = str(input("Username: "))  # AeroBlue
    config["credentials"]["password"] = str(input("Password: "))  # password123
    config["settings"]["login_prompt"] = "no"  # Set to not prompt in the future
```

### Saving the Config

With the code above, we are able to gather input from the user in the form of a `string` (the user’s `username` and `password` in the example) and then update the dictionary values. If you run the above code, nothing in the config file will be changed, we only need to add a couple more lines to update the current file:

```python
with open('config.ini', 'w') as configfile:
    config.write(configfile)
```

Now if we open up the config file again, we can see that our changes have been updated! We have also updated the `login_prompt` option to `no` so that the user is not prompted until they set it again.

```ini title="config.ini"
[credentials]
username = AeroBlue
email = example@aeroblue.dev
password = password123

[settings]
login_prompt = no
```

### Interpolation

Not convinced on ConfigParser yet? I have one word for you, interpolation. ConfigParser even allows you to set and use values within the ini file itself! For this example I am going to slightly modify the ini file to demonstrate using interpolation in ConfigParser:

```ini title="config.ini"
[credentials]
website = aeroblue.dev
username = Aero
email = %(username)s@%(website)s
password = password123
```

The important piece of code here is `email = %(username)s@%(website)s`, this is an example of using variables within the config file itself. This way a user can update something like their username, and it will automatically use it as their email too:

```python frame="terminal" title="Python REPL"
>>> print(f"Email: {email}")
Aero@aeroblue.dev
```

## Conclusion

While there are a few other things you can do with ConfigParser, this is meant to be an introductory guide to help you write your first config file. Hopefully, this was helpful to you, feel free to leave a comment or send me a question! You can, of course, read more about configparser on Python’s documentation which has a much lengthier set of examples.
