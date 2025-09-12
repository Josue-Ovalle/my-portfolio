const { optimize } = require('svgo');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');
  
  // Create optimized directory if it doesn't exist
  const optimizedDir = path.join(publicDir, 'optimized');
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir);
  }

  // Optimize SVGs
  const svgFiles = fs.readdirSync(publicDir).filter(file => file.endsWith('.svg'));
  for (const file of svgFiles) {
    const content = fs.readFileSync(path.join(publicDir, file), 'utf8');
    const result = optimize(content, {
      path: file,
      multipass: true,
    });
    fs.writeFileSync(path.join(optimizedDir, file), result.data);
  }

  console.log('✅ Images optimized successfully');
}

optimizeImages().catch(console.error);