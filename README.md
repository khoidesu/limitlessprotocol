# 🚩 Limitlessprotocol real-time leaderboard

![javascript](https://img.shields.io/badge/JavaScript-F7DF1E?&logo=javascript&logoColor=black)
![socketio](https://img.shields.io/badge/Socket.io-4.8.3-010101??style=flat-square&logo=Socket.io&logoColor=white)
![express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=fff&style=flat)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-5+-E34F26?logo=html5)
![CSS](https://img.shields.io/badge/-CSS-000?logo=CSS)
![sqlite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=SQLite&logoColor=white)

> **Hệ thống hiển thị xếp hạng team trên nền tảng Web.**

## 1. Giới thiệu (Introduction)

Dự án **Limitlessprotocol real-time leaderboard** là một ứng dụng web Node.js dùng để quản lý và hiển thị bảng xếp hạng đội chơi theo thời gian thực. Hệ thống hỗ trợ đăng nhập, phân quyền Admin/Team, lưu dữ liệu bằng SQLite, và cập nhật leaderboard realtime qua Socket.IO.

*Team (người chơi)*: đăng nhập để xem bảng xếp hạng realtime, theo dõi điểm số/pills/số trạm và các nội dung trong main.html.

*Admin(chủ trạm, ban tổ chức)*: đăng nhập để vào trang quản trị, có thể cộng/trừ điểm, điều chỉnh pills (ammo) và stations cho từng team; mọi thay đổi sẽ được phát ngay tới tất cả client đang mở trang.

## 2. Tính năng (Features)

### User:
<ul>
  <li>Bảng xếp hạng realtime</li>
    <ul>
      <li>Leaderboard cập nhật theo thời gian thực qua Socket.IO (event leaderboard).</li>
      <li>Sắp xếp theo: stations giảm dần → score giảm dần → ammo tăng dần.</li>
      <li>Highlight đội của mình trên bảng.</li>
    </ul>
  <li>Trang “GENESIS” nhập mã xác thực</li>
    <ul>
      <li>Nhập đúng mã thì hiển thị “unlock”./li>
      <li>Nhập sai sẽ khóa 30 giây (dùng localStorage).</li>
    </ul>
    <li>Hiển thị bản đồ của sự kiện
  <li>Gợi ý mã morse và mã nhị phân
</ul>

### Admin:
<ul>
    <li>Admin quản lý điểm số (tăng/ giảm): </li>
      <ul>
        <li>Score</li>
        <li>Pills</li>
        <li>Stations (tăng và bị giới hạn tối đa 6)</li>
      </ul>
</ul>

## 3. Cấu trúc dự án (Project Structure)

```
📂 leader board/ 
├── 📁 node_modules/ (thư viện cài bằng npm) 
├── 📁 public/ 
│ ├── 📄 index.html 
│ ├── 📄 main.html 
│ ├── 📄 admin.html 
│ ├── 📄 leaderboard.html 
│ ├── 📄 client.js 
│ └── 📄 style.css 
├── 🗄️ database.sqlite (tạo khi khởi chạy web)
├── 📄 package.json 
├── 📄 package-lock.json 
└── 📄 server.js
```
# ⚙️ Hướng dẫn Cài đặt (Installation Instructions)

Vui lòng thực hiện các bước sau theo thứ tự để đảm bảo chương trình chạy ổn định.

### Bước 1: Clone dự án

```bash
git clone https://github.com/khoidesu/limitlessprotocol
cd limitlessprotocol
```
## Bước 2: Tải node.js (nếu máy bạn chưa có)
Truy cập: [node.js](https://nodejs.org/en)

Tải và cài đặt node.js theo hướng dẫn

## Bước 3: Cài đặt thư viện (Dependencies)
**Mở Terminal:**
```bash
npm install
```
## Bước 4: Khởi chạy Server

```bash
npm start
```
(Nếu trong **package.json** không có lệnh **start**, bạn có thể gõ node ```server.js```)

## Bước 5: Xem kết quả 

Mở trình duyệt web (Chrome, Edge, Firefox) và truy cập địa chỉ:
http://localhost:3000 (hoặc cổng mà bạn quy định trong server.js).

## Bước 6: Đăng nhập

Bản test hiện tại có **10 account user** dành cho người chơi và **1 account admin**
#### User account:
```
username 1: ALPHA 
pass1: alpha123
username 2: BRAVO 
pass2: bravo123
username 3: CHARLIE 
pass3: charlie123
username 4: DELTA 
pass4: delta123
username 5: ECHO 
pass5: echopass123
username 6: FOXTROT 
pass6: foxtrot123
username 7: GOLF 
pass7: golf123
username 8: HOTEL 
pass8: hotel123
username 9: INDIA 
pass9: india123
username 10: JULIETT 
pass10: juliett123
```

#### Admin account:
```
username: admin
pass: admin123
```

## Demo web:
### Log in page:
![login](https://github.com/khoidesu/limitlessprotocol/blob/master/github%20readme/login.png)

#### User UI:
Hình ảnh tham khảo:
![user1](https://github.com/khoidesu/limitlessprotocol/blob/master/github%20readme/user1.png)
![user2](https://github.com/khoidesu/limitlessprotocol/blob/master/github%20readme/user2.png)

#### Admin UI:
Hình ảnh tham khảo:
![admin](https://github.com/khoidesu/limitlessprotocol/blob/master/github%20readme/admin.png)
