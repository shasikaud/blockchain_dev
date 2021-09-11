Moralis.initialize("fn9mQDjnYdz7IAE711yxWYZDZNpT5gcvZ6JrlCa4");
Moralis.serverURL = "https://rvwzejx1xrxm.bigmoralis.com:2053/server";

// init = async () => {
//     window.web3 = await Moralis.Web3.enable();
//     const user = await Moralis.User.current();
//     console.log("user");
//     console.log(user);
// }

async function login() {
    const user = await Moralis.User.current();  //check whether already loggedin
    if (!user){
        user = await Moralis.Web3.authenticate();
    }
    console.log("user");
    console.log(user);
    document.getElementById("login_button").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("account").innerHTML = ethereum.selectedAddress;
}

async function logout() {
    await Moralis.User.logOut();
    document.getElementById("login_button").style.display = "block";
    document.getElementById("game").style.display = "none";

}

async function flip(side) {
    let amount = document.getElementById("amount").value;
    window.web3 = await Moralis.Web3.enable();
    let contractInstance = new web3.eth.Contract(window.abi, '0xCE657Ea3DAe9246F0f5b11BE2118D1108249d971')
    contractInstance.methods.flip(side == "heads" ? 0 : 1).send({ value: amount, from: ethereum.selectedAddress})
    .on('receipt', function(receipt) {
        console.log(receipt);
        if(receipt.events.bet.returnValues.win){
            alert("You Won!");
        }
        else{
            alert("You Lost!");
        }
    })

}

document.getElementById("login_button").onclick = login;
document.getElementById("logout_button").onclick = logout;
document.getElementById("heads_button").onclick = function(){flip("heads")};
document.getElementById("tails_button").onclick = function(){flip("tails")};


init();