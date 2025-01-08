const http = require("http"); //חיבור לספריי האינטרנט המובנית
const app = require("./app"); //חיבור לאפליקציה שנבנה שתבוסס על אקספרס
const ser = http.createServer(app); //יצירת שרת שינוהל על ידי לאפליקציה שנבנה בתןך אפ
const port = process.env.PORT || 5656; // הגדרת כתובת הפורט לה יאזין השרת
ser.listen(port, () => {
  console.log("server is up");
});
