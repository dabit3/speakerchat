# SpeakerChat

Real-time event comment platform with markdown support

![](header.jpg)

---

![](speakerchatheader.jpg)

## Features 

- Built with GraphQL, AWS AppSync & AWS Amplify
- GraphQL subscriptions for real-time comments
- Markdown support for rich comments
- Local & optimistic cached updates

## Deploy this app (2 options)

### One-click Deploy to the Amplify Console

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/dabit3/speakerchat)

### Deploy using the Amplify CLI

1. Clone the repo

```sh
git clone https://github.com/dabit3/speakerchat.git

cd speakerchat
```

2. Initialize the Amplify project

```sh
amplify init
```

3. Deploy the back end

```sh
amplify push
```

- Do you want to generate code for your newly created GraphQL API? __N__

4. Launch the app

```sh
npm start
```