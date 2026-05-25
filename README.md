# ระบบจัดการการแข่งขันอีสปอร์ตครบวงจร (Comprehensive E-Sports Tournament Management System)

นี่คือโปรเจกต์เว็บแอปพลิเคชันสำหรับจัดการแข่งขันอีสปอร์ตที่พัฒนาด้วย Next.js, React, Tailwind CSS และ Prisma ORM ที่เชื่อมต่อกับ TiDB Cloud

---

## ฟีเจอร์หลักของระบบ

### 1. หน้าเลือกเกม (Game Selection Portal)

* หน้าแรกที่ออกแบบด้วยสไตล์ Premium Light E-Sport Theme เรียบหรู สะอาดตา
* แสดงรายการเกมการแข่งขันในรูปแบบการ์ดแบบตอบสนอง (Responsive Card Grid)

### 2. ศูนย์ควบคุมข้อมูลการแข่งขัน (Game Hub Overview)

* ส่วนแสดงสตรีมสดผ่านเครื่องเล่นวิดีโอ (Embedded Live Stream Player)
* ระบบตรวจสอบสถานะทีมสมัครและดาวน์โหลดเกียรติบัตร (E-Certificate Download) โดยค้นหาด้วยรหัสทีม
* ตารางคะแนนรอบแบ่งกลุ่ม (Group Standings) ที่สร้างกลุ่มแข่งขันและทีมสมาชิกได้แบบอัตโนมัติ
* แผนผังทัวร์นาเมนต์รอบเพลย์ออฟ (Playoffs Bracket) แสดงแบบสายการแข่งขัน (Single Elimination) รองรับ 2, 4, 8, 16 ทีม
* ระบบรายงานสถานะเกมสด (Live Match Tracker) แสดงบันทึกเหตุการณ์ต่างๆ ในเกมพร้อมระบบแสดงรอบการแข่งขันและสถานะทีม

### 3. แบบฟอร์มลงทะเบียนทีมแข่ง (Team Registration Form)

* ฟอร์มการสมัครที่ครอบคลุมสำหรับ 1 ทีม ประกอบด้วย:
  * ข้อมูลทั่วไป เช่น ระดับชั้น (ประถม/มัธยม), ชื่อโรงเรียน, ชื่อทีม, ตัวย่อของทีม, ชื่อผู้จัดการทีม
  * ข้อมูลผู้เล่นทั้ง 6 คน (ตัวจริง 5 คน สำรอง 1 คน) โดยจัดเก็บทั้งชื่อ-นามสกุล, โปรไฟล์ Discord และอีเมล
  * เงื่อนไขการสมัครและข้อตกลงในการเข้าร่วมแข่งขันครบถ้วน

### 4. แดชบอร์ดแอดมิน (Admin Dashboard)

* แผงควบคุมระบบสำหรับผู้ดูแลระบบพร้อมเมนูแถบข้าง (Sidebar) ประกอบด้วย:
  * ระบบตรวจสอบและอนุมัติผู้สมัครทีมแข่ง (Pending, Approved, Waitlisted, Rejected)
  * ระบบจัดกลุ่มแข่งขันแบบไดนามิก (Dynamic Group Assignment) สามารถสร้างกลุ่มแข่งขันให้อัตโนมัติหรือแก้ไขเอง
  * ส่วนแก้ไข URL ของสตรีมสดการแข่งขัน
  * ส่วนจัดการคะแนนการแข่งขัน (Match Controller) สำหรับกรอกคะแนนและควบคุมการเข้ารอบของแต่ละทีม
  * ระบบจำลองเหตุการณ์ในการแข่งสด (Live Match Event Log) สำหรับลงบันทึกการกระทำในเกม

---

## เทคโนโลยีที่ใช้งาน (Technology Stack)

* **ส่วนติดต่อผู้ใช้งาน (Frontend):** Next.js (React), Tailwind CSS
* **การจัดการฐานข้อมูล (Database):** Prisma ORM, TiDB Cloud (MySQL Serverless Cluster)

---

## Screenshots

### 1. หน้าแรกการแข่งขัน ROV: Arena of Valor
![ROV Tournament Page](https://github.com/Makigigu/e-sport/assets/1/screenshot-1-rov-tournament.png)

หน้าแสดงรายละเอียดการแข่งขัน ROV: Arena of Valor พร้อมแท็บการเลือกเกม (Free Fire, PUBG Mobile, Valorant) และแสดงสตรีมสดพร้อมเลือกรอบการแข่งขัน

### 2. หน้าแรกหลัก (Main Landing Page)
![Main Landing Page](https://github.com/Makigigu/e-sport/assets/2/screenshot-2-main-landing.png)

หน้าแรกหลักของระบบแสดงชื่อระบบ "E-SPORTS TOURNAMENT MANAGEMENT SYSTEM" พร้อมปุ่มเข้าสู่ศูนย์กลาง E-Sports Live Hub และปุ่มลงทะเบียนสมัครแข่ง

### 3. หน้าลงทะเบียนทีมแข่ง (Team Registration Form)
![Team Registration Form](https://github.com/Makigigu/e-sport/assets/3/screenshot-3-team-registration.png)

แบบฟอร์มลงทะเบียนทีมแข่งพร้อมเลือกเกม ระดับชั้น ชื่อทีม และข้อมูลผู้เล่น โดยมีการตรวจสอบข้อมูลแบบ Real-time

### 4. หน้าแสดงรายการเกมการแข่งขัน (Game Tournament List)
![Game Tournament List](https://github.com/Makigigu/e-sport/assets/4/screenshot-4-tournament-list.png)

แสดงรายการเกมการแข่งขัน 3 เกม ได้แก่ ROV (Arena of Valor), Valorant และ League of Legends พร้อมรายละเอียด ราคารางวัล วันแข่งขัน และปุ่มเพิ่มเติม

### 5. หน้าแดชบอร์ดแอดมิน - ส่วนตรวจสอบการสมัคร
![Admin Dashboard - Registration](https://github.com/Makigigu/e-sport/assets/5/screenshot-5-admin-dashboard-registration.png)

แสดงแดชบอร์ดสำหรับผู้ดูแลระบบในการตรวจสอบและอนุมัติการสมัครของทีมแข่ง

### 6. หน้าแดชบอร์ดแอดมิน - ส่วนจัดการคะแนน
![Admin Dashboard - Match Management](https://github.com/Makigigu/e-sport/assets/6/screenshot-6-admin-dashboard-match.png)

ส่วนจัดการคะแนนการแข่งขันและควบคุมรอบการแข่งขันของแต่ละทีม

### 7. หน้าแดชบอร์ดแอดมิน - ส่วนจัดการเกมสด
![Admin Dashboard - Live Game Management](https://github.com/Makigigu/e-sport/assets/7/screenshot-7-admin-dashboard-live.png)

ส่วนสำหรับจัดการเหตุการณ์ในการแข่งสด (Live Match Event Log) และตั้งค่าสตรีมการแข่งขัน

---

## การเตรียมระบบฐานข้อมูล (Database Setup)

1. คัดลอกและตั้งค่า URL การเชื่อมต่อฐานข้อมูล TiDB Cloud ในไฟล์ `.env` ที่อยู่ในโฟลเดอร์รูทของโปรเจกต์:

   ```env
   DATABASE_URL="mysql://username:password@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/dbname?sslaccept=strict"
   ```

2. อัปเดตโครงสร้างฐานข้อมูลและตารางเข้าสู่ TiDB Cloud ด้วยคำสั่ง:

   ```bash
   npx prisma db push
   ```

---

## วิธีการรันโปรเจกต์ (Getting Started)

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
