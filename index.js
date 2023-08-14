const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContacts = await contacts.listContacts();
      return console.table(listContacts);

    case "get":
      const idContacts = await contacts.getContactById(id);
      return console.table(idContacts);

    case "remove":
      const idContactsRemove = await contacts.removeContact(id);
      return console.table(idContactsRemove);

    case "add":
      const addContact = await contacts.addContact(name, email, phone);
      return console.table(addContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
