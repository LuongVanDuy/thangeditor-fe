const fs = require("fs");
const path = require("path");

// 1. Cấu hình đường dẫn
const assetsDir = path.resolve(__dirname, "src/assets");
const srcDir = path.resolve(__dirname, "src");

// 2. Lấy danh sách tất cả ảnh trong assets
function getAllImages(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      results = results.concat(getAllImages(filepath));
    } else if (/\.(png|jpe?g|svg|gif|webp)$/i.test(file)) {
      results.push(filepath);
    }
  });
  return results;
}

// 3. Đọc tất cả nội dung code trong thư mục src
function readAllCodeFiles(dir) {
  let content = "";
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      content += readAllCodeFiles(filepath);
    } else if (/\.(js|jsx|ts|tsx|json|css|scss)$/i.test(file)) {
      content += fs.readFileSync(filepath, "utf8");
    }
  });
  return content;
}

// 4. Kiểm tra file ảnh có được dùng không
function findUnusedImages() {
  const allImages = getAllImages(assetsDir);
  const codeContent = readAllCodeFiles(srcDir);

  const unusedImages = allImages.filter((imagePath) => {
    const relativePath = path.relative(srcDir, imagePath).replace(/\\/g, "/");
    return !codeContent.includes(relativePath) && !codeContent.includes(path.basename(imagePath));
  });

  return unusedImages;
}

// 5. In và xóa nếu muốn
const unused = findUnusedImages();

if (unused.length === 0) {
  console.log("🎉 Không có hình ảnh nào không dùng.");
} else {
  console.log("🧹 Các hình ảnh không được sử dụng:");
  unused.forEach((img) => console.log(" -", img));

  // HỎI TRƯỚC KHI XÓA
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("\n❓ Bạn có muốn xóa các ảnh này không? (y/N): ", (answer) => {
    if (answer.toLowerCase() === "y") {
      unused.forEach((img) => fs.unlinkSync(img));
      console.log("✅ Đã xóa xong.");
    } else {
      console.log("❌ Không xóa gì cả.");
    }
    readline.close();
  });
}
