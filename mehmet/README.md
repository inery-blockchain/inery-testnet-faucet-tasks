## Inery.js Transaction Pusher

## This project demonstrates how to use the  library to push transactions to an EOSIO blockchain network. Specifically, it defines a function called  that creates and destroys a record on the network.ineryjsPushTransaction

## Getting Started

* To get started with this project, first clone the repository to your local machine

* Install dependencies using below code

```
npm install
```

## Usage

To use the  function, call it with the following arguments

`id`: the ID of the record to create and destroy

`user`: the name of the user creating the record

`data`: the data to include in the record

`destroy`: a boolean indicating whether to also destroy the record

## For example

```
PushTransaction(2701, "mehmet", "push done", true);
```

This would create a record with an ID of , created by the  account, with data . It would also destroy the record after creation.`2701``mehmet``"push done"`

