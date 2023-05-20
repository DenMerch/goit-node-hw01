const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "db", "contacts.json")

async function listContacts() {
    try {
        const data = await fs.readFile(`${contactsPath}`, "utf-8")

        return JSON.parse(data)

    } catch (error) {
        console.log(error.message);
    }
}

async function getContactById(contactId) {
    try {
        const data = await listContacts()

        return data.filter(contact => contact.id === contactId)

    } catch (error) {
        console.log(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const data = await listContacts();
        const newData = data.filter(contact => contact.id !== contactId)
        console.log(`Contact with id:${contactId} removed successfully`);

        return await fs.writeFile(`${contactsPath}`, JSON.stringify(newData))

    } catch (error) {
        console.log(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const data = await listContacts()
        const contact = {
            id: uuidv4(),
            name,
            email,
            phone,
        }
        const newData = [...data, contact]
        console.log(contact);

        return await fs.writeFile(`${contactsPath}`, JSON.stringify(newData))

    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
    addContact,
    removeContact,
    getContactById,
    listContacts,
}
