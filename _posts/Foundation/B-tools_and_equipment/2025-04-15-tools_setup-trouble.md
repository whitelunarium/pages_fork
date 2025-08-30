---
toc: true
layout: post
data: tools
title: Troubleshooting Guide
description: Recovery guide for common issues with GitHub, cloning, virtual environments, and running your website.
permalink: /tools/trouble
breadcrumb: /tools
breadcrumbs: true
---

## 🔧 Tool Setup Troubleshooting Guide

Use this page if something is not working.  
Each section is independent — jump directly to the area you are stuck.  

---

## GitHub Commit / Config Recovery

Use these commands if git commit is failing

✅ **Expectation**  
You have a GitHub username + email

```bash
git config --list` # shows your GitHub username + email.  
```

❌ **If not working, run:**  

```bash
git config --global user.name "jm1021"        # change to your GitHub ID
git config --global user.email "jm1021@gmail.com"  # change to your Email
```

## Directory + Clone Recovery

✅ Expectation
You can cd into your personal directory, and an ls shows your repo folder (ex: student).

### Navigate

```bash
cd ~/jm1021 # change jm1021 to your user directory name
```

❌ If cd fails, run:

```bash
mkdir ~/jm1021
cd ~/jm1021
```

### Check for repo folder

```bash
ls # lshould show "student"
```

❌ If missing, run:

```bash
git clone https://github.com/jm1021/student.git # change to personal location of repo
```

## Virtual Environment Recovery

✅ Expectation
Your terminal prompt shows (venv) prefix.

### Run Vitual Environment

```bash
source venv/bin/activate
```

❌ If it fails

```bash
./scripts/venv.sh
source venv/bin/activate
```
