# 02-grades – Aggregation על ציונים 📊

## הרצה
```
npm install
npm run dev
```
צריך לראות: `MongoDB connected`  (הכתובת של המסד נמצאת ב-`.env`)

## הכנסת נתונים
- דרך Postman: לייבא את `02-grades.postman_collection.json` ולהריץ את 10 בקשות ה-POST
- או בפקודה אחת: `npm run seed` (מוחק ומכניס מחדש את 10 הציונים)

## Routes
| Method | כתובת | תוצאה |
|---|---|---|
| POST | /grades | הוספת ציון |
| GET | /grades | כל הציונים |
| GET | /grades/average | 71 |
| GET | /grades/average-by-class | A: 68, B: 74 |
| GET | /grades/passed | 7 ציונים |
| GET | /grades/top-subjects | Math 75, History 70, English 67.5 |
| GET | /grades/failed-by-class | A: 2, B: 1 |
| GET | /grades/max-by-subject | Math 100, English 85, History 95 |
