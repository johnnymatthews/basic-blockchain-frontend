// ================================================
// Enter custom variables here:
// The URL of the node that you want to connect to.
const nodeUrl = "https://aion.api.nodesmith.io/v1/mastery/jsonrpc?apiKey=ab40c8f567874400a69c1e80a1399350";

// The private key of the account you want to use.
const privateKey = "269a1fd07297bd5e89ad1b55feaf809f90aaf7426c0d96579653939b5a468466cfb364bd76d41c6d322928a042b44c5e8e06bde11b2177f8888304f364e30f44";

// The address of the contract that you want to call.
// let contractAddress = "CONTRACT_ADDRESS";

// Uncomment the line below if you want to use the pre-deployed contract. This overwrites the contract address listed above.
let contractAddress = "0xa003cd11951f9a58f81df851e83cf7b5eca4b2ca5d6429dadb49021c13603357";
// =================================================

// Create a web3 object by supplying a node to use.
const web3 = new Web3(new Web3.providers.HttpProvider(nodeUrl));

// Set an account to use for this application.
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// Get the value of the myStr variable from within the HelloAvm.java contract.
async function getString() {
    // Create the Transaction Object
    let data = web3.avm.contract.method("getString").encode();
    const transactionObject = {
        from: account.address,
        to: contractAddress,
        data: data,
        gasPrice: 10000000000,
        gas: 2000000,
        type: "0x1"
    };

    // Send the call to the network and wait for a response.
    let initialResponse = await web3.eth.call(transactionObject);
    let avmResponse = await web3.avm.contract.decode("string", initialResponse);

    // Print the response to the frontend, and the time it was updated.
    document.querySelector("#output_h3").innerHTML = avmResponse;
    document.querySelector(
        "#last_updated_code"
    ).innerHTML = new Date().getTime();
}

// Set the value of the myStr variable from within the HelloAvm.java contract.
async function setString() {
    // Set the button to loading and disable.
    document.querySelector("#set_string_button").innerHTML = "Loading...";
    document.querySelector("#set_string_button").disabled = true;

    // Get the value of the input box.
    let inputString = document.querySelector("#input_string_textarea").value;

    // Create the data object, with the inputString variable set.
    let data = web3.avm.contract
        .method("setString")
        .inputs(["string"], [inputString])
        .encode();

    // Create the transaction object.
    const transaction = {
        from: account.address,
        to: contractAddress,
        data: data,
        gasPrice: 10000000000,
        gas: 2000000,
        type: "0x1"
    };

    // Sign the transaction.
    const signedTransaction = await web3.eth.accounts
        .signTransaction(transaction, account.privateKey)
        .then(transactionResponse => (signedCall = transactionResponse));
    console.log("Signed Transaction: ", signedTransaction);

    // Send the transaction to the network and wait for a response.
    const transactionReceipt = await web3.eth
        .sendSignedTransaction(signedTransaction.rawTransaction)
        .on("receipt", receipt => {
            console.log(
                "Receipt received!\ntransactionHash =",
                receipt.transactionHash
            );
        });

    // Log the receipt.
    console.log("Transaction Receipt: ", transactionReceipt);
    document.querySelector("#set_string_button").innerHTML = "Set String";
    document.querySelector("#set_string_button").disabled = false;
}

// Deploy a contract to the network using the bytecode.
async function deployContract() {
    console.log("Deploying contract.");
    let contractBytecode = document.querySelector('#contract_bycode_input').innerHTML;

    console.log("Creating Transaction Object...");
    const transaction = {
        from: account.address,
        data: contractBytecode,
        gasPrice: 10000000000,
        gas: 5000000,
        type: '0x2' // Java contract deployment.
    };

    // Sign the transaction.
    const signedTransaction = await web3.eth.accounts
        .signTransaction(transaction, account.privateKey)
        .then(transactionResponse => (signedCall = transactionResponse));

    // Send the transaction to the network and wait for a response.
    const transactionReceipt = await web3.eth
    .sendSignedTransaction(signedTransaction.rawTransaction)
    .on("receipt", receipt => {
        console.log(
            "Receipt received!\ntransactionHash =",
            receipt.transactionHash
        );
    });

    // Log the receipt.
    console.log(transactionReceipt);
}

async function deployContract2() {
    // Set the button to loading and disable.
    document.querySelector("#deploy_contract_button").innerHTML = "Loading...";
    document.querySelector("#deploy_contract_button").disabled = true;

    // Create the data object, with the contract_bytecode_input textbox.
    let data = document.querySelector("#contract_bytecode_input").value;

    // Create the transaction object.
    const transaction = {
        from: account.address,
        to: contractAddress,
        data: data,
        gasPrice: 10000000000,
        gas: 2000000,
        type: "0x1"
    };

    // Sign the transaction.
    const signedTransaction = await web3.eth.accounts
        .signTransaction(transaction, account.privateKey)
        .then(transactionResponse => (signedCall = transactionResponse));
    console.log("Signed Transaction: ", signedTransaction);

    // Send the transaction to the network and wait for a response.
    const transactionReceipt = await web3.eth
        .sendSignedTransaction(signedTransaction.rawTransaction)
        .on("receipt", receipt => {
            console.log(
                "Receipt received!\ntransactionHash =",
                receipt.transactionHash
            );
        });

    document.querySelector("#deploy_contract_button").innerHTML = "Deploy Contract";
    document.querySelector("#deploy_contract_button").disabled = false;
}