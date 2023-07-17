const contacts = require('./contacts');
const argv = require('yargs').argv;

async function invokeAction({action, id, name, email, phone}) {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case 'get':
      const selectContact = await contacts.getContactById(id);
      console.log(selectContact);
      break;
    case 'add':
      const addedContact = await contacts.addContact(name, email, phone);
      console.log(addedContact);
      break;
    case 'remove':
      const deletedContact = await contacts.removeContact(id);
      return console.log(deletedContact);
    default:
      console.warn('Unknown action type!');
  }
}

invokeAction(argv);
