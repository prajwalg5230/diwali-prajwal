import jpeg from "jpeg-js";
import fontAtlas from "../../font_atlas.js";

function decodeName(raw) {
  if (!raw) return "Prajwal";
  raw = raw.replace(/\.(jpg|jpeg|png)$/i, "");
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

  // If Prajwal or default, serve the pre-rendered master og.jpg
  if (name.toLowerCase() === "prajwal" || !name) {
    let res = await context.env.ASSETS.fetch(new URL("/og.jpg", context.request.url));
    return new Response(res.body, {
      headers: {
        "content-type": "image/jpeg",
        "cache-control": "public, max-age=604800, s-maxage=604800, immutable"
      }
    });
  }

  // Fetch the pristine template image
  let bgRes = await context.env.ASSETS.fetch(new URL("/og_template.jpg", context.request.url));
  let bgBuf = await bgRes.arrayBuffer();
  let bg = jpeg.decode(new Uint8Array(bgBuf), { useTArray: true });

  let imgData = new Uint8Array(bg.data);
  let width = bg.width;
  let height = bg.height;

  // Calculate width
  let totalW = 0;
  for (let ch of name) {
    let glyph = fontAtlas[ch] || fontAtlas[" "];
    totalW += glyph ? glyph.w + 2 : 24;
  }

  let startX = Math.max(20, Math.floor((width - totalW) / 2));
  let baselineY = 275;

  for (let ch of name) {
    let glyph = fontAtlas[ch] || fontAtlas[" "];
    if (glyph && glyph.data && glyph.data.length > 0) {
      let startY = baselineY + glyph.top_offset;
      for (let y = 0; y < glyph.h; y++) {
        for (let x = 0; x < glyph.w; x++) {
          let alpha = glyph.data[y][x];
          if (alpha > 0) {
            let px = startX + x;
            let py = startY + y;
            if (px >= 0 && px < width && py >= 0 && py < height) {
              let idx = (py * width + px) * 4;
              let a = alpha / 255;
              imgData[idx] = Math.round(imgData[idx] * (1 - a) + 255 * a);
              imgData[idx + 1] = Math.round(imgData[idx + 1] * (1 - a) + 248 * a);
              imgData[idx + 2] = Math.round(imgData[idx + 2] * (1 - a) + 235 * a);
            }
          }
        }
      }
    }
    startX += glyph ? glyph.w + 2 : 24;
  }

  let encoded = jpeg.encode({ data: imgData, width, height }, 85);
  return new Response(encoded.data, {
    headers: {
      "content-type": "image/jpeg",
      "cache-control": "public, max-age=604800, s-maxage=604800, immutable"
    }
  });
}
