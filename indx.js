




//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxzxxxxxxxxxxxxxxxxxxzxzxxzxzxzxzxzxzxzxzxzxzxzxzxzxxzxzxzxzxzxzxxzxzxzxzxzxzxzxzxxzxzxzxzxzxzxzxxzxz




// Prevent scrolling while loader is visible
// Add "loading" class to body immediately


document.body.classList.add('loading');
window.addEventListener('load', () => {

  const loader = document.getElementById('loader');
  const video = document.getElementById('loaderVideo');

  video.addEventListener('ended', () => {

      loader.classList.add('fade-out');

      setTimeout(() => {
          loader.style.display = 'none';
          document.body.classList.remove('loading');
      }, 5800); 
  });

});

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx




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