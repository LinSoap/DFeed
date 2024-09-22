<div align="center">
  <a href="https://github.com/RSSNext/Follow">
    <img src="https://raw.githubusercontent.com/LinSoap/DFeed/695fd5785fad6d600874f2b60aa9d0e42f2ee5c2/src/assets/logo.svg" alt="Logo" width="80" height="80">
  </a>
  <h3>DFeed</h3>
  <p>
    <a href="https://dfeed.linsoap.tech">Demo</a>
    <p>
    <img src="https://img.shields.io/uptimerobot/status/m797716143-e03658d73e780518a4894156" alt="Uptime Robot status">
  </p>
</div>

## Introduction
This project provides a decentralized solution for managing RSS feeds using OPML files, stored via IPFS. By mapping each user's OPML file to their blockchain wallet address, the platform allows for easy management, upload, and retrieval of these files. Every time a file is updated, the IPFS CID is automatically updated, ensuring the latest version is always accessible. This system offers basic OPML file operations, and leverages blockchain technology to securely link the user's wallet with their data.

### Key features include:

 - IPFS-based storage for OPML files
 - Wallet login for file management and access
 - Automatic IPFS CID updates upon file changes
 - Support for local opml file uploads and IPFS CID retrievals  
  
This project is ideal for users looking for a decentralized, secure, and efficient way to manage their RSS subscriptions.

## Deployment
### Fleek deploy
 1. Fork this repository
 2. Sign in Fleek and Add new site
 3. Connect a Git Repository and Select this Repository
 4. Choose IPFS Hosting Services
 5. Build Setting
  - Framework -> Create React App
  - Docker Image Name -> fleek/create-react-app:node-16
  - Build command -> npm install && npm run build
  - Publish directory -> dist
 6. Deploy site!
 7. Check IPFS Hash
 8. (Optition) Custom Domains

### Local deploy
 Require: Git,Node,IPFS
 ``` shell
  git clone https://github.com/LinSoap/DFeed.git
  cd DFeed
  npm install && npm run build
  ipfs add dist -r
 ```
