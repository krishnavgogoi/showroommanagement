

///////////////////////////////////////////////////////////////////////////////
#include <iostream>
#include <vector>
#include <string>
#include <stdexcept>
#include <emscripten/bind.h>

using namespace std;
using namespace emscripten;

//////////////////////////////////////////////////////
// BASE VEHICLE CLASS
//////////////////////////////////////////////////////

class Car {
protected:
    string brand;
    double basePrice;

public:
    Car(string b, double p) : brand(b), basePrice(p) {}

    virtual string getType() = 0;
    virtual double getGST() = 0;
    virtual double getDiscount() { return 0; }

    string getBrand() { return brand; }

    double calculateFinalPrice() {
        double taxable = basePrice - getDiscount();
        return taxable + (taxable * getGST());
    }

    virtual ~Car() {}
};

//////////////////////////////////////////////////////
// ELECTRIC VEHICLE
//////////////////////////////////////////////////////

class ElectricVehicle : public Car {
public:
    ElectricVehicle(string b, double p) : Car(b, p) {}

    string getType() override { return "Electric"; }
    double getGST()  override { return 0.05; }
    double getDiscount() override { return 20000; }
};

//////////////////////////////////////////////////////
// GASOLINE VEHICLE
//////////////////////////////////////////////////////

class GasolineVehicle : public Car {
public:
    GasolineVehicle(string b, double p) : Car(b, p) {}

    string getType() override { return "Gasoline"; }
    double getGST()  override { return 0.18; }
};

//////////////////////////////////////////////////////
// SHOWROOM MANAGER
//////////////////////////////////////////////////////

class ShowroomManager {
private:
    vector<Car*> inventory;

public:
    void addElectric(string b, double p) {
        inventory.push_back(new ElectricVehicle(b, p));
    }

    void addGasoline(string b, double p) {
        inventory.push_back(new GasolineVehicle(b, p));
    }

    int    getInventorySize()   { return (int)inventory.size(); }
    string getBrand(int i)      { return inventory[i]->getBrand(); }
    string getType(int i)       { return inventory[i]->getType(); }
    double getFinalPrice(int i) { return inventory[i]->calculateFinalPrice(); }

    ~ShowroomManager() {
        for (Car* c : inventory) delete c;
    }
};

//////////////////////////////////////////////////////
// TAX SYSTEM
// NOTE: brand names must EXACTLY match the
//       .bottom4t text in index.html
//       Mustang / 720s / Challenger / M3 CS / E-Tron
//////////////////////////////////////////////////////

class TaxSystem {
public:
    val calculate(string brand, string fuelType) {

        double price = 500000;   // default fallback

        if      (brand == "Mustang")    price = 69000000;
        else if (brand == "720s")       price = 30000000;
        else if (brand == "Challenger") price = 5000000;
        else if (brand == "M3 CS")      price = 4000000;
        else if (brand == "E-Tron")     price = 69000000;

        double discount = 0;
        double gstRate  = 0;

        // HTML data-value is "EV" for electric, "Petrol" for gasoline
        if (fuelType == "EV") {
            discount = 20000;
            gstRate  = 0.05;
        } else {
            gstRate = 0.18;
        }

        double taxable = price - discount;
        double gst     = taxable * gstRate;
        double total   = taxable + gst;

        val result = val::object();
        result.set("price",    price);
        result.set("discount", discount);
        result.set("gst",      gst);
        result.set("total",    total);
        result.set("gstrate",  gstRate * 100);

        return result;
    }
};

//////////////////////////////////////////////////////
// ADMIN SYSTEM
//////////////////////////////////////////////////////

class AdminSystem {
private:
    vector<pair<string, string>> admins;

public:
    AdminSystem() {
        admins.push_back({"admin",    "1234"});
        admins.push_back({"manager",  "showroom2026"});
        admins.push_back({"krishnav", "pass123"});
    }

    // 1 = success | 2 = wrong password | 0 = not found
    int checkLogin(string username, string password) {
        for (auto& a : admins) {
            if (a.first == username)
                return (a.second == password) ? 1 : 2;
        }
        return 0;
    }
};

//////////////////////////////////////////////////////
// TEST DRIVE
//////////////////////////////////////////////////////

class TestDrive {
private:
    string car, name, email, date, time;

public:
    TestDrive(string c, string n, string e, string d, string t)
        : car(c), name(n), email(e), date(d), time(t) {}

    string getCar()   { return car;   }
    string getName()  { return name;  }
    string getEmail() { return email; }
    string getDate()  { return date;  }
    string getTime()  { return time;  }

    string display() {
        return "Car: "    + car   +
               " | Name: "  + name  +
               " | Email: " + email +
               " | Date: "  + date  +
               " | Time: "  + time;
    }
};

//////////////////////////////////////////////////////
// BOOKING MANAGER
//////////////////////////////////////////////////////

class BookingManager {
private:
    vector<TestDrive> bookings;

public:
    void addBooking(string car, string name, string email,
                    string date, string time) {
        bookings.push_back(TestDrive(car, name, email, date, time));
    }

    int getTotalBookings() { return (int)bookings.size(); }

    string getBooking(int i) {
        if (i >= 0 && i < (int)bookings.size())
            return bookings[i].display();
        return "Invalid index";
    }

    string getAllBookings() {
        if (bookings.empty()) return "No bookings yet.";
        string result = "";
        for (int i = 0; i < (int)bookings.size(); i++)
            result += to_string(i + 1) + ". " + bookings[i].display() + "\n";
        return result;
    }

    bool isDuplicate(string car, string email, string date) {
        for (auto& b : bookings)
            if (b.getCar() == car && b.getEmail() == email && b.getDate() == date)
                return true;
        return false;
    }
};

//////////////////////////////////////////////////////
// EMSCRIPTEN BINDINGS
//////////////////////////////////////////////////////

EMSCRIPTEN_BINDINGS(my_module) {

    class_<AdminSystem>("AdminSystem")
        .constructor<>()
        .function("checkLogin", &AdminSystem::checkLogin);

    class_<ShowroomManager>("ShowroomManager")
        .constructor<>()
        .function("addElectric",      &ShowroomManager::addElectric)
        .function("addGasoline",      &ShowroomManager::addGasoline)
        .function("getInventorySize", &ShowroomManager::getInventorySize)
        .function("getBrand",         &ShowroomManager::getBrand)
        .function("getType",          &ShowroomManager::getType)
        .function("getFinalPrice",    &ShowroomManager::getFinalPrice);

    class_<TaxSystem>("TaxSystem")
        .constructor<>()
        .function("calculate", &TaxSystem::calculate);

    class_<BookingManager>("BookingManager")
        .constructor<>()
        .function("addBooking",       &BookingManager::addBooking)
        .function("getTotalBookings", &BookingManager::getTotalBookings)
        .function("getBooking",       &BookingManager::getBooking)
        .function("getAllBookings",    &BookingManager::getAllBookings)
        .function("isDuplicate",      &BookingManager::isDuplicate);
}

int main() { 
    return 0;
     }
/////////////////////////////////////////////////////////////////////////////

// class AdminSystem {
// private:
//     vector<pair<string,string>> admins;

// public:
//     AdminSystem() {
//         // Hardcoded admins
//         admins.push_back({"admin", "1234"});
//         admins.push_back({"manager", "showroom2026"});
//         admins.push_back({"krishnav", "pass123"});
//     }

//     int checkLogin(string username, string password) {
//         for(auto &admin : admins) {
//             if(admin.first == username) {
//                 if(admin.second == password) {
//                     return 1;   // correct password and correct username
//                 } else {
//                     return 2;   // wrong password
//                 }
//             }
//         }
//         return 0;   // username not found
//     }
// };

// EMSCRIPTEN_BINDINGS(my_module) {
//     class_<AdminSystem>("AdminSystem")
//         .constructor<>()
//         .function("checkLogin", &AdminSystem::checkLogin);




// }


// int main() {
//     return 0;
// }

//////////////////////////////////////////////////////////////
// 5️⃣ MAIN FUNCTION – USER INPUT
//////////////////////////////////////////////////////////////

// int main() {

//     try {
//         ShowroomManager showroom;

//         int n;
//         cout << "How many cars to add? ";
//         cin >> n;

//         for (int i = 0; i < n; i++) {
//             string brand, color;
//             double price;
//             int type;

//             cout << "\nCar " << i+1 << " Brand: ";
//             cin >> brand;

//             cout << "Color: ";
//             cin >> color;

//             cout << "Price: ";
//             cin >> price;

//             cout << "Type (1 = Normal, 2 = Electric): ";
//             cin >> type;

//             if (type == 1) {
//                 showroom.addVehicle(new Car(brand, price, color));
//             }
//             else {
//                 int range;
//                 cout << "Battery Range: ";
//                 cin >> range;
//                 showroom.addVehicle(
//                     new ElectricVehicle(brand, price, color, range)
//                 );
//             }
//         }

//         showroom.showInventory();



// /////////////////////////////////////////////////////////////////




//         //////////////////////////////////////////////////////
//         // FRIEND FUNCTION DEMO
//         //////////////////////////////////////////////////////
//         if (n >= 2)
//             comparePrice(*showroom.getCar(0), *showroom.getCar(1));

//         //////////////////////////////////////////////////////
//         // CUSTOMER INPUT
//         //////////////////////////////////////////////////////
//         string cname;
//         double balance;

//         cout << "\nEnter Customer Name: ";
//         cin >> cname;

//         cout << "Enter Balance: ";
//         cin >> balance;

//         CustomerDetails customer(cname, balance);

//         int choice;
//         cout << "Which car to buy (1-" << n << ")? ";
//         cin >> choice;

//         Car* selected = showroom.getCar(choice-1);
//         double finalPrice = selected->calculateFinalPrice();

//         if (customer.canAfford(finalPrice)) {
//             customer.deduct(finalPrice);
//             cout << "\nPurchase Successful! Bought "
//                  << selected->getBrand()
//                  << " for ₹" << finalPrice << endl;
//             customer.showBalance();
//         }
//         else {
//             cout << "\nNot enough balance!\n";
//         }

//     }
//     catch (exception &e) {
//         cout << "\nERROR: " << e.what() << endl;
//     }

//     return 0;
// }




