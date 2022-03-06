# Calend3
## The web3 appointment scheduler

This tool lets you confirm your appointment with a person on the blockchain. In return for the time of the owner of the smart contract you have to pay them some amount of Ether to schedule the appointment, which is derived by how long the meeting is that you are scheduling and the minutely rate set by the smart contract owner.

When the appointment is confirmed the smart contract owner also gets a text message about the confirmed appointment and the amount of ether that was paid to him.

## Idea behind the project

In today's world, time is money. So why not charge some ether in return for your time.

## Technologies used

1. Hardhat: Ethereum Development Environment.
2. Solidity: For writing Smart Contract.
3. Metamask: Wallet.
4. Alchemy: Node infrastructure.
5. Next.js: Frontend.
6. Ethers.js: For calling smart contract from the web.
7. Twilio, Alchemy notify & express.js: For text messages.

Here is the link to the respository containing the code for implementing the text message feature: https://github.com/SahilAujla/calend3-backend

## Further improvements

1. Right now, the project only supports paying the smart contract owner. So you can only schedule appointments with the person who deployed the smart contract, but it can be changed. We can make it work in a way that you can schedule appointment with anyone by just going to this url --> calend3.vercel.app/0xAddress.

This would let anyone to just send their unique url to anyone, if someone wants to schedule an appointment with them. 

2. We can also make a field for the appointment url, where the person who is booking the appointment can add a Zoom/google meet meeting url for other person to join. And that url will be sent to the smart contract owner by text message when the appointment is confirmed. 

## Business Model

We plan to keep building this project further and the business model that can be used to make profits is that we can keep 1% of the appointment fee in the smart contract and then can withdraw it by just coding a solidity function that can only be called by the smart contract owner.

## UI for the user
![image](https://user-images.githubusercontent.com/83442423/156863043-b02106c8-55ec-4309-9ae5-d2bc77401daa.png)

## UI for the admin
![image](https://user-images.githubusercontent.com/83442423/156905738-28ef1de8-b04f-4849-88b0-096c82af615b.png)

The admin also gets a slider where he can always change what his minutely rate is.

## Text message sent to the admin on confirmation of the appointment
![Twilio Message](https://user-images.githubusercontent.com/83442423/156905955-005fc3bc-7cec-44f6-916c-097cd4758e60.jpg)



