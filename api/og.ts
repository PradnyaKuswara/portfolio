function replaceMeta(html: string, nameOrProperty: string, newValue: string, isProperty = true): string {
  const attribute = isProperty ? 'property' : 'name';
  // Matches <meta property="og:title" content="..." /> or similar, allowing varying whitespace/quotes
  const regex = new RegExp(`<meta\\s+${attribute}="${nameOrProperty}"\\s+content="[^"]*"\\s*/?>`, 'gi');
  return html.replace(regex, `<meta ${attribute}="${nameOrProperty}" content="${newValue}" />`);
}

const BOT_USER_AGENTS = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|twitterbot|slackbot|discordbot|linkedinbot/i;

export default async function handler(req: any, res: any) {
  const userAgent = req.headers['user-agent'] || '';
  const isBot = BOT_USER_AGENTS.test(userAgent);

  const { type, slug } = req.query;

  const host = req.headers['x-forwarded-host'] || req.headers.host || 'pradnyakuswara.web.id';
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const indexUrl = `${protocol}://${host}/index.html`;

  let title = "Pradnya Kuswara";
  let description = "Portfolio website of I Gusti Ngurah A Pradnya Kuswara. A software engineer and web developer.";
  let imageUrl = `https://${host}/assets/images/logo.png`;

  // 1. Fetch index.html
  let html = '';
  try {
    const indexRes = await fetch(indexUrl);
    if (indexRes.ok) {
      html = await indexRes.text();
    } else {
      throw new Error(`Failed to fetch index.html: ${indexRes.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching base index.html:', error);
    // Fallback template in case index.html is completely unreachable
    html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pradnya Kuswara</title>
  <meta name="description" content="Portfolio website of I Gusti Ngurah A Pradnya Kuswara. A software engineer and web developer." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Pradnya Kuswara" />
  <meta property="og:description" content="Portfolio website of I Gusti Ngurah A Pradnya Kuswara. A software engineer and web developer." />
  <meta property="og:image" content="https://pradnyakuswara.web.id/assets/images/logo.png" />
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
  }

  // 2. If it is a bot request and has slug, fetch dynamic metadata from the API
  if (isBot && slug && typeof slug === 'string') {
    const apiUrl = process.env.VITE_API_URL || 'https://api-portfolio.pradnyakuswara.web.id';
    
    try {
      if (type === 'project') {
        const apiRes = await fetch(`${apiUrl}/projects-front/${slug}`);
        if (apiRes.ok) {
          const result = await apiRes.json();
          if (result && result.data) {
            title = result.data.title || title;
            description = result.data.meta_desc || description;
            imageUrl = result.data.image || imageUrl;
          }
        }
      } else if (type === 'blog') {
        const apiRes = await fetch(`${apiUrl}/articles-front/${slug}`);
        if (apiRes.ok) {
          const result = await apiRes.json();
          if (result && result.data) {
            title = result.data.title || title;
            description = result.data.meta_desc || description;
            imageUrl = result.data.thumbnail || imageUrl;
          }
        }
      }

      // Ensure imageUrl is absolute
      if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
        if (imageUrl.startsWith('/')) {
          imageUrl = `${apiUrl}${imageUrl}`;
        } else {
          imageUrl = `${apiUrl}/${imageUrl}`;
        }
      }
    } catch (error) {
      console.error('Error fetching dynamic metadata:', error);
    }

    // Replace the placeholders with dynamic data
    html = html.replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`);
    html = replaceMeta(html, 'description', description, false);
    
    html = replaceMeta(html, 'og:title', title, true);
    html = replaceMeta(html, 'og:description', description, true);
    html = replaceMeta(html, 'og:image', imageUrl, true);
    html = replaceMeta(html, 'og:url', `${protocol}://${host}${req.url}`, true);
    
    html = replaceMeta(html, 'twitter:title', title, false);
    html = replaceMeta(html, 'twitter:description', description, false);
    html = replaceMeta(html, 'twitter:image', imageUrl, false);
  }

  // 3. Return the HTML response
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
