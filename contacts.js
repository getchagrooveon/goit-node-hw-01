const fs = require('fs').promises;
const {nanoid} = require('nanoid');
const path = require('path');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const result = await fs.readFile(contactsPath).then(data => {
    return JSON.parse(data);
  });
  return result;
}

async function getContactById(id) {
  const contactId = String(id);
  const data = await fs.readFile(contactsPath).then(data => {
    return JSON.parse(data);
  });
  const result = data.find(contact => contact.id === contactId);
  return result || null;
}

async function removeContact(id) {
  const contactId = String(id);
  const data = await fs.readFile(contactsPath).then(data => {
    return JSON.parse(data);
  });
  const index = data.findIndex(contact => contact.id === contactId);
  const result = index === -1 ? null : data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  console.log(name);
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const data = await fs.readFile(contactsPath).then(data => {
    return JSON.parse(data);
  });
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
