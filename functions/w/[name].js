function decodeName(raw) {
  if (!raw) return "Prajwal";
  try {
    let padded = raw.replace(/-/g, "+").replace(/_/g, "/");
    while (padded.length % 4) padded += "=";
    let decoded = atob(padded);
    try {
      let obj = JSON.parse(decoded);
      if (obj && obj.from) return obj.from.trim();
    } catch (_) {}
    if (/^[A-Za-z0-9 _\-\.!@#\$%\^&\*\(\)\+]+$/.test(decoded)) {
      return decoded.trim();
    }
  } catch (_) {}
  try {
    let plain = decodeURIComponent(raw);
    if (plain && plain !== raw) return plain.trim();
  } catch (_) {}
  return raw.trim() || "Prajwal";
}

export async function onRequest(context) {
  let param = context.params.name || "";
  let name = decodeName(param);
  let title = `${name} sent you a Diwali gift`;
  let ogImageUrl = `https://diwali-prajwal.pages.dev/og/${encodeURIComponent(param)}.jpg`;

  let res = await context.env.ASSETS.fetch(new URL("/w/UHJhandhbA/index.html", context.request.url));
  let html = await res.text();

  html = html
    .replace(/<title>[^<]*<\/title>/g, `<title>${title}</title>`)
    .replace(/property="og:title" content="[^"]*"/g, `property="og:title" content="${title}"`)
    .replace(/name="twitter:title" content="[^"]*"/g, `name="twitter:title" content="${title}"`)
    .replace(/property="og:image" content="[^"]*"/g, `property="og:image" content="${ogImageUrl}"`)
    .replace(/name="twitter:image" content="[^"]*"/g, `name="twitter:image" content="${ogImageUrl}"`)
    .replace(/https:\/\/diwali-campaign\.pages\.dev\/og\/[^\.]+\.jpg/g, ogImageUrl);

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate"
    }
  });
}
