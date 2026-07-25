import { useState } from "react";
import {
  Nfc, ShieldCheck, Users, GraduationCap, BookOpen, Wallet, Megaphone,
  User, ScanLine, Bell, LogOut, CreditCard, CheckCircle2,
  Clock, Package, Send, Radio, ChevronRight, X, FileText, AlertCircle,
  DoorOpen, Utensils, Home, MessageCircle, ClipboardList, CalendarDays, Activity
} from "lucide-react";


/* ---------------------------------- seed data ---------------------------------- */


const MONTHS = ["Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar"];
const WORKING_DAYS = [22,20,21,23,20,22,21,19,20,22,20,23];


const SEED_STUDENTS = [
  { id: "S1", name: "Arpan Bhattarai", roll: "12A-01", cls: "12", sec: "A1", nfc: "NFC-10021", guardian: "Deepak Bhattarai", wallet: 450,
    attendance: [22,19,21,23,18,20,21,17,19,21,20,0], today: "not-marked", inTime: null, outTime: null,
    fees: { tuition: "paid", transport: "pending", exam: "paid" }, feeBalance: 1800 },
  { id: "S2", name: "Anupam Dhakal", roll: "12A-02", cls: "12", sec: "A", nfc: "NFC-10022", guardian: "Yogesh Dhakal", wallet: 620,
    attendance: [21,20,21,22,19,21,20,18,20,22,19,0], today: "not-marked", inTime: null, outTime: null,
    fees: { tuition: "paid", transport: "paid", exam: "pending" }, feeBalance: 900 },
  { id: "S3", name: "Ashim Katuwal", roll: "12A1-14", cls: "12", sec: "A1", nfc: "NFC-10023", guardian: "Tul Katuwal", wallet: 210,
    attendance: [20,18,19,21,17,19,18,16,18,20,18,0], today: "not-marked", inTime: null, outTime: null,
    fees: { tuition: "pending", transport: "pending", exam: "paid" }, feeBalance: 4200 },
  { id: "S4", name: "Anjila Basyal", roll: "12A1-05", cls: "12", sec: "A1", nfc: "NFC-10024", guardian: "Ramesh Basyal", wallet: 800,
    attendance: [23,21,22,23,20,22,22,19,21,23,21,0], today: "not-marked", inTime: null, outTime: null,
    fees: { tuition: "paid", transport: "paid", exam: "paid" }, feeBalance: 0 },
     { id: "S5", name: "Rochak Pandey", roll: "10A-07", cls: "12", sec: "A1", nfc: "NFC-10025", guardian: "Rajan Pandey", wallet: 450,
    attendance: [22,19,21,23,18,20,21,17,19,21,20,0], today: "not-marked", inTime: null, outTime: null,
    fees: { tuition: "paid", transport: "pending", exam: "paid" }, feeBalance: 1800 },
  { id: "S6", name: "Anup Thapa", roll: "12A1-03", cls: "12", sec: "A1", nfc: "NFC-10026", guardian: "Rajaram Thapa", wallet: 620,
    attendance: [21,20,21,22,19,21,20,18,20,22,19,0], today: "not-marked", inTime: null, outTime: null,
    fees: { tuition: "paid", transport: "paid", exam: "pending" }, feeBalance: 900 },
  { id: "S7", name: "Agrim Gautam", roll: "12A1-19", cls: "12", sec: "A1", nfc: "NFC-10027", guardian: "Buddha Gautam", wallet: 210,
    attendance: [20,18,19,21,17,19,18,16,18,20,18,0], today: "not-marked", inTime: null, outTime: null,
    fees: { tuition: "pending", transport: "pending", exam: "paid" }, feeBalance: 4200 },
  { id: "S8", name: "Sushant Pandey", roll: "12A1-15", cls: "12", sec: "A1", nfc: "NFC-10028", guardian: "Apshara Pandey", wallet: 800,
    attendance: [23,21,22,23,20,22,22,19,21,23,21,0], today: "not-marked", inTime: null, outTime: null,
    fees: { tuition: "paid", transport: "paid", exam: "paid" }, feeBalance: 0 },
];


const SEED_BOOKS = [
  { id: "B1", title: "Fundamentals of Physics", author: "D. Halliday", copies: 6, issued: 2 },
  { id: "B2", title: "A Tale of Two Cities", author: "C. Dickens", copies: 4, issued: 1 },
  { id: "B3", title: "Discrete Mathematics", author: "K. Rosen", copies: 5, issued: 3 },
  { id: "B4", title: "Wings of Fire", author: "A.P.J. Abdul Kalam", copies: 8, issued: 4 },
  { id: "B5", title: "Fundamentals of Chemistry", author: "P. Bahadur", copies: 6, issued: 2 },
  { id: "B6", title: "Seto Dharti", author: "Amar Neupane", copies: 4, issued: 1 },
  { id: "B7", title: "Pride and Prejudice", author: "Jane Austen", copies: 5, issued: 3 },
  { id: "B8", title: "The Great Gatsby", author: "F. Scott Fitzgerald", copies: 8, issued: 4 },
];


const SEED_TEACHERS = [
  { id: "T1", name: "Narendra Luitel", subject: "Mathematics", class: "10A" },
  { id: "T2", name: "Mahesh Nepal", subject: "Science", class: "10B" },
  { id: "T3", name: "Rajendra Neupane", subject: "English", class: "9A" },
  { id: "T4", name: "Mukesh Guragain", subject: "History", class: "12A" },
  { id: "T5", name: "Umesh Chandra Adhikari", subject: "Nepali", class: "11B" },
  { id: "T6", name: "Raja Ram Thapa", subject: "Computer", class: "9C" },
];

const SEED_STAFF = [
  { id: "ST1", name: "Maya Gurung", role: "Canteen Manager", shift: "Morning" },
  { id: "ST2", name: "Kiran Thapa", role: "Cashier", shift: "Afternoon" },
  { id: "ST3", name: "Sita Rana", role: "Kitchen Staff", shift: "Morning" },
  { id: "ST4", name: "Niraj Shrestha", role: "Inventory Coordinator", shift: "Afternoon" },
];

const SEED_PARENTS = [
  { id: "P1", name: "Deepak Bhattarai", studentName: "Arpan Bhattarai", contact: "9841234567" },
  { id: "P2", name: "Yogesh Dhakal", studentName: "Anupam Dhakal", contact: "9841234568" },
  { id: "P3", name: "Tul Katuwal", studentName: "Ashim Katuwal", contact: "9841234569" },
  { id: "P4", name: "Ramesh Basyal", studentName: "Anjila Basyal", contact: "9841234570" },
];


const READERS = [
  { id: "R1", name: "Main Gate", location: "Entrance", action: "gate", icon: DoorOpen },
  { id: "R2", name: "Library Desk", location: "Library", action: "library", icon: BookOpen },
  { id: "R3", name: "Canteen Counter", location: "Canteen", action: "canteen", icon: Utensils },
];


const CANTEEN_ITEMS = [
  { item: "Veg Thali", price: 60 }, { item: "Samosa", price: 25 }, { item: "Milkshake", price: 40 },
  { item: "Non-Veg Thali", price: 70 }, { item: "Samosa Chat", price: 45 }, { item: "Chocolate Milkshake", price: 50 },
];


const ROLES = [
  { key: "admin", label: "Admin", icon: ShieldCheck },
  { key: "teacher", label: "Teacher", icon: GraduationCap },
  { key: "student", label: "Student", icon: User },
  { key: "parent", label: "Parent", icon: Users },
  { key: "librarian", label: "Librarian", icon: BookOpen },
  { key: "canteen", label: "Canteen", icon: Utensils },
];


const NAV = {
  admin: ["Overview", "NFC Simulator", "Students", "Announcements", "Reports", "Settings", "Canteen Logs", "Incidents"],
  teacher: ["Overview", "Homework", "Messages", "Attendance", "Grades", "Class Records", "Incidents"],
  student: ["Overview", "Attendance", "Library", "Fees", "Digital ID", "Grades", "Announcements","Help"],
  parent: ["Overview", "NFC Activity", "Fees", "Messages", "Announcements"],
  librarian: ["Overview", "Issue / Return", "Catalog", "Members", "Reports", "Settings"],
  canteen: ["Overview", "Menu", "Sales", "Staff", "Reports"],
};


let idCounter = 1000;
const nextId = (p) => `${p}${idCounter++}`;
const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });


/* ---------------------------------- small ui bits ---------------------------------- */


function StatCard({ icon: Icon, label, value, tint }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tint}`}>
        <Icon className="w-5 h-5 text-neutral-950" />
      </div>
      <div>
        <p className="text-neutral-500 text-xs">{label}</p>
        <p className="text-neutral-100 text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}


function SectionTitle({ children }) {
  return <h2 className="text-neutral-200 font-semibold text-sm tracking-wide uppercase mb-3">{children}</h2>;
}


function Card({ children, className = "" }) {
  return <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-4 ${className}`}>{children}</div>;
}


function Pill({ text, tone = "neutral" }) {
  const tones = {
    neutral: "bg-neutral-800 text-neutral-300",
    good: "bg-emerald-500 text-emerald-950",
    warn: "bg-amber-500 text-amber-950",
    info: "bg-cyan-500 text-cyan-950",
  };
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${tones[tone]}`}>{text}</span>;
}


function Button({ children, onClick, variant = "primary", className = "", disabled }) {
  const variants = {
    primary: "bg-cyan-400 text-neutral-950 hover:bg-cyan-300",
    ghost: "bg-neutral-800 text-neutral-200 hover:bg-neutral-700",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 rounded-xl text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}


/* ---------------------------------- NFC card visual (signature element) ---------------------------------- */


function NfcCard({ student, pulsing }) {
  return (
    <div className="relative">
      <div className="w-72 h-44 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-950 border border-neutral-700 p-4 flex flex-col justify-between shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-neutral-400 text-xs tracking-widest uppercase">College ID</span>
          <div className="relative">
            <Nfc className="w-6 h-6 text-cyan-400" />
            {pulsing && <span className="scan-ring" />}
          </div>
        </div>
        <div>
          <p className="text-neutral-100 font-semibold text-base">{student?.name || "—"}</p>
          <p className="text-neutral-500 text-xs">{student ? `${student.roll} · Class ${student.cls}-${student.sec}` : ""}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-500 text-xs font-mono">{student?.nfc || "NFC-000000"}</span>
          <span className="text-neutral-600 text-xs">TAP TO ACT</span>
        </div>
      </div>
    </div>
  );
}


/* ---------------------------------- app ---------------------------------- */


export default function App() {
  const [role, setRole] = useState(null);
  const [activeStudentId, setActiveStudentId] = useState("S1");
  const [nav, setNav] = useState("Overview");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginRole, setLoginRole] = useState("admin");
  const [isLoggingIn, setIsLoggingIn] = useState(false);


  const [students, setStudents] = useState(SEED_STUDENTS);
  const [books, setBooks] = useState(SEED_BOOKS);
  const [libraryRecords, setLibraryRecords] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [scanLogs, setScanLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [homework, setHomework] = useState([
    { id: "H1", cls: "10A", subject: "Mathematics", title: "Quadratic Equations Worksheet", due: "28 Jul", status: "Posted" },
    { id: "H2", cls: "10A", subject: "Mathematics", title: "Trigonometry Practice Set", due: "31 Jul", status: "Posted" },
  ]);
  const [announcements, setAnnouncements] = useState([]);
  const [messages, setMessages] = useState([]);
  const [incidentReports, setIncidentReports] = useState([]);
  const [reportOpen, setReportOpen] = useState(false);
  const [pulseReader, setPulseReader] = useState(null);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);


  const activeStudent = students.find((s) => s.id === activeStudentId);
  const monthIdx = 0;


  const pushNotification = (n) => setNotifications((prev) => [{ id: nextId("N"), time: now(), ...n }, ...prev]);
  const pushLog = (l) => setScanLogs((prev) => [{ id: nextId("L"), time: now(), ...l }, ...prev]);
  const updateStudent = (id, patch) => setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const payFee = (studentId, type) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return;
    const amount = FEE_AMOUNTS[type] || 0;
    if (student.wallet < amount) {
      pushLog({ studentId, reader: "Fee Desk", action: `Failed fee payment for ${type} — insufficient wallet balance` });
      pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} tried to pay ${type} fee of Rs.${amount} but had only Rs.${student.wallet} in wallet.` });
      return;
    }
    const newWallet = student.wallet - amount;
    const newFeeBalance = Math.max(0, student.feeBalance - amount);
    updateStudent(studentId, {
      fees: { ...student.fees, [type]: "paid" },
      wallet: newWallet,
      feeBalance: newFeeBalance,
    });
    pushLog({ studentId, reader: "Fee Desk", action: `Paid ${type} fee of Rs.${amount}` });
    pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} paid Rs.${amount} towards ${type} fee. Wallet balance: Rs.${newWallet}.` });
  };

  const sellItem = (studentId, itemName) => {
    const student = students.find((s) => s.id === studentId);
    const item = CANTEEN_ITEMS.find((i) => i.item === itemName);
    if (!student || !item) return false;
    if (student.wallet < item.price) {
      pushLog({ studentId, reader: "Canteen Counter", action: `Sale failed for ${item.item} — insufficient funds` });
      pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} attempted to purchase ${item.item} for Rs.${item.price} but had only Rs.${student.wallet}.` });
      return false;
    }
    const newWallet = student.wallet - item.price;
    updateStudent(studentId, { wallet: newWallet });
    setTransactions((prev) => [
      { id: nextId("T"), studentId, item: item.item, price: item.price, time: now(), place: "Canteen Counter" },
      ...prev,
    ]);
    pushLog({ studentId, reader: "Canteen Counter", action: `Sold ${item.item} for Rs.${item.price}` });
    pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} purchased ${item.item} for Rs.${item.price}. Wallet balance: Rs.${newWallet}.` });
    return true;
  };

  /* ---------------- incident reporting (students only) ---------------- */
  const submitIncidentReport = (studentId, title, description, anonymous) => {
    const student = students.find((s) => s.id === studentId);
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    if (!student || !cleanTitle || !cleanDescription) return;

    setIncidentReports((prev) => [
      {
        id: nextId("IR"),
        studentId,
        studentName: student.name,
        title: cleanTitle,
        description: cleanDescription,
        anonymous,
        time: now(),
      },
      ...prev,
    ]);

    pushNotification({
      audience: "staff",
      studentId: null,
      text: anonymous
        ? `New anonymous incident report: "${cleanTitle}"`
        : `New incident report from ${student.name}: "${cleanTitle}"`,
    });
  };


  /* ---------------- core NFC engine ---------------- */
  function simulateScan(studentId, readerId) {
    const student = students.find((s) => s.id === studentId);
    const reader = READERS.find((r) => r.id === readerId);
    if (!student || !reader) return;


    setPulseReader(readerId);
    setTimeout(() => setPulseReader(null), 900);


    switch (reader.action) {
      case "gate": {
        if (!student.inTime || (student.inTime && student.outTime)) {
          const t = now();
          const newAttendance = [...student.attendance];
          if (!student.inTime) newAttendance[monthIdx] = Math.min(newAttendance[monthIdx] + 1, WORKING_DAYS[monthIdx]);
          updateStudent(studentId, { today: "present", inTime: t, outTime: null, attendance: newAttendance });
          pushLog({ studentId, reader: reader.name, action: "Checked IN" });
          pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} arrived at school at ${t} (Main Gate scan).` });
        } else {
          const t = now();
          updateStudent(studentId, { outTime: t });
          pushLog({ studentId, reader: reader.name, action: "Checked OUT" });
          pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} left school at ${t} (Main Gate scan).` });
        }
        break;
      }
      case "classroom": {
        pushLog({ studentId, reader: reader.name, action: "Subject attendance marked (Mathematics, Period 3)" });
        pushNotification({ audience: "parent-nfc", studentId, text: `${student.name}'s subject attendance marked in Class ${student.cls}${student.sec}.` });
        break;
      }
      case "library": {
        const activeRecord = libraryRecords.find((r) => r.studentId === studentId && !r.returned);
        if (activeRecord) {
          setLibraryRecords((prev) => prev.map((r) => (r.id === activeRecord.id ? { ...r, returned: true } : r)));
          setBooks((prev) => prev.map((b) => (b.id === activeRecord.bookId ? { ...b, issued: Math.max(0, b.issued - 1) } : b)));
          const book = books.find((b) => b.id === activeRecord.bookId);
          pushLog({ studentId, reader: reader.name, action: `Returned "${book?.title}"` });
          pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} returned "${book?.title}" to the library.` });
        } else {
          const available = books.find((b) => b.issued < b.copies);
          if (available) {
            setBooks((prev) => prev.map((b) => (b.id === available.id ? { ...b, issued: b.issued + 1 } : b)));
            setLibraryRecords((prev) => [
              { id: nextId("LR"), studentId, bookId: available.id, issued: new Date().toLocaleDateString(), returned: false },
              ...prev,
            ]);
            pushLog({ studentId, reader: reader.name, action: `Issued "${available.title}"` });
            pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} borrowed "${available.title}" from the library.` });
          } else {
            pushLog({ studentId, reader: reader.name, action: "No copies available to issue" });
          }
        }
        break;
      }
      case "canteen": {
        const pick = CANTEEN_ITEMS[Math.floor(Math.random() * CANTEEN_ITEMS.length)];
        if (student.wallet >= pick.price) {
          const newWallet = student.wallet - pick.price;
          updateStudent(studentId, { wallet: newWallet });
          setTransactions((prev) => [
            { id: nextId("T"), studentId, item: pick.item, price: pick.price, time: now(), place: reader.name },
            ...prev,
          ]);
          pushLog({ studentId, reader: reader.name, action: `Purchased ${pick.item} (Rs.${pick.price})` });
          pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} purchased ${pick.item} for Rs.${pick.price} at ${reader.name}. Wallet balance: Rs.${newWallet}.` });
        } else {
          pushLog({ studentId, reader: reader.name, action: `Transaction failed for ${pick.item} - Insufficient funds` });
          pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} attempted to purchase ${pick.item} for Rs.${pick.price} but has insufficient wallet balance (Rs.${student.wallet}).` });
        }
        break;
      }
      default:
        pushLog({ studentId, reader: reader.name, action: "Scan recorded" });
    }
  }


  /* ---------------- login ---------------- */
  if (!role) {
    // Build simple login users: one account per student and one parent account per student.
    // Username = student's first name (lowercase), parent username = firstname + "_parent". Password for all is '1234'.
    const staffUsers = [
      { username: "admin", password: "1234", role: "admin" },
      { username: "teacher", password: "1234", role: "teacher" },
      { username: "canteen", password: "1234", role: "canteen" },
      { username: "librarian", password: "1234", role: "librarian" },
    ];

    const studentUsers = (students || []).map((s) => {
      const first = (s.name || "").split(" ")[0].toLowerCase();
      return { username: first, password: "1234", role: "student", studentId: s.id };
    });

    const parentUsers = (students || []).map((s) => {
      const first = (s.name || "").split(" ")[0].toLowerCase();
      return { username: `${first}_parent`, password: "1234", role: "parent", studentId: s.id };
    });

    const loginUsers = [...staffUsers, ...studentUsers, ...parentUsers];

    const handleLogin = () => {
      if (isLoggingIn) return;
      setLoginError("");
      setIsLoggingIn(true);
      const usernameSnapshot = username;
      const passwordSnapshot = password;

      setTimeout(() => {
        const user = loginUsers.find((u) => u.username === usernameSnapshot && u.password === passwordSnapshot);
        if (!user) {
          setLoginError("Invalid username or password.");
          setIsLoggingIn(false);
          return;
        }
        setRole(user.role);
        setNav("Overview");
        if (user.studentId) setActiveStudentId(user.studentId);
        setLoginError("");
        setIsLoggingIn(false);
      }, 2000);
    };

    if (isLoggingIn) {
      return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
          <style>{customCss}</style>
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-10 text-center max-w-md w-full">
            <div className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
            <h2 className="text-neutral-100 text-2xl font-semibold mb-2">Signing in</h2>
            <p className="text-neutral-500">Preparing your dashboard. Hang tight for a moment.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
        <style>{customCss}</style>
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="flex items-center gap-2">
              <Nfc className="w-7 h-7 text-cyan-400" />
              <span className="text-neutral-100 font-semibold tracking-tight text-lg">FSS TAP</span>
            </div>
            <h1 className="text-neutral-100 text-3xl font-semibold leading-tight text-center md:text-left">
              Welcome back.<br />Sign in to continue.
            </h1>
            <p className="text-neutral-500 text-sm max-w-sm text-center md:text-left">
              Enter your school credentials and access dashboards for attendance, library, canteen, and more.
            </p>
            <NfcCard student={activeStudent} pulsing={true} />
          </div>

          <Card className="w-full">
            <SectionTitle>Sign in</SectionTitle>
            <p className="text-neutral-500 text-xs mb-4">Use your username and password to access the dashboard.</p>
            <div className="space-y-4">
              <div className="space-y-1 text-sm">
                <label className="text-neutral-400">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-3 py-2 text-neutral-100 placeholder:text-neutral-500"
                  placeholder="admin"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="text-neutral-400">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl px-3 py-2 text-neutral-100 placeholder:text-neutral-500"
                  placeholder="••••••••"
                />
              </div>
              {loginError && <p className="text-rose-400 text-sm">{loginError}</p>}
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className={`w-full bg-cyan-400 text-neutral-950 rounded-2xl px-3 py-3 text-sm font-semibold transition hover:bg-cyan-300 ${isLoggingIn ? "cursor-not-allowed opacity-70" : ""}`}
              >
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }


  const RoleIcon = ROLES.find((r) => r.key === role)?.icon || User;
  const myNotifications = notifications.filter((n) => {
    if (role === "parent" || role === "student") {
      return (n.audience === "broadcast") || (n.audience === "parent-nfc" && n.studentId === activeStudentId);
    }
    if (role === "admin" || role === "teacher") {
      return n.audience === "staff";
    }
    return false;
  });

  const handleSignOutClick = () => {
    setShowSignOutModal(true);
  };

  const handleConfirmSignOut = () => {
    setShowSignOutModal(false);
    setIsSigningOut(true);
    setTimeout(() => {
      setRole(null);
      setNav("Overview");
      setUsername("");
      setPassword("");
      setLoginError("");
      setIsLoggingIn(false);
      setIsSigningOut(false);
      setShowSignOutModal(false);
    }, 2000);
  };


  return (
    <div className="min-h-screen bg-neutral-950 flex text-neutral-200">
      <style>{customCss}</style>

      {showSignOutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-sm rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-100">Sign out?</h3>
              <button
                onClick={() => setShowSignOutModal(false)}
                className="rounded-full p-1 text-neutral-500 transition hover:bg-neutral-800 hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-3 text-sm text-neutral-400">
              Are you sure you want to sign out of your dashboard?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="rounded-xl border border-neutral-700 px-3 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSignOut}
                className="rounded-xl bg-cyan-400 px-3 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-cyan-300"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {isSigningOut && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4">
          <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900 p-10 text-center shadow-2xl">
            <div className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
            <h2 className="text-neutral-100 text-2xl font-semibold mb-2">Signing out</h2>
            <p className="text-neutral-500">Logging you out and returning you to the home page.</p>
          </div>
        </div>
      )}

      <aside className="w-56 border-r border-neutral-800 flex flex-col p-4 gap-6 shrink-0">
        <div className="flex items-center gap-2 px-1">
          <Nfc className="w-6 h-6 text-cyan-400" />
          <span className="font-semibold text-neutral-100">FSS TAP</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV[role].map((n) => (
            <button
              key={n}
              onClick={() => setNav(n)}
              className={`text-left px-3 py-2 rounded-xl text-sm transition flex items-center justify-between ${
                nav === n ? "bg-neutral-800 text-neutral-50" : "text-neutral-400 hover:bg-neutral-900"
              }`}
            >
              {n}
              {nav === n && <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2">
          {(role === "student" || role === "parent") && (
            <select
              value={activeStudentId}
              onChange={(e) => setActiveStudentId(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-2 py-2 text-xs text-neutral-300"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>{role === "parent" ? `Child: ${s.name}` : s.name}</option>
              ))}
            </select>
          )}
          <button
            onClick={handleSignOutClick}
            className="flex items-center gap-2 text-neutral-500 hover:text-neutral-200 text-xs px-3 py-2"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </aside>


      <main className="flex-1 flex flex-col">
        <header className="border-b border-neutral-800 px-6 py-3 flex items-center justify-between">
          <div>
            <p className="text-neutral-500 text-xs">{ROLES.find((r) => r.key === role)?.label} Dashboard</p>
            <h1 className="text-neutral-100 font-semibold">{nav}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-neutral-400" />
              {myNotifications.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full" />}
            </div>
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center">
              <RoleIcon className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
        </header>


        <div className="p-6 flex-1 overflow-y-auto">
          {role === "admin" && (
            <AdminViews
              nav={nav} students={students} scanLogs={scanLogs} books={books}
              readers={READERS} simulateScan={simulateScan} pulseReader={pulseReader}
              announcements={announcements}
              incidentReports={incidentReports}
              onSend={(text) => {
                setAnnouncements((prev) => [{ id: nextId("A"), text, time: now() }, ...prev]);
                pushNotification({ audience: "broadcast", studentId: null, text: `Announcement: ${text}` });
              }}
            />
          )}
          {role === "teacher" && (
            <TeacherViews
              nav={nav} homework={homework}
              onPush={(id) => {
                setHomework((prev) => prev.map((h) => (h.id === id ? { ...h, status: `Updated ${now()}` } : h)));
                pushNotification({ audience: "broadcast", studentId: null, text: `Homework updated by teacher — check the latest assignment.` });
              }}
              messages={messages}
              onSendMessage={(text) => setMessages((prev) => [{ id: nextId("M"), studentId: activeStudentId, from: "Teacher", text, time: now() }, ...prev])}
              students={students}
              incidentReports={incidentReports}
            />
          )}
          {role === "student" && (
            <StudentViews
              nav={nav} student={activeStudent} libraryRecords={libraryRecords} books={books}
              onPayFee={(type) => updateStudent(activeStudentId, { fees: { ...activeStudent.fees, [type]: "paid" } })}
              transactions={transactions.filter((t) => t.studentId === activeStudentId)}
              notifications={myNotifications}
              incidentReports={incidentReports.filter((r) => r.studentId === activeStudentId)}
              onSubmitReport={(title, description, anonymous) => submitIncidentReport(activeStudentId, title, description, anonymous)}
            />
          )}
          {role === "parent" && (
            <ParentViews
              nav={nav} student={activeStudent} notifications={myNotifications}
              scanLogs={scanLogs.filter((l) => l.studentId === activeStudentId)}
              messages={messages.filter((m) => m.studentId === activeStudentId)}
              onSendMessage={(text) => setMessages((prev) => [{ id: nextId("M"), studentId: activeStudentId, from: "Parent", text, time: now() }, ...prev])}
              onPayFee={(type) => updateStudent(activeStudentId, { fees: { ...activeStudent.fees, [type]: "paid" } })}
              reportOpen={reportOpen} setReportOpen={setReportOpen}
            />
          )}
          {role === "librarian" && (
            <LibrarianViews
              nav={nav} students={students} books={books} libraryRecords={libraryRecords}
              onIssue={(studentId, bookId) => {
                setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, issued: b.issued + 1 } : b)));
                setLibraryRecords((prev) => [{ id: nextId("LR"), studentId, bookId, issued: new Date().toLocaleDateString(), returned: false }, ...prev]);
                const book = books.find((b) => b.id === bookId);
                pushNotification({ audience: "parent-nfc", studentId, text: `${students.find((s) => s.id === studentId)?.name} borrowed "${book?.title}" from the library.` });
              }}
              onReturn={(recordId, bookId, studentId) => {
                setLibraryRecords((prev) => prev.map((r) => (r.id === recordId ? { ...r, returned: true } : r)));
                setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, issued: Math.max(0, b.issued - 1) } : b)));
                const book = books.find((b) => b.id === bookId);
                pushNotification({ audience: "parent-nfc", studentId, text: `${students.find((s) => s.id === studentId)?.name} returned "${book?.title}" to the library.` });
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}


/* ---------------------------------- Admin ---------------------------------- */


function AdminViews({ nav, students, scanLogs, books, readers, simulateScan, pulseReader, announcements, onSend, incidentReports }) {
  const [selStudent, setSelStudent] = useState(students[0].id);
  const [selReader, setSelReader] = useState(readers[0].id);
  const [text, setText] = useState("");


  const todayPresent = students.filter((s) => s.today === "present").length;
  const pendingFees = students.reduce((acc, s) => acc + Object.values(s.fees).filter((v) => v === "pending").length, 0);
  const booksIssued = books.reduce((a, b) => a + b.issued, 0);


  if (nav === "Overview") {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Students" value={students.length} tint="bg-cyan-400" />
          <StatCard icon={CheckCircle2} label="Present Today" value={todayPresent} tint="bg-emerald-400" />
          <StatCard icon={AlertCircle} label="Fees Pending" value={pendingFees} tint="bg-amber-400" />
          <StatCard icon={BookOpen} label="Books Issued" value={booksIssued} tint="bg-violet-400" />
        </div>
        <Card>
          <SectionTitle>Recent Scan Feed</SectionTitle>
          <ScanFeed logs={scanLogs} students={students} />
        </Card>
      </div>
    );
  }


  if (nav === "NFC Simulator") {
    const reader = readers.find((r) => r.id === selReader);
    const student = students.find((s) => s.id === selStudent);
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <SectionTitle>Simulate a Tap</SectionTitle>
          <p className="text-neutral-500 text-xs mb-4">No physical hardware yet — pick a card and a reader, then tap. Every module reacts live.</p>
          <div className="flex flex-col gap-3">
            <label className="text-xs text-neutral-500">Student card</label>
            <select value={selStudent} onChange={(e) => setSelStudent(e.target.value)} className="bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 text-sm">
              {students.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.nfc}</option>)}
            </select>
            <label className="text-xs text-neutral-500 mt-2">Reader location</label>
            <select value={selReader} onChange={(e) => setSelReader(e.target.value)} className="bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 text-sm">
              {readers.map((r) => <option key={r.id} value={r.id}>{r.name} ({r.location})</option>)}
            </select>
            <Button className="mt-3" onClick={() => simulateScan(selStudent, selReader)}>
              <span className="flex items-center gap-2"><ScanLine className="w-4 h-4" /> Tap Card</span>
            </Button>
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center gap-4">
          <NfcCard student={student} pulsing={pulseReader === selReader} />
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            {reader && <reader.icon className="w-4 h-4 text-cyan-400" />}
            <span>{reader?.name} · {reader?.location}</span>
          </div>
        </Card>
        <Card className="md:col-span-2">
          <SectionTitle>Live Scan Log</SectionTitle>
          <ScanFeed logs={scanLogs} students={students} />
        </Card>
      </div>
    );
  }


  if (nav === "Students") {
    return (
      <Card>
        <SectionTitle>All Students</SectionTitle>
        <table className="w-full text-sm">
          <thead className="text-neutral-500 text-xs uppercase">
            <tr><th className="text-left py-2">Name</th><th className="text-left">Class</th><th className="text-left">NFC UID</th><th className="text-left">Wallet</th><th className="text-left">Today</th></tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t border-neutral-800">
                <td className="py-2">{s.name}</td>
                <td>{s.cls}{s.sec}</td>
                <td className="font-mono text-xs text-neutral-400">{s.nfc}</td>
                <td>Rs.{s.wallet}</td>
                <td><Pill text={s.today} tone={s.today === "present" ? "good" : "neutral"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    );
  }


  if (nav === "Announcements") {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <SectionTitle>New Announcement</SectionTitle>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4}
            placeholder="Write a school-wide notice..." className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-sm mb-3" />
          <Button disabled={!text.trim()} onClick={() => { onSend(text); setText(""); }}>
            <span className="flex items-center gap-2"><Megaphone className="w-4 h-4" /> Send to Students & Parents</span>
          </Button>
        </Card>
        <Card>
          <SectionTitle>Sent</SectionTitle>
          <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
            {announcements.length === 0 && <p className="text-neutral-600 text-sm">Nothing sent yet.</p>}
            {announcements.map((a) => (
              <div key={a.id} className="border-b border-neutral-800 pb-2">
                <p className="text-neutral-200 text-sm">{a.text}</p>
                <span className="text-neutral-600 text-xs">{a.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (nav === "Reports") {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <SectionTitle>Attendance</SectionTitle>
          <p className="text-neutral-100 text-2xl font-semibold">{todayPresent}</p>
          <p className="text-neutral-500 text-sm">Students present today</p>
        </Card>
        <Card>
          <SectionTitle>Library</SectionTitle>
          <p className="text-neutral-100 text-2xl font-semibold">{booksIssued}</p>
          <p className="text-neutral-500 text-sm">Books currently issued</p>
        </Card>
        <Card>
          <SectionTitle>Scan Activity</SectionTitle>
          <p className="text-neutral-100 text-2xl font-semibold">{scanLogs.length}</p>
          <p className="text-neutral-500 text-sm">Recent NFC events</p>
        </Card>
      </div>
    );
  }

  if (nav === "Settings") {
    return (
      <Card>
        <SectionTitle>Admin Settings</SectionTitle>
        <div className="flex flex-col gap-3 text-sm text-neutral-300">
          <div className="flex justify-between">
            <span>Auto attendance updates</span>
            <span className="text-neutral-500">Enabled</span>
          </div>
          <div className="flex justify-between">
            <span>Library notifications</span>
            <span className="text-neutral-500">Enabled</span>
          </div>
          <div className="flex justify-between">
            <span>Canteen transaction log</span>
            <span className="text-neutral-500">Enabled</span>
          </div>
        </div>
      </Card>
    );
  }

  if (nav === "Canteen Logs") {
    const canteenEvents = scanLogs.filter((log) => log.reader === "Canteen Counter");
    return (
      <Card>
        <SectionTitle>Canteen Logs</SectionTitle>
        {canteenEvents.length === 0 ? (
          <p className="text-neutral-600 text-sm">No canteen transactions yet.</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
            {canteenEvents.slice(0, 10).map((log) => {
              const student = students.find((s) => s.id === log.studentId);
              return (
                <div key={log.id} className="flex justify-between items-center text-sm border-b border-neutral-800 py-2">
                  <div>
                    <p className="text-neutral-200">{student?.name || "Unknown student"}</p>
                    <p className="text-neutral-500 text-xs">{log.action}</p>
                  </div>
                  <span className="text-neutral-600 text-xs">{log.time}</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    );
  }

  if (nav === "Incidents") {
    return (
      <Card>
        <SectionTitle>Incident Reports</SectionTitle>
        {incidentReports.length === 0 ? (
          <p className="text-neutral-600 text-sm">No incident reports submitted yet.</p>
        ) : (
          <div className="flex flex-col gap-3 max-h-[32rem] overflow-y-auto">
            {incidentReports.map((r) => (
              <div key={r.id} className="border-b border-neutral-800 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-neutral-200 text-sm font-medium">{r.title}</p>
                  <Pill text={r.anonymous ? "Anonymous" : r.studentName} tone={r.anonymous ? "warn" : "info"} />
                </div>
                <p className="text-neutral-400 text-sm mt-1">{r.description}</p>
                <span className="text-neutral-600 text-xs">{r.time}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  }

  return null;
}


function ScanFeed({ logs, students }) {
  if (logs.length === 0) return <p className="text-neutral-600 text-sm">No scans yet — try the NFC Simulator.</p>;
  return (
    <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
      {logs.slice(0, 20).map((l) => {
        const s = students.find((st) => st.id === l.studentId);
        return (
          <div key={l.id} className="flex items-center justify-between text-sm border-b border-neutral-800 pb-2">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-neutral-300">{s?.name}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-500">{l.reader}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-neutral-400">{l.action}</span>
              <span className="text-neutral-600 text-xs">{l.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}


/* ---------------------------------- Teacher ---------------------------------- */


function TeacherViews({ nav, homework, onPush, messages, onSendMessage, students, incidentReports }) {
  const [msg, setMsg] = useState("");

  const gradeMap = students.reduce((acc, student, idx) => {
    const patterns = [
      { Mathematics: "A", Science: "A", English: "B+", History: "A-", Nepali: "A" },
      { Mathematics: "A-", Science: "B+", English: "A", History: "B+", Nepali: "A" },
      { Mathematics: "B+", Science: "A", English: "A-", History: "B", Nepali: "B+" },
      { Mathematics: "A", Science: "A-", English: "B", History: "A", Nepali: "A-" },
    ];
    acc[student.id] = patterns[idx % patterns.length];
    return acc;
  }, {});

  if (nav === "Overview") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard icon={FileText} label="Homework Posted" value={homework.length} tint="bg-cyan-400" />
        <StatCard icon={Users} label="Class 10A Size" value={students.length} tint="bg-violet-400" />
        <StatCard icon={Package} label="Messages" value={messages.length} tint="bg-emerald-400" />
      </div>
    );
  }
  if (nav === "Homework") {
    return (
      <Card>
        <SectionTitle>Class 10A · Mathematics</SectionTitle>
        <div className="flex flex-col gap-3">
          {homework.map((h) => (
            <div key={h.id} className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <p className="text-neutral-200 text-sm font-medium">{h.title}</p>
                <p className="text-neutral-500 text-xs">Due {h.due} · {h.status}</p>
              </div>
              <Button variant="ghost" onClick={() => onPush(h.id)}>
                <span className="flex items-center gap-2"><Send className="w-3.5 h-3.5" /> Push Update</span>
              </Button>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  if (nav === "Messages") {
    return (
      <Card>
        <SectionTitle>Parent Messages</SectionTitle>
        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto mb-3">
          {messages.length === 0 && <p className="text-neutral-600 text-sm">No messages yet.</p>}
          {messages.map((m) => (
            <div key={m.id} className={`text-sm px-3 py-2 rounded-xl max-w-md ${m.from === "Teacher" ? "bg-cyan-400 text-neutral-950 self-end" : "bg-neutral-800 text-neutral-200"}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Reply to parent..." className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 text-sm" />
          <Button disabled={!msg.trim()} onClick={() => { onSendMessage(msg); setMsg(""); }}>Send</Button>
        </div>
      </Card>
    );
  }
  if (nav === "Attendance") {
    const presentCount = students.filter((s) => s.today === "present").length;
    const notMarkedCount = students.filter((s) => s.today === "not-marked").length;
    const absentCount = students.length - presentCount - notMarkedCount;

    return (
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={CheckCircle2} label="Present Today" value={presentCount} tint="bg-emerald-400" />
          <StatCard icon={Clock} label="Not Marked" value={notMarkedCount} tint="bg-neutral-600" />
          <StatCard icon={AlertCircle} label="Absent / Unknown" value={absentCount} tint="bg-amber-400" />
        </div>
        <Card>
          <SectionTitle>Student Attendance</SectionTitle>
          <div className="flex flex-col gap-2">
            {students.map((s) => {
              const status = s.today === "present" ? "Present" : s.today === "absent" ? "Absent" : "Not marked";
              const tone = s.today === "present" ? "good" : s.today === "absent" ? "warn" : "neutral";
              return (
                <div key={s.id} className="flex items-center justify-between border-b border-neutral-800 py-2 text-sm">
                  <div>
                    <p className="text-neutral-200">{s.name}</p>
                    <p className="text-neutral-500 text-xs">{s.cls}{s.sec} · {s.roll}</p>
                  </div>
                  <Pill text={status} tone={tone} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }
  if (nav === "Grades") {
    return (
      <Card>
        <SectionTitle>Class Grades</SectionTitle>
        <div className="flex flex-col gap-3">
          {students.map((s) => (
            <div key={s.id} className="border-b border-neutral-800 pb-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-neutral-200 text-sm font-medium">{s.name}</p>
                  <p className="text-neutral-500 text-xs">{s.cls}{s.sec} · {s.roll}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(gradeMap[s.id] || {}).map(([subject, grade]) => (
                    <Pill key={subject} text={`${subject}: ${grade}`} tone="info" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  if (nav === "Class Records") {
    return (
      <Card>
        <SectionTitle>Class Records</SectionTitle>
        <div className="flex flex-col gap-3">
          {students.map((s) => (
            <div key={s.id} className="grid grid-cols-2 md:grid-cols-4 gap-3 border-b border-neutral-800 pb-3 text-sm">
              <div>
                <p className="text-neutral-200">{s.name}</p>
                <p className="text-neutral-500 text-xs">{s.cls}{s.sec} · {s.roll}</p>
              </div>
              <div className="text-neutral-500">Today: {s.today}</div>
              <div className="text-neutral-500">Wallet: Rs.{s.wallet}</div>
              <div className="text-neutral-500">Fee due: {Object.values(s.fees).filter((f) => f === "pending").length} items</div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  if (nav === "Incidents") {
    return (
      <Card>
        <SectionTitle>Incident Reports</SectionTitle>
        {incidentReports.length === 0 ? (
          <p className="text-neutral-600 text-sm">No incident reports submitted yet.</p>
        ) : (
          <div className="flex flex-col gap-3 max-h-[32rem] overflow-y-auto">
            {incidentReports.map((r) => (
              <div key={r.id} className="border-b border-neutral-800 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-neutral-200 text-sm font-medium">{r.title}</p>
                  <Pill text={r.anonymous ? "Anonymous" : r.studentName} tone={r.anonymous ? "warn" : "info"} />
                </div>
                <p className="text-neutral-400 text-sm mt-1">{r.description}</p>
                <span className="text-neutral-600 text-xs">{r.time}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  }
  return null;
}


/* ---------------------------------- Student ---------------------------------- */


function StudentViews({ nav, student, libraryRecords, books, onPayFee, transactions, notifications, incidentReports, onSubmitReport }) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportAnonymous, setReportAnonymous] = useState(false);

  if (!student) return null;
  const myRecords = libraryRecords.filter((r) => r.studentId === student.id);
  const myReports = incidentReports || [];
  const sampleGrades = {
    Mathematics: "A",
    Science: "A-",
    English: "B+",
    History: "A",
    Nepali: "A-",
  };

  if (nav === "Overview") {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Wallet} label="Wallet Balance" value={`Rs.${student.wallet}`} tint="bg-cyan-400" />
          <StatCard icon={CheckCircle2} label="Today" value={student.today} tint={student.today === "present" ? "bg-emerald-400" : "bg-neutral-600"} />
          <StatCard icon={BookOpen} label="Books Out" value={myRecords.filter((r) => !r.returned).length} tint="bg-violet-400" />
          <StatCard icon={AlertCircle} label="Fee Balance" value={`Rs.${student.feeBalance}`} tint="bg-amber-400" />
        </div>
        <Card>
          <SectionTitle>Announcements</SectionTitle>
          {notifications.length === 0 && <p className="text-neutral-600 text-sm">Nothing yet.</p>}
          {notifications.map((n) => <p key={n.id} className="text-sm text-neutral-300 border-b border-neutral-800 pb-2 pt-1">{n.text} <span className="text-neutral-600 text-xs">· {n.time}</span></p>)}
        </Card>
      </div>
    );
  }
  if (nav === "Attendance") {
    return (
      <Card>
        <SectionTitle>Attendance — All 12 Months</SectionTitle>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
          {MONTHS.map((m, i) => (
            <div key={m} className="bg-neutral-800 rounded-xl p-3 text-center">
              <p className="text-neutral-500 text-xs">{m}</p>
              <p className="text-neutral-100 text-lg font-semibold">{student.attendance[i]}</p>
              <p className="text-neutral-600 text-xs">/ {WORKING_DAYS[i]} days</p>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  if (nav === "Library") {
    return (
      <Card>
        <SectionTitle>My Library Records</SectionTitle>
        {myRecords.length === 0 && <p className="text-neutral-600 text-sm">No borrow history yet — try an NFC tap at the Library Desk.</p>}
        <div className="flex flex-col gap-2">
          {myRecords.map((r) => {
            const b = books.find((bk) => bk.id === r.bookId);
            return (
              <div key={r.id} className="flex items-center justify-between border-b border-neutral-800 pb-2 text-sm">
                <span className="text-neutral-200">{b?.title}</span>
                <span className="text-neutral-500 text-xs">Issued {r.issued}</span>
                <Pill text={r.returned ? "Returned" : "Borrowed"} tone={r.returned ? "neutral" : "info"} />
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
  if (nav === "Fees") {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <SectionTitle>Fee Status</SectionTitle>
          <div className="flex flex-col gap-2">
            {Object.entries(student.fees).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="capitalize text-sm text-neutral-300">{k}</span>
                {v === "paid" ? <Pill text="Paid" tone="good" /> : (
                  <Button variant="ghost" onClick={() => onPayFee(k)}>
                    <span className="flex items-center gap-2"><CreditCard className="w-3.5 h-3.5" /> Pay Now</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <SectionTitle>Wallet & Purchases</SectionTitle>
          <p className="text-neutral-100 text-2xl font-semibold mb-3">Rs.{student.wallet}</p>
          <div className="flex flex-col gap-2 max-h-56 overflow-y-auto">
            {transactions.length === 0 && <p className="text-neutral-600 text-sm">No purchases yet.</p>}
            {transactions.map((t) => (
              <div key={t.id} className="flex justify-between text-sm border-b border-neutral-800 pb-1">
                <span>{t.item}</span><span className="text-neutral-500">{t.place}</span><span>Rs.{t.price}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }
  if (nav === "Digital ID") {
    return <div className="flex justify-center"><NfcCard student={student} pulsing={false} /></div>;
  }
  if (nav === "Grades") {
    return (
      <Card>
        <SectionTitle>My Grades</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(sampleGrades).map(([subject, grade]) => (
            <div key={subject} className="bg-neutral-800 rounded-2xl p-4 text-center">
              <p className="text-neutral-500 text-xs uppercase tracking-widest">{subject}</p>
              <p className="text-neutral-100 text-2xl font-semibold mt-2">{grade}</p>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  if (nav === "Announcements") {
    return (
      <Card>
        <SectionTitle>Announcements</SectionTitle>
        <div className="flex flex-col gap-3">
          {notifications.length === 0 ? (
            <p className="text-neutral-600 text-sm">No announcements yet.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="border-b border-neutral-800 pb-2">
                <p className="text-neutral-200 text-sm">{n.text}</p>
                <span className="text-neutral-600 text-xs">{n.time}</span>
              </div>
            ))
          )}
        </div>
      </Card>
    );
  }
  if (nav === "Help") {
    return (
      <div className="flex flex-col gap-6">
        <Card>
          <SectionTitle>Need Help?</SectionTitle>
          <p className="text-neutral-500 text-sm mb-4">
            If you've witnessed or experienced an incident at school, let a teacher or admin know. Reports go straight to their notifications.
          </p>
          <Button onClick={() => setShowReportModal(true)}>
            <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Report an Incident</span>
          </Button>
        </Card>

        <Card>
          <SectionTitle>My Reports</SectionTitle>
          {myReports.length === 0 ? (
            <p className="text-neutral-600 text-sm">You haven't submitted any reports yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {myReports.map((r) => (
                <div key={r.id} className="border-b border-neutral-800 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-neutral-200 text-sm font-medium">{r.title}</p>
                    <Pill text={r.anonymous ? "Sent anonymously" : "Sent with your name"} tone={r.anonymous ? "info" : "neutral"} />
                  </div>
                  <p className="text-neutral-400 text-sm mt-1">{r.description}</p>
                  <span className="text-neutral-600 text-xs">{r.time}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {showReportModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
            <Card className="max-w-md w-full">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-neutral-100">Report an Incident</h3>
                <button onClick={() => setShowReportModal(false)}>
                  <X className="w-4 h-4 text-neutral-400" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="space-y-1 text-sm">
                  <label className="text-neutral-400">Title</label>
                  <input
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="Brief title of the incident"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl px-3 py-2 text-neutral-100 placeholder:text-neutral-500"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label className="text-neutral-400">Description</label>
                  <textarea
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe what happened..."
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl px-3 py-2 text-neutral-100 placeholder:text-neutral-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setReportAnonymous((v) => !v)}
                  className="flex items-center gap-2 text-sm text-neutral-300 mt-1"
                >
                  <span className={`w-9 h-5 rounded-full flex items-center px-0.5 transition ${reportAnonymous ? "bg-cyan-400 justify-end" : "bg-neutral-700 justify-start"}`}>
                    <span className="w-4 h-4 bg-neutral-950 rounded-full" />
                  </span>
                  Send anonymously
                </button>
                <p className="text-neutral-600 text-xs -mt-2">Your name will be hidden from teachers and admins if this is on.</p>
                <Button
                  className="mt-2"
                  disabled={!reportTitle.trim() || !reportDescription.trim()}
                  onClick={() => {
                    onSubmitReport(reportTitle, reportDescription, reportAnonymous);
                    setReportTitle("");
                    setReportDescription("");
                    setReportAnonymous(false);
                    setShowReportModal(false);
                  }}
                >
                  Submit Report
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  }
  return null;
}


/* ---------------------------------- Parent ---------------------------------- */


function ParentViews({ nav, student, notifications, scanLogs, messages, onSendMessage, onPayFee, reportOpen, setReportOpen }) {
  const [msg, setMsg] = useState("");
  if (!student) return null;

  if (nav === "Overview") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard icon={CheckCircle2} label="Today" value={student.today} tint={student.today === "present" ? "bg-emerald-400" : "bg-neutral-600"} />
        <StatCard icon={Clock} label="Check-in" value={student.inTime || "—"} tint="bg-cyan-400" />
        <StatCard icon={AlertCircle} label="Fee Balance" value={`Rs.${student.feeBalance}`} tint="bg-amber-400" />
        <Card className="col-span-2 md:col-span-3">
          <SectionTitle>Recent Notifications</SectionTitle>
          <div className="flex flex-col gap-2 max-h-56 overflow-y-auto">
            {notifications.length === 0 && <p className="text-neutral-600 text-sm">Nothing yet.</p>}
            {notifications.map((n) => <p key={n.id} className="text-sm text-neutral-300 border-b border-neutral-800 pb-2">{n.text} <span className="text-neutral-600 text-xs">· {n.time}</span></p>)}
          </div>
        </Card>
      </div>
    );
  }
  if (nav === "NFC Activity") {
    return (
      <Card>
        <SectionTitle>{student.name}'s NFC Card Activity</SectionTitle>
        {scanLogs.length === 0 && <p className="text-neutral-600 text-sm">No card activity yet.</p>}
        <div className="flex flex-col gap-2">
          {scanLogs.map((l) => (
            <div key={l.id} className="flex justify-between text-sm border-b border-neutral-800 pb-2">
              <span className="flex items-center gap-2"><Radio className="w-3.5 h-3.5 text-cyan-400" />{l.reader}</span>
              <span className="text-neutral-400">{l.action}</span>
              <span className="text-neutral-600 text-xs">{l.time}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  if (nav === "Fees") {
    return (
      <Card>
        <SectionTitle>Fee Payments</SectionTitle>
        <div className="flex flex-col gap-2">
          {Object.entries(student.fees).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="capitalize text-sm">{k}</span>
              {v === "paid" ? <Pill text="Paid" tone="good" /> : <Button variant="ghost" onClick={() => onPayFee(k)}>Pay Now</Button>}
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-800">
          <Button onClick={() => setReportOpen(true)}><span className="flex items-center gap-2"><FileText className="w-4 h-4" /> Download Report Card</span></Button>
        </div>
        {reportOpen && (
          <div className="fixed inset-0 bg-neutral-950 flex items-center justify-center z-50 p-6">
            <Card className="max-w-md w-full">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-neutral-100">Report Card — {student.name}</h3>
                <button onClick={() => setReportOpen(false)}><X className="w-4 h-4 text-neutral-400" /></button>
              </div>
              <p className="text-neutral-500 text-xs mb-3">Class {student.cls}{student.sec} · Roll {student.roll}</p>
              <div className="flex justify-between text-sm border-b border-neutral-800 py-1"><span>Attendance (this month)</span><span>{student.attendance[0]}/{WORKING_DAYS[0]}</span></div>
              <div className="flex justify-between text-sm py-1"><span>Fee Balance</span><span>Rs.{student.feeBalance}</span></div>
              <Button className="mt-4" variant="ghost" onClick={() => setReportOpen(false)}>Close</Button>
            </Card>
          </div>
        )}
      </Card>
    );
  }
  if (nav === "Messages") {
    return (
      <Card>
        <SectionTitle>Message the Teacher</SectionTitle>
        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto mb-3">
          {messages.length === 0 && <p className="text-neutral-600 text-sm">No messages yet.</p>}
          {messages.map((m) => (
            <div key={m.id} className={`text-sm px-3 py-2 rounded-xl max-w-md ${m.from === "Parent" ? "bg-cyan-400 text-neutral-950 self-end" : "bg-neutral-800 text-neutral-200"}`}>{m.text}</div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Message the teacher..." className="flex-1 bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 text-sm" />
          <Button disabled={!msg.trim()} onClick={() => { onSendMessage(msg); setMsg(""); }}>Send</Button>
        </div>
      </Card>
    );
  }
  if (nav === "Announcements") {
    return (
      <Card>
        <SectionTitle>School Announcements</SectionTitle>
        <div className="flex flex-col gap-3">
          {notifications.length === 0 ? (
            <p className="text-neutral-600 text-sm">No announcements yet.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="border-b border-neutral-800 pb-2">
                <p className="text-neutral-200 text-sm">{n.text}</p>
                <span className="text-neutral-600 text-xs">{n.time}</span>
              </div>
            ))
          )}
        </div>
      </Card>
    );
  }
  if (nav === "Reports") {
    const recentLog = scanLogs[0];
    return (
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={AlertCircle} label="Fee Balance" value={`Rs.${student.feeBalance}`} tint="bg-amber-400" />
          <StatCard icon={Wallet} label="Wallet" value={`Rs.${student.wallet}`} tint="bg-cyan-400" />
          <StatCard icon={BookOpen} label="Books Out" value={myRecords.filter((r) => !r.returned).length} tint="bg-violet-400" />
        </div>
        <Card>
          <SectionTitle>Student Summary</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-300">
            <div className="bg-neutral-800 rounded-2xl p-4">
              <p className="text-neutral-500 text-xs uppercase tracking-wide mb-2">Attendance</p>
              <p className="text-neutral-100 text-lg font-semibold">{student.attendance[0]}/{WORKING_DAYS[0]}</p>
            </div>
            <div className="bg-neutral-800 rounded-2xl p-4">
              <p className="text-neutral-500 text-xs uppercase tracking-wide mb-2">Fee Status</p>
              <p className="text-neutral-100 text-lg font-semibold">Rs.{student.feeBalance}</p>
            </div>
            <div className="bg-neutral-800 rounded-2xl p-4">
              <p className="text-neutral-500 text-xs uppercase tracking-wide mb-2">Last NFC Event</p>
              <p className="text-neutral-100 text-sm">{recentLog ? `${recentLog.reader} · ${recentLog.action}` : "No recent activity"}</p>
            </div>
            <div className="bg-neutral-800 rounded-2xl p-4">
              <p className="text-neutral-500 text-xs uppercase tracking-wide mb-2">Messages</p>
              <p className="text-neutral-100 text-lg font-semibold">{messages.length}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  return null;
}


/* ---------------------------------- Librarian ---------------------------------- */


function LibrarianViews({ nav, students, books, libraryRecords, onIssue, onReturn }) {
  const [selStudent, setSelStudent] = useState(students[0].id);
  const [selBook, setSelBook] = useState(books[0].id);

  const activeBorrows = libraryRecords.filter((r) => !r.returned);
  const returnedCount = libraryRecords.filter((r) => r.returned).length;

  if (nav === "Overview") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard icon={BookOpen} label="Total Copies" value={books.reduce((a, b) => a + b.copies, 0)} tint="bg-cyan-400" />
        <StatCard icon={CheckCircle2} label="Issued" value={books.reduce((a, b) => a + b.issued, 0)} tint="bg-violet-400" />
        <StatCard icon={Package} label="Titles" value={books.length} tint="bg-emerald-400" />
      </div>
    );
  }
  if (nav === "Issue / Return") {
    const activeForStudent = libraryRecords.find((r) => r.studentId === selStudent && !r.returned);
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <SectionTitle>Issue a Book</SectionTitle>
          <select value={selStudent} onChange={(e) => setSelStudent(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 text-sm mb-2">
            {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select value={selBook} onChange={(e) => setSelBook(e.target.value)} className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 text-sm mb-3">
            {books.filter((b) => b.issued < b.copies).map((b) => <option key={b.id} value={b.id}>{b.title} ({b.copies - b.issued} left)</option>)}
          </select>
          <Button onClick={() => onIssue(selStudent, selBook)}>Issue Book</Button>
        </Card>
        <Card>
          <SectionTitle>Return for Selected Student</SectionTitle>
          {activeForStudent ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-200">{books.find((b) => b.id === activeForStudent.bookId)?.title}</span>
              <Button variant="ghost" onClick={() => onReturn(activeForStudent.id, activeForStudent.bookId, selStudent)}>Return</Button>
            </div>
          ) : <p className="text-neutral-600 text-sm">No active borrow for this student.</p>}
          <div className="mt-4">
            <SectionTitle>All Active Borrows</SectionTitle>
            {activeBorrows.length === 0 ? (
              <p className="text-neutral-600 text-sm">No active borrows at the moment.</p>
            ) : (
              activeBorrows.map((r) => (
                <div key={r.id} className="flex justify-between text-sm border-b border-neutral-800 py-1">
                  <span>{students.find((s) => s.id === r.studentId)?.name}</span>
                  <span className="text-neutral-500">{books.find((b) => b.id === r.bookId)?.title}</span>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    );
  }
  if (nav === "Catalog") {
    return (
      <Card>
        <SectionTitle>Catalog</SectionTitle>
        <table className="w-full text-sm">
          <thead className="text-neutral-500 text-xs uppercase"><tr><th className="text-left py-2">Title</th><th className="text-left">Author</th><th className="text-left">Copies</th><th className="text-left">Available</th></tr></thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id} className="border-t border-neutral-800">
                <td className="py-2">{b.title}</td><td>{b.author}</td><td>{b.copies}</td><td>{b.copies - b.issued}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    );
  }
  if (nav === "Members") {
    return (
      <Card>
        <SectionTitle>Library Members</SectionTitle>
        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
          {students.map((s) => {
            const activeCount = libraryRecords.filter((r) => r.studentId === s.id && !r.returned).length;
            return (
              <div key={s.id} className="flex items-center justify-between border-b border-neutral-800 py-2 text-sm">
                <div>
                  <p className="text-neutral-200">{s.name}</p>
                  <p className="text-neutral-500 text-xs">Class {s.cls}{s.sec}</p>
                </div>
                <Pill text={`${activeCount} active borrow${activeCount !== 1 ? "s" : ""}`} tone={activeCount > 0 ? "info" : "neutral"} />
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
  if (nav === "Reports") {
    return (
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={BookOpen} label="Active Borrows" value={activeBorrows.length} tint="bg-cyan-400" />
          <StatCard icon={CheckCircle2} label="Returned" value={returnedCount} tint="bg-violet-400" />
          <StatCard icon={Package} label="Titles" value={books.length} tint="bg-emerald-400" />
        </div>
        <Card>
          <SectionTitle>Current Borrow Details</SectionTitle>
          {activeBorrows.length === 0 ? (
            <p className="text-neutral-600 text-sm">No active borrowed books right now.</p>
          ) : (
            activeBorrows.map((r) => (
              <div key={r.id} className="flex justify-between border-b border-neutral-800 py-2 text-sm">
                <span>{students.find((s) => s.id === r.studentId)?.name}</span>
                <span className="text-neutral-500">{books.find((b) => b.id === r.bookId)?.title}</span>
              </div>
            ))
          )}
        </Card>
      </div>
    );
  }
  if (nav === "Settings") {
    return (
      <Card>
        <SectionTitle>Library Settings</SectionTitle>
        <div className="flex flex-col gap-3 text-sm text-neutral-300">
          <div className="flex justify-between">
            <span>Auto issue confirmation</span>
            <span className="text-neutral-500">Enabled</span>
          </div>
          <div className="flex justify-between">
            <span>Return reminders</span>
            <span className="text-neutral-500">Enabled</span>
          </div>
          <div className="flex justify-between">
            <span>Catalog sync</span>
            <span className="text-neutral-500">Live</span>
          </div>
        </div>
      </Card>
    );
  }
  return null;
}


const customCss = `
  .scan-ring {
    position: absolute; inset: -6px; border-radius: 9999px;
    border: 2px solid rgb(34 211 238 / 0.6);
    animation: scanpulse 0.9s ease-out;
  }
  @keyframes scanpulse {
    0% { transform: scale(0.6); opacity: 1; }
    100% { transform: scale(2.2); opacity: 0; }
  }
`;