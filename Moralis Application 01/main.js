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
}

async function logout() {
    await Moralis.User.logOut();
    document.getElementById("login_button").style.display = "block";
    document.getElementById("game").style.display = "none";

}

async function flip(side) {
    let amount = document.getElementById("amount").value;
    alert(side + ' ' + amount);
}

document.getElementById("login_button").onclick = login;
document.getElementById("logout_button").onclick = logout;
document.getElementById("heads_button").onclick = function(){flip("heads")};
document.getElementById("tails_button").onclick = function(){flip("tails")};


init();