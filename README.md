## Assumption
- User already installs metamask in his/her browser

## How to run the project
### Step 1: compile contract
```
npx hardhat compile
```
### Step 2: start local node
```
npx hardhat node
```
### Step 3: deploy contract to the network
```
npx  hardhat run scripts\deploy.js --network localhost
```

## Note
When you re-start local node, please also reset related account in the metamask

## TODO
- Handle case metamask not exist