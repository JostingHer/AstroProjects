import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
  const person = {
    name: 'Josting Hernandez',
    age: 21,
  };

  return new Response(JSON.stringify(person), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};