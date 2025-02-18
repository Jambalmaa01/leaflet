import {
    db,
    eq,
    userTable,
  } from '@/lib/drizzle';
  import {
    usersSeed,
  } from '@/lib/drizzle/seed';

  
  async function seed() {
    await db.transaction(async tx => {
      await tx
        .insert(userTable)
        .values({
          id: 'ef006740-6d40-44f9-9505-6e549b8c2983',
          username: 'toumku',
          password:
            '$2a$10$nWBalfvME1/lzG5mxsbNZezqr5XqAdEIboxcxoBj7.eJfaznVVK8O',
         
        })
        .onConflictDoNothing();
     
      await tx.insert(userTable).values(usersSeed).onConflictDoNothing();
      await tx
        .update(userTable)
    });
  }
  
  seed()
    .catch(e => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      process.exit(0);
    });
  