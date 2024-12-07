import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(Clients).values([
		{id: 1, name: 'Alice', age: 30, isActive: true },
		{id: 2, name: 'Bob', age: 35, isActive: false },
		{id: 3, name: 'Charlie', age: 40, isActive: true },
		{id: 4, name: 'David', age: 45, isActive: false },
	  ])

	  console.log('Seeded clients table');
	  console.log('modificaciones en este archivo se vuelve a ejecutar el seed Y se rellenela bd con estos datos de aqui') 
}
