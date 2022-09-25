const web3 = new Web3();

let addressesCheck = [];
let addressesToChecksum = [];

// Language: javascript
// checksum ethereum address

function handleInput(e) {
    addressesCheck = []
    tmp = e.target.value.split("\n");
    tmp.forEach((address) => {
        if (address) {
            addressesCheck.push(address)
        }
    });
    console.log(addressesCheck);
}


function check() {
    let check = [];
    for (i = 0; i < addressesCheck.length; i++) {
        check[i] = web3.utils.checkAddressChecksum(addressesCheck[i]);
    }
    document.querySelector("#check-result").innerHTML = "";
    result = resultCheck(check)
    document.querySelector("#check-result").appendChild(result);
}

function toChecksum() {
    let check = [];
    for (i = 0; i < addressesToChecksum.length; i++) {
        try {
            check[i] = web3.utils.toChecksumAddress(addressesToChecksum[i]);
        } catch (e) {
            check[i] = "error";
        }
    }
    document.querySelector("#to-checksum-result").innerHTML = "";
    result = resultChecksum(check)
    document.querySelector("#to-checksum-result").appendChild(result);
}

function resultCheck(addressesResult) {
    let element = document.createElement("div");
    for (i = 0; i < addressesResult.length; i++) {
        let item = document.createElement("p");
        if (!addressesResult[i]) {
            item.classList.add("text-danger");
            item.innerText = addressesCheck[i] + " is not checksummed";
        } else {
            item.innerText = addressesCheck[i]
        }
        element.appendChild(item);
    }
    return element;
}

function resultChecksum(addressesResult) {
    let element = document.createElement("div");
    for (i = 0; i < addressesResult.length; i++) {
        let item = document.createElement("p");
        if (addressesResult[i] == "error") {
            item.classList.add("text-danger");
            item.innerText = addressesToChecksum[i] + " is not valid";
        } else {

            item.innerText = addressesResult[i];
        }
        element.appendChild(item);
    }
    return element;
}

document.querySelector('#addresses-check').addEventListener('input', handleInput);
document.querySelector("#to-checksum").addEventListener("input", e => {
    addressesToChecksum = []
    tmp = e.target.value.split("\n");
    tmp.forEach((address) => {
        if (address) {
            addressesToChecksum.push(address)
        }
    });
    console.log(addressesToChecksum);
})

document.querySelector("#checksum").addEventListener("click", toChecksum);

document.querySelector('#check').addEventListener('click', check);

