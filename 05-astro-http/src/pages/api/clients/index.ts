import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { db, Clients } from 'astro:db';

// hybrid page - server rendered
export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {


  const clients = await db.select().from(Clients);
  console.log(
    request
)

    console.log("hola", clients)


  if (!clients) {
    return new Response(JSON.stringify({ msg: `clients not found` }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify(clients), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};


export const POST: APIRoute = async ({ params, request }) => {
    try {
      const { id, ...body } = await request.json();
  
      const { lastInsertRowid } = await db.insert(Clients).values(body);
  
      return new Response(
        JSON.stringify({
          id: +lastInsertRowid!.toString(),
          ...body,
        }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
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