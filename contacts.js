const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contactID = data.find((obj) => obj.id === contactId);
  return contactID || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const contactIndex = data.findIndex((obj) => obj.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const [deleteContacts] = data.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 3));
  return deleteContacts;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 3));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
