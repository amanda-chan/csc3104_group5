# csc3104_group5

## Database setup
<p>Before running the application, remeber to change your db configuration settings & add the table "csc2104" into your sql db</p>
![image](https://github.com/amanda-chan/csc3104_group5/assets/60087811/23d8c058-6566-428d-a678-4fe9702a686a)


## Geth setup

<p>Download geth <a href="https://geth.ethereum.org/downloads">here</a></p>

### Run the command to run the geth server, running on local host, port: 8548
```bash
geth --http --http.addr "0.0.0.0" --http.port 8545 --http.api "web3,eth,personal,net"
```

## Run the app
<p>Ensure that you have node js installed</p>
```bash
node app.js
```
