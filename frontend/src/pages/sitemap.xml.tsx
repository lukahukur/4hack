import { postPreviewType } from '@/types/types'
import { GetServerSideProps } from 'next'

//pages/sitemap.xml.js

function generateSiteMap(posts: postPreviewType[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://4hack.xyz/articles</loc>
     </url>
     <url>
       <loc>https://4hack.xyz/alltags</loc>
     </url>
     <url>
       <loc>https://4hack.xyz/about</loc>
     </url>
     <url>
       <loc>https://4hack.xyz/pp</loc>
     </url>
     ${posts
       .map(({ id }) => {
         return `
       <url>
           <loc>${`https://4hack.xyz/posts/${id}`}</loc>
       </url>
     `
       })
       .join('')}
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({
  res,
}) => {
  // We make an API call to gather the URLs for our site
  const request = await fetch(
    process.env.NEXT_PUBLIC_BURL + '/api/posts/getMany0/10000'
  )
  const posts = await request.json()

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts)

  res.setHeader('Content-Type', 'text/xml')
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
