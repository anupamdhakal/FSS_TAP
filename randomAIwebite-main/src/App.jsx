import { useState, useEffect, useMemo, useContext, createContext } from "react";
import {
  Nfc, ShieldCheck, Users, GraduationCap, BookOpen, Wallet, Megaphone,
  User, ScanLine, Bell, LogOut, CreditCard, CheckCircle2,
  Clock, Package, Send, Radio, ChevronRight, X, FileText, AlertCircle,
  DoorOpen, Utensils, Sun, Moon, Download, TrendingUp, ShoppingCart,
  Store, RefreshCw, DollarSign,
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


const INITIAL_CANTEEN_MENU = [
  { id: "CI1", item: "Veg Thali", price: 60, stock: 25, category: "Meals" },
  { id: "CI2", item: "Samosa", price: 25, stock: 40, category: "Snacks" },
  { id: "CI3", item: "Milkshake", price: 40, stock: 18, category: "Beverages" },
  { id: "CI4", item: "Non-Veg Thali", price: 70, stock: 15, category: "Meals" },
  { id: "CI5", item: "Samosa Chat", price: 45, stock: 22, category: "Snacks" },
  { id: "CI6", item: "Chocolate Milkshake", price: 50, stock: 12, category: "Beverages" },
];

const FEE_AMOUNTS = { tuition: 1500, transport: 800, exam: 500 };

const GRADE_PATTERNS = [
  { Mathematics: "A", Science: "A", English: "B+", History: "A-", Nepali: "A" },
  { Mathematics: "A-", Science: "B+", English: "A", History: "B+", Nepali: "A" },
  { Mathematics: "B+", Science: "A", English: "A-", History: "B", Nepali: "B+" },
  { Mathematics: "A", Science: "A-", English: "B", History: "A", Nepali: "A-" },
];
function getStudentGrades(studentId) {
  const num = parseInt(String(studentId).replace(/\D/g, ""), 10) || 1;
  return GRADE_PATTERNS[(num - 1) % GRADE_PATTERNS.length];
}
const GRADE_POINTS = { "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3 };


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


/* ---------------------------------- theme ---------------------------------- */


const THEME = {
  dark: {
    appBg: "bg-neutral-950",
    cardBg: "bg-neutral-900",
    border: "border-neutral-800",
    textPrimary: "text-neutral-100",
    textSecondary: "text-neutral-300",
    textMuted: "text-neutral-500",
    textFaint: "text-neutral-600",
    navIdle: "text-neutral-400 hover:bg-neutral-900",
    navActive: "bg-neutral-800 text-neutral-50",
    inputBg: "bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-500",
    ghostBtn: "bg-neutral-800 text-neutral-200 hover:bg-neutral-700",
    pillNeutral: "bg-neutral-800 text-neutral-300",
    tileBg: "bg-neutral-800",
    overlay: "bg-black/70",
    gridLine: "#262626",
    axisText: "#a3a3a3",
    chartTooltipBg: "#171717",
  },
  light: {
    appBg: "bg-neutral-50",
    cardBg: "bg-white",
    border: "border-neutral-200",
    textPrimary: "text-neutral-900",
    textSecondary: "text-neutral-700",
    textMuted: "text-neutral-500",
    textFaint: "text-neutral-400",
    navIdle: "text-neutral-500 hover:bg-neutral-100",
    navActive: "bg-neutral-200 text-neutral-900",
    inputBg: "bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400",
    ghostBtn: "bg-neutral-200 text-neutral-800 hover:bg-neutral-300",
    pillNeutral: "bg-neutral-200 text-neutral-700",
    tileBg: "bg-neutral-100",
    overlay: "bg-black/50",
    gridLine: "#e5e5e5",
    axisText: "#525252",
    chartTooltipBg: "#ffffff",
  },
};

const ThemeContext = createContext({ theme: "dark", T: THEME.dark, toggleTheme: () => {} });
function useTheme() {
  return useContext(ThemeContext);
}


/* ---------------------------------- small ui bits ---------------------------------- */


function StatCard({ icon: Icon, label, value, tint }) {
  const { T } = useTheme();
  return (
    <div className={`${T.cardBg} border ${T.border} rounded-2xl p-4 flex items-center gap-3 transition-colors`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tint}`}>
        <Icon className="w-5 h-5 text-neutral-950" />
      </div>
      <div>
        <p className={`${T.textMuted} text-xs`}>{label}</p>
        <p className={`${T.textPrimary} text-lg font-semibold`}>{value}</p>
      </div>
    </div>
  );
}


function SectionTitle({ children }) {
  const { T } = useTheme();
  return <h2 className={`${T.textSecondary} font-semibold text-sm tracking-wide uppercase mb-3`}>{children}</h2>;
}


function Card({ children, className = "" }) {
  const { T } = useTheme();
  return <div className={`${T.cardBg} border ${T.border} rounded-2xl p-4 transition-colors ${className}`}>{children}</div>;
}


function Pill({ text, tone = "neutral" }) {
  const { T } = useTheme();
  const tones = {
    neutral: T.pillNeutral,
    good: "bg-emerald-500 text-emerald-950",
    warn: "bg-amber-500 text-amber-950",
    info: "bg-cyan-500 text-cyan-950",
  };
  return <span className={`text-xs px-2 py-1 rounded-full font-medium ${tones[tone]}`}>{text}</span>;
}


function Button({ children, onClick, variant = "primary", className = "", disabled }) {
  const { T } = useTheme();
  const variants = {
    primary: "bg-cyan-400 text-neutral-950 hover:bg-cyan-300",
    ghost: T.ghostBtn,
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


function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme, T } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-center gap-2 text-xs px-3 py-2 rounded-xl transition ${T.ghostBtn} ${className}`}
    >
      {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
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


/* ---------------------------------- report card (printable) ---------------------------------- */


function ReportCardModal({ student, onClose }) {
  const grades = getStudentGrades(student.id);
  const subjects = Object.keys(grades);
  const gpa = (subjects.reduce((sum, s) => sum + (GRADE_POINTS[grades[s]] ?? 3.0), 0) / subjects.length).toFixed(2);
  const totalPresent = student.attendance.reduce((a, b) => a + b, 0);
  const totalWorkingDays = WORKING_DAYS.reduce((a, b) => a + b, 0);
  const attendancePct = totalWorkingDays ? Math.round((totalPresent / totalWorkingDays) * 100) : 0;
  const pendingFees = Object.entries(student.fees).filter(([, v]) => v === "pending");
  const generatedOn = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-6">
        <div className="no-print flex justify-end gap-2 mb-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-cyan-400 text-neutral-950 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-cyan-300 transition"
          >
            <Download className="w-4 h-4" /> Download / Print PDF
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 bg-neutral-800 text-neutral-200 px-4 py-2 rounded-xl text-sm hover:bg-neutral-700 transition"
          >
            <X className="w-4 h-4" /> Close
          </button>
        </div>

        <div className="print-area bg-white text-neutral-900 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-between border-b-2 border-neutral-900 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center shrink-0">
                <Nfc className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight">Fountain Springs School</p>
                <p className="text-xs text-neutral-500">Academic Report Card</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500">Generated on</p>
              <p className="text-sm font-medium">{generatedOn}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-6">
            <div><span className="text-neutral-500">Student Name: </span><span className="font-medium">{student.name}</span></div>
            <div><span className="text-neutral-500">Roll No: </span><span className="font-medium">{student.roll}</span></div>
            <div><span className="text-neutral-500">Class / Section: </span><span className="font-medium">{student.cls}-{student.sec}</span></div>
            <div><span className="text-neutral-500">Guardian: </span><span className="font-medium">{student.guardian}</span></div>
            <div><span className="text-neutral-500">NFC Card ID: </span><span className="font-medium font-mono">{student.nfc}</span></div>
            <div><span className="text-neutral-500">Wallet Balance: </span><span className="font-medium">Rs.{student.wallet}</span></div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">Attendance Summary</p>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="border border-neutral-200 rounded-xl p-3 text-center">
              <p className="text-xl font-bold">{totalPresent}</p>
              <p className="text-xs text-neutral-500">Days Present</p>
            </div>
            <div className="border border-neutral-200 rounded-xl p-3 text-center">
              <p className="text-xl font-bold">{totalWorkingDays}</p>
              <p className="text-xs text-neutral-500">Working Days</p>
            </div>
            <div className="border border-neutral-200 rounded-xl p-3 text-center">
              <p className="text-xl font-bold">{attendancePct}%</p>
              <p className="text-xs text-neutral-500">Attendance</p>
            </div>
          </div>
          <table className="w-full text-[10px] mb-6">
            <thead>
              <tr className="text-neutral-500">
                {MONTHS.map((m) => <th key={m} className="text-center py-1 font-normal">{m}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-neutral-200">
                {student.attendance.map((a, i) => <td key={i} className="text-center py-1 font-medium">{a}/{WORKING_DAYS[i]}</td>)}
              </tr>
            </tbody>
          </table>

          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">Academic Performance</p>
          <table className="w-full text-sm mb-2">
            <thead>
              <tr className="text-neutral-500 text-xs uppercase"><th className="text-left py-2">Subject</th><th className="text-left">Grade</th><th className="text-left">Grade Points</th></tr>
            </thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s} className="border-t border-neutral-200">
                  <td className="py-2">{s}</td>
                  <td className="font-medium">{grades[s]}</td>
                  <td>{(GRADE_POINTS[grades[s]] ?? 3.0).toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm mb-6"><span className="text-neutral-500">Overall GPA: </span><span className="font-bold">{gpa} / 4.0</span></p>

          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">Fee Status</p>
          <table className="w-full text-sm mb-1">
            <thead>
              <tr className="text-neutral-500 text-xs uppercase"><th className="text-left py-2">Fee Type</th><th className="text-left">Amount</th><th className="text-left">Status</th></tr>
            </thead>
            <tbody>
              {Object.entries(student.fees).map(([k, v]) => (
                <tr key={k} className="border-t border-neutral-200">
                  <td className="py-2 capitalize">{k}</td>
                  <td>Rs.{FEE_AMOUNTS[k] || 0}</td>
                  <td className={v === "paid" ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>{v === "paid" ? "Paid" : "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {pendingFees.length > 0 && (
            <p className="text-xs text-amber-700 mb-6">Outstanding balance: Rs.{student.feeBalance}</p>
          )}
          {pendingFees.length === 0 && <div className="mb-6" />}

          <div className="grid grid-cols-2 gap-8 mt-4 pt-6 border-t border-neutral-200 text-xs text-neutral-500">
            <div>
              <div className="border-t border-neutral-400 pt-1 mt-8">Class Teacher's Signature</div>
            </div>
            <div>
              <div className="border-t border-neutral-400 pt-1 mt-8">Principal's Signature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ---------------------------------- wallet top-up ---------------------------------- */


function LoadWalletModal({ student, onLoad, onClose }) {
  const { T } = useTheme();
  const [amount, setAmount] = useState("");
  const presets = [100, 500, 1000, 2000];

  const handleSubmit = () => {
    const amt = parseInt(amount, 10);
    if (!amt || amt <= 0) return;
    onLoad(amt);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
      <Card className="max-w-sm w-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className={`font-semibold ${T.textPrimary}`}>Load Wallet — {student.name}</h3>
          <button onClick={onClose}><X className={`w-4 h-4 ${T.textMuted}`} /></button>
        </div>
        <p className={`${T.textMuted} text-xs mb-3`}>Current balance: Rs.{student.wallet}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {presets.map((p) => (
            <button key={p} onClick={() => setAmount(String(p))} className={`px-3 py-1.5 rounded-full text-xs transition ${T.ghostBtn}`}>
              Rs.{p}
            </button>
          ))}
        </div>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Custom amount"
          className={`w-full border rounded-2xl px-3 py-2 text-sm mb-3 ${T.inputBg}`}
        />
        <Button disabled={!amount || Number(amount) <= 0} onClick={handleSubmit} className="w-full">
          <span className="flex items-center gap-2 justify-center"><Wallet className="w-4 h-4" /> Add to Wallet</span>
        </Button>
      </Card>
    </div>
  );
}


/* ---------------------------------- app ---------------------------------- */


export default function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const T = THEME[theme];
  const themeCtx = { theme, T, toggleTheme };

  const [role, setRole] = useState(null);
  const [activeStudentId, setActiveStudentId] = useState("S1");
  const [nav, setNav] = useState("Overview");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);


  const [students, setStudents] = useState(SEED_STUDENTS);
  const [books, setBooks] = useState(SEED_BOOKS);
  const [libraryRecords, setLibraryRecords] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [canteenMenu, setCanteenMenu] = useState(INITIAL_CANTEEN_MENU);
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
  const [walletModalOpen, setWalletModalOpen] = useState(false);
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
    if (!student) return { ok: false, reason: "invalid" };
    const amount = FEE_AMOUNTS[type] || 0;
    if (student.wallet < amount) {
      pushLog({ studentId, reader: "Fee Desk", action: `Failed fee payment for ${type} — insufficient wallet balance` });
      pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} tried to pay the ${type} fee of Rs.${amount} but only had Rs.${student.wallet} in wallet.` });
      return { ok: false, reason: "funds", needed: amount, have: student.wallet };
    }
    const newWallet = student.wallet - amount;
    const newFeeBalance = Math.max(0, student.feeBalance - amount);
    updateStudent(studentId, {
      fees: { ...student.fees, [type]: "paid" },
      wallet: newWallet,
      feeBalance: newFeeBalance,
    });
    pushLog({ studentId, reader: "Fee Desk", action: `Paid ${type} fee of Rs.${amount}` });
    pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} paid Rs.${amount} towards the ${type} fee. Wallet balance: Rs.${newWallet}.` });
    return { ok: true };
  };

  const payAllPendingFees = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    if (!student) return { ok: false, reason: "invalid" };
    const pendingTypes = Object.entries(student.fees).filter(([, v]) => v === "pending").map(([k]) => k);
    if (pendingTypes.length === 0) return { ok: true, total: 0 };
    const total = pendingTypes.reduce((sum, t) => sum + (FEE_AMOUNTS[t] || 0), 0);
    if (student.wallet < total) {
      pushLog({ studentId, reader: "Fee Desk", action: `Failed to pay all fees — needs Rs.${total}, has Rs.${student.wallet}` });
      pushNotification({ audience: "parent-nfc", studentId, text: `Tried to pay all pending fees (Rs.${total}) for ${student.name} but the wallet only has Rs.${student.wallet}.` });
      return { ok: false, reason: "funds", needed: total, have: student.wallet };
    }
    const newFees = { ...student.fees };
    pendingTypes.forEach((t) => { newFees[t] = "paid"; });
    const newWallet = student.wallet - total;
    const newFeeBalance = Math.max(0, student.feeBalance - total);
    updateStudent(studentId, { fees: newFees, wallet: newWallet, feeBalance: newFeeBalance });
    pushLog({ studentId, reader: "Fee Desk", action: `Paid all pending fees (Rs.${total}) in one go` });
    pushNotification({ audience: "parent-nfc", studentId, text: `All of ${student.name}'s pending fees (Rs.${total}) were paid. Wallet balance: Rs.${newWallet}.` });
    return { ok: true, total };
  };

  const loadWallet = (studentId, amount) => {
    const student = students.find((s) => s.id === studentId);
    if (!student || !amount || amount <= 0) return { ok: false };
    const newWallet = student.wallet + Math.round(amount);
    updateStudent(studentId, { wallet: newWallet });
    pushLog({ studentId, reader: "Wallet Top-up", action: `Loaded Rs.${amount} into wallet` });
    pushNotification({ audience: "parent-nfc", studentId, text: `Rs.${amount} was added to ${student.name}'s wallet. New balance: Rs.${newWallet}.` });
    return { ok: true, newWallet };
  };

  const sellItem = (studentId, itemId, source = "pos") => {
    const student = students.find((s) => s.id === studentId);
    const item = canteenMenu.find((i) => i.id === itemId);
    if (!student || !item) return { ok: false, reason: "invalid" };
    if (item.stock <= 0) {
      pushLog({ studentId, reader: "Canteen Counter", action: `${item.item} is out of stock` });
      return { ok: false, reason: "stock" };
    }
    if (student.wallet < item.price) {
      pushLog({ studentId, reader: "Canteen Counter", action: `Sale failed for ${item.item} — insufficient funds` });
      pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} tried to buy ${item.item} for Rs.${item.price} but only had Rs.${student.wallet} in wallet.` });
      return { ok: false, reason: "funds", needed: item.price, have: student.wallet };
    }
    const newWallet = student.wallet - item.price;
    updateStudent(studentId, { wallet: newWallet });
    setCanteenMenu((prev) => prev.map((m) => (m.id === itemId ? { ...m, stock: m.stock - 1 } : m)));
    setTransactions((prev) => [
      { id: nextId("T"), studentId, item: item.item, price: item.price, time: now(), place: "Canteen Counter", source },
      ...prev,
    ]);
    pushLog({ studentId, reader: "Canteen Counter", action: `${source === "nfc" ? "Tapped in and bought" : "Sold"} ${item.item} for Rs.${item.price}` });
    pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} purchased ${item.item} for Rs.${item.price} at the canteen. Wallet balance: Rs.${newWallet}.` });
    return { ok: true, newWallet };
  };

  const restockItem = (itemId, qty = 10) => {
    setCanteenMenu((prev) => prev.map((m) => (m.id === itemId ? { ...m, stock: m.stock + qty } : m)));
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
  function simulateScan(studentId, readerId, itemId) {
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
          const book = itemId ? books.find((b) => b.id === itemId && b.issued < b.copies) : books.find((b) => b.issued < b.copies);
          if (book) {
            setBooks((prev) => prev.map((b) => (b.id === book.id ? { ...b, issued: b.issued + 1 } : b)));
            setLibraryRecords((prev) => [
              { id: nextId("LR"), studentId, bookId: book.id, issued: new Date().toLocaleDateString(), returned: false },
              ...prev,
            ]);
            pushLog({ studentId, reader: reader.name, action: `Issued "${book.title}"` });
            pushNotification({ audience: "parent-nfc", studentId, text: `${student.name} borrowed "${book.title}" from the library.` });
          } else {
            pushLog({ studentId, reader: reader.name, action: "No copies available to issue" });
          }
        }
        break;
      }
      case "canteen": {
        const chosenId = itemId || canteenMenu.find((i) => i.stock > 0)?.id;
        if (!chosenId) {
          pushLog({ studentId, reader: reader.name, action: "No items in stock" });
          break;
        }
        sellItem(studentId, chosenId, "nfc");
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
      }, 1500);
    };

    if (isLoggingIn) {
      return (
        <ThemeContext.Provider value={themeCtx}>
          <div className={`min-h-screen ${T.appBg} flex items-center justify-center p-6 transition-colors`}>
            <style>{customCss}</style>
            <div className={`${T.cardBg} border ${T.border} rounded-3xl p-10 text-center max-w-md w-full`}>
              <div className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
              <h2 className={`${T.textPrimary} text-2xl font-semibold mb-2`}>Signing in</h2>
              <p className={T.textMuted}>Preparing your dashboard. Hang tight for a moment.</p>
            </div>
          </div>
        </ThemeContext.Provider>
      );
    }

    return (
      <ThemeContext.Provider value={themeCtx}>
        <div className={`min-h-screen ${T.appBg} flex items-center justify-center p-6 relative transition-colors`}>
          <style>{customCss}</style>
          <div className="absolute top-6 right-6">
            <ThemeToggle />
          </div>
          <div className="w-full max-w-4xl grid md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col items-center md:items-start gap-6">
              <div className="flex items-center gap-2">
                <Nfc className="w-7 h-7 text-cyan-400" />
                <span className={`${T.textPrimary} font-semibold tracking-tight text-lg`}>FSS TAP</span>
              </div>
              <h1 className={`${T.textPrimary} text-3xl font-semibold leading-tight text-center md:text-left`}>
                Welcome back.<br />Sign in to continue.
              </h1>
              <p className={`${T.textMuted} text-sm max-w-sm text-center md:text-left`}>
                Enter your school credentials and access dashboards for attendance, library, canteen, and more.
              </p>
              <NfcCard student={activeStudent} pulsing={true} />
            </div>

            <Card className="w-full">
              <SectionTitle>Sign in</SectionTitle>
              <p className={`${T.textMuted} text-xs mb-4`}>Use your username and password to access the dashboard.</p>
              <div className="space-y-4">
                <div className="space-y-1 text-sm">
                  <label className={T.textMuted}>Username</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                    className={`w-full border rounded-2xl px-3 py-2 ${T.inputBg}`}
                    placeholder="admin"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label className={T.textMuted}>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleLogin();
                      }
                    }}
                    className={`w-full border rounded-2xl px-3 py-2 ${T.inputBg}`}
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
      </ThemeContext.Provider>
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
    }, 1500);
  };


  return (
    <ThemeContext.Provider value={themeCtx}>
    <div className={`min-h-screen ${T.appBg} flex ${T.textSecondary} transition-colors`}>
      <style>{customCss}</style>

      {showSignOutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className={`w-full max-w-sm rounded-3xl border ${T.border} ${T.cardBg} p-6 shadow-2xl`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${T.textPrimary}`}>Sign out?</h3>
              <button
                onClick={() => setShowSignOutModal(false)}
                className={`rounded-full p-1 ${T.textMuted} transition hover:opacity-70`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className={`mt-3 text-sm ${T.textMuted}`}>
              Are you sure you want to sign out of your dashboard?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSignOutModal(false)}
                className={`rounded-xl border ${T.border} px-3 py-2 text-sm ${T.textSecondary} transition hover:opacity-80`}
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
          <div className={`w-full max-w-md rounded-3xl border ${T.border} ${T.cardBg} p-10 text-center shadow-2xl`}>
            <div className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
            <h2 className={`${T.textPrimary} text-2xl font-semibold mb-2`}>Signing out</h2>
            <p className={T.textMuted}>Logging you out and returning you to the home page.</p>
          </div>
        </div>
      )}

      <aside className={`w-56 border-r ${T.border} flex flex-col p-4 gap-6 shrink-0`}>
        <div className="flex items-center gap-2 px-1">
          <Nfc className="w-6 h-6 text-cyan-400" />
          <span className={`font-semibold ${T.textPrimary}`}>FSS TAP</span>
        </div>
        <nav className="flex flex-col gap-1">
          {NAV[role].map((n) => (
            <button
              key={n}
              onClick={() => setNav(n)}
              className={`text-left px-3 py-2 rounded-xl text-sm transition flex items-center justify-between ${
                nav === n ? T.navActive : T.navIdle
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
              className={`border rounded-xl px-2 py-2 text-xs ${T.inputBg}`}
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>{role === "parent" ? `Child: ${s.name}` : s.name}</option>
              ))}
            </select>
          )}
          <ThemeToggle />
          <button
            onClick={handleSignOutClick}
            className={`flex items-center gap-2 ${T.textMuted} hover:opacity-70 text-xs px-3 py-2 transition`}
          >
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </aside>


      <main className="flex-1 flex flex-col">
        <header className={`border-b ${T.border} px-6 py-3 flex items-center justify-between`}>
          <div>
            <p className={`${T.textMuted} text-xs`}>{ROLES.find((r) => r.key === role)?.label} Dashboard</p>
            <h1 className={`${T.textPrimary} font-semibold`}>{nav}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className={`w-5 h-5 ${T.textMuted}`} />
              {myNotifications.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full" />}
            </div>
            <div className={`w-8 h-8 rounded-full ${T.tileBg} flex items-center justify-center`}>
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
              libraryRecords={libraryRecords}
              canteenMenu={canteenMenu}
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
              onPayFee={(type) => payFee(activeStudentId, type)}
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
              onPayFee={(type) => payFee(activeStudentId, type)}
              onPayAllFees={() => payAllPendingFees(activeStudentId)}
              onLoadWallet={(amt) => loadWallet(activeStudentId, amt)}
              reportOpen={reportOpen} setReportOpen={setReportOpen}
              walletModalOpen={walletModalOpen} setWalletModalOpen={setWalletModalOpen}
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
          {role === "canteen" && (
            <CanteenViews
              nav={nav}
              students={students}
              canteenMenu={canteenMenu}
              transactions={transactions}
              staff={SEED_STAFF}
              sellItem={sellItem}
              restockItem={restockItem}
            />
          )}
        </div>
      </main>
    </div>
    </ThemeContext.Provider>
  );
}


/* ---------------------------------- Admin ---------------------------------- */


function AdminViews({ nav, students, scanLogs, books, readers, simulateScan, pulseReader, announcements, onSend, incidentReports, libraryRecords, canteenMenu }) {
  const { T } = useTheme();
  const [selStudent, setSelStudent] = useState(students[0].id);
  const [selReader, setSelReader] = useState(readers[0].id);
  const [selItem, setSelItem] = useState("");
  const [text, setText] = useState("");

  const reader = readers.find((r) => r.id === selReader);
  const activeBorrow = libraryRecords.find((r) => r.studentId === selStudent && !r.returned);

  // Whenever the reader or the selected student changes, recompute which item should be
  // pre-selected for that context instead of leaving a stale pick from a previous reader.
  useEffect(() => {
    if (reader?.action === "library") {
      if (!activeBorrow) {
        const options = books.filter((b) => b.issued < b.copies);
        setSelItem(options[0]?.id || "");
      } else {
        setSelItem("");
      }
    } else if (reader?.action === "canteen") {
      const options = canteenMenu.filter((i) => i.stock > 0);
      setSelItem(options[0]?.id || "");
    } else {
      setSelItem("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selReader, selStudent]);


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
    const student = students.find((s) => s.id === selStudent);
    const borrowedBook = activeBorrow ? books.find((b) => b.id === activeBorrow.bookId) : null;
    const libraryOptions = books.filter((b) => b.issued < b.copies);
    const canteenOptions = canteenMenu.filter((i) => i.stock > 0);

    const handleTap = () => {
      const itemId = reader?.action === "library" ? (activeBorrow ? null : selItem)
        : reader?.action === "canteen" ? selItem
        : null;
      simulateScan(selStudent, selReader, itemId);
    };

    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <SectionTitle>Simulate a Tap</SectionTitle>
          <p className={`${T.textMuted} text-xs mb-4`}>No physical hardware yet — pick a card, a reader, and (when relevant) the exact item, then tap. Every module reacts live.</p>
          <div className="flex flex-col gap-3">
            <label className={`text-xs ${T.textMuted}`}>Student card</label>
            <select value={selStudent} onChange={(e) => setSelStudent(e.target.value)} className={`border rounded-xl px-3 py-2 text-sm ${T.inputBg}`}>
              {students.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.nfc}</option>)}
            </select>
            <label className={`text-xs ${T.textMuted} mt-2`}>Reader location</label>
            <select value={selReader} onChange={(e) => setSelReader(e.target.value)} className={`border rounded-xl px-3 py-2 text-sm ${T.inputBg}`}>
              {readers.map((r) => <option key={r.id} value={r.id}>{r.name} ({r.location})</option>)}
            </select>

            {reader?.action === "library" && (
              activeBorrow ? (
                <div className={`text-xs ${T.textMuted} border ${T.border} rounded-xl p-3 mt-1`}>
                  This student already has <span className={T.textPrimary}>"{borrowedBook?.title}"</span> checked out — tapping the Library Desk will return it.
                </div>
              ) : (
                <>
                  <label className={`text-xs ${T.textMuted} mt-2`}>Book to issue</label>
                  {libraryOptions.length === 0 ? (
                    <p className="text-xs text-amber-500">No copies available right now.</p>
                  ) : (
                    <select value={selItem} onChange={(e) => setSelItem(e.target.value)} className={`border rounded-xl px-3 py-2 text-sm ${T.inputBg}`}>
                      {libraryOptions.map((b) => <option key={b.id} value={b.id}>{b.title} ({b.copies - b.issued} left)</option>)}
                    </select>
                  )}
                </>
              )
            )}

            {reader?.action === "canteen" && (
              <>
                <label className={`text-xs ${T.textMuted} mt-2`}>Item to purchase</label>
                {canteenOptions.length === 0 ? (
                  <p className="text-xs text-amber-500">Everything is out of stock.</p>
                ) : (
                  <select value={selItem} onChange={(e) => setSelItem(e.target.value)} className={`border rounded-xl px-3 py-2 text-sm ${T.inputBg}`}>
                    {canteenOptions.map((i) => <option key={i.id} value={i.id}>{i.item} — Rs.{i.price} ({i.stock} left)</option>)}
                  </select>
                )}
              </>
            )}

            {reader?.action === "gate" && (
              <p className={`text-xs ${T.textMuted} mt-1`}>Gate taps automatically toggle check-in / check-out.</p>
            )}

            <Button className="mt-3" onClick={handleTap}>
              <span className="flex items-center gap-2"><ScanLine className="w-4 h-4" /> Tap Card</span>
            </Button>
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center gap-4">
          <NfcCard student={student} pulsing={pulseReader === selReader} />
          <div className={`flex items-center gap-2 ${T.textMuted} text-xs`}>
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
          <thead className={`${T.textMuted} text-xs uppercase`}>
            <tr><th className="text-left py-2">Name</th><th className="text-left">Class</th><th className="text-left">NFC UID</th><th className="text-left">Wallet</th><th className="text-left">Today</th></tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className={`border-t ${T.border}`}>
                <td className="py-2">{s.name}</td>
                <td>{s.cls}{s.sec}</td>
                <td className={`font-mono text-xs ${T.textMuted}`}>{s.nfc}</td>
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
            placeholder="Write a school-wide notice..." className={`w-full border rounded-xl p-3 text-sm mb-3 ${T.inputBg}`} />
          <Button disabled={!text.trim()} onClick={() => { onSend(text); setText(""); }}>
            <span className="flex items-center gap-2"><Megaphone className="w-4 h-4" /> Send to Students & Parents</span>
          </Button>
        </Card>
        <Card>
          <SectionTitle>Sent</SectionTitle>
          <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
            {announcements.length === 0 && <p className={`${T.textFaint} text-sm`}>Nothing sent yet.</p>}
            {announcements.map((a) => (
              <div key={a.id} className={`border-b ${T.border} pb-2`}>
                <p className={`${T.textPrimary} text-sm`}>{a.text}</p>
                <span className={`${T.textFaint} text-xs`}>{a.time}</span>
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
          <p className={`${T.textPrimary} text-2xl font-semibold`}>{todayPresent}</p>
          <p className={`${T.textMuted} text-sm`}>Students present today</p>
        </Card>
        <Card>
          <SectionTitle>Library</SectionTitle>
          <p className={`${T.textPrimary} text-2xl font-semibold`}>{booksIssued}</p>
          <p className={`${T.textMuted} text-sm`}>Books currently issued</p>
        </Card>
        <Card>
          <SectionTitle>Scan Activity</SectionTitle>
          <p className={`${T.textPrimary} text-2xl font-semibold`}>{scanLogs.length}</p>
          <p className={`${T.textMuted} text-sm`}>Recent NFC events</p>
        </Card>
      </div>
    );
  }

  if (nav === "Settings") {
    return (
      <Card>
        <SectionTitle>Admin Settings</SectionTitle>
        <div className={`flex flex-col gap-3 text-sm ${T.textSecondary}`}>
          <div className="flex justify-between">
            <span>Auto attendance updates</span>
            <span className={T.textMuted}>Enabled</span>
          </div>
          <div className="flex justify-between">
            <span>Library notifications</span>
            <span className={T.textMuted}>Enabled</span>
          </div>
          <div className="flex justify-between">
            <span>Canteen transaction log</span>
            <span className={T.textMuted}>Enabled</span>
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
          <p className={`${T.textFaint} text-sm`}>No canteen transactions yet.</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
            {canteenEvents.slice(0, 10).map((log) => {
              const student = students.find((s) => s.id === log.studentId);
              return (
                <div key={log.id} className={`flex justify-between items-center text-sm border-b ${T.border} py-2`}>
                  <div>
                    <p className={T.textPrimary}>{student?.name || "Unknown student"}</p>
                    <p className={`${T.textMuted} text-xs`}>{log.action}</p>
                  </div>
                  <span className={`${T.textFaint} text-xs`}>{log.time}</span>
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
          <p className={`${T.textFaint} text-sm`}>No incident reports submitted yet.</p>
        ) : (
          <div className="flex flex-col gap-3 max-h-[32rem] overflow-y-auto">
            {incidentReports.map((r) => (
              <div key={r.id} className={`border-b ${T.border} pb-3`}>
                <div className="flex items-center justify-between gap-2">
                  <p className={`${T.textPrimary} text-sm font-medium`}>{r.title}</p>
                  <Pill text={r.anonymous ? "Anonymous" : r.studentName} tone={r.anonymous ? "warn" : "info"} />
                </div>
                <p className={`${T.textMuted} text-sm mt-1`}>{r.description}</p>
                <span className={`${T.textFaint} text-xs`}>{r.time}</span>
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
  const { T } = useTheme();
  if (logs.length === 0) return <p className={`${T.textFaint} text-sm`}>No scans yet — try the NFC Simulator.</p>;
  return (
    <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
      {logs.slice(0, 20).map((l) => {
        const s = students.find((st) => st.id === l.studentId);
        return (
          <div key={l.id} className={`flex items-center justify-between text-sm border-b ${T.border} pb-2`}>
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span className={T.textSecondary}>{s?.name}</span>
              <span className={T.textFaint}>·</span>
              <span className={T.textMuted}>{l.reader}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={T.textMuted}>{l.action}</span>
              <span className={`${T.textFaint} text-xs`}>{l.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}


/* ---------------------------------- Teacher ---------------------------------- */


function TeacherViews({ nav, homework, onPush, messages, onSendMessage, students, incidentReports }) {
  const { T } = useTheme();
  const [msg, setMsg] = useState("");

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
            <div key={h.id} className={`flex items-center justify-between border-b ${T.border} pb-3`}>
              <div>
                <p className={`${T.textPrimary} text-sm font-medium`}>{h.title}</p>
                <p className={`${T.textMuted} text-xs`}>Due {h.due} · {h.status}</p>
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
          {messages.length === 0 && <p className={`${T.textFaint} text-sm`}>No messages yet.</p>}
          {messages.map((m) => (
            <div key={m.id} className={`text-sm px-3 py-2 rounded-xl max-w-md ${m.from === "Teacher" ? "bg-cyan-400 text-neutral-950 self-end" : `${T.tileBg} ${T.textPrimary}`}`}>
              {m.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Reply to parent..." className={`flex-1 border rounded-xl px-3 py-2 text-sm ${T.inputBg}`} />
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
                <div key={s.id} className={`flex items-center justify-between border-b ${T.border} py-2 text-sm`}>
                  <div>
                    <p className={T.textPrimary}>{s.name}</p>
                    <p className={`${T.textMuted} text-xs`}>{s.cls}{s.sec} · {s.roll}</p>
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
            <div key={s.id} className={`border-b ${T.border} pb-3`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`${T.textPrimary} text-sm font-medium`}>{s.name}</p>
                  <p className={`${T.textMuted} text-xs`}>{s.cls}{s.sec} · {s.roll}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(getStudentGrades(s.id)).map(([subject, grade]) => (
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
            <div key={s.id} className={`grid grid-cols-2 md:grid-cols-4 gap-3 border-b ${T.border} pb-3 text-sm`}>
              <div>
                <p className={T.textPrimary}>{s.name}</p>
                <p className={`${T.textMuted} text-xs`}>{s.cls}{s.sec} · {s.roll}</p>
              </div>
              <div className={T.textMuted}>Today: {s.today}</div>
              <div className={T.textMuted}>Wallet: Rs.{s.wallet}</div>
              <div className={T.textMuted}>Fee due: {Object.values(s.fees).filter((f) => f === "pending").length} items</div>
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
          <p className={`${T.textFaint} text-sm`}>No incident reports submitted yet.</p>
        ) : (
          <div className="flex flex-col gap-3 max-h-[32rem] overflow-y-auto">
            {incidentReports.map((r) => (
              <div key={r.id} className={`border-b ${T.border} pb-3`}>
                <div className="flex items-center justify-between gap-2">
                  <p className={`${T.textPrimary} text-sm font-medium`}>{r.title}</p>
                  <Pill text={r.anonymous ? "Anonymous" : r.studentName} tone={r.anonymous ? "warn" : "info"} />
                </div>
                <p className={`${T.textMuted} text-sm mt-1`}>{r.description}</p>
                <span className={`${T.textFaint} text-xs`}>{r.time}</span>
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
  const { T } = useTheme();
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportAnonymous, setReportAnonymous] = useState(false);
  const [showReportCard, setShowReportCard] = useState(false);
  const [feeMsg, setFeeMsg] = useState(null);

  if (!student) return null;
  const myRecords = libraryRecords.filter((r) => r.studentId === student.id);
  const myReports = incidentReports || [];

  const handlePay = (type) => {
    const res = onPayFee(type);
    if (res?.ok) setFeeMsg({ ok: true, text: `${type} fee paid successfully.` });
    else if (res?.reason === "funds") setFeeMsg({ ok: false, text: `Not enough wallet balance — needs Rs.${res.needed}, has Rs.${res.have}. Ask a parent to load your wallet.` });
    else setFeeMsg(null);
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
          {notifications.length === 0 && <p className={`${T.textFaint} text-sm`}>Nothing yet.</p>}
          {notifications.map((n) => <p key={n.id} className={`text-sm ${T.textSecondary} border-b ${T.border} pb-2 pt-1`}>{n.text} <span className={`${T.textFaint} text-xs`}>· {n.time}</span></p>)}
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
            <div key={m} className={`${T.tileBg} rounded-xl p-3 text-center`}>
              <p className={`${T.textMuted} text-xs`}>{m}</p>
              <p className={`${T.textPrimary} text-lg font-semibold`}>{student.attendance[i]}</p>
              <p className={`${T.textFaint} text-xs`}>/ {WORKING_DAYS[i]} days</p>
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
        {myRecords.length === 0 && <p className={`${T.textFaint} text-sm`}>No borrow history yet — try an NFC tap at the Library Desk.</p>}
        <div className="flex flex-col gap-2">
          {myRecords.map((r) => {
            const b = books.find((bk) => bk.id === r.bookId);
            return (
              <div key={r.id} className={`flex items-center justify-between border-b ${T.border} pb-2 text-sm`}>
                <span className={T.textPrimary}>{b?.title}</span>
                <span className={`${T.textMuted} text-xs`}>Issued {r.issued}</span>
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
              <div key={k} className={`flex items-center justify-between border-b ${T.border} pb-2`}>
                <span className={`capitalize text-sm ${T.textSecondary}`}>{k} <span className={T.textFaint}>· Rs.{FEE_AMOUNTS[k] || 0}</span></span>
                {v === "paid" ? <Pill text="Paid" tone="good" /> : (
                  <Button variant="ghost" onClick={() => handlePay(k)}>
                    <span className="flex items-center gap-2"><CreditCard className="w-3.5 h-3.5" /> Pay Now</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
          {feeMsg && <p className={`text-xs mt-3 ${feeMsg.ok ? "text-emerald-400" : "text-rose-400"}`}>{feeMsg.text}</p>}
        </Card>
        <Card>
          <SectionTitle>Wallet & Purchases</SectionTitle>
          <p className={`${T.textPrimary} text-2xl font-semibold mb-3`}>Rs.{student.wallet}</p>
          <div className="flex flex-col gap-2 max-h-56 overflow-y-auto">
            {transactions.length === 0 && <p className={`${T.textFaint} text-sm`}>No purchases yet.</p>}
            {transactions.map((t) => (
              <div key={t.id} className={`flex justify-between text-sm border-b ${T.border} pb-1`}>
                <span className={T.textSecondary}>{t.item}</span><span className={T.textMuted}>{t.place}</span><span className={T.textSecondary}>Rs.{t.price}</span>
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
    const grades = getStudentGrades(student.id);
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <div className="flex items-center justify-between mb-1">
            <SectionTitle>My Grades</SectionTitle>
            <Button variant="ghost" onClick={() => setShowReportCard(true)}>
              <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Report Card</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(grades).map(([subject, grade]) => (
              <div key={subject} className={`${T.tileBg} rounded-2xl p-4 text-center`}>
                <p className={`${T.textMuted} text-xs uppercase tracking-widest`}>{subject}</p>
                <p className={`${T.textPrimary} text-2xl font-semibold mt-2`}>{grade}</p>
              </div>
            ))}
          </div>
        </Card>
        {showReportCard && <ReportCardModal student={student} onClose={() => setShowReportCard(false)} />}
      </div>
    );
  }
  if (nav === "Announcements") {
    return (
      <Card>
        <SectionTitle>Announcements</SectionTitle>
        <div className="flex flex-col gap-3">
          {notifications.length === 0 ? (
            <p className={`${T.textFaint} text-sm`}>No announcements yet.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className={`border-b ${T.border} pb-2`}>
                <p className={`${T.textPrimary} text-sm`}>{n.text}</p>
                <span className={`${T.textFaint} text-xs`}>{n.time}</span>
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
          <p className={`${T.textMuted} text-sm mb-4`}>
            If you've witnessed or experienced an incident at school, let a teacher or admin know. Reports go straight to their notifications.
          </p>
          <Button onClick={() => setShowReportModal(true)}>
            <span className="flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Report an Incident</span>
          </Button>
        </Card>

        <Card>
          <SectionTitle>My Reports</SectionTitle>
          {myReports.length === 0 ? (
            <p className={`${T.textFaint} text-sm`}>You haven't submitted any reports yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {myReports.map((r) => (
                <div key={r.id} className={`border-b ${T.border} pb-3`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`${T.textPrimary} text-sm font-medium`}>{r.title}</p>
                    <Pill text={r.anonymous ? "Sent anonymously" : "Sent with your name"} tone={r.anonymous ? "info" : "neutral"} />
                  </div>
                  <p className={`${T.textMuted} text-sm mt-1`}>{r.description}</p>
                  <span className={`${T.textFaint} text-xs`}>{r.time}</span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {showReportModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
            <Card className="max-w-md w-full">
              <div className="flex justify-between items-center mb-3">
                <h3 className={`font-semibold ${T.textPrimary}`}>Report an Incident</h3>
                <button onClick={() => setShowReportModal(false)}>
                  <X className={`w-4 h-4 ${T.textMuted}`} />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <div className="space-y-1 text-sm">
                  <label className={T.textMuted}>Title</label>
                  <input
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="Brief title of the incident"
                    className={`w-full border rounded-2xl px-3 py-2 ${T.inputBg}`}
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label className={T.textMuted}>Description</label>
                  <textarea
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe what happened..."
                    className={`w-full border rounded-2xl px-3 py-2 ${T.inputBg}`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setReportAnonymous((v) => !v)}
                  className={`flex items-center gap-2 text-sm ${T.textSecondary} mt-1`}
                >
                  <span className={`w-9 h-5 rounded-full flex items-center px-0.5 transition ${reportAnonymous ? "bg-cyan-400 justify-end" : "bg-neutral-700 justify-start"}`}>
                    <span className="w-4 h-4 bg-neutral-950 rounded-full" />
                  </span>
                  Send anonymously
                </button>
                <p className={`${T.textFaint} text-xs -mt-2`}>Your name will be hidden from teachers and admins if this is on.</p>
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


function ParentViews({ nav, student, notifications, scanLogs, messages, onSendMessage, onPayFee, onPayAllFees, onLoadWallet, reportOpen, setReportOpen, walletModalOpen, setWalletModalOpen }) {
  const { T } = useTheme();
  const [msg, setMsg] = useState("");
  const [feeMsg, setFeeMsg] = useState(null);
  if (!student) return null;

  const handlePay = (type) => {
    const res = onPayFee(type);
    if (res?.ok) setFeeMsg({ ok: true, text: `${type} fee paid successfully.` });
    else if (res?.reason === "funds") setFeeMsg({ ok: false, text: `Not enough wallet balance — needs Rs.${res.needed}, has Rs.${res.have}. Try loading the wallet.` });
    else setFeeMsg(null);
  };

  const handlePayAll = () => {
    const res = onPayAllFees();
    if (res?.ok) setFeeMsg({ ok: true, text: res.total ? `All pending fees (Rs.${res.total}) paid.` : `No pending fees.` });
    else if (res?.reason === "funds") setFeeMsg({ ok: false, text: `Not enough wallet balance — needs Rs.${res.needed}, has Rs.${res.have}. Try loading the wallet.` });
    else setFeeMsg(null);
  };

  if (nav === "Overview") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard icon={CheckCircle2} label="Today" value={student.today} tint={student.today === "present" ? "bg-emerald-400" : "bg-neutral-600"} />
        <StatCard icon={Clock} label="Check-in" value={student.inTime || "—"} tint="bg-cyan-400" />
        <StatCard icon={AlertCircle} label="Fee Balance" value={`Rs.${student.feeBalance}`} tint="bg-amber-400" />
        <Card className="col-span-2 md:col-span-3">
          <SectionTitle>Recent Notifications</SectionTitle>
          <div className="flex flex-col gap-2 max-h-56 overflow-y-auto">
            {notifications.length === 0 && <p className={`${T.textFaint} text-sm`}>Nothing yet.</p>}
            {notifications.map((n) => <p key={n.id} className={`text-sm ${T.textSecondary} border-b ${T.border} pb-2`}>{n.text} <span className={`${T.textFaint} text-xs`}>· {n.time}</span></p>)}
          </div>
        </Card>
      </div>
    );
  }
  if (nav === "NFC Activity") {
    return (
      <Card>
        <SectionTitle>{student.name}'s NFC Card Activity</SectionTitle>
        {scanLogs.length === 0 && <p className={`${T.textFaint} text-sm`}>No card activity yet.</p>}
        <div className="flex flex-col gap-2">
          {scanLogs.map((l) => (
            <div key={l.id} className={`flex justify-between text-sm border-b ${T.border} pb-2`}>
              <span className="flex items-center gap-2"><Radio className="w-3.5 h-3.5 text-cyan-400" />{l.reader}</span>
              <span className={T.textMuted}>{l.action}</span>
              <span className={`${T.textFaint} text-xs`}>{l.time}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  if (nav === "Fees") {
    const pendingCount = Object.values(student.fees).filter((v) => v === "pending").length;
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <SectionTitle>Fee Payments</SectionTitle>
          <div className="flex flex-col gap-2">
            {Object.entries(student.fees).map(([k, v]) => (
              <div key={k} className={`flex items-center justify-between border-b ${T.border} pb-2`}>
                <span className={`capitalize text-sm ${T.textSecondary}`}>{k} <span className={T.textFaint}>· Rs.{FEE_AMOUNTS[k] || 0}</span></span>
                {v === "paid" ? <Pill text="Paid" tone="good" /> : <Button variant="ghost" onClick={() => handlePay(k)}>Pay Now</Button>}
              </div>
            ))}
          </div>
          {feeMsg && <p className={`text-xs mt-3 ${feeMsg.ok ? "text-emerald-400" : "text-rose-400"}`}>{feeMsg.text}</p>}
          {pendingCount > 0 && (
            <Button className="mt-4 w-full" onClick={handlePayAll}>
              Pay All Pending Fees
            </Button>
          )}
        </Card>
        <Card>
          <SectionTitle>Wallet</SectionTitle>
          <p className={`${T.textPrimary} text-2xl font-semibold mb-1`}>Rs.{student.wallet}</p>
          <p className={`${T.textMuted} text-xs mb-4`}>Available balance for fees and canteen purchases.</p>
          <Button onClick={() => setWalletModalOpen(true)} className="w-full mb-3">
            <span className="flex items-center gap-2 justify-center"><Wallet className="w-4 h-4" /> Load Wallet</span>
          </Button>
          <Button variant="ghost" onClick={() => setReportOpen(true)} className="w-full">
            <span className="flex items-center gap-2 justify-center"><FileText className="w-4 h-4" /> Download Report Card</span>
          </Button>
        </Card>
        {reportOpen && <ReportCardModal student={student} onClose={() => setReportOpen(false)} />}
        {walletModalOpen && (
          <LoadWalletModal
            student={student}
            onLoad={(amt) => onLoadWallet(amt)}
            onClose={() => setWalletModalOpen(false)}
          />
        )}
      </div>
    );
  }
  if (nav === "Messages") {
    return (
      <Card>
        <SectionTitle>Message the Teacher</SectionTitle>
        <div className="flex flex-col gap-2 max-h-72 overflow-y-auto mb-3">
          {messages.length === 0 && <p className={`${T.textFaint} text-sm`}>No messages yet.</p>}
          {messages.map((m) => (
            <div key={m.id} className={`text-sm px-3 py-2 rounded-xl max-w-md ${m.from === "Parent" ? "bg-cyan-400 text-neutral-950 self-end" : `${T.tileBg} ${T.textPrimary}`}`}>{m.text}</div>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Message the teacher..." className={`flex-1 border rounded-xl px-3 py-2 text-sm ${T.inputBg}`} />
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
            <p className={`${T.textFaint} text-sm`}>No announcements yet.</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className={`border-b ${T.border} pb-2`}>
                <p className={`${T.textPrimary} text-sm`}>{n.text}</p>
                <span className={`${T.textFaint} text-xs`}>{n.time}</span>
              </div>
            ))
          )}
        </div>
      </Card>
    );
  }
  return null;
}


/* ---------------------------------- Librarian ---------------------------------- */


function LibrarianViews({ nav, students, books, libraryRecords, onIssue, onReturn }) {
  const { T } = useTheme();
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
          <select value={selStudent} onChange={(e) => setSelStudent(e.target.value)} className={`w-full border rounded-xl px-3 py-2 text-sm mb-2 ${T.inputBg}`}>
            {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select value={selBook} onChange={(e) => setSelBook(e.target.value)} className={`w-full border rounded-xl px-3 py-2 text-sm mb-3 ${T.inputBg}`}>
            {books.filter((b) => b.issued < b.copies).map((b) => <option key={b.id} value={b.id}>{b.title} ({b.copies - b.issued} left)</option>)}
          </select>
          <Button onClick={() => onIssue(selStudent, selBook)}>Issue Book</Button>
        </Card>
        <Card>
          <SectionTitle>Return for Selected Student</SectionTitle>
          {activeForStudent ? (
            <div className="flex items-center justify-between">
              <span className={`text-sm ${T.textPrimary}`}>{books.find((b) => b.id === activeForStudent.bookId)?.title}</span>
              <Button variant="ghost" onClick={() => onReturn(activeForStudent.id, activeForStudent.bookId, selStudent)}>Return</Button>
            </div>
          ) : <p className={`${T.textFaint} text-sm`}>No active borrow for this student.</p>}
          <div className="mt-4">
            <SectionTitle>All Active Borrows</SectionTitle>
            {activeBorrows.length === 0 ? (
              <p className={`${T.textFaint} text-sm`}>No active borrows at the moment.</p>
            ) : (
              activeBorrows.map((r) => (
                <div key={r.id} className={`flex justify-between text-sm border-b ${T.border} py-1`}>
                  <span className={T.textSecondary}>{students.find((s) => s.id === r.studentId)?.name}</span>
                  <span className={T.textMuted}>{books.find((b) => b.id === r.bookId)?.title}</span>
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
          <thead className={`${T.textMuted} text-xs uppercase`}><tr><th className="text-left py-2">Title</th><th className="text-left">Author</th><th className="text-left">Copies</th><th className="text-left">Available</th></tr></thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id} className={`border-t ${T.border}`}>
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
              <div key={s.id} className={`flex items-center justify-between border-b ${T.border} py-2 text-sm`}>
                <div>
                  <p className={T.textPrimary}>{s.name}</p>
                  <p className={`${T.textMuted} text-xs`}>Class {s.cls}{s.sec}</p>
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
            <p className={`${T.textFaint} text-sm`}>No active borrowed books right now.</p>
          ) : (
            activeBorrows.map((r) => (
              <div key={r.id} className={`flex justify-between border-b ${T.border} py-2 text-sm`}>
                <span className={T.textSecondary}>{students.find((s) => s.id === r.studentId)?.name}</span>
                <span className={T.textMuted}>{books.find((b) => b.id === r.bookId)?.title}</span>
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
        <div className={`flex flex-col gap-3 text-sm ${T.textSecondary}`}>
          <div className="flex justify-between">
            <span>Auto issue confirmation</span>
            <span className={T.textMuted}>Enabled</span>
          </div>
          <div className="flex justify-between">
            <span>Return reminders</span>
            <span className={T.textMuted}>Enabled</span>
          </div>
          <div className="flex justify-between">
            <span>Catalog sync</span>
            <span className={T.textMuted}>Live</span>
          </div>
        </div>
      </Card>
    );
  }
  return null;
}


/* ---------------------------------- Canteen ---------------------------------- */


const CHART_COLORS = ["#22d3ee", "#a78bfa", "#fbbf24", "#34d399", "#fb7185", "#60a5fa"];

function CanteenViews({ nav, students, canteenMenu, transactions, staff, sellItem, restockItem }) {
  const { T, theme } = useTheme();
  const [selStudent, setSelStudent] = useState(students[0]?.id || "");
  const [selItem, setSelItem] = useState(canteenMenu[0]?.id || "");
  const [posMsg, setPosMsg] = useState(null);
  const [pulsing, setPulsing] = useState(false);

  const salesByItem = useMemo(() => {
    const map = {};
    transactions.forEach((t) => { map[t.item] = (map[t.item] || 0) + t.price; });
    return Object.entries(map).map(([item, revenue]) => ({ item, revenue })).sort((a, b) => b.revenue - a.revenue);
  }, [transactions]);

  const salesByCategory = useMemo(() => {
    const map = {};
    transactions.forEach((t) => {
      const menuItem = canteenMenu.find((m) => m.item === t.item);
      const cat = menuItem?.category || "Other";
      map[cat] = (map[cat] || 0) + t.price;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [transactions, canteenMenu]);

  const totalRevenue = transactions.reduce((a, t) => a + t.price, 0);
  const totalItemsSold = transactions.length;
  const avgSale = totalItemsSold ? Math.round(totalRevenue / totalItemsSold) : 0;
  const lowStock = canteenMenu.filter((m) => m.stock <= 5);

  const tooltipStyle = { background: T.chartTooltipBg, border: `1px solid ${T.gridLine}`, borderRadius: 12, fontSize: 12, color: theme === "dark" ? "#e5e5e5" : "#171717" };

  const handleSell = () => {
    const item = canteenMenu.find((m) => m.id === selItem);
    const res = sellItem(selStudent, selItem, "pos");
    if (res.ok) {
      setPosMsg({ ok: true, text: `Sold ${item?.item} for Rs.${item?.price}.` });
      setPulsing(true);
      setTimeout(() => setPulsing(false), 900);
    } else if (res.reason === "funds") {
      setPosMsg({ ok: false, text: `Insufficient wallet balance — needs Rs.${res.needed}, has Rs.${res.have}.` });
    } else if (res.reason === "stock") {
      setPosMsg({ ok: false, text: `${item?.item} is out of stock.` });
    } else {
      setPosMsg({ ok: false, text: `Could not complete the sale.` });
    }
  };

  if (nav === "Overview") {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={DollarSign} label="Total Revenue" value={`Rs.${totalRevenue}`} tint="bg-emerald-400" />
          <StatCard icon={ShoppingCart} label="Items Sold" value={totalItemsSold} tint="bg-cyan-400" />
          <StatCard icon={TrendingUp} label="Avg. Sale" value={`Rs.${avgSale}`} tint="bg-violet-400" />
          <StatCard icon={AlertCircle} label="Low Stock Items" value={lowStock.length} tint="bg-amber-400" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <SectionTitle>Revenue by Item</SectionTitle>
            {salesByItem.length === 0 ? (
              <p className={`${T.textFaint} text-sm`}>No sales yet — try a tap at the Canteen Counter in the NFC Simulator, or ring one up below.</p>
            ) : (
              <div style={{ width: "100%", height: 220 }}>
                <recharts.ResponsiveContainer>
                  <recharts.BarChart data={salesByItem} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}>
                    <recharts.CartesianGrid strokeDasharray="3 3" stroke={T.gridLine} />
                    <recharts.XAxis dataKey="item" tick={{ fill: T.axisText, fontSize: 10 }} interval={0} angle={-20} textAnchor="end" height={50} />
                    <recharts.YAxis tick={{ fill: T.axisText, fontSize: 11 }} />
                    <recharts.Tooltip contentStyle={tooltipStyle} />
                    <recharts.Bar dataKey="revenue" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                  </recharts.BarChart>
                </recharts.ResponsiveContainer>
              </div>
            )}
          </Card>
          <Card>
            <SectionTitle>Live Tap Feed</SectionTitle>
            <div className="flex flex-col gap-2 max-h-56 overflow-y-auto">
              {transactions.length === 0 && <p className={`${T.textFaint} text-sm`}>Nothing sold yet.</p>}
              {transactions.slice(0, 8).map((t) => {
                const s = students.find((st) => st.id === t.studentId);
                return (
                  <div key={t.id} className={`flex items-center justify-between text-sm border-b ${T.border} pb-2`}>
                    <div className="flex items-center gap-2">
                      {t.source === "nfc" ? <Nfc className="w-3.5 h-3.5 text-cyan-400" /> : <ShoppingCart className="w-3.5 h-3.5 text-violet-400" />}
                      <span className={T.textSecondary}>{s?.name}</span>
                      <span className={T.textFaint}>·</span>
                      <span className={T.textMuted}>{t.item}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={T.textSecondary}>Rs.{t.price}</span>
                      <span className={`${T.textFaint} text-xs`}>{t.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (nav === "Menu") {
    return (
      <Card>
        <SectionTitle>Canteen Menu</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {canteenMenu.map((m) => (
            <div key={m.id} className={`flex items-center justify-between border ${T.border} rounded-xl p-3`}>
              <div>
                <p className={`${T.textPrimary} text-sm font-medium`}>{m.item}</p>
                <p className={`${T.textMuted} text-xs`}>{m.category} · Rs.{m.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <Pill text={`${m.stock} in stock`} tone={m.stock <= 5 ? "warn" : "good"} />
                <button onClick={() => restockItem(m.id, 10)} className={`p-2 rounded-lg transition ${T.ghostBtn}`} title="Restock +10">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (nav === "Sales") {
    const activeItem = canteenMenu.find((m) => m.id === selItem);
    const activeStudentSel = students.find((s) => s.id === selStudent);
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <SectionTitle>Sell at Counter</SectionTitle>
          <p className={`${T.textMuted} text-xs mb-4`}>Tap a student's card and ring up an item — wallet balance and stock update instantly.</p>
          <div className="flex flex-col gap-3">
            <label className={`text-xs ${T.textMuted}`}>Student</label>
            <select value={selStudent} onChange={(e) => setSelStudent(e.target.value)} className={`border rounded-xl px-3 py-2 text-sm ${T.inputBg}`}>
              {students.map((s) => <option key={s.id} value={s.id}>{s.name} — Rs.{s.wallet}</option>)}
            </select>
            <label className={`text-xs ${T.textMuted} mt-2`}>Item</label>
            <select value={selItem} onChange={(e) => setSelItem(e.target.value)} className={`border rounded-xl px-3 py-2 text-sm ${T.inputBg}`}>
              {canteenMenu.map((m) => (
                <option key={m.id} value={m.id} disabled={m.stock <= 0}>
                  {m.item} — Rs.{m.price} {m.stock <= 0 ? "(out of stock)" : `(${m.stock} left)`}
                </option>
              ))}
            </select>
            <Button className="mt-3" onClick={handleSell}>
              <span className="flex items-center gap-2"><Nfc className="w-4 h-4" /> Charge Card</span>
            </Button>
            {posMsg && <p className={`text-xs mt-1 ${posMsg.ok ? "text-emerald-400" : "text-rose-400"}`}>{posMsg.text}</p>}
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center gap-4">
          <NfcCard student={activeStudentSel} pulsing={pulsing} />
          {activeItem && <p className={`${T.textMuted} text-sm`}>Ringing up <span className={T.textPrimary}>{activeItem.item}</span> · Rs.{activeItem.price}</p>}
        </Card>
        <Card className="md:col-span-2">
          <SectionTitle>Transaction History</SectionTitle>
          {transactions.length === 0 ? (
            <p className={`${T.textFaint} text-sm`}>No sales recorded yet.</p>
          ) : (
            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
              {transactions.map((t) => {
                const s = students.find((st) => st.id === t.studentId);
                return (
                  <div key={t.id} className={`flex items-center justify-between text-sm border-b ${T.border} pb-2`}>
                    <div className="flex items-center gap-2">
                      {t.source === "nfc" ? <Nfc className="w-3.5 h-3.5 text-cyan-400" /> : <ShoppingCart className="w-3.5 h-3.5 text-violet-400" />}
                      <span className={T.textSecondary}>{s?.name}</span>
                    </div>
                    <span className={T.textMuted}>{t.item}</span>
                    <span className={T.textSecondary}>Rs.{t.price}</span>
                    <span className={`${T.textFaint} text-xs`}>{t.time}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    );
  }

  if (nav === "Staff") {
    return (
      <Card>
        <SectionTitle>Canteen Staff</SectionTitle>
        <table className="w-full text-sm">
          <thead className={`${T.textMuted} text-xs uppercase`}>
            <tr><th className="text-left py-2">Name</th><th className="text-left">Role</th><th className="text-left">Shift</th></tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id} className={`border-t ${T.border}`}>
                <td className="py-2">{s.name}</td><td>{s.role}</td><td>{s.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    );
  }

  if (nav === "Reports") {
    const topItem = salesByItem[0];
    return (
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={DollarSign} label="Total Revenue" value={`Rs.${totalRevenue}`} tint="bg-emerald-400" />
          <StatCard icon={Store} label="Best Seller" value={topItem ? topItem.item : "—"} tint="bg-cyan-400" />
          <StatCard icon={AlertCircle} label="Low Stock" value={lowStock.length} tint="bg-amber-400" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <SectionTitle>Revenue by Category</SectionTitle>
            {salesByCategory.length === 0 ? (
              <p className={`${T.textFaint} text-sm`}>No sales yet.</p>
            ) : (
              <div style={{ width: "100%", height: 240 }}>
                <recharts.ResponsiveContainer>
                  <recharts.PieChart>
                    <recharts.Pie data={salesByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {salesByCategory.map((entry, idx) => <recharts.Cell key={entry.name} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                    </recharts.Pie>
                    <recharts.Tooltip contentStyle={tooltipStyle} />
                    <recharts.Legend wrapperStyle={{ fontSize: 11, color: T.axisText }} />
                  </recharts.PieChart>
                </recharts.ResponsiveContainer>
              </div>
            )}
          </Card>
          <Card>
            <SectionTitle>Low Stock Alerts</SectionTitle>
            {lowStock.length === 0 ? (
              <p className={`${T.textFaint} text-sm`}>All items are well stocked.</p>
            ) : (
              <div className="flex flex-col gap-2">
                {lowStock.map((m) => (
                  <div key={m.id} className={`flex items-center justify-between text-sm border-b ${T.border} pb-2`}>
                    <span className={T.textSecondary}>{m.item}</span>
                    <Pill text={`${m.stock} left`} tone="warn" />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
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
  @media print {
    body * { visibility: hidden; }
    .print-area, .print-area * { visibility: visible; }
    .print-area { position: absolute; top: 0; left: 0; width: 100%; margin: 0; box-shadow: none !important; }
    .no-print { display: none !important; }
  }
`;