// ================================================
// Enter custom variables here:
// The URL of the node that you want to connect to.
const nodeUrl = "NODE_URL";

// The private key of the account you want to use.
const privateKey = "PRIVATE_KEY";

// The address of the contract that you want to call.
let contractAddress = "CONTRACT_ADDRESS";

// Uncomment the line below if you want to use the pre-deployed contract. This overwrites the contract address listed above.
let contractAddres = "0xa003cd11951f9a58f81df851e83cf7b5eca4b2ca5d6429dadb49021c13603357";
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
