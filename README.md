# 🏗 Tutorial / Starter Kit: Build a Dynamic Multi-Contract dApp

> A Starter Kit for dApps where **users** can create and manage multiple contracts

> - 🍦 lean vanilla **smart contract factory** 🏭
> - 💪 use-case flexibility 🌍
> - 🧐 mini tutorial 🧭  

> In order to go through the **tutorial** it helps if you're already familiar with the amazing [scaffold-eth](https://docs.scaffoldeth.io/scaffold-eth/) buidl tools. 
> If you're not, for following this tutorial it is recommended that you're at least a web developer with some basic Solidity experience.
> 
> 🤓 The tutorial presents the essential aspects quite in detail.
> 
> If you're an absolute noob to web3, check out the [Ethereum Speed Run](https://twitter.com/austingriffith/status/1421129057500946435).

## Setup

> **Solidity & React** are set up to
> - create contracts
> - browse created contracts
> - interact with created contracts

🧪 Quickly experiment with Solidity using a frontend that adapts to your smart contract:

![image](https://user-images.githubusercontent.com/2653167/124158108-c14ca380-da56-11eb-967e-69cde37ca8eb.png)

🚀 Start with a basic **master-detail UI**, customize it for your needs

<img src="https://user-images.githubusercontent.com/32189942/147391738-36904823-7dbc-4e61-b9e8-ccea1f7abaf6.png" width="680">

𝌋 Debug created contracts with a simil master-detail UI

<img src="https://user-images.githubusercontent.com/32189942/147391972-3166a735-f5c8-4a04-8b50-778e13c5f020.png" width="650">


# 🏄‍♂️ Quick Start

### Manual setup

Prerequisites: [Node](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork 🏗 scaffold-eth:

```bash
git clone -b factory-setup https://github.com/scaffold-eth/scaffold-eth-examples.git
```

> install and start your 👷‍ Hardhat chain:

```bash
cd scaffold-eth-examples
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd scaffold-eth
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd scaffold-eth
yarn deploy
```

🌍 You need an RPC key for production deployments/Apps, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/react-app/src/constants.js`

🔏 Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

💼 Edit your deployment scripts in `packages/hardhat/deploy`

📱 Open http://localhost:3000 to see the app

# Tutorial 

Whether you're a web3 noob or experienced dev, the following tutorial is a good way to 
- get more **familiar with scaffold-eth**
- learn some ideas for **design patterns**

If you're in for the tutorial, you're in for a treat! 🍭 🤓 Here's what we'll look at

1. Explore the setup - what can a user do?
2. Technicalities - how is it built so far?
3. UX challenges - where can we take it from here? 
# 1. 🤩 Explore the setup

> 🔖 **Create and track** contracts that each have a "purpose" variable

In the "Your Contracts" tab, create a new contract. The dialog keeps the user informed. This is a **common UX pattern** beyond the generic tx status notifications.

<img src="https://user-images.githubusercontent.com/32189942/147391797-3f34eb6a-87cb-4142-9c84-9c311378d5a6.png" width="350">

> 🗺 **Browse** all contracts in a list : ```<CreatedContractsUI/>```

Your new contract should have appeared in the UI. Create a second contract. Observe how the **list updates automatically** as soon as the transaction is mined.

List items right now only contain data that was available at the moment when the contracts were **created**.

<img src="https://user-images.githubusercontent.com/32189942/147391831-ff917ad9-5e1e-4f65-b0a5-afff84a40a39.png" width="400">

> 🕹 **Interact** with any particular contract in a detail view: ```<YourContract/>```

Click on a contract to enter the detailed view.

Click any button to change its purpose.

> 🔐 **Access controls** are in place

Open a new browser window in incognito mode, go to [localhost:3000](http://localhost:3000).

Here you won't be able to change the purpose of existing contracts. In this incognito window you are someone else (notice the address at the top of the window). The current signer is not the owner of those contracts.

> 𝌋 The **Debug UI** enables raw interaction with the factory and any created contract instance.

🧐 Check out the "Debug Contracts" tab.
- See what the public functions of YourContractFactory allow you to do. Do you find them useful?
- What else might be useful to have in there?

> ** 👩‍💻 😍  **UX** 😍 🧑‍💻 Frontend Side Quest  - Improve UX when setting the purpose **

Return to the UI where you have 2 buttons to set the purpose of a contract.
 
**Issue**: if you click any of the buttons, both show a spinner while the TX is pending.
 
![Screenshot 2021-12-24 at 10 04 25](https://user-images.githubusercontent.com/32189942/147392062-edfcca5a-db7b-4ca0-ba74-d8a612def013.png)

**Your challenge**: find a way to obtain this instead

![Screenshot 2021-12-24 at 10 06 45](https://user-images.githubusercontent.com/32189942/147392069-d39470b2-4c9b-47a0-b57d-31e20a5b8107.png)


# 2. 🤓 Technicalities
### YourContract.sol

- The core functionality of your app

- Right now it only has a purpose that can be changed by the owner.

### YourContractFactory.sol

- Creates instances of YourContract and keeps track of them all.

- Kept as lean as possible. 
 
The setup allows **users to create** their own YourContracts **and control them** independent of the factory contract.

As a starting point for developing dApps with this setup, we want **loose coupling**:
- keep created contracts unaware of the factory
- keep the factory unaware of what created contracts actually do

All our factory needs to know is the addresses of created contracts 

![Screenshot 2021-12-25 at 21 18 36](https://user-images.githubusercontent.com/32189942/147392127-cfc954b4-9e44-4d22-9456-93a4a7521124.png)

![Screenshot 2021-12-25 at 21 19 33](https://user-images.githubusercontent.com/32189942/147392129-60b10955-8aac-45ca-be60-a804d098fc0f.png)


We emit **events on contract creation**, so the frontend can easily retrieve a list of all.

![Screenshot 2021-12-25 at 21 20 20](https://user-images.githubusercontent.com/32189942/147392136-c64bf671-4ffd-423e-bcf5-1fe76d74a1c5.png)
![Screenshot 2021-12-25 at 21 19 58](https://user-images.githubusercontent.com/32189942/147392138-d4351c71-f5ec-4d6a-8a09-29f0693a3fdd.png)

We've include useful data in those events.

## 📇 Readable Names
👩‍💻 😍 **UX** 😍 🧑‍💻 
In a dApp based on a setup like ours, user-given **individual contract names** are probably a good feature to have. 

We've adopted a *simple and cheap* solution: the user-given name is put in the creation event. If the name doesn't need to change over time this approach works fine.

This retrieval happens via **a single RPC** call by using the ```useEventListener``` hook.

For **contract state**, like "purpose", contract owner, etc. the frontend uses the address of a particular YourContract intance address to read from the contract, which under the hood makes separate RPC calls.

This is what we do in ```<YourContract/>```

![Screenshot 2021-12-25 at 21 36 39](https://user-images.githubusercontent.com/32189942/147392368-075e8d90-d875-4758-81f0-8c9202e174f0.png)


## 👨🏻‍💻 🤓  Code Design : Injection! 💉
> 📝 If you're familiar with scaffold-eth, notice the pattern: we **dynamically inject** the ```YourContract``` **abi** and the particular contract instance address into a locally created ```contractConfig```. 
> 
> After that it's business as usual with ```useContractLoader```. 
> 
> Without the injection there would be no abi at all for ```YourContract``` in the config. 
> 
> Why?
> 
> Because **we never deployed** ```YourContract``` in our hardhat setup.
> 
> 🧐 Looking more closely you'll notice the file ```react-app/contracts/hardhat_non_deployed_contracts.json``` 
> 
> This one is usually not present because we usually include all our contracts when we ```yarn deploy```. Each one gets a fixed deployment address there.
> 
> But in our **factory setup**, the ``YourContract`` instances are **created on-chain**. Only then they get their addresses, which are stored both in the factory contract state and in the contract creation events. 
> 
> So ```yarn deploy```, instead of deploying any particular YourContract, just makes the **abi** of YourContract available to the frontend for later use. It puts it into the json file above. Later it can be injected at runtime in combination with a specific address.

## **Challenge** 1 -- Track purpose changes

> Lets show our users when and how purpose changes happen!

Find the Solidity code related to SetPurpose events. Uncomment it.

Redeploy with ```yarn deploy --reset```

Find the React code that displays SetPurpose events in ```<YourContract/>```. It is commented out, uncomment it.

Create a new contract. Change its purpose.

> Now, for any particular instance of YourContract, our app
> - displays contract events
> - displays contract state
> - enables contract interaction

<img src="https://user-images.githubusercontent.com/32189942/147393032-18a74fd9-278d-41c9-891c-d1de4f54c79a.png" width="400">


## 🔐 🧑‍💻 🔏 Ownership

Our factory ensures that the user who creates a contract also becomes the owner

![Screenshot 2021-12-25 at 22 25 29](https://user-images.githubusercontent.com/32189942/147393099-177ff144-d90b-4c67-859d-b608e00279ec.png)


Without this code, the factory would remain the owner of all YourContract instances.

# 3. 👩‍💻 😍 🧑‍💻 UX CHALLENGES

## **Challenge** 2 -- Contract details in the list item
 
> Suppose we wanted to **display the owner** of any contract in the master view. Probably your users want to easily identify the contracts they've created.

<img src="https://user-images.githubusercontent.com/32189942/147393199-3131cbac-c3b6-4375-94b7-46d864bcde46.png" width="350">

The owner can change over time, unlike the creator. We can't build this feature by using contract creation event data.

> 🤔 How do we get the owners of all contracts? 

In each ```<ContractItem />```, we apply the pattern from ```<YourContract/>```: 💉  we dynamically inject the abi & address, so we can read from each particular contract instance. 

Go to ```ContractItem.jsx``` and find the code that fetches owner data. Uncomment it. Find the code that displays this data. Uncomment that.

Now you should see owner information in the contracts list of the master view.

### 👩‍💻 😍 🧑‍💻 **Recognize** my contract
> Owner addresses are hard quite to read. In the contracts list, let's **mark** items which belong to **the current user** so they may be identified more easily.

Go to the code inside the ```<ContractItem/>``` component. Find the commented code which marks the item when the contract owner is the current user. Uncomment it.

You should now see contract items like this:

<img src="https://user-images.githubusercontent.com/32189942/147393220-a71ceded-8c4e-40d5-a191-5bf36d7adab0.png" width="350">

☑️ Test the functionality by creating contracts from an incognito window. Compare the views of different users.

## **Challenge** 3 -- Scalable UI  

> What if there were 100 contracts? 
> 
> As soon as you receive the creation event data in ```App.jsx```, would you make a total of 100 requests for reading the owner of each contract within its ```<ContractItem />``` component?

It's probably better if we retrieve the owner of a particular contract item only when the item is actually in view.

Here is a simple solution for that:

### 👩‍💻 😍 🧑‍💻 **Pagination** for the contract list 

 
> - This would improve the UX a lot, whether we display contract owners or not
> - If you allow n contracts per page, only n calls to read the owner will be made at once.

## Advanced UX Side Quests 

> 👩‍💻 😍 🧑‍💻  Allow users to **filter** contracts by name in the list view 

- use an input field
- how do you combine this with the pagination feature?
  
> 👩‍💻 😍 🧑‍💻  Allow users to **filter** contracts by only listing their own ones 

- use a switch or checkbox "only mine"
- how do you combine this with the pagination feature?

# Final Thoughts

## 0 Key Improvements

A factory setup can quickly get very complex, especially if you want to provide good UX.

In your real-world project will probably need code design improvements in order to be able to scale well and be easy to use.
- good routing
- efficient data retrieval (RPC nodes)
- different empty states (waiting for data, data not available, no account connected)
- clean code

Some design patterns to help you grow can be found in this [repo](https://github.com/dvinubius/tiny-multisig).
- master-detail UI pattern with **shareable links** to detail pages (routing with **react router v6**)
- a pattern on how to create a **contract specific react context** when opening a contract in the UI
- strategies to **minimize** number of **RPC calls** while using eth-hooks v2.

eth-hooks v4 is a much more advanced toolkit but it requires you to use the [typescript flavored](https://github.com/scaffold-eth/scaffold-eth-typescript) scaffold-eth.

## 1 Opinionated Solutions
Our approaches in solving UX challenges depend on many factors. If your project is going to have lots of complex data to retrieve, you'll probably also use a [**subgraph**](https://docs.scaffoldeth.io/scaffold-eth/toolkit/infrastructure/the-graph) or other web3 indexing tools like [Moralis](https://docs.moralis.io/moralis-server/automatic-transaction-sync/smart-contract-events). These are more capable than the ```useEventListener``` hook we've used here. This would impact how you approach scaling your dApp.

## 2 Factory Use Cases

> There are many use cases for a setup similar to ours here. Take **Uniswap**:
> - users create liquidity pools
> - each liquidity pool is a separate contract
> 
> Sometimes the created contracts may be more tightly coupled to the factory - it depends on the use case: how much **control over the contracts** should a user have / should the factory keep?

> ** 🧙‍♂️ 🧝‍♀️ 🧞‍♂️ **Advanced Contract Design** Quest: Dig into the [UniswapV3](https://docs.uniswap.org/protocol/reference/core/UniswapV3Factory) Docs.
> Here the factory is indeed more tightly coupled to the created pools.
> - Why, do you think, is that?
> - How does Uniswap handle fees?
>   - pool owner fees?
>   - uniswap fees?

---
Happy Coding!
---

# 📚 Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)

# 🔭 Learning Solidity

📕 Read the docs: https://docs.soliditylang.org

📚 Go through each topic from [solidity by example](https://solidity-by-example.org) editing `YourContract.sol` in **🏗 scaffold-eth**

- [Primitive Data Types](https://solidity-by-example.org/primitives/)
- [Mappings](https://solidity-by-example.org/mapping/)
- [Structs](https://solidity-by-example.org/structs/)
- [Modifiers](https://solidity-by-example.org/function-modifier/)
- [Events](https://solidity-by-example.org/events/)
- [Inheritance](https://solidity-by-example.org/inheritance/)
- [Payable](https://solidity-by-example.org/payable/)
- [Fallback](https://solidity-by-example.org/fallback/)

📧 Learn the [Solidity globals and units](https://solidity.readthedocs.io/en/v0.6.6/units-and-global-variables.html)

# 🛠 Buidl

Check out all the [active branches](https://github.com/austintgriffith/scaffold-eth/branches/active), [open issues](https://github.com/austintgriffith/scaffold-eth/issues), and join/fund the 🏰 [BuidlGuidl](https://BuidlGuidl.com)!

  
 - 🚤  [Follow the full Ethereum Speed Run](https://medium.com/@austin_48503/%EF%B8%8Fethereum-dev-speed-run-bd72bcba6a4c)


 - 🎟  [Create your first NFT](https://github.com/austintgriffith/scaffold-eth/tree/simple-nft-example)
 - 🥩  [Build a staking smart contract](https://github.com/austintgriffith/scaffold-eth/tree/challenge-1-decentralized-staking)
 - 🏵  [Deploy a token and vendor](https://github.com/austintgriffith/scaffold-eth/tree/challenge-2-token-vendor)
 - 🎫  [Extend the NFT example to make a "buyer mints" marketplace](https://github.com/austintgriffith/scaffold-eth/tree/buyer-mints-nft)
 - 🎲  [Learn about commit/reveal](https://github.com/austintgriffith/scaffold-eth/tree/commit-reveal-with-frontend)
 - ✍️  [Learn how ecrecover works](https://github.com/austintgriffith/scaffold-eth/tree/signature-recover)
 - 👩‍👩‍👧‍👧  [Build a multi-sig that uses off-chain signatures](https://github.com/austintgriffith/scaffold-eth/tree/meta-multi-sig)
 - ⏳  [Extend the multi-sig to stream ETH](https://github.com/austintgriffith/scaffold-eth/tree/streaming-meta-multi-sig)
 - ⚖️  [Learn how a simple DEX works](https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90)
 - 🦍  [Ape into learning!](https://github.com/austintgriffith/scaffold-eth/tree/aave-ape)

# 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with 🏗 scaffold-eth!

---

🙏 Please check out our [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!
