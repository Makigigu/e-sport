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

หน้าแสดงรายละเอียดการแข่งขัน ROV: Arena of Valor พร้อมแท็บการเลือกเกม (Free Fire, PUBG Mobile, Valorant) และแสดงสตรีมสดพร้อมเลือกรอบการแข่งขัน

### 2. หน้าแรกหลัก (Main Landing Page)

หน้าแรกหลักของระบบแสดงชื่อระบบ "E-SPORTS TOURNAMENT MANAGEMENT SYSTEM" พร้อมปุ่มเข้าสู่ศูนย์กลาง E-Sports Live Hub และปุ่มลงทะเบียนสมัครแข่ง

### 3. หน้าลงทะเบียนทีมแข่ง (Team Registration Form)

แบบฟอร์มลงทะเบียนทีมแข่งพร้อมเลือกเกม ระดับชั้น ชื่อทีม และข้อมูลผู้เล่น โดยมีการตรวจสอบข้อมูลแบบ Real-time

### 4. หน้าแสดงรายการเกมการแข่งขัน (Game Tournament List)

แสดงรายการเกมการแข่งขัน 3 เกม ได้แก่ ROV (Arena of Valor), Valorant และ League of Legends พร้อมรายละเอียด ราคารางวัล วันแข่งขัน และปุ่มเพิ่มเติม

### 5. หน้าแดชบอร์ดแอดมิน - ส่วนจัดการสตรีมสดและควบคุมแมตช์

ส่วนจัดการ URL สตรีมสด YouTube และระบบควบคุมคะแนนการแข่งขันแบบ Real-time ระหว่างสองทีม พร้อมแสดงบันทึกเหตุการณ์ในเกม

**ฟีเจอร์:**
- ตั้งค่า Live Stream URL จาก YouTube
- Live Match Controller แสดงคะแนนสดระหว่างสองทีม (Blue Side vs Red Side)
- ระบบบันทึกเหตุการณ์เกมสด (Game Event Log)
- ปุ่มเริ่มแข่งขันและควบคุมสถานะการแข่ง

### 6. หน้าแดชบอร์ดแอดมิน - ส่วนตรวจสอบรายชื่อผู้เล่นทีมแข่ง

แสดงรายการทีมแข่งที่ลงทะเบียนพร้อมข้อมูลผู้เล่นครบถ้วน

**ข้อมูลที่แสดง:**
- ชื่อและแท็บของทีม (Bacon E-Sports Junior, Buriram United Kids, Talon Esports Academy, Hydra Esport Rookies)
- โรงเรียน/องค์กรที่จัดตั้ง
- รายชื่อผู้เล่น 5 คนตัวจริง + 1 สำรอง พร้อมรหัสประจำตัวเกม
- ปุ่มดู/แก้ไข/ลบข้อมูลทีม
- ปุ่มดาวน์โหลดข้อมูลเป็น CSV

### 7. หน้าแดชบอร์ดแอดมิน - ส่วนจัดกลุ่มแข่งขัน (Group Assignment & Bracket Manager)

ระบบจัดกลุ่มแข่งขันแบบไดนามิก แสดง 4 กลุ่มพร้อมอัตราส่วนชัยบ่ายชาติ (Win-Draw-Points)

**รายละเอียด:**
- **Group A**: Bacon E-Sports Junior, Buriram United Kids, King of Gamers Club
- **Group B**: Talon Esports Academy, Hydra Esport Rookies, Goldcity Esports
- **Group C**: ศรีพรรษา, School Esports Stars
- **Group D**: สำรรพรัก, Elementary Elite

**ฟีเจอร์:**
- แสดงชัยชนะ (Win), เสมอ (Draw) และคะแนน (Points) สำหรับแต่ละทีม
- ปุ่มเพิ่มทีมลงในกลุ่ม
- ปุ่มลบกลุ่มหรือแก้ไขอัตราส่วน

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
