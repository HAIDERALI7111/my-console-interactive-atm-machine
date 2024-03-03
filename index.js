import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';
const createuser = () => {
    let users = [];
    for (let i = 0; i < 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountnumber: Math.floor(100000000 * Math.random() * 900000000000000),
            balance: 100000 * i
        };
        users.push(user);
    }
    return users;
};
//atm machine
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "number",
        message: "write your pin code",
        name: "pin"
    });
    //console.log("Wellcome Account Holder")
    const user = users.find((val) => val.pin == res.pin);
    if (user) {
        console.log(`Welcome ${user.name}`);
        atmFunc(user);
        return;
    }
    console.log("invalid user pin");
};
//atm function
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "what do you want to do...?",
        choices: ["withdraw", "balance", "deposite", "exit"]
    });
    if (ans.select == "withdraw") {
        const ammount = await inquirer.prompt({
            type: "number",
            message: "enter ammount",
            name: "rupees"
        });
        if (ammount.rupees > user.balance) {
            return console.log("insufficent balance");
        }
        if (ammount.rupees > 25000) {
            return console.log("you did not withdraw after 25000");
        }
        console.log(`withdraw ammount: ${ammount.rupees}`);
        console.log(`Balance: ${user.balance - ammount.rupees}`);
    }
    if (ans.select == "balance") {
        console.log(`Balance: ${user.balance}`);
        return;
    }
    if (ans.select == "deposite") {
        const deposite = await inquirer.prompt({
            type: "number",
            message: "deposite amount enter",
            name: "rupees",
        });
        console.log(`deposite ammount: ${deposite.rupees}`);
        console.log(`total balance: ${user.balance + deposite.rupees}`);
    }
    if (ans.select == "exit") {
        console.log("Thanks For Using Atm Machine");
    }
};
const users = createuser();
atmMachine(users);
