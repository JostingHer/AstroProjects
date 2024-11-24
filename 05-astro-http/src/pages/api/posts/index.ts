import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    const blogPosts = await getCollection("blog");
  
    const url = new URL(request.url);
    //console.log(request)

    const slug = url.searchParams.get('slug');
    //console.log(slug)

  
    if(!slug){
        return new Response(JSON.stringify(blogPosts), {
            status: 201,
            headers: {
              'Content-Type': 'application/json',
            },
          });
    }

    const filteredPostBySlug = blogPosts.filter((post) => post.slug === slug);
    //console.log("filter json",filteredPostBySlug)
    // const filteredPostBySlug = await getEntry("blog", slug);
    // console.log("get entry ",filteredPostBySlug)

    if(filteredPostBySlug.length > 0){
        return new Response(JSON.stringify(filteredPostBySlug[0]), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    }else{
        return new Response(JSON.stringify({message: `Post: ${slug} not found`}), {
            status: 404,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    }
  
    
 
};