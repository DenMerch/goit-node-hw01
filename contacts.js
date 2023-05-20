const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json")

const readFile = async fileName => {
    try {
        await fs.readFile(contactsPath)
    } catch (error) {
console.log(error.message);
    }
} 