import { v4 as uuidv4 } from 'uuid';
import { nova_chance } from '../database/data.js';
 
function create({ cargo, valor }) {
  const id = uuidv4();
 
  const nova_chancet = { cargo, valor, id };
 
  if (cargo && valor) {
   nova_chance.push(nova_chance);
 
    return nova_chance;
  } else {
    throw new Error('Unable to create nova_chance');
  }
}
 
function read(field, valor) {
  if (field && valor) {
    const filterednova_chances = nova_chance.filter((nova_chance) =>
      nova_chance[field].includes(valor)
    );
 
    return filterednova_chances ;
  }
 
  return nova_chance;
}
 
function readById(id) {
  if (id) {
    const index = nova_chance.findIndex((nova_chance) => contas.id === id);
 
    if (!nova_chance[index]) {
      throw new Error('nova_chance not found');
    }
 
    return nova_chance[index];
  } else {
    throw new Error('Unable to find nova_chance');
  }
}
 
function update({ id, cargo, valor }) {
  if (cargo && valor && id) {
    const newnova_chance = { cargo, valor, id };
 
    const index = nova_chance.findIndex((nova_chance) => nova_chance.id === id);
 
    if (!nova_chance[index]) {
      throw new Error('nova_chance not found');
    }
 
    nova_chance[index] = newnova_chance;
 
    return newnova_chance;
  } else {
    throw new Error('Unable to update nova_chance');
  }
}
 
function remove(id) {
  if (id) {
    const index = nova_chance.findIndex((nova_chance) => nova_chance.id === id);
 
    nova_chance.splice(index, 1);
 
    return true;
  } else {
    throw new Error('nova_chance not found');
  }
}
 
export default { create, read, readById, update, remove };
 