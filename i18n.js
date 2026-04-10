function setLanguage(lang) {
  const dict = profileData[lang] || profileData.jp;
  document.documentElement.lang = lang === "jp" ? "ja" : lang;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (dict[key] !== undefined) node.textContent = dict[key];
  });

  renderList("skillsList", dict.skills, "chip");
  renderExperience("experienceList", dict.experience);
  renderList("educationList", dict.education);
  renderList("certList", dict.certs);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  localStorage.setItem("profile_lang", lang);
}

function renderList(targetId, items, className = "") {
  const root = document.getElementById(targetId);
  if (!root) return;
  root.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    if (className) li.className = className;
    li.textContent = item;
    root.appendChild(li);
  });
}

function renderExperience(targetId, items) {
  const root = document.getElementById(targetId);
  if (!root) return;
  root.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <p class="text-xs font-semibold uppercase tracking-wide text-cyan-300">${item.period}</p>
      <h3 class="mt-1 text-base font-semibold text-slate-100">${item.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-slate-300">${item.body}</p>
    `;
    root.appendChild(card);
  });
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

const savedLang = localStorage.getItem("profile_lang") || "jp";
setLanguage(savedLang);
