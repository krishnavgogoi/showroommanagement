



//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzxxxxxxxxxxxxxxxxxxzxzxxzxzxzxzxzxzxzxzxzxzxzxzxzxxzxzxzxzxzxzxxzxzxzxzxzxzxzxzxxzxzxzxzxzxzxzxxzxz




// Prevent scrolling while loader is visible
// Add "loading" class to body immediately



//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx




document.getElementById('selectedtestdrive').addEventListener('click', function () {
  // Get the currently selected car name from configpg
  const carName = document.querySelector('#configpg .carname').textContent.trim();

  // Open the test drive overlay
  document.getElementById('booktestdrive').classList.add('active');

  // Pre-select the car in the dropdown
  const tdCarSelect = document.getElementById('td-car');
  if (carName) {
      // Try to find a matching option (case-insensitive)
      let matched = false;
      for (let option of tdCarSelect.options) {
          if (option.value.toLowerCase() === carName.toLowerCase()) {
              tdCarSelect.value = option.value;
              matched = true;
              break;
          }
      }
      // If no exact match, try partial match (e.g. "720s" vs "720S")
      if (!matched) {
          for (let option of tdCarSelect.options) {
              if (option.value.toLowerCase().includes(carName.toLowerCase()) ||
                  carName.toLowerCase().includes(option.value.toLowerCase())) {
                  tdCarSelect.value = option.value;
                  break;
              }
          }
      }
  }
});
//page1
const loader        = document.getElementById('videoLoader');
const arc           = document.getElementById('loaderArc');
const loaderSub     = document.getElementById('loaderSub');
const circumference = 150.8;
let hidden          = false;

function hideLoader() {
  if (hidden) return;
  hidden = true;
  arc.style.strokeDashoffset = 0;
  loaderSub.textContent = 'Ready';
  setTimeout(() => loader.classList.add('hidden'), 300);
}

window.addEventListener('load', hideLoader);
setTimeout(hideLoader, 10000);

// =============================================
//  CAROUSEL  (page 2)
// =============================================
// =============================================
//  PAGE 2 — drag-to-scroll ticker
// =============================================
(function () {
  const track = document.getElementById('tickerTrack');
  if (!track) return;

  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  let dragDistance = 0;  // track how far mouse moved

  track.addEventListener('mousedown', e => {
    isDragging = true;
    dragDistance = 0;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('mouseleave', () => { isDragging = false; });
  track.addEventListener('mouseup',    () => { isDragging = false; });

  track.addEventListener('mousemove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = x - startX;
    dragDistance = Math.abs(walk);  // accumulate drag distance
    track.scrollLeft = scrollLeft - walk;
  });

  // touch support
  track.addEventListener('touchstart', e => {
    dragDistance = 0;
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  track.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = x - startX;
    dragDistance = Math.abs(walk);
    track.scrollLeft = scrollLeft - walk;
  });

  // map card index (0-based) to page IDs
  const pageMap = ['page4', 'page5', 'page6', 'page7', 'page8'];

  track.querySelectorAll('.t-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      // only navigate if it was a tap/click, not a drag
      if (dragDistance > 6) return;

      const targetPage = document.getElementById(pageMap[index]);
      if (targetPage) {
        targetPage.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();

// =============================================
//  PAGE 1 — GSAP entrance animation
// =============================================

document.addEventListener("DOMContentLoaded", function () {

  // gsap.from(document.querySelector("#page1 .left1"),
  //     { opacity: 0, x: -400, duration: 4.4, delay: 8 });

  // gsap.to(document.querySelector("#page1 .right1"),
  //     { x: 300, duration: 3.4, delay: 7.2 });

  gsap.from(document.querySelector(".left1txt"),
      { opacity: 0, x: -600, duration: 3.5, ease: "power2.out", delay: 2 });
});


// =============================================
//   GSAP
// =============================================

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  scroller: "#scroll-container"
});

gsap.from("#page2  .pg2-header ", {
  scrollTrigger: {
    trigger: "#page2  ",        
    start: "top 15%",
    end: "top 0%",
    scrub: true,
    
  },
  x:-100,
  opacity: 0
});


gsap.from(".t-card", {
 
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,   // each card 0.2s after previous
  scrollTrigger: {
    trigger: "#page2",
    scroller: "#scroll-container",
    start: "top center"
  }
});





gsap.from("#page4 .bottom4t,#page4 .bottom4b", {
  scrollTrigger: {
    trigger: "#page4 .top4 ",        
    start: "top 15%",
    end: "top 0%",
    scrub: true,
   
  },
  x: -300,   
  opacity: 0
})





gsap.from("#page5 .bottom4t,#page5 .bottom4b", {
  scrollTrigger: {
    trigger: "#page5 .top5 ",        
    start: "top 15%",
    end: "top 0%",
    scrub: true,
  
  },
  x: -300,   
  opacity: 0
});


gsap.from("#page6 .bottom4t,#page6 .bottom4b", {
  scrollTrigger: {
    trigger: "#page6 .top6 ",        
    start: "top 15%",
    end: "top 0%",
    scrub: true,

  },
  x: -300,   
  opacity: 0
});




gsap.from("#page7 .bottom4t,#page7 .bottom4b", {
  scrollTrigger: {
    trigger: "#page7 .top7 ",        
    start: "top 15%",
    end: "top 0%",
    scrub: true,
   
  },
  x: -300,   
  opacity: 0
});

gsap.from("#page8 .bottom4t,#page8 .bottom4b", {
  scrollTrigger: {
    trigger: "#page8 .top8 ",        
    start: "top 15%",
    end: "top 0%",
    scrub: true,

  },
  x: -300,   
  opacity: 0
});


gsap.from("#page9 .footer-container", {
  scrollTrigger: {
    trigger: "#page9  ",        
    start: "top 15%",
    end: "top 0%",
    scrub: true,
    
  },
  y:150,
  opacity: 0
});


gsap.from("#page9  .brandblock h1 ", {
  scrollTrigger: {
    trigger: "#page9  ",        
    start: "top 15%",
    end: "top 0%",
    scrub: true,
   
  },
  x:-400,
  opacity: 0
});

gsap.from("#page9  .brandblock p ", {
  scrollTrigger: {
    trigger: "#page9  ",        
    start: "top 15%",
    end: "top 0%",
    scrub: true,
   
  },
  x:400,
  opacity: 0
});





gsap.set(".flair", {xPercent: -50, yPercent: -50});

let xTo = gsap.quickTo(".flair", "x", {duration: 0.6, ease: "power3"}),
    yTo = gsap.quickTo(".flair", "y", {duration: 0.6, ease: "power3"});

window.addEventListener("mousemove", e => {
  xTo(e.clientX);
  yTo(e.clientY);
});




// =============================================
//  TOP HEADER — hamburger menu
// =============================================

let topheadermenu = document.querySelector("#topheader .right span");
let loginremover  = document.querySelector("#login .top span");
let loginpg       = document.querySelector("#login");

topheadermenu.addEventListener("click", function () {
  loginpg.style.marginLeft     = "60%";
  document.body.style.overflow = "hidden";
});

loginremover.addEventListener("click", function () {
  loginpg.style.marginLeft     = "100%";
  document.body.style.overflow = "auto";
});


// =============================================
//  ADMIN — login flow
// =============================================

document.querySelector("#login .middle .updiv .admin")
.addEventListener("click", function () {
  document.querySelector("#admincheckerpg").classList.add("active");
  loginpg.style.marginLeft = "100%";
});

document.querySelector("#cancelAdmin")
.addEventListener("click", function () {
  document.querySelector("#admincheckerpg").classList.remove("active");
  document.body.style.overflow = "auto";
});

document.getElementById("adminForm")
.addEventListener("submit", function (e) {

  e.preventDefault();

  // read from window at click-time
  if (!window.adminSystem) {
      alert("WASM still initializing...");
      return;
  }

  const username = document.getElementById("admin-username").value;
  const password = document.getElementById("admin-password").value;
  const result   = window.adminSystem.checkLogin(username, password);

  if      (result === 1) {
      alert("Login Successful");
      document.getElementById("admincontrol").classList.add("active");
  }
  else if (result === 2) alert("Wrong Password");
  else                   alert("Username Not Found");
});

document.querySelector("#admincontrol .done-container button")
.addEventListener("click", function () {
  document.getElementById("admincontrol").classList.remove("active");
  document.querySelector("#admincheckerpg").classList.remove("active");
  document.body.style.overflow = "auto";
});


// =============================================
//  CUSTOMER — signup flow
// =============================================

class Customer {
  constructor(email, password) {
      this.email    = email;
      this.password = password;
  }
}

let currentCustomer = null;

document.querySelector("#login .middle .updiv .customer")
.addEventListener("click", function () {
  document.getElementById("customerLoginPage").classList.add("active");
  document.body.style.overflow = "hidden";
  loginpg.style.marginLeft     = "100%";
});

document.getElementById("closeCustomerLogin")
.addEventListener("click", function () {
  document.getElementById("customerLoginPage").classList.remove("active");
  document.body.style.overflow = "auto";
});

document.getElementById("customerLoginForm")
.addEventListener("submit", function (e) {

  e.preventDefault();

  const email    = document.getElementById("cust-email").value;
  const password = document.getElementById("cust-password").value;

  currentCustomer = new Customer(email, password);
  console.log("Customer Object Created:", currentCustomer);
  alert("Successful Login!");

  setTimeout(function () {
      document.getElementById("customerLoginPage").classList.remove("active");
      document.body.style.overflow = "auto";
  }, 200);
});


// =============================================
//  CONFIG PAGE — open / close
// =============================================

let carfuel;
let configpage = document.querySelector("#configpg");


document.querySelectorAll(".bottom4b button").forEach(btn => {
  btn.addEventListener("click", function (event) {

      const container = event.target.closest(".bottom4");
      carfuel         = container.dataset.value;

      // document.querySelector("#configpg .leftc")
      //     .style.backgroundImage = `url('${container.dataset.img}')`;

      const video = document.querySelector("#bgVideo");
      video.src = container.dataset.vid;
      video.load();
      video.play();

      const info = container.querySelector(".bottom4t").textContent;
      configpage.classList.add("active");
      configpage.querySelector(".carname").textContent = info;
  });
});

document.querySelector("#configpg .configpgtop .cross")
.addEventListener("click", () => {
  configpage.classList.remove("active");
});


// =============================================
//  CONFIG PAGE — dropdowns
// =============================================

document.querySelectorAll(".dropdown").forEach(dropdown => {

  const selected = dropdown.querySelector(".dropdown-selected");
  const options  = dropdown.querySelector(".dropdown-options");

  // toggle open
  selected.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".dropdown-options.open")
          .forEach(opt => opt.classList.remove("open"));
      options.classList.add("open");
  });

  // colour swatches
  options.querySelectorAll(".val").forEach(opt => {
      opt.style.backgroundColor = opt.closest(".pval").dataset.value;
  });

  // price labels
  options.querySelectorAll(".pval").forEach(option => {
      if (option.dataset.price && !option.dataset.priceAdded) {
          option.dataset.priceAdded = "true";
          let priceDiv = option.querySelector(".wprice");
          if (!priceDiv) {
              priceDiv = document.createElement("div");
              priceDiv.classList.add("wprice");
              option.appendChild(priceDiv);
          }
          priceDiv.textContent = "₹" + Number(option.dataset.price).toLocaleString();
      }
  });

  // select an option
  options.querySelectorAll(".pval").forEach(option => {
      option.addEventListener("click", (e) => {
          e.stopPropagation();
          selected.textContent   = option.querySelector(".wname").textContent;
          selected.dataset.value = option.dataset.value;
          options.classList.remove("open");
      });
  });
});

// close all dropdowns on outside click
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-options.open")
      .forEach(opt => opt.classList.remove("open"));
});


// =============================================
//  CONFIG PAGE — tabs (01 Exterior / 02 Interior)
// =============================================

document.querySelectorAll("#configpg .middle .moreopt .ch").forEach(el => {
  el.addEventListener("click", () => {

      if (el.id == 1) {
          document.querySelector("#configpg .middle .rightc .z01").classList.add("active");
          document.querySelector("#configpg .middle .rightc .z02").classList.remove("active");
      } else if (el.id == 2) {
          document.querySelector("#configpg .middle .rightc .z01").classList.remove("active");
          document.querySelector("#configpg .middle .rightc .z02").classList.add("active");
      }

      document.querySelectorAll("#configpg .middle .moreopt .ch")
          .forEach(item => item.classList.remove("active"));
      el.classList.add("active");
  });
});


// =============================================
//  TAX PAGE — helpers
// =============================================

// get the currently chosen option from a dropdown
function getChosenOption(dropdown) {
  const selectedText = dropdown.querySelector(".dropdown-selected").textContent.trim();
  const allOptions   = dropdown.querySelectorAll(".pval");
  let chosen = null;
  allOptions.forEach(opt => {
      if (opt.querySelector(".wname")?.textContent.trim() === selectedText)
          chosen = opt;
  });
  if (!chosen) chosen = allOptions[0]; // default to first if placeholder still showing
  return chosen;
}

// readable labels matching dropdown order in HTML
const dropdownLabels = [
  "Exterior Paint",
  "Wheel Size",
  "Spoiler",
  "Exhaust",
  "Interior Theme",
  "Seat Material",
  "Interior Trim",
  "Sound System"
];


// =============================================
//  TAX PAGE — open & calculate
// =============================================

let taxpage = document.querySelector("#taxdetails");

document.querySelector("#configpg #addCarBtn")
.addEventListener("click", () => {

  // guard: read window.taxSystem at click-time
  if (!window.taxSystem) {
      alert("WASM still initializing, please try again in a moment.");
      return;
  }

  taxpage.classList.add("active");

  // ---- 1. Car name & fuel ----
  const carName = document.querySelector(".carname").textContent.trim() || "Unknown Model";
  taxpage.querySelector("#brandName").textContent = carName;
  taxpage.querySelector("#fuel").textContent      = carfuel;

  // ---- 2. Colour & wheel from exterior panel + interior colour ----
  const exteriorDrops = document.querySelectorAll("#configpg .z01 .dropdown");
  const interiorDrops = document.querySelectorAll("#configpg .z02 .dropdown");
  const colourDrop    = exteriorDrops[0];
  const wheelDrop     = exteriorDrops[1];
  const intColourDrop = interiorDrops[0];

  // exterior colour
  const extColourChosen = getChosenOption(colourDrop);
  const extColourName   = extColourChosen.querySelector(".wname")?.textContent.trim() || "WHITE";
  const extColourPrice  = parseInt(extColourChosen.dataset.price || 0);
  const extColourText   = extColourPrice > 0
      ? `${extColourName} (Exterior) +₹${extColourPrice.toLocaleString()}`
      : `${extColourName} (Exterior)`;

  // interior colour
  const intColourChosen = getChosenOption(intColourDrop);
  const intColourName   = intColourChosen.querySelector(".wname")?.textContent.trim() || "WHITE";
  const intColourPrice  = parseInt(intColourChosen.dataset.price || 0);
  const intColourText   = intColourPrice > 0
      ? `${intColourName} (Interior) +₹${intColourPrice.toLocaleString()}`
      : `${intColourName} (Interior)`;

  taxpage.querySelector("#extcolour").textContent = `${extColourText}  /  ${intColourText}`;

  // wheel size
  const wheelChosen = getChosenOption(wheelDrop);
  const wheelName   = wheelChosen.querySelector(".wname")?.textContent.trim() || "15\" Alloys";
  const wheelPrice  = parseInt(wheelChosen.dataset.price || 0);
  taxpage.querySelector("#wheelsize").textContent = wheelPrice > 0
      ? `${wheelName} +₹${wheelPrice.toLocaleString()}`
      : wheelName;

  // ---- 3. Collect all dropdowns & calculate addon total ----
  const allDropdowns = [
      ...document.querySelectorAll("#configpg .z01 .dropdown"),
      ...document.querySelectorAll("#configpg .z02 .dropdown")
  ];

  let addonTotal = 0;
  allDropdowns.forEach(dropdown => {
      const chosen   = getChosenOption(dropdown);
      const optPrice = parseInt(chosen.dataset.price || 0);
      addonTotal += optPrice;
  });

  
  const result = window.taxSystem.calculate(carName, carfuel);
  const cfg    = window.priceConfig?.[carName];
  
  const gstRate   = result.gstrate / 100;          // always from WASM
  const basePrice = cfg?.price      ?? result.price;
  const discount  = cfg?.discountRs ?? result.discount;



  const taxableWithAddon = (basePrice - discount) + addonTotal;
  const gstWithAddon   = taxableWithAddon * gstRate;
  const totalWithAddon = taxableWithAddon + gstWithAddon;

  document.getElementById("price").textContent    = "₹" + basePrice.toLocaleString();
  document.getElementById("discount").textContent = discount.toLocaleString();
  document.getElementById("gstrate").textContent  = result.gstrate;
  document.getElementById("gst").textContent      = gstWithAddon.toFixed(2);
  document.getElementById("total").textContent    = totalWithAddon.toFixed(2);

  // ---- 5. Dynamic config rows (all 8 dropdowns) ----
  const carGrid = document.querySelector("#brandName").closest(".grid");
  if (!carGrid) return;

  carGrid.querySelectorAll(".dynamic-config").forEach(e => e.remove());

  // index 0 = Exterior Paint  (already shown in Colour field)
  // index 1 = Wheel Size      (already shown in Wheel Size field)
  // index 4 = Interior Theme  (already shown in Colour field)
  allDropdowns.forEach((dropdown, index) => {

      if (index === 0 || index === 1 || index === 4) return;

      const chosen   = getChosenOption(dropdown);
      const optName  = chosen.querySelector(".wname")?.textContent.trim() || "";
      const optPrice = parseInt(chosen.dataset.price || 0);
      const label    = dropdownLabels[index]
                       || dropdown.querySelector(".dropdown-selected").textContent.trim();

      const field = document.createElement("div");
      field.classList.add("field", "dynamic-config");
      field.innerHTML = `<label>${label}: </label>
                         <span>${optName}${optPrice > 0
                             ? " (+₹" + optPrice.toLocaleString() + ")"
                             : ""}</span>`;
      carGrid.appendChild(field);
  });
});












// close tax page
document.querySelector("#taxdetails .topcontent .cross")
.addEventListener("click", () => {
  taxpage.classList.remove("active");
  
});



async function taxpgbtn() {

  // ── 1. Validate ────────────────────────────────────────────────────
  const fields = [
    { id: "td-custName",  label: "Customer Name"  },
    { id: "td-custPhone", label: "Phone Number"    },
    { id: "td-custEmail", label: "Email"           },
    { id: "td-custAddr",  label: "Address"         },
    { id: "td-custBank",  label: "Bank Account No" },
  ];

  for (const f of fields) {
    const el = document.getElementById(f.id);
    if (!el.value.trim()) {
      el.focus();
      el.style.outline = "2px solid red";
      alert(`Please fill in: ${f.label}`);
      return;
    }
    el.style.outline = "";
  }

  const paymode = document.getElementById("td-paymode");
  if (!paymode.value) {
    paymode.style.outline = "2px solid red";
    alert("Please select a Payment Mode.");
    paymode.focus();
    return;
  }
  paymode.style.outline = "";

  // ── 2. Build CSV row ───────────────────────────────────────────────
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const row = [
    now,
    document.getElementById("td-custName").value.trim(),
    document.getElementById("td-custPhone").value.trim(),
    document.getElementById("td-custEmail").value.trim(),
    document.getElementById("td-custAddr").value.trim(),
    document.getElementById("td-custBank").value.trim(),
    document.getElementById("brandName").textContent.trim(),
    document.getElementById("fuel").textContent.trim(),
    document.getElementById("extcolour").textContent.trim(),
    document.getElementById("wheelsize").textContent.trim(),
    paymode.value,
    document.getElementById("price").textContent.trim(),
    document.getElementById("discount").textContent.trim(),
    document.getElementById("gstrate").textContent.trim(),
    document.getElementById("gst").textContent.trim(),
    document.getElementById("total").textContent.trim(),
  ].map(v => `"${v.replace(/"/g, '""')}"`).join(",");  // CSV-safe quoting

  // ── 3. Append to sales_log.csv (download) ─────────────────────────
  const blob = new Blob([row + "\n"], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "sales_log.csv";
  a.click();
  URL.revokeObjectURL(a.href);

  alert("Booking confirmed! ");

  // ── 4. Close overlays ──────────────────────────────────────────────
  taxpage.classList.remove("active");
  configpage.classList.remove("active");





  const carName = document.getElementById('brandName').textContent.trim();
  const payMode = document.getElementById('td-paymode').value;

  document.getElementById('taxdetails').classList.remove('active');
  showDealerAlert(carName, payMode);



}

// =============================================
//  FOOTER — smooth scroll
// =============================================

function goToCar(pageId) {
  const page = document.getElementById(pageId);
  if (page) page.scrollIntoView({ behavior: "smooth" });
}





// =============================================
//  BOOK TEST DRIVE — uses window.bookingManager
// =============================================




document.querySelector("#page9 .footer-col #booktest")
.addEventListener("click", () => {
  document.querySelector("#booktestdrive").classList.add("active");
  document.body.style.overflow = "hidden";
});

// ---- date / time defaults ----

const tdDateInput = document.getElementById("td-date");
const tdTimeInput = document.getElementById("td-time");

function tdSetDateDefaults() {
  const now  = new Date();
  const yyyy = now.getFullYear();
  const mm   = String(now.getMonth() + 1).padStart(2, "0");
  const dd   = String(now.getDate() + 1).padStart(2, "0");

  tdDateInput.min   = `${yyyy}-${mm}-${dd}`;
  tdDateInput.value = `${yyyy}-${mm}-${dd}`;
  tdUpdateTimeLimit();
}

function tdUpdateTimeLimit() {
  const selected = new Date(tdDateInput.value);
  const today    = new Date();

  if (selected.toDateString() === today.toDateString()) {
      tdTimeInput.min =
          `${String(today.getHours()).padStart(2,"0")}:${String(today.getMinutes()).padStart(2,"0")}`;
  } else {
      tdTimeInput.min = "00:00";
  }
}

tdDateInput.addEventListener("change", tdUpdateTimeLimit);
tdSetDateDefaults();






// ---- submit — stores + saves CSV ----

function tdHandleSubmit() {

  const car   = document.getElementById("td-car").value;
  const name  = document.getElementById("td-name").value.trim();
  const email = document.getElementById("td-email").value.trim();
  const date  = tdDateInput.value;
  const time  = tdTimeInput.value;

  if (!car || !name || !email || !date || !time) {
      alert("Please fill in all fields.");
      return;
  }

  if (new Date(`${date}T${time}`) < new Date()) {
      alert("Please select a future date and time.");
      return;
  }

  // duplicate check
  if (window.bookingManager && window.bookingManager.isDuplicate(car, email, date)) {
      alert("You already have a test drive booked for this car on this date.");
      return;
  }

  // store locally
  if (window.bookingManager) {
      window.bookingManager.addBooking(car, name, email, date, time);
  }

  // ✅ NEW: save to CSV
  tdSaveToCSV(car, name, email, date, time);

  // confirmation UI
  const fmtDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric"
  });

  const fmtTime = new Date("1970-01-01T" + time).toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", hour12: true
  });

  document.getElementById("td-conf-text").innerHTML =
      `<span>${car}</span> &middot; ${fmtDate} at <span>${fmtTime}</span><br>
       Confirmation will be sent to <span>${email}</span>`;

  document.getElementById("td-confirmation").classList.add("td-show");
  document.getElementById("td-submit-btn").style.display = "none";
}

function tdSaveToCSV(car, name, email, date, time) {

  const now = new Date().toISOString();

  // Proper CSV escaping
  function esc(val) {
    return `"${String(val).replace(/"/g, '""')}"`;
  }

  const row = [
    esc(now),
    esc(name),
    esc(email),
    esc(car),
    esc(date),
    esc(time)
  ].join(",");

  // 👉 OPTION 1: Send to backend (BEST)
  /*
  fetch("/save-testdrive", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: row + "\n"
  });
  */

  // 👉 OPTION 2: Download CSV (NO backend)
  const blob = new Blob([row + "\n"], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "testdrive_log.csv";
  a.click();

  // 👉 OPTION 3: Debug (console)
  console.log("CSV Row:", row);
}



// ---- close & reset ----

function tdClosePage() {
  document.getElementById("booktestdrive").classList.remove("active");
  document.body.style.overflow = "";
  document.getElementById("td-confirmation").classList.remove("td-show");
  document.getElementById("td-submit-btn").style.display = "";

  document.querySelectorAll("#booktestdrive input, #booktestdrive select")
      .forEach(el => {
          if (el.type !== "date" && el.type !== "time") el.value = "";
      });
}


//==============================================
//FILTER PAGE
//==============================================

const mmCars = [
  { name: 'Mustang',   fuel: 'Petrol', price: 70,  page: 'page4' },
  { name: '720S',      fuel: 'Petrol', price: 200, page: 'page5' },
  { name: 'Challenger',fuel: 'Petrol', price: 80,  page: 'page6' },
  { name: 'M3 CS',     fuel: 'Petrol', price: 140, page: 'page7' },
  { name: 'E-Tron',    fuel: 'EV',     price: 120, page: 'page8' },
];

// Open / Close
function openFilter() {
  document.getElementById('filterpage').classList.add('active');
  document.getElementById('fp-backdrop').classList.add('active');
}
function closeFilter() {
  document.getElementById('filterpage').classList.remove('active');
  document.getElementById('fp-backdrop').classList.remove('active');
}

// Fuel pills
document.querySelectorAll('.fp-pill').forEach(pill => {
  pill.addEventListener('click', function () {
      document.querySelectorAll('.fp-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
  });
});

// Dual range slider
const fpMin = document.getElementById('fp-min');
const fpMax = document.getElementById('fp-max');
const fpMinVal = document.getElementById('fp-min-val');
const fpMaxVal = document.getElementById('fp-max-val');

function updateRangeTrack() {
  let minVal = parseInt(fpMin.value);
  let maxVal = parseInt(fpMax.value);
  if (minVal > maxVal - 10) {
      if (this === fpMin) minVal = maxVal - 10;
      else maxVal = minVal + 10;
      fpMin.value = minVal;
      fpMax.value = maxVal;
  }
  fpMinVal.textContent = minVal;
  fpMaxVal.textContent = maxVal;
  const pct1 = (minVal / 200) * 100;
  const pct2 = (maxVal / 200) * 100;
  document.querySelector('.fp-range-track-fill').style.left  = pct1 + '%';
  document.querySelector('.fp-range-track-fill').style.width = (pct2 - pct1) + '%';
}

fpMin.addEventListener('input', updateRangeTrack);
fpMax.addEventListener('input', updateRangeTrack);

// Apply
function applyFilter() {
  const activeFuel = document.querySelector('.fp-pill.active').dataset.fuel;
  const minP = parseInt(fpMin.value);
  const maxP = parseInt(fpMax.value);

  let matched = 0;

  // Filter ticker cards on page2
  document.querySelectorAll('.t-card').forEach(card => {
      const name = card.querySelector('.t-card-name').textContent.trim();
      const car = mmCars.find(c => c.name.toLowerCase() === name.toLowerCase());
      if (!car) return;
      const fuelOk  = activeFuel === 'all' || car.fuel === activeFuel;
      const priceOk = car.price >= minP && car.price <= maxP;
      if (fuelOk && priceOk) {
          // card.style.opacity = '1';
          // card.style.transform = 'scale(1)';
          // card.style.pointerEvents = 'all';
          card.style.display       = 'block';  // was missing — cards stayed hidden
card.style.pointerEvents = 'all';    // was missing — hover/click stayed dead
          matched++;
      } else {
          // card.style.opacity = '0.2';
          // card.style.transform = 'scale(0.96)';
          card.style.display="none";
          card.style.pointerEvents = 'none';
      }
  });

  // Dim configure pages (page4–8) that don't match
  mmCars.forEach(car => {
      const pg = document.getElementById(car.page);
      if (!pg) return;
      const fuelOk  = activeFuel === 'all' || car.fuel === activeFuel;
      const priceOk = car.price >= minP && car.price <= maxP;
      pg.style.opacity = (fuelOk && priceOk) ? '1' : '0.3';
  });

  document.getElementById('fp-results-hint').textContent =
      matched + ' MODEL' + (matched !== 1 ? 'S' : '') + ' MATCH';

  setTimeout(closeFilter, 600);


  
}

// Reset
function resetFilter() {
  document.querySelectorAll('.fp-pill').forEach(p => p.classList.remove('active'));
  document.querySelector('.fp-pill[data-fuel="all"]').classList.add('active');
  fpMin.value = 0;
  fpMax.value = 200;
  updateRangeTrack();
  document.querySelectorAll('.t-card').forEach(card => {
    card.style.display       = 'block';  // was missing — cards stayed hidden
    card.style.pointerEvents = 'all';    // was missing — hover/click stayed dead
  });
  mmCars.forEach(car => {
      const pg = document.getElementById(car.page);
      if (pg) pg.style.opacity = '1';
  });
  document.getElementById('fp-results-hint').textContent = '';

 
}







function showDealerAlert(carName, payMode) {
  const today = new Date();
  const start = new Date(today); start.setDate(today.getDate() + 6);
  const end   = new Date(today); end.setDate(today.getDate() + 8);
  const fmt = d => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const ref = 'MM-' + today.getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));

  document.getElementById('appt-ref').textContent    = ref;
  document.getElementById('appt-window').textContent = fmt(start) + ' – ' + fmt(end);
  document.getElementById('appt-car').textContent    = carName;
  document.getElementById('appt-pay').textContent    = payMode;

  document.getElementById('dealerAlert').classList.add('active');
}

function closeDealerAlert() {
  document.getElementById('dealerAlert').classList.remove('active');
}