

/// compile: g++ -std=c++17 -o admin admin.cpp && ./admin

#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <iomanip>
#include <map>
#include <set>
using namespace std;

// ═══════════════════════════════════════════════════════════════════
//  CSV PARSER
// ═══════════════════════════════════════════════════════════════════

vector<string> parseCSVRow(const string& line) {
    vector<string> fields;
    string field;
    bool inQuotes = false;
    for (int i = 0; i < (int)line.size(); i++) {
        char c = line[i];
        if (c == '"') {
            if (inQuotes && i + 1 < (int)line.size() && line[i+1] == '"') {
                field += '"'; i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (c == ',' && !inQuotes) {
            fields.push_back(field); field = "";
        } else {
            field += c;
        }
    }
    fields.push_back(field);
    return fields;
}

// ═══════════════════════════════════════════════════════════════════
//  PRICE MANAGER  — writes prices.json, read by indx.js on page load
// ═══════════════════════════════════════════════════════════════════

struct CarConfig {
    string brand;
    double price;
    double discountPct;
    string note;
};

class PriceManager {
    vector<CarConfig> cars = {
        {"Mustang",    69000000, 0, ""},
        {"720s",       30000000, 0, ""},
        {"Challenger",  5000000, 0, ""},
        {"M3 CS",       4000000, 0, ""},
        {"E-Tron",     69000000, 0, ""},
    };

    double readDoubleField(const string& json, size_t blockStart, const string& field) const {
        size_t fp = json.find("\"" + field + "\"", blockStart);
        if (fp == string::npos || fp > blockStart + 400) return -1;
        size_t colon = json.find(":", fp);
        if (colon == string::npos) return -1;
        try { return stod(json.substr(colon + 1, 40)); }
        catch (...) { return -1; }
    }

    string readStringField(const string& json, size_t blockStart, const string& field) const {
        size_t fp = json.find("\"" + field + "\"", blockStart);
        if (fp == string::npos || fp > blockStart + 400) return "";
        size_t q1 = json.find("\"", fp + field.size() + 3);
        size_t q2 = json.find("\"", q1 + 1);
        if (q1 == string::npos || q2 == string::npos) return "";
        return json.substr(q1 + 1, q2 - q1 - 1);
    }

public:
    void loadFromFile(const string& path = "prices.json") {
        ifstream f(path);
        if (!f.is_open()) return;
        string json((istreambuf_iterator<char>(f)), istreambuf_iterator<char>());
        f.close();
        for (auto& car : cars) {
            size_t pos = json.find("\"" + car.brand + "\"");
            if (pos == string::npos) continue;
            double p = readDoubleField(json, pos, "price");
            double d = readDoubleField(json, pos, "discountPct");
            string n = readStringField(json, pos, "note");
            if (p > 0)      car.price       = p;
            if (d >= 0)     car.discountPct = d;
            if (!n.empty()) car.note        = n;
        }
        cout << "Loaded prices.json ✓\n";
    }

    void saveToFile(const string& path = "prices.json") const {
        ofstream f(path);
        if (!f.is_open()) { cout << "Error: cannot write " << path << "\n"; return; }
        f << fixed << setprecision(2);
        f << "{\n";
        for (int i = 0; i < (int)cars.size(); i++) {
            const auto& c = cars[i];
            double discRs   = c.price * (c.discountPct / 100.0);
            double finalPrc = c.price - discRs;
            f << "  \"" << c.brand << "\": {\n"
              << "    \"price\": "       << c.price       << ",\n"
              << "    \"discountPct\": " << c.discountPct << ",\n"
              << "    \"discountRs\": "  << discRs        << ",\n"
              << "    \"finalPrice\": "  << finalPrc      << ",\n"
              << "    \"note\": \""      << c.note        << "\"\n"
              << "  }" << (i < (int)cars.size()-1 ? "," : "") << "\n";
        }
        f << "}\n";
        f.close();
        cout << "prices.json saved ✓  (frontend picks up on next page load)\n";
    }

    void display() const {
        cout << fixed << setprecision(2) << "\n" << left
             << setw(14) << "Brand"
             << setw(16) << "Base (Rs.)"
             << setw(12) << "Discount%"
             << setw(16) << "Off (Rs.)"
             << setw(16) << "Final (Rs.)"
             << "Note\n" << string(82, '-') << "\n";
        for (const auto& c : cars) {
            double discRs = c.price * (c.discountPct / 100.0);
            cout << left << setw(14) << c.brand
                 << setw(16) << c.price
                 << setw(12) << c.discountPct
                 << setw(16) << discRs
                 << setw(16) << (c.price - discRs)
                 << c.note << "\n";
        }
    }

    CarConfig* find(const string& brand) {
        for (auto& c : cars)
            if (c.brand == brand) return &c;
        return nullptr;
    }

    void editOne() {
        display();
        cout << "\nBrands: Mustang | 720s | Challenger | M3 CS | E-Tron\nBrand: ";
        string brand; cin >> brand;
        if (brand == "M3") { string r; cin >> r; brand += " " + r; }
        CarConfig* car = find(brand);
        if (!car) { cout << "Not found.\n"; return; }
        cout << "Base price (Rs." << car->price << ", 0=keep): ";
        double p; cin >> p;
        if (p > 0) car->price = p;
        cout << "Discount % (current: " << car->discountPct << ", 0=remove): ";
        double d; cin >> d;
        if (d >= 0 && d <= 100) car->discountPct = d;
        cout << "Note (Enter=keep): "; cin.ignore();
        string note; getline(cin, note);
        if (!note.empty()) car->note = note;
        double discRs = car->price * (car->discountPct / 100.0);
        cout << "→ " << brand << "  Final: Rs." << fixed << setprecision(2) << (car->price - discRs) << "\n";
        saveToFile();
    }

    void bulkDiscount() {
        cout << "Discount % for ALL cars (0=clear all): ";
        double pct; cin >> pct;
        if (pct < 0 || pct > 100) { cout << "Must be 0-100.\n"; return; }
        for (auto& c : cars) c.discountPct = pct;
        cout << "All cars set to " << pct << "%\n";
        saveToFile();
    }
};

// ═══════════════════════════════════════════════════════════════════
//  STOCK MANAGER
// ═══════════════════════════════════════════════════════════════════

class StockManager {
    struct Entry { string brand; int qty; };
    vector<Entry> stock = {
        {"Mustang",2},{"720s",1},{"Challenger",5},{"M3 CS",4},{"E-Tron",3}
    };

    Entry* find(const string& b) {
        for (auto& s : stock) if (s.brand == b) return &s;
        return nullptr;
    }

public:
    void display() const {
        cout << "\n--- Stock Levels ---\n";
        for (const auto& s : stock)
            cout << left << setw(14) << s.brand << s.qty << " unit(s)\n";
    }

    void setQty() {
        display();
        cout << "Brand: "; string b; cin >> b;
        if (b == "M3") { string r; cin >> r; b += " " + r; }
        cout << "New qty: "; int q; cin >> q;
        Entry* e = find(b);
        if (!e) { cout << "Not found.\n"; return; }
        e->qty = q;
        cout << b << " stock set to " << q << "\n";
    }

    void adjust() {
        display();
        cout << "Brand: "; string b; cin >> b;
        if (b == "M3") { string r; cin >> r; b += " " + r; }
        cout << "Adjustment (+/-): "; int d; cin >> d;
        Entry* e = find(b);
        if (!e) { cout << "Not found.\n"; return; }
        if (e->qty + d < 0) { cout << "Would go negative.\n"; return; }
        e->qty += d;
        cout << b << " stock: " << e->qty << "\n";
    }
};

// ═══════════════════════════════════════════════════════════════════
//  SALES LOG READER
// ═══════════════════════════════════════════════════════════════════

struct SaleRecord {
    string dateTime, name, phone, email, address, bankAcct;
    string model, fuelType, colour, wheelSize, paymentMode;
    string exShowroom, discount, gstRate, gstAmount, totalPrice;
};

class SalesLogReader {
    vector<SaleRecord> records;

public:
    bool load(const string& path = "sales_log.csv") {
        records.clear();
        ifstream f(path);
        if (!f.is_open()) { cout << "Cannot open " << path << "\n"; return false; }
        string line;
        while (getline(f, line)) {
            if (line.empty()) continue;
            auto col = parseCSVRow(line);
            if ((int)col.size() < 16) continue;
            records.push_back({col[0],col[1],col[2],col[3],col[4],col[5],
                                col[6],col[7],col[8],col[9],col[10],
                                col[11],col[12],col[13],col[14],col[15]});
        }
        f.close();
        cout << records.size() << " record(s) loaded.\n";
        return true;
    }






// ADD after bool load(...) { ... }
bool loadAll(const vector<string>& paths) {
    records.clear();
    set<string> seen;
    int total = 0;
    for (const auto& path : paths) {
        ifstream f(path);
        if (!f.is_open()) { cout << "Skipping: " << path << "\n"; continue; }
        string line;
        while (getline(f, line)) {
            if (line.empty()) continue;
            auto col = parseCSVRow(line);
            if ((int)col.size() < 16) continue;
            if (seen.count(col[0])) continue;
            seen.insert(col[0]);
            records.push_back({col[0],col[1],col[2],col[3],col[4],col[5],
                                col[6],col[7],col[8],col[9],col[10],
                                col[11],col[12],col[13],col[14],col[15]});
            total++;
        }
        f.close();
    }
    cout << total << " unique record(s) loaded.\n";
    return total > 0;
}





    void showAll() const {
        if (records.empty()) { cout << "No records.\n"; return; }
        cout << "\n" << left
             << setw(4)  << "#"
             << setw(22) << "Date/Time"
             << setw(18) << "Name"
             << setw(14) << "Model"
             << setw(12) << "Mode"
             << "Total (Rs.)\n" << string(80, '-') << "\n";
        for (int i = 0; i < (int)records.size(); i++) {
            const auto& r = records[i];
            cout << left << setw(4)  << i+1
                 << setw(22) << r.dateTime.substr(0,20)
                 << setw(18) << r.name
                 << setw(14) << r.model
                 << setw(12) << r.paymentMode
                 << r.totalPrice << "\n";
        }
    }

    void showDetail(int idx) const {
        if (idx < 1 || idx > (int)records.size()) { cout << "Invalid.\n"; return; }
        const auto& r = records[idx-1];
        cout << "\n════ Record #" << idx << " ════\n"
             << "Date/Time     : " << r.dateTime    << "\n"
             << "Name          : " << r.name        << "\n"
             << "Phone         : " << r.phone       << "\n"
             << "Email         : " << r.email       << "\n"
             << "Address       : " << r.address     << "\n"
             << "Bank Acct     : " << r.bankAcct    << "\n"
             << "Model         : " << r.model << "  (" << r.fuelType << ")\n"
             << "Colour        : " << r.colour      << "\n"
             << "Wheel Size    : " << r.wheelSize   << "\n"
             << "Payment Mode  : " << r.paymentMode << "\n"
             << "Ex-Showroom   : Rs." << r.exShowroom << "\n"
             << "Discount      : Rs." << r.discount    << "\n"
             << "GST (" << r.gstRate << "%)   : Rs." << r.gstAmount << "\n"
             << "Total Price   : Rs." << r.totalPrice  << "\n";
    }

    void stats() const {
        if (records.empty()) { cout << "No records.\n"; return; }
        map<string,int>    cnt;
        map<string,double> rev;
        double total = 0;
        for (const auto& r : records) {
            cnt[r.model]++;
            double p = 0; try { p = stod(r.totalPrice); } catch(...) {}
            rev[r.model] += p; total += p;
        }
        cout << "\n--- Sales Statistics ---\n"
             << left << setw(16) << "Model" << setw(8) << "Sales" << "Revenue\n"
             << string(42, '-') << "\n";
        for (const auto& kv : cnt)
            cout << left << setw(16) << kv.first << setw(8) << kv.second
                 << fixed << setprecision(2) << "Rs." << rev[kv.first] << "\n";
        cout << string(42,'-') << "\n"
             << "Total: " << records.size() << " sale(s)   "
             << "Revenue: Rs." << fixed << setprecision(2) << total << "\n";
    }

    void generateReceipts(const string& csvPath, const string& outPath) const {
    ifstream csv(csvPath);
    if (!csv.is_open()) { cout << "Cannot open " << csvPath << "\n"; return; }
    ofstream txt(outPath,ios::out);  
    if (!txt.is_open()) { cout << "Cannot open " << outPath << "\n"; return; }
    string line; int count = 0;
    while (getline(csv, line)) {
        if (line.empty()) continue;
        auto f = parseCSVRow(line);
        if ((int)f.size() < 16) continue;

        cout << "Fields: " << f.size() << endl;
        txt << "========================================\n"
            << "  M MOTORS — BOOKING CONFIRMATION\n"
            << "========================================\n"
            << "Date & Time   : " << f[0]  << "\n\n"
            << "── CUSTOMER DETAILS ──\n"
            << "Name          : " << f[1]  << "\n"
            << "Phone         : " << f[2]  << "\n"
            << "Email         : " << f[3]  << "\n"
            << "Address       : " << f[4]  << "\n"
            << "Bank Acct No  : " << f[5]  << "\n\n"
            << "── CAR DETAILS ──\n"
            << "Model         : " << f[6]  << "\n"
            << "Fuel Type     : " << f[7]  << "\n"
            << "Colour        : " << f[8]  << "\n"
            << "Wheel Size    : " << f[9]  << "\n\n"
            << "── PAYMENT DETAILS ──\n"
            << "Payment Mode  : " << f[10] << "\n"
            << "Ex-Showroom   : " << f[11] << "\n"
            << "Discount      : " << f[12] << "\n"
            << "GST (" << f[13] << "%)   : " << f[14] << "\n"
            << "Total Price   : " << f[15] << "\n"
            << "========================================\n\n";
        count++;
    }


    csv.close();
   
    txt.close();
    cout << count << " receipt(s) → " << outPath << "\n";


        
}



// ADD this overload after existing generateReceipts
void generateReceipts(const vector<string>& paths, const string& outPath) const {
    ofstream txt(outPath, ios::out);
    if (!txt.is_open()) { cout << "Cannot open " << outPath << "\n"; return; }
    int count = 0;
    for (const auto& csvPath : paths) {
        ifstream csv(csvPath);
        if (!csv.is_open()) { cout << "Skipping: " << csvPath << "\n"; continue; }
        string line;
        while (getline(csv, line)) {
            if (line.empty()) continue;
            auto f = parseCSVRow(line);
            if ((int)f.size() < 16) continue;
            txt << "========================================\n"
                << "  M MOTORS — BOOKING CONFIRMATION\n"
                << "========================================\n"
                << "Date & Time   : " << f[0]  << "\n\n"
                << "── CUSTOMER DETAILS ──\n"
                << "Name          : " << f[1]  << "\n"
                << "Phone         : " << f[2]  << "\n"
                << "Email         : " << f[3]  << "\n"
                << "Address       : " << f[4]  << "\n"
                << "Bank Acct No  : " << f[5]  << "\n\n"
                << "── CAR DETAILS ──\n"
                << "Model         : " << f[6]  << "\n"
                << "Fuel Type     : " << f[7]  << "\n"
                << "Colour        : " << f[8]  << "\n"
                << "Wheel Size    : " << f[9]  << "\n\n"
                << "── PAYMENT DETAILS ──\n"
                << "Payment Mode  : " << f[10] << "\n"
                << "Ex-Showroom   : " << f[11] << "\n"
                << "Discount      : " << f[12] << "\n"
                << "GST (" << f[13] << "%)   : " << f[14] << "\n"
                << "Total Price   : " << f[15] << "\n"
                << "========================================\n\n";
            count++;
        }
        csv.close();
    }
    txt.close();
    cout << count << " receipt(s) → " << outPath << "\n";
}

    int size() const { return (int)records.size(); }
};

// ═══════════════════════════════════════════════════════════════════
//  TEST DRIVE LOG READER
// ═══════════════════════════════════════════════════════════════════

class TestDriveReader {
public:
    // REPLACE entire generateTxt with this
void generateTxt(const vector<string>& paths, const string& outPath) {
    ofstream out(outPath, ios::trunc);
    if (!out.is_open()) { cout << "Cannot open " << outPath << "\n"; return; }
    int count = 0;
    for (const auto& csvPath : paths) {
        ifstream file(csvPath);
        if (!file.is_open()) { cout << "Skipping: " << csvPath << "\n"; continue; }
        string line;
        while (getline(file, line)) {
            if (line.empty()) continue;
            auto f = parseCSVRow(line);
            if ((int)f.size() < 6) continue;
            out << "===============================\n"
                << "TEST DRIVE BOOKING\n"
                << "===============================\n"
                << "Date & Time : " << f[0] << "\n"
                << "Name        : " << f[1] << "\n"
                << "Email       : " << f[2] << "\n"
                << "Car         : " << f[3] << "\n"
                << "Drive Date  : " << f[4] << "\n"
                << "Drive Time  : " << f[5] << "\n"
                << "===============================\n\n";
            count++;
        }
        file.close();
    }
    out.flush();
    out.close();
    cout << count << " test drive booking(s) → " << outPath << "\n";
}
};

// ═══════════════════════════════════════════════════════════════════
//  ADMIN LOGIN
// ═══════════════════════════════════════════════════════════════════

class AdminLogin {
    vector<pair<string,string>> admins = {
        {"admin","1234"},{"manager","showroom2026"},{"krishnav","pass123"}
    };
public:
    bool promptLogin() const {
        string user, pass; int tries = 3;
        while (tries > 0) {
            cout << "\n=== M MOTORS — Admin Login ===\nUsername: "; cin >> user;
            cout << "Password: "; cin >> pass;
            for (const auto& a : admins) {
                if (a.first == user) {
                    if (a.second == pass) { cout << "Welcome, " << user << "!\n"; return true; }
                    cout << "Wrong password. " << --tries << " left.\n"; goto next;
                }
            }
            cout << "Not found. " << --tries << " left.\n"; next:;
        }
        cout << "Access denied.\n"; return false;
    }
};

// ═══════════════════════════════════════════════════════════════════
//  ADMIN PANEL
// ═══════════════════════════════════════════════════════════════════

class AdminPanel {
    PriceManager   prices;
    StockManager   stock;
    SalesLogReader sales;
    TestDriveReader testDrive;



//    string getLatestCSV() {
//     vector<string> paths = {
//         "/Users/krishnavgogoi/Downloads/sales_log.csv",
//         "/Users/krishnavgogoi/Downloads/sales_log(1).csv",
//         "/Users/krishnavgogoi/Downloads/sales_log(2).csv",
//         "/Users/krishnavgogoi/Downloads/sales_log(3).csv"
//     };

//     for (int i = paths.size() - 1; i >= 0; i--) {
//         ifstream f(paths[i]);
//         if (f.is_open()) {
//             f.close();
//             return paths[i];  // ✅ return latest existing file
//         }
//     }
//     return paths[0]; // fallback
// }


// ADD this new function (replace getLatestCSV entirely)
vector<string> getAllCSVPaths() {
    string base = "/Users/krishnavgogoi/Downloads/sales_log";
    vector<string> found;

    ifstream f0(base + ".csv");
    if (f0.is_open()) { 
        f0.close(); 
        found.push_back(base + ".csv");
        cout << "✓ Found: " << base << ".csv\n";
    } else {
        cout << "✗ Not found: " << base << ".csv\n";
    }

    for (int i = 1; i <= 10; i++) {
        string candidate = base + " (" + to_string(i) + ").csv";
        ifstream f(candidate);
        if (f.is_open()) { 
            f.close(); 
            found.push_back(candidate);
            cout << "✓ Found: " << candidate << "\n";
        } else {
            cout << "✗ Not found: " << candidate << "\n";
        }
    }

    cout << "\nTotal found: " << found.size() << "\n";
    return found;
}



// string csvPath = getAllCSVPaths();

    void menuPrices() {
        cout << "\n1. View prices & discounts\n"
             << "2. Edit one car\n"
             << "3. Bulk discount (all cars)\n"
             << "4. Save prices.json now\n"
             << "Choice: ";
        int c; cin >> c;
        if      (c == 1) prices.display();
        else if (c == 2) prices.editOne();
        else if (c == 3) prices.bulkDiscount();
        else if (c == 4) prices.saveToFile();
        else cout << "Invalid.\n";
    }

    void menuStock() {
        cout << "\n1. View stock\n2. Set stock\n3. Adjust stock\nChoice: ";
        int c; cin >> c;
        if      (c == 1) stock.display();
        else if (c == 2) stock.setQty();
        else if (c == 3) stock.adjust();
        else cout << "Invalid.\n";
    }

//     void menuSales() {
//         csvPath = getAllCSVPaths();

//       string p;
//     getline(cin >> ws, p);
//     if (!p.empty()) {
        
//     } ;
//     if (!sales.load(csvPath)){ 
//         cout << "Using CSV: " << csvPath << endl;
//         return;}
//    sales.generateReceipts(
//     csvPath,
//     "/Users/krishnavgogoi/Downloads/booked.txt"
// );  // csvPath is now consistent ✓
//     // ... rest unchanged
//   // auto-generate on load
//         cout << "\n1. View all records\n"
//              << "2. View one record in detail\n"
//              << "3. Statistics\n"
//              << "4. Regenerate booked.txt\n"
//              << "Choice: ";
//         int c; cin >> c;
//         if      (c == 1) sales.showAll();
//         else if (c == 2) {
//             if (!sales.size()) return;
//             cout << "Record # (1-" << sales.size() << "): ";
//             int idx; cin >> idx; sales.showDetail(idx);
//         }
//         else if (c == 3) sales.stats();
//         else if (c == 4) sales.generateReceipts(
//     csvPath,
//     "booked.txt"
// );
//         else cout << "Invalid.\n";
//     }




// REPLACE the entire menuSales() with this
void menuSales() {
    auto paths = getAllCSVPaths();
    if (!sales.loadAll(paths)) return;

    sales.generateReceipts(
        paths,
        "booked.txt"
    );

    cout << "\n1. View all records\n"
         << "2. View one record in detail\n"
         << "3. Statistics\n"
         << "4. Regenerate booked.txt\n"
         << "Choice: ";
    int c; cin >> c;
    if      (c == 1) sales.showAll();
    else if (c == 2) {
        if (!sales.size()) return;
        cout << "Record # (1-" << sales.size() << "): ";
        int idx; cin >> idx; sales.showDetail(idx);
    }
    else if (c == 3) sales.stats();
    else if (c == 4) sales.generateReceipts(
        paths,
        "/Users/krishnavgogoi/Downloads/booked.txt"
    );
    else cout << "Invalid.\n";
}




    // WITH
void menuTestDrive() {
    string base = "/Users/krishnavgogoi/Downloads/testdrive_log";
    vector<string> found;

    ifstream f0(base + ".csv");
    if (f0.is_open()) { f0.close(); found.push_back(base + ".csv"); }
    for (int i = 1; i <= 99; i++) {
        string candidate = base + " (" + to_string(i) + ").csv";
        ifstream f(candidate);
        if (f.is_open()) { f.close(); found.push_back(candidate); }
    }

    cout << found.size() << " testdrive CSV(s) found.\n";
    testDrive.generateTxt(found, "testdrive.txt");
}

public:
    AdminPanel() { prices.loadFromFile("prices.json"); }

    void menu() {
        while (true) {
            cout << "\n╔══════════════════════════════════════╗\n"
                 << "║     M MOTORS  —  ADMIN PANEL         ║\n"
                 << "╠══════════════════════════════════════╣\n"
                 << "║  1. Prices & Discounts               ║\n"
                 << "║     saves → prices.json              ║\n"
                 << "║  2. Stock Management                 ║\n"
                 << "║  3. Sales Records & Receipts         ║\n"
                 << "║     reads ← sales_log.csv            ║\n"
                 << "║  4. Test Drive Bookings              ║\n"
                 << "║     reads ← testdrive_log.csv        ║\n"
                 << "║  5. Exit                             ║\n"
                 << "╚══════════════════════════════════════╝\n"
                 << "Choice: ";
            int c; cin >> c;
            if      (c == 1) menuPrices();
            else if (c == 2) menuStock();
            else if (c == 3) menuSales();
            else if (c == 4) menuTestDrive();
            else if (c == 5) break;
            else cout << "Invalid.\n";
        }
        cout << "Goodbye.\n";
    }
};

// ═══════════════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════════════

int main() {
    AdminLogin login;
    if (!login.promptLogin()) return 1;
    AdminPanel admin;
    admin.menu();
    return 0;
}


////////////////////////////////////////////////////////////////////////////////////////////

