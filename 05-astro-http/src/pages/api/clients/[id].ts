import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { db, Clients, eq } from 'astro:db';

// hybrid page - server rendered
export const prerender = false;



export const GET: APIRoute = async ({ params, request }) => {

    const { id } = params;

    const client = await db.select().from(Clients).where(eq(Clients.id, Number(id)));
    console.log(
        request
    )

  
    if (!client) {
      return new Response(JSON.stringify({ msg: `clients not found` }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  
    return new Response(JSON.stringify(client.at(0)), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  
  

  export const PATCH: APIRoute = async ({ params, request }) => {
    const clientId = params.id ?? '';
  
    try {
      const { id, ...body } = await request.json();
  
      const results = await db
        .update(Clients)
        .set(body)
        .where(eq(Clients.id, +clientId));
  
        // return el cliente actualizado
      const updatedClient = await db
        .select()
        .from(Clients)
        .where(eq(Clients.id, +clientId));
  
      return new Response(JSON.stringify(updatedClient.at(0)), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
  
      return new Response(JSON.stringify({ msg: 'No body found' }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  };
export const DELETE: APIRoute = async ({ params, request }) => {
  const clientId = params.id ?? '';

  const { rowsAffected } = await db
    .delete(Clients)
    .where(eq(Clients.id, +clientId));

  if (rowsAffected > 0) {
    return new Response(JSON.stringify({ msg: 'Deleted' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(
    JSON.stringify({ msg: `Client with id ${clientId} not found` }),
    {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};