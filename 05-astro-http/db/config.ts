import { defineDb, defineTable, column } from 'astro:db';

const Clients = defineTable({
  columns: {
    id: column.number({primaryKey: true}),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean(),
  }
})


// https://astro.build/db/config
export default defineDb({
  tables: {
    // Define your tables here
    Clients
  }
});
