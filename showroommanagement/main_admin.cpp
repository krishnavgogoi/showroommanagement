#include <iostream>
#include "showroom_manager_admin.h"
#include "admin.h"

int main() {
    ShowroomManager mgr;

    // Same cars as your Wasm/web showroom
    mgr.addCar(new Car("Mustang",    "Red",    69000000));
    mgr.addCar(new Car("720s",       "Silver", 30000000));
    mgr.addCar(new Car("Challenger", "Black",   5000000));
    mgr.addCar(new Car("M3 CS",      "White",   4000000));
    mgr.addCar(new ElectricVehicle("E-Tron", "Blue", 69000000, 400));

    AdminPanel panel(mgr);  // admin / admin123

    if (panel.login())
        panel.runPanel();

    return 0;
}