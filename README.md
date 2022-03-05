# Calend3
## The web3 appointment scheduler

This tool lets you confirm your appointment with a person on the blockchain. In return for the time of the owner of the smart contract you have to pay them some amount of Ether to schedule the appointment, which is derived by how long the meeting is that you are scheduling and the minutely rate set by the smart contract owner.

When the appointment is confirmed the smart contract owner also gets a text message about the confirmed appointment and the amount of ether that was paid to him.

## Idea behind the project

In today's world, time is money. So why not charge some ether in return for your time.

## Further improvements

1. Right now, the project only supports paying the smart contract owner. So you can only schedule appointments with the person who deployed the smart contract, but it can be changed. We can make it work in a way that you can schedule appointment with anyone by just going to this url --> calend3.vercel.app/0xAddress.

This would let anyone to just send their unique url to anyone, if someone wants to schedule an appointment with them. 

2. We can also make a field for the appointment url, where the person who is booking the appointment can add a Zoom/google meet meeting url for other person to join. And that url will be sent to the smart contract owner by text message when the appointment is confirmed. 

## UI for the user
![image](https://user-images.githubusercontent.com/83442423/156863043-b02106c8-55ec-4309-9ae5-d2bc77401daa.png)

