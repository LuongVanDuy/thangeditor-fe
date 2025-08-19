const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "src/assets"); // thư mục SVG
const oldColor = "#fdc101";
const newColor = "#00BC7D";

function replaceColorInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const regex = new RegExp(oldColor, "gi"); // 'gi' để thay tất cả và không phân biệt hoa thường
  if (regex.test(content)) {
    content = content.replace(regex, newColor);
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`Đã đổi màu: ${filePath}`);
  }
}

function traverseDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith(".svg")) {
      replaceColorInFile(fullPath);
    }
  });
}

traverseDirectory(directoryPath);
