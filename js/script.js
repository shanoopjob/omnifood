///////////////////////////////////////////////////////////
// Set current year in the copyright

const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
//Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
//smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (eachLink) {
  eachLink.addEventListener("click", function (e) {
    e.preventDefault();

    const href = eachLink.getAttribute("href");

    //Scroll back to top
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    //Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    //close mobile navigtion after clicking the section
    if (eachLink.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});
///////////////////////////////////////////////////////////
//sticky navigation

/*Here we want to show the sticky header only after we scroll out of section hero*/
//description of options objects
//root: used to mention the location  where the observable element is appearing. so here null indicates the viewport means we will observe the element when it goes through the viewport
//threshold: the time the event should fire. Here  '0' indicate the if 0th percentage of observable element is enterd inside the observable area it will fire. if it's 1 means it will fire if the element is completely inside the observable area.
//rootmargin:
const sectionHeroEl = document.querySelector(".section-hero");

// You can also represent as below
// const obs = new IntersectionObserver((events)=>{},{});
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (!ent.isIntersecting) {
      //fire when false
      document.body.classList.add("sticky");
      // document.querySelector(".header").classList.add("sticky");
    }
    if (ent.isIntersecting) {
      //fire when true
      document.body.classList.remove("sticky");
      // document.querySelector(".header").classList.remove("sticky");
    }
  },
  {
    //options
    //In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px", //height of the sticky which we given in the sticky class. please note only unit pixel can be used
  }
);
obs.observe(sectionHeroEl); //put the element which we need to observe
///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions year 2021
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
