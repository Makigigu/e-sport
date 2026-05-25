# ระบบจัดการการแข่งขันอีสปอร์ตครบวงจร (Comprehensive E-Sports Tournament Management System)

นี่คือโปรเจกต์เว็บแอปพลิเคชันสำหรับจัดการแข่งขันอีสปอร์ตที่พัฒนาด้วย Next.js และเชื่อมต่อฐานข้อมูลระดับ Enterprise ผ่าน Prisma ORM และ TiDB Cloud (MySQL Serverless)

---

## 📸 ภาพหน้าจอระบบ (Screenshots)

### 🏠 หน้าแรก (Landing Page)
![หน้าแรก](./screenshots/01-home.png)

---

### 🎮 หน้ารายการเกมแข่งขัน (Game Selection)
![รายการเกม](./screenshots/02-game-selection.png)

---

### 📺 หน้า Game Hub — Live Stream & VODs
![Game Hub](./screenshots/03-game-hub.png)

---

### 📝 หน้าลงทะเบียนทีมแข่งขัน (Team Registration)
![ลงทะเบียน](./screenshots/04-register.png)

---

### 👥 หน้าแอดมิน — อนุมัติทีมสมัคร (Team Approvals)
![อนุมัติทีม](./screenshots/05-admin-approvals.png)

---

### 🗂️ หน้าแอดมิน — แบ่งกลุ่มแข่งขัน (Group Management)
![แบ่งกลุ่ม](./screenshots/06-admin-groups.png)

---

### 🎛️ หน้าแอดมิน — ควบคุมไลฟ์แมตช์ & Bracket (Live Match Controller)
![ควบคุมไลฟ์](./screenshots/07-admin-live.png)

---

## ✨ ฟีเจอร์หลักของระบบ

### 1. หน้าเลือกเกม (Game Selection Portal)

* หน้าแรกที่ออกแบบด้วยสไตล์ Premium Dark E-Sport Theme เรียบหรู สะดุดตา
* แสดงรายการเกมการแข่งขันในรูปแบบการ์ดแบบตอบสนอง (Responsive Card Grid)
* รองรับหลายเกม เช่น ROV, Free Fire, PUBG Mobile, Valorant และ League of Legends

### 2. ศูนย์ควบคุมข้อมูลการแข่งขัน (Game Hub Overview)

* ส่วนแสดงสตรีมสดผ่านเครื่องเล่นวิดีโอ (Embedded Live Stream Player) รองรับหลายช่องพร้อมกัน
* ระบบตรวจสอบสถานะทีมสมัครและดาวน์โหลดเกียรติบัตร (E-Certificate Download) โดยค้นหาด้วย OpenID ของผู้เล่น
* ตารางคะแนนรอบแบ่งกลุ่ม (Group Standings) ที่สร้างกลุ่มแข่งขันและทีมสมาชิกได้แบบไม่จำกัด
* แผนผังทัวร์นาเมนต์รอบเพลย์ออฟ (Playoffs Bracket) แสดงแบบสายการแข่งขัน (Single Elimination) รองรับขนาด 4, 8 หรือ 16 ทีม พร้อมอัปเดตสายแข่งขันอัตโนมัติเมื่อสิ้นสุดแต่ละรอบ
* ระบบรายงานสถานะเกมสด (Live Match Tracker) แสดงบันทึกเหตุการณ์ต่างๆ ในเกมพร้อมระบุฝั่ง Blue Side และ Red Side
* แสดงตารางเวลาการแข่งขัน (Match Schedule) บนบัตรแมตช์ในสายเพลย์ออฟ

### 3. แบบฟอร์มลงทะเบียนทีมแข่ง (Team Registration Form)

* ฟอร์มการสมัครที่ครอบคลุมสำหรับ 1 ทีม ประกอบด้วย:
  * ข้อมูลทั่วไป เช่น ระดับชั้น (ประถม/มัธยม), ชื่อโรงเรียน, ชื่อทีม, ตัวย่อทีม (สูงสุด 3 ตัวอักษร พิมพ์ใหญ่ภาษาอังกฤษอัตโนมัติ), ชื่อผู้จัดการทีม
  * ข้อมูลผู้เล่นทั้ง 6 คน (ตัวจริง 5 คน สำรอง 1 คน) โดยจัดเก็บทั้งชื่อ-นามสกุลจริงและ OpenID สำหรับพิมพ์บนใบเกียรติบัตร
  * เงื่อนไขการสมัครและข้อตกลงในการเข้าร่วมแข่งขันครบถ้วน
  * ระบบแจ้งเตือน Toast Notification แทน alert()

### 4. แดชบอร์ดแอดมิน (Admin Dashboard)

* แผงควบคุมระบบสำหรับผู้ดูแลระบบพร้อมเมนูแถบข้าง (Sidebar) ประกอบด้วย:
  * ระบบตรวจสอบและอนุมัติผู้สมัครทีมแข่ง (Pending, Approved, Waitlisted, Rejected)
  * ปุ่มดาวน์โหลดข้อมูลทีมเป็น CSV (Export CSV) เพื่อนำไปใช้งานใน Excel
  * ระบบจัดกลุ่มแข่งขันแบบไดนามิก (Dynamic Group Assignment) สามารถสร้างกลุ่มแข่งขันใหม่และย้ายทีมเข้าร่วมกลุ่มได้อย่างอิสระ
  * ส่วนแก้ไข URL ของสตรีมสดการแข่งขัน (รองรับหลาย URL พร้อมกัน)
  * ส่วนจัดการคะแนนการแข่งขัน (Match Controller) พร้อมตั้งเวลาแข่งขัน (Scheduled Time)
  * ระบบจำลองเหตุการณ์ในการแข่งสด (Live Match Event Log) สำหรับลงบันทึกการกระทำในเกม
  * จัดการสายการแข่งขัน Playoffs Bracket ขนาด 4, 8, 16 ทีม

---

## 🛠️ เทคโนโลยีที่ใช้งาน (Technology Stack)

| ส่วนงาน | เทคโนโลยี |
|---|---|
| **Frontend** | Next.js 15 (React), Vanilla CSS |
| **Backend API** | Next.js API Routes (App Router) |
| **Database ORM** | Prisma ORM |
| **Database** | TiDB Cloud (MySQL Serverless) |
| **Real-time Sync** | SWR (Stale-While-Revalidate) |
| **Notifications** | react-hot-toast |
| **Icons** | lucide-react |

---

## 🗄️ การเตรียมระบบฐานข้อมูล (Database Setup)

1. คัดลอกและตั้งค่า URL การเชื่อมต่อฐานข้อมูล TiDB Cloud ในไฟล์ `.env` ที่อยู่ในโฟลเดอร์หลัก:

   ```env
   DATABASE_URL="mysql://username:password@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/dbname?sslaccept=strict"
   ADMIN_PASSWORD="your_admin_password"
   ```

2. อัปเดตโครงสร้างฐานข้อมูลและตารางเข้าสู่ TiDB Cloud ด้วยคำสั่ง:

   ```bash
   npx prisma db push
   ```

---

## 🚀 วิธีการรันโปรเจกต์ (Getting Started)

### สำหรับขั้นตอนการพัฒนา (Development Server)

รันคำสั่งด้านล่างนี้เพื่อเปิดใช้งานเซิร์ฟเวอร์สำหรับนักพัฒนา:

```bash
npm run dev
```

จากนั้นเปิดเว็บเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

### สำหรับขั้นตอนการใช้งานจริง (Production Build)

คอมไพล์โปรเจกต์และรันตัวเซิร์ฟเวอร์แบบ Production:

```bash
npm run build
npm start
```
